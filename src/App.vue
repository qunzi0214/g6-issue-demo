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
    });

    this.graph.addItem('node', {
      id: `node${Date.now()}`,
      x: 100,
      y: 100,
      label: 'test-test',
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
  height: 100%;
  background-color: #fff;
}
</style>
