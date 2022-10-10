import { Schema, type, MapSchema } from '@colyseus/schema';

export class MainSpaceState extends Schema {

  @type({ map: PlayerState }) players: MapSchema<PlayerState>;

  @type({ map: CameraState }) cameras: MapSchema<CameraState>;

}

export class PlayerState extends Schema {

  @type("string") name: string;

  @type(PositionState) position: PositionState;

  @type("number") rotation: number;

  constructor(
    _name: string,
    _position: PositionState,
    _rotation: number
  );

}

export class PositionState extends Schema {

  @type("number") x: number;

  @type("number") y: number;

  @type("number") z: number;

  constructor(_x: number, _y: number, _z: number);

}

export class CameraState extends Schema {

  @type("number") alpha: number;

  @type("number") beta: number;

  @type("number") radius: number;

  @type(PositionState) position: PositionState;

  constructor(_alpha: number, _position: PositionState);

}