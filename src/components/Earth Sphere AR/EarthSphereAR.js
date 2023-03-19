/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from 'react';
import './EarthSphere.css';
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { createScene } from "../../utils/scene";
import {
  displayIntroductionMessage, getDeviceWidthAndHeight,
} from "../../utils/domUtils";

function EarthSphereAR() {
  const mountRef = useRef(null);
  const { devicePixelRatio, innerHeight, innerWidth } = window;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);

  renderer.xr.enabled = true;
  useEffect(() => {
    mountRef?.current?.appendChild(renderer.domElement);

    mountRef?.current?.appendChild(
      ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] }),
    );

    displayIntroductionMessage();

    createScene(renderer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => mountRef?.current?.removeChild(renderer.domElement);

  }, [renderer, renderer.domElement]);

  return (
    <div className="earth-sphere" ref={mountRef}></div>
  );
}

export default EarthSphereAR;
