<template>
  <div id="app">
    <div id="g6-container"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import customNode from './g6-config/customNode';

export default {
  name: 'App',
  data() {
    return {
      graph: null
    }
  },
  mounted () {
    G6.registerNode('customNode', customNode);
    const container = document.getElementById('g6-container');
    const height = container.offsetHeight;
    const width = container.offsetWidth;

    const tooltip = new G6.Tooltip({
        offsetX: -20,
        offsetY: 30,
        getContent(e) {
          console.log('getContent execute', e.target.attr('tips'));
          return `
            <p style="width: 180px; padding: 8px 16px">${e.target.attr('tips')}</p>
          `;
        },
        shouldBegin(e) {
          if(e.target.attr('tips')) {
            console.log('shouldBegin execute');
            return true;
          }
          
          return false;
        },
        itemTypes: ['node'],
      });

    this.graph = new G6.Graph({
      container: 'g6-container',
      height,
      width,
      defaultNode: {
        type: 'customNode',
      },
      modes: {
        default: ['drag-node', 'drag-canvas'],
      },
      plugins: [tooltip],
    });

    this.graph.addItem('node', {
      id: `node${Date.now()}`,
      x: 200,
      y: 200,
      type: 'customNode',
    });
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  box-sizing: border-box;
  padding: 200px;
  background-color: #eee;
}
#g6-container {
  position: relative;
  height: 100%;
  background-color: #fff;
}
</style>
