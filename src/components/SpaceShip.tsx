import '@babylonjs/loaders';
import React, { useContext, useEffect } from 'react';
import { RoomContext } from '../contexts/roomContext';
import { PlayerState } from '../../schemas';
import { useScene } from 'babylonjs-hook';
import {
  SceneLoader,
  AbstractMesh,
  Vector3,
  ActionManager,
  ExecuteCodeAction,
  ActionEvent,
  ArcRotateCamera
} from '@babylonjs/core';

function SpaceShip() {

  const scene = useScene();
  const roomCtx = useContext(RoomContext);

  let playerState: PlayerState;
  if (roomCtx!.room) {
    const { state, sessionId } = roomCtx!.room;
    playerState = state.players.get(sessionId)!;
  }

  type KeyInput = {
    w: boolean,
    a: boolean,
    s: boolean,
    d: boolean,
  }

  useEffect(() => {
    if (scene) {
      let spaceCraft: AbstractMesh[];
      SceneLoader.ImportMesh('', 'assets/models/', 'spaceCraft2.obj', scene,
        (meshes: AbstractMesh[]) => {
          spaceCraft = meshes;
          const { rotation, position: { x, y, z } } = playerState;

          meshes.forEach((mesh: AbstractMesh) => {
            mesh.position = new Vector3(x, y, z);
            mesh.scaling = new Vector3(0.2, 0.2, 0.2);

            const rotateAngle = rotation;
            const rotateRadian = rotateAngle * (Math.PI / 180);
            mesh.rotate(Vector3.Up(), rotateRadian);
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

      const rotateAngle = 1;
      const rotateRadian = rotateAngle * (Math.PI / 180);
      const camera = scene.getCameraByName('camera') as ArcRotateCamera;

      scene.onBeforeRenderObservable.add(() => {
        if (inputMap['w']) {
          spaceCraft?.forEach((mesh: AbstractMesh) => {
            mesh.moveWithCollisions(mesh.forward.scaleInPlace(-0.2));
            camera.lockedTarget = mesh;
          });
        } else if (inputMap['s']) {
          spaceCraft?.forEach((mesh: AbstractMesh) => {
            mesh.moveWithCollisions(mesh.forward.scaleInPlace(0.2));
            camera.lockedTarget = mesh;
          });
        }
        if (inputMap['a']) {
          spaceCraft?.forEach((mesh: AbstractMesh) => {
            mesh.rotate(Vector3.Up(), -Math.abs(rotateRadian));
          });
          camera.alpha += rotateRadian;
        } else if (inputMap['d']) {
          spaceCraft?.forEach((mesh: AbstractMesh) => {
            mesh.rotate(Vector3.Up(), rotateRadian);
          });
          camera.alpha -= rotateRadian;
        }
      });
    }
  }, [scene]);

  return null;
}

export default SpaceShip;
