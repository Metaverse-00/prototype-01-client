import { Schema, type, MapSchema } from '@colyseus/schema';

export class PlayerState extends Schema {

  @type('string') name: string;

  constructor(_name: string);

}

export class MainSpaceState extends Schema {

  @type({ map: PlayerState }) players: MapSchema<PlayerState>;

}
