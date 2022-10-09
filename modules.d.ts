import { Schema, type, MapSchema } from '@colyseus/schema';

declare class PlayerState extends Schema {

  @type('string') name: string;

  constructor(_name: string);

}

declare class MainSpaceState extends Schema {

  @type({ map: PlayerState }) players: MapSchema<PlayerState>;

}

export = MainSpaceState;
