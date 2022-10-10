import React, { useEffect, useState } from 'react';
import * as Colyseus from 'colyseus.js';
import { DataChange } from '@colyseus/schema';
import { MainSpaceState, PlayerState } from '../../schemas';
import SceneComponent from './SceneComponent';
import Backdrop from './Backdrop';

function App() {

  const [room, setRoom] = useState<Colyseus.Room<MainSpaceState> | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const client = new Colyseus.Client('ws://localhost:2567');
        const room = await client.joinOrCreate<MainSpaceState>('main_space', { name: 'player01' });

        room.state.players.onAdd = (player: PlayerState, sessionId: string) => {
          console.log('player added with sessionId:', sessionId);
          const currentPlayer = room.sessionId === sessionId;
          const { players } = room.state;

          if (players.size > 1) {
            if (currentPlayer) {
              room.state.players.forEach((player: PlayerState, sessionId: string) => {
                player.onChange = (changes: DataChange<any>[]) => {
  
                }
              });
            } else {
              player.onChange = (changes: DataChange<any>[]) => {

              }
            }
          }
        }

        setRoom(room);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {room ?
        <SceneComponent room={room} />
        :
        <Backdrop />
      }
    </>
  );
}

export default App;
