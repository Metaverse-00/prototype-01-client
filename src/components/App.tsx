import React, { useEffect, useState } from 'react';
import * as Colyseus from 'colyseus.js';
import MainSpaceState from '../../modules';
import SceneComponent from './SceneComponent';
import Backdrop from './Backdrop';

function App() {

  const [isRoomEmpty, setIsRoomEmpty] = useState<boolean | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const client = new Colyseus.Client('ws://localhost:2567');
        const room = await client.joinOrCreate<MainSpaceState>('main_space', { name: 'player01' });

        room.onStateChange((state: MainSpaceState) => {
          if (state.players.size > 1) {
            setIsRoomEmpty(false);
          } else {
            setIsRoomEmpty(true);
          }
        })
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
