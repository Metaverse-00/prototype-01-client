import React from 'react';
import SceneContainer from 'babylonjs-hook';
import { HemisphericLight, Scene, Vector3, ArcRotateCamera } from '@babylonjs/core';
import Planets from './Planets';

function SceneComponent() {

  const onSceneReady = (scene: Scene) => {
    const light = new HemisphericLight('light', Vector3.Up(), scene);
    light.intensity = 0.8;

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
