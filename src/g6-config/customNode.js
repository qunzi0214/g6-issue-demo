export default {
  draw(cfg, group) {
    const mainId = `rect${Date.now()}`;

    const keyShape = group.addShape('rect', {
      name: 'base-shape',
      draggable: true,
      attrs: {
        id: mainId,
        x: -100,
        y: -20,
        width: 200,
        height: 40,
        stroke: '#eee',
        fill: '#fff',
        radius: 4,
        cursor: 'move',

        isKeyShape: true,
        tips: 'this is key shape tips'
      },
    });

    group.addShape('rect', {
      name: 'rect',
      draggable: true,
      attrs: {
        x: -25,
        y: 5,
        width: 50,
        height: 50,
        fill: '#666',
        parent: mainId,
        cursor: 'move',

        isSonShape: true,
        // tips: 'this is son shape tips'
      },
    });

    return keyShape;
  },
};
