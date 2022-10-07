import '@babylonjs/loaders';
import React, { useEffect } from 'react';
import { useScene } from 'babylonjs-hook';
import { SceneLoader, AbstractMesh, Vector3, ActionManager, ExecuteCodeAction, ActionEvent } from '@babylonjs/core';

function SpaceShip() {

  const scene = useScene();

  type KeyInput = {
    w: boolean,
    a: boolean,
    s: boolean,
    d: boolean,
  }

  useEffect(() => {
    if (scene) {
      let spaceCraft: AbstractMesh[];
      SceneLoader.ImportMesh('', 'assets/models/', 'spaceCraft1.obj', scene,
        (meshes: AbstractMesh[]) => {
          spaceCraft = meshes;
          meshes.forEach((mesh: AbstractMesh) => {
            mesh.position = new Vector3(0, -5, 10);
            mesh.scaling = new Vector3(0.2, 0.2, 0.2);
          });
        });

      scene.actionManager = new ActionManager(scene);

      const inputMap: KeyInput = {
        w: false,
        a: false,
        s: false,
        d: false,
      };

      scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (e: ActionEvent) => {
        inputMap[e.sourceEvent.key as keyof KeyInput] = e.sourceEvent.type == 'keydown';
      }));
      scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (e: ActionEvent) => {
        inputMap[e.sourceEvent.key as keyof KeyInput] = e.sourceEvent.type == 'keydown';
      }));

      scene.onBeforeRenderObservable.add(() => {
        if (inputMap['w']) {
          spaceCraft?.forEach((mesh: AbstractMesh) => {
            mesh.moveWithCollisions(mesh.forward.scaleInPlace(-0.2));
          });
        } else if (inputMap['s']) {
          spaceCraft?.forEach((mesh: AbstractMesh) => {
            mesh.moveWithCollisions(mesh.forward.scaleInPlace(0.2));
          });
        }
        if (inputMap['a']) {
          spaceCraft?.forEach((mesh: AbstractMesh) => {
            mesh.rotate(Vector3.Up(), -0.02);
          });
        } else if (inputMap['d']) {
          spaceCraft?.forEach((mesh: AbstractMesh) => {
            mesh.rotate(Vector3.Up(), 0.02);
          });
        }
      });
    }
  }, [scene]);

  return null;
}

export default SpaceShip;