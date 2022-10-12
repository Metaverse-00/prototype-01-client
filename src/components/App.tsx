import React, { useEffect, useState } from 'react';
import * as Colyseus from 'colyseus.js';
import { MainSpaceState } from '../../schemas';
import { RoomContext } from '../contexts/roomContext';
import SceneComponent from './SceneComponent';
import Backdrop from './Backdrop';

function App() {

  const [room, setRoom] = useState<Colyseus.Room<MainSpaceState> | null>(null);

  const ENV_URL = 'https://astonishing-stroopwafel-02b744.netlify.app/.netlify/functions/env';

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(ENV_URL);
        const SERVER_URL = await res.json();
        const client = new Colyseus.Client(SERVER_URL);
        const room = await client.joinOrCreate<MainSpaceState>('main_space', { name: 'player' });
        room.onStateChange(() => setRoom(room));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <RoomContext.Provider value={{ room }}>
        {room ?
          <SceneComponent />
          :
          <Backdrop />
        }
    </RoomContext.Provider>
  );
}

export default App;
