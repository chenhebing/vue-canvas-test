<template>
  <div class="cool-clock-container">
    <canvas class="top" ref="topLayer">抱歉，您的浏览器不支持canvas</canvas>
  </div>
</template>

<script>
  import Particle from './Particle';
  import { coolClockNumData, coolClockNumColor } from '../../lib/const';
  import { RAF } from '../../lib/util';
  let topCtx = null;
  let txConst = 0;
  let tyConst = 0;
  let lastTime = '';
  let preTime = new Date();
  let nextTime = new Date();
  let beat = false;

  const radius = 8;
  const circleXSpace = 12;
  const letterSpace = 20;
  const width = 1400;
  const height = 600;
  const offsetX = 4 * (radius * 2 + circleXSpace) + letterSpace;
  const particles = [];

  export default {
    name: 'cool-clock',
    mounted () {
      const { topLayer } = this.$refs;
      const rectConf = { width, height };
      Object.assign(topLayer, rectConf);
      topCtx = topLayer.getContext('2d');
      txConst = (topLayer.width - ((radius * 2 + circleXSpace) * 4 * 8 + 7 * letterSpace)) / 2 | 0;
      tyConst = (topLayer.height - (radius * 2 + circleXSpace) * 6) / 3 | 0;
      for (let i = 0; i < 200; ++i) {
        particles.push(new Particle(topCtx, width, height));
      }
      this.setTime(preTime);
      this.goAnimate();
    },
    methods: {
      getXY (i, j, k) {
        const x = txConst + offsetX * i + (radius * 2 + circleXSpace) * k;
        const y = tyConst + j * (radius * 2 + circleXSpace);
        return {x, y};
      },
      goAnimate () {
        topCtx.clearRect(0, 0, width, height);
        nextTime = new Date();
        if (nextTime - preTime >= 1000) {
          this.setTime(nextTime);
          preTime = nextTime;
          beat = !beat;
        }
        particles.forEach(item => {
          if (item.visible) {
            item.update(16 / 70);
            item.paint();
          }
        });
        RAF(this.goAnimate);
      },
      setTime (time) {
        const hour = this.getHandleTime(time.getHours());
        const minute = this.getHandleTime(time.getMinutes());
        const second = this.getHandleTime(time.getSeconds());
        const timeStr = `${hour}${beat ? ':' : 'A'}${minute}${beat ? ':' : 'A'}${second}`;
        let i = 0;
        if (lastTime) {
          for (; i < timeStr.length; ++i) {
            if (lastTime[i] !== timeStr[i]) {
              break;
            }
          }
        }
        for (; i < timeStr.length; ++i) {
          for (let j = 0; j < 7; ++j) {
            for (let k = 0; k < 4; ++k) {
              const { x, y } = this.getXY(i, j, k);
              let curParticle = null;
              let usefull = null;
              const numState = coolClockNumData[timeStr[i]][j][k];
              particles.some(item => {
                if (item.visible && item.x === x && item.y === y) {
                  curParticle = item;
                } else if (!item.visible && !usefull) {
                  usefull = item;
                }
                return curParticle && usefull;
              });
              if (curParticle && numState === '0') {
                curParticle.goDrop();
              } else if (!curParticle && numState === '1') {
                usefull.reset(x, y, coolClockNumColor[i]);
              }
            }
          }
        }
      },
      getHandleTime (d) {
        return d >= 10 ? `${d}` : `0${d}`;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .cool-clock-container {
    overflow: hidden;
    width: 100%;
    height: 600px;
    margin-top: 100px;
    .top{
      width: 1400px;
      height: 600px;
      background-color: black;
    }
  }
</style>
