import React, { useEffect, useState } from 'react';
import * as Colyseus from 'colyseus.js';
import { DataChange } from '@colyseus/schema';
import { MainSpaceState, PlayerState } from '../../schemas';
import SceneComponent from './SceneComponent';
import Backdrop from './Backdrop';

function App() {

  const [isRoomEmpty, setIsRoomEmpty] = useState<boolean | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const client = new Colyseus.Client('ws://localhost:2567');
        const room = await client.joinOrCreate<MainSpaceState>('main_space', { name: 'player01' });

        room.state.players.onAdd = (player: PlayerState, sessionId: string) => {
          console.log('player added with sessionId:', sessionId);

          if (room.state.players.size > 1) {
            setIsRoomEmpty(false);
          } else {
            setIsRoomEmpty(true);
          }

          player.onChange = (changes: DataChange<any>[]) => {

          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {isRoomEmpty !== undefined ?
        <SceneComponent isRoomEmpty={isRoomEmpty} />
        :
        <Backdrop />
      }
    </>
  );
}

export default App;
