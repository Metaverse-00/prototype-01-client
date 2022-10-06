import React from 'react';
import SceneContainer from 'babylonjs-hook';
import { HemisphericLight, Scene, Vector3, ArcRotateCamera, Color3, Color4, PointLight } from '@babylonjs/core';
import Planets from './Planets';

function SceneComponent() {

  const onSceneReady = (scene: Scene) => {
    scene.clearColor = new Color4(0, 0, 0, 1);

    const light = new HemisphericLight('light', Vector3.Up(), scene);
    light.intensity = 0.5;
    light.groundColor = Color3.Blue();

    const sunLight = new PointLight('sunLight', Vector3.Zero(), scene);
    sunLight.intensity = 2;

    const camera = new ArcRotateCamera('camera', 0, 0, 15, Vector3.Zero(), scene);
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 20;

    const canvas = scene.getEngine().getRenderingCanvas();

    camera.attachControl(canvas, true);
  }

  return (
    <SceneContainer
      id='canvas'
      antialias
      onSceneReady={onSceneReady}
      renderChildrenWhenReady
    >
      <Planets />
    </SceneContainer>
  )
}

export default SceneComponent;
