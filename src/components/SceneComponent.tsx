import React, { useState, useRef, FC, useEffect } from 'react';
import { Scene, Engine } from 'react-babylonjs';

function SceneComponent() {


  return (
    <Engine antialias adaptToDeviceRatio canvasId='renderCanvas'>
      <Scene>
        
      </Scene>
    </Engine>
  )
}

export default SceneComponent;
