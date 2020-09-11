import runningSvg from '../assets/running.svg';
import { Util } from '@antv/g6';

export default {
  draw(cfg, group) {
    const width = 200;
    const height = 32;
    const color = '#6ab7ff';

    const offsetX = - width / 2;
    const offsetY = - height / 2;
    const mainId = `rect${Date.now()}`;

    const keyShape = group.addShape('rect', {
      name: 'base-shape',
      draggable: true,
      attrs: {
        id: mainId,
        x: offsetX,
        y: offsetY,
        width,
        height,
        stroke: '#e4e5ea',
        fill: '#fff',
        radius: 4,
        cursor: 'move',
      },
    });

    group.addShape('rect', {
      name: 'pre-rect',
      draggable: true,
      attrs: {
        x: offsetX,
        y: offsetY,
        width: 3,
        height,
        fill: color,
        parent: mainId,
        radius: [4, 0, 0, 4],
        cursor: 'move',
      },
    });

    if (cfg.label) {
      group.addShape('text', {
        name: 'text-shape',
        draggable: true,
        attrs: {
          x: 0,
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          parent: mainId,
          fill: '#4a5366',
          cursor: 'move',
        },
      });
    }

    const centerPoint = { x: -10, y: -10 };
    const running = group.addShape('image', {
      name: 'running-image',
      attrs: {
        x: centerPoint.x + 80,
        y: centerPoint.y,
        width: 20,
        height: 20,
        img: runningSvg,
        parent: mainId,
        opacity: 1,
      },
    });

    // this code make other shape disapear when dragging out of range
    running.animate(
      (ratio) => {
        const matrix = Util.mat3.create();
        const toMatrix = Util.transform(matrix, [
          ['t', -80, 0],
          ['r', ratio * Math.PI * 2],
          ['t', 80, 0],
        ]);
        return {
          matrix: toMatrix,
        };
      },
      {
        repeat: true,
        duration: 2000,
        easing: 'easeLinear',
      },
    );
    // end of the effective code 

    return keyShape;
  },
};
