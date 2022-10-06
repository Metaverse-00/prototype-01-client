import React, { useEffect } from 'react';
import { useScene } from 'babylonjs-hook';
import { StandardMaterial, Texture, MeshBuilder, Color3 } from '@babylonjs/core';

function Planets() {

  const scene = useScene();

  useEffect(() => {
    if (scene) {
      const sun = MeshBuilder.CreateSphere('sun', { segments: 16, diameter: 4 }, scene);

      const planetMaterial = new StandardMaterial('planetMaterial', scene);
      planetMaterial.diffuseTexture = new Texture('assets/images/sand.png', scene);
      planetMaterial.specularColor = Color3.Black();

      const planet = MeshBuilder.CreateSphere('planet1', { segments: 16, diameter: 1 }, scene);
      planet.position.x = 4;
      planet.material = planetMaterial;
    }
  }, [scene]);

  return null;
}

export default Planets;
