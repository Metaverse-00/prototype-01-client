import React, { useEffect } from 'react';
import { useScene } from 'babylonjs-hook';
import { StandardMaterial, Texture, MeshBuilder } from '@babylonjs/core';

function Planets() {

  const scene = useScene();

  useEffect(() => {
    if (scene) {
      const planetMaterial = new StandardMaterial('planetMaterial', scene);
      planetMaterial.diffuseTexture = new Texture('assets/images/sand.png', scene);


      const planet = MeshBuilder.CreateSphere('planet1', { segments: 16, diameter: 1 }, scene);
      planet.material = planetMaterial;
    }
  }, [scene]);

  return null;
}

export default Planets;
