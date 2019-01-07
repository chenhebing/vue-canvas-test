<template>
  <div class="container">
    <canvas id="trails-canvas" />
    <canvas id="main-canvas" />
  </div>
</template>

<script>
  import Firework from './Firework.js';

  export default {
    name: 'firework',
    mounted () {
      const firework = new Firework('trails-canvas', 'main-canvas');
      firework.start();
    },
  };
</script>

<style scoped lang="less">
  .container {
    width: 100%;
    height: 100vh;
    transition: filter 0.3s;
    position: relative;
    background-color: black;
    canvas {
      position: absolute;
      mix-blend-mode: lighten;
      transform: translateZ(0);
    }
  }
</style>
