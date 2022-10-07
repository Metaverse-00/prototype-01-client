import React from 'react';
import SceneContainer from 'babylonjs-hook';
import Planets from './Planets';
import { 
  Scene, 
  Vector3, 
  HemisphericLight, 
  PointLight, 
  ArcRotateCamera, 
  Color3, 
  Color4, 
  MeshBuilder, 
  StandardMaterial, 
  CubeTexture,
  Texture
} from '@babylonjs/core';

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

    const skyMaterial = new StandardMaterial('skyMaterial', scene);
    skyMaterial.reflectionTexture = new CubeTexture('assets/images/skybox/skybox', scene);
    skyMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyMaterial.specularColor = Color3.Black();
    skyMaterial.diffuseColor = Color3.Black();
    skyMaterial.backFaceCulling = false;
    
    const skyBox = MeshBuilder.CreateBox('skyBox', { size: 1000 }, scene);
    skyBox.infiniteDistance = true;
    skyBox.material = skyMaterial;

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