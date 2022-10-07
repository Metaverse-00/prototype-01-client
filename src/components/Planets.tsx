import React, { useEffect } from 'react';
import { useScene } from 'babylonjs-hook';
import { StandardMaterial, Texture, MeshBuilder, Color3 } from '@babylonjs/core';

function Planets() {

  const scene = useScene();

  useEffect(() => {
    if (scene) {
      const sunMaterial = new StandardMaterial('sunMaterial', scene);
      sunMaterial.emissiveTexture = new Texture('assets/images/sun.jpg', scene);
      sunMaterial.diffuseColor = Color3.Black();
      sunMaterial.specularColor = Color3.Black();

      const sun = MeshBuilder.CreateSphere('sun', { segments: 16, diameter: 4 }, scene);
      sun.material = sunMaterial;

      const planetMaterial = new StandardMaterial('planetMaterial', scene);
      planetMaterial.diffuseTexture = new Texture('assets/images/sand.png', scene);
      planetMaterial.specularColor = Color3.Black();

      const speeds = [0.01, -0.01, 0.005];
      for (let i = 0; i < 3; i++) {
        const planet = MeshBuilder.CreateSphere(`planet${i}`, { segments: 16, diameter: 1 }, scene);
        planet.position.x = 2 * i + 4;
        planet.material = planetMaterial;

        const orbit = {
          radius: planet.position.x,
          speed: speeds[i],
          angle: 0
        }

        scene.registerBeforeRender(() => {
          planet.position.x = orbit.radius * Math.sin(orbit.angle);
          planet.position.z = orbit.radius * Math.cos(orbit.angle);
          orbit.angle += orbit.speed;
        });
      }
    }
  }, [scene]);

  return null;
}

export default Planets;
