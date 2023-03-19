import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { handleXRHitTest } from "./hitTest";
import { createPlaneMarker }  from './plainMarker'
import {
  AmbientLight,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  XRFrame,
} from "three";
import { getEarthModel } from "./earthModel";

export function createScene(renderer) {
  const scene = new Scene();
  const Earth = getEarthModel(0.2);

  const screenSize = {
    height: window.innerHeight,
    width: window.innerWidth
  };


  const camera = new PerspectiveCamera(
    70,
    screenSize.width / screenSize.height,
    0.02,
    20,
  );

  /**
   * Add some simple ambient lights to illuminate the model.
   */
  const ambientLight = new AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  /**
   * Create the plane marker to show on tracked surfaces.
   */
  const planeMarker = createPlaneMarker();
  scene.add(planeMarker);

  /**
   * Setup the controller to get input from the XR space.
   */
  const controller = renderer.xr.getController(0);
  scene.add(controller);

  controller.addEventListener("select", onSelect);

  /**
   * The onSelect function is called whenever we tap the screen
   * in XR mode.
   */
  function onSelect() {
    if (planeMarker.visible) {
      const model = Earth.clone();

      // Place the model on the spot where the marker is showing.
      model.position.setFromMatrixPosition(planeMarker.matrix);

      // Rotate the model randomly to give a bit of variation.
      model.rotation.y = Math.random() * (Math.PI * 2);
      model.visible = true;

      scene.add(model);
    }
  }

  /**
   * Called whenever a new hit test result is ready.
   */
  function onHitTestResultReady(hitPoseTransformed) {
    if (hitPoseTransformed) {
      planeMarker.visible = true;
      planeMarker.matrix.fromArray(hitPoseTransformed);
    }
  }

  /**
   * Called whenever the hit test is empty/unsuccesful.
   */
  function onHitTestResultEmpty() {
    planeMarker.visible = false;
  }

  /**
   * The main render loop.
   *
   * This is where we perform hit-tests and update the scene
   * whenever anything changes.
   */
  const renderLoop = (timestamp, frame) => {
    if (renderer.xr.isPresenting) {
      if (frame) {
        handleXRHitTest(
          renderer,
          frame,
          onHitTestResultReady,
          onHitTestResultEmpty,
        );
      }

      renderer.render(scene, camera);
    }
  };

  renderer.setAnimationLoop(renderLoop);
}