import React, { useEffect } from 'react';
import { useScene } from 'babylonjs-hook';
import { Rectangle, Control, Grid, Button, AdvancedDynamicTexture } from '@babylonjs/gui';

function Controls() {

  const scene = useScene();

  useEffect(() => {
    if (scene) {
      const plane = AdvancedDynamicTexture.CreateFullscreenUI('plane');

      const container = new Rectangle();
      container.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
      container.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
      container.height = 0.4;
      container.width = 0.4;
      container.top = '-2%';
      container.thickness = 0;

      plane.addControl(container);

      const grid = new Grid();
      grid.addColumnDefinition(.33);
      grid.addColumnDefinition(.33);
      grid.addColumnDefinition(.33);
      grid.addRowDefinition(.5);
      grid.addRowDefinition(.5);

      container.addControl(grid);

      const leftBtn = Button.CreateImageOnlyButton('leftBtn', 'assets/images/arrow-up.svg');
      leftBtn.thickness = 0;
      leftBtn.rotation = -Math.PI / 2;
      leftBtn.color = 'white';
      leftBtn.alpha = 0.8;
      leftBtn.width = 0.8;
      leftBtn.width = 0.6;
      leftBtn.height = 0.9;

      const rightBtn = Button.CreateImageOnlyButton('right', 'assets/images/arrow-up.svg');
      rightBtn.rotation = Math.PI / 2;
      rightBtn.thickness = 0;
      leftBtn.color = 'white';
      rightBtn.alpha = 0.8;
      rightBtn.width = 0.8;
      rightBtn.width = 0.6;
      rightBtn.height = 0.9;

      const upBtn = Button.CreateImageOnlyButton('up', 'assets/images/arrow-up.svg');
      upBtn.thickness = 0;
      upBtn.alpha = 0.8;
      upBtn.width = 0.8;
      upBtn.height = 0.8;

      const downBtn = Button.CreateImageOnlyButton('down', 'assets/images/arrow-up.svg');
      downBtn.thickness = 0;
      downBtn.rotation = Math.PI;
      downBtn.color = 'white';
      downBtn.alpha = 0.8;
      downBtn.width = 0.8;
      downBtn.height = 0.8;

      grid.addControl(leftBtn, 1, 0);
      grid.addControl(rightBtn, 1, 2);
      grid.addControl(upBtn, 0, 1);
      grid.addControl(downBtn, 1, 1);
    }
  }, [scene]);

  return null;
}

export default Controls;