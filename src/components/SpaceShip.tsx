import '@babylonjs/loaders';
import React, { useEffect } from 'react';
import { useScene } from 'babylonjs-hook';
import { SceneLoader, AbstractMesh, Vector3 } from '@babylonjs/core';

function SpaceShip() {

  const scene = useScene();

  useEffect(() => {
    if (scene) {
      SceneLoader.ImportMesh('', 'assets/models/', 'spaceCraft1.obj', scene,
        (meshes: AbstractMesh[]) => {
          meshes.forEach((mesh: AbstractMesh) => {
            mesh.position = new Vector3(0, -5, 10);
            mesh.scaling = new Vector3(0.2, 0.2, 0.2);
          });
        });
    }
  }, [scene]);

  return null;
}

export default SpaceShip;
