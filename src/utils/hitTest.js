
let hitTestSource;
let hitTestSourceRequested = false;

export function handleXRHitTest(
  renderer,
  frame,
  onHitTestResultReady,
  onHitTestResultEmpty,
) {
  const referenceSpace = renderer.xr.getReferenceSpace();
  const session = renderer.xr.getSession();

  let xrHitPoseMatrix;

  if (session && hitTestSourceRequested === false) {
    session.requestReferenceSpace("viewer").then((referenceSpace) => {
      if (session) {
        session
          .requestHitTestSource({ space: referenceSpace })
          .then((source) => {
            hitTestSource = source;
          });
      }
    });

    hitTestSourceRequested = true;
  }

  if (hitTestSource) {
    const hitTestResults = frame.getHitTestResults(hitTestSource);

    if (hitTestResults.length) {
      const hit = hitTestResults[0];

      if (hit && hit !== null && referenceSpace) {
        const xrHitPose = hit.getPose(referenceSpace);

        if (xrHitPose) {
          xrHitPoseMatrix = xrHitPose.transform.matrix;
          onHitTestResultReady(xrHitPoseMatrix);
        }
      }
    } else {
      onHitTestResultEmpty();
    }
  }
};