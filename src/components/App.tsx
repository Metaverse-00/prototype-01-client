import React, { useEffect } from 'react';
import * as Colyseus from 'colyseus.js';
import MainSpaceState from '../../modules';
import SceneComponent from './SceneComponent';

function App() {

  useEffect(() => {
    (async () => {
      try {
        const client = new Colyseus.Client('ws://localhost:2567');
        const room = await client.joinOrCreate<MainSpaceState>('main_space', { name: 'jeff' });
        
        room.onStateChange((state: MainSpaceState) => {
          console.log(state.players.get(room.sessionId));
        })
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <SceneComponent />
    </>
  );
}

export default App;
