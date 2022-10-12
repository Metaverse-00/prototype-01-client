import '@babylonjs/loaders';
import React, { useContext, useEffect } from 'react';
import { RoomContext } from '../contexts/roomContext';
import { KeyInput } from '../contexts/inputContext';
import * as Colyseus from 'colyseus.js';
import { MainSpaceState, PlayerState } from '../../schemas';
import { useScene } from 'babylonjs-hook';
import {
  SceneLoader,
  AbstractMesh,
  Vector3,
  ActionManager,
  ExecuteCodeAction,
  ActionEvent,
  ArcRotateCamera,
  Scene
} from '@babylonjs/core';
import { DataChange } from '@colyseus/schema';

type SpaceShipProps = {
  sessionId: string,
  playerState: PlayerState
}

function SpaceShip({ sessionId, playerState }: SpaceShipProps) {

  const scene = useScene();
  const roomCtx = useContext(RoomContext);
  const room = roomCtx!.room!;

  const getMesh = () => {
    const { A, B, C } = room.state.labels;

    switch (sessionId) {
      case A:
        return 'spaceCraft1.obj';
      case B:
        return 'spaceCraft2.obj';
      case C:
        return 'spaceCraft3.obj';
    }
  }

  const sendKeyInputs = (scene: Scene, room: Colyseus.Room<MainSpaceState>) => {
    const inputMap: KeyInput = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    scene.actionManager = new ActionManager(scene);

    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (e: ActionEvent) => {
      inputMap[e.sourceEvent.key as keyof KeyInput] = e.sourceEvent.type == 'keydown';
      room.send('key_input', inputMap);
    }));
    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (e: ActionEvent) => {
      inputMap[e.sourceEvent.key as keyof KeyInput] = e.sourceEvent.type == 'keydown';
      room.send('key_input', inputMap);
    }));
  }

  useEffect(() => {
    if (scene) {
      let spaceCraft: AbstractMesh[];
      const mesh = getMesh();
      
      SceneLoader.ImportMesh('', 'assets/models/', mesh, scene,
        (meshes: AbstractMesh[]) => {
          const { rotation, position: { x, y, z } } = playerState!;
          spaceCraft = meshes;

          meshes.forEach((mesh: AbstractMesh) => {
            mesh.position = new Vector3(x, y, z);
            mesh.scaling = new Vector3(0.2, 0.2, 0.2);
  
            const rotateAngle = rotation;
            const rotateRadian = rotateAngle * (Math.PI / 180);
            mesh.rotate(Vector3.Up(), rotateRadian);
          });
        });
        
      // ----- send key inputs of current player to server ----- //

      if (room.sessionId === sessionId) {
        sendKeyInputs(scene, room);
      } else {
        scene.actionManager = new ActionManager(scene);
      }

      // ----- display animations from server data ----- //

      const keyInput: KeyInput = {
        w: false,
        a: false,
        s: false,
        d: false,
      };

      const player = room.state.players.get(sessionId);

      player!.keyInput.onChange = (changes: DataChange<any>[]) => {
        changes.forEach((change: DataChange<any>) => {
          keyInput[change.field as keyof KeyInput] = change.value
        });
      }

      let inputMap: KeyInput = {
        w: false,
        a: false,
        s: false,
        d: false,
      };

      scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnEveryFrameTrigger, () => {
        inputMap = keyInput;
      }));

      const rotateAngle = 1;
      const rotateRadian = rotateAngle * (Math.PI / 180);
      const camera = scene.getCameraByName('camera') as ArcRotateCamera;

      scene.registerBeforeRender(() => {
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

      return () => {
        spaceCraft.forEach((mesh: AbstractMesh) => {
          mesh.dispose();
        })
      }
    }
  }, [scene]);

  return null;
}

export default SpaceShip;
