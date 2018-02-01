<template>
  <div class="music-player-container">
    <div class="left">
      敬请期待
    </div>
    <audio id="music" loop preload autoplay :src="require('../../assets/MP3/CroatianRhapsody.mp3')"></audio>
    <div class="right">
      <canvas id="bottomCanvas"></canvas>
    </div>
  </div>
</template>

<script>
  import { AudioContext, RAF } from '../../lib/util';
  let canvasWidth, rectBarWidth, rectBarHeight, bottomCanvas, bottomCtx, analyser;

  const indexLen = 32;
  const indexSpace = 5;
  const verticalSpace = 2;
  const canvasHeight = 540;
  const topCanvas = document.createElement('canvas');
  const topCtx = topCanvas.getContext('2d');
  topCanvas.width = 0;
  topCanvas.height = canvasHeight / 2;

  const gradientStyle = topCtx.createLinearGradient(0, 0, 0, canvasHeight / 2);
  gradientStyle.addColorStop(0, 'red');
  gradientStyle.addColorStop(0.4, 'yellow');
  gradientStyle.addColorStop(1, '#00E800');
  const barArr = [];

  const audioCtx = new AudioContext();

  class RectBar {
    constructor (x, y, w, h, space) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.dy = y;
      this.space = space;
    }

    update (power) {
      power = power | 0;
      if (power >= this.y - this.dy) {
        this.dy = this.y - power;
      } else {
        this.dy += 1;
      }
      this.draw(power);
    }

    draw (power) {
      topCtx.fillStyle = gradientStyle;
      const len = (power / (this.h + this.space)) | 0;
      const barHeight = len * (this.h + this.space);
      topCtx.fillRect(this.x, this.y - barHeight, this.w, power);
      for (let i = 1; i <= len; ++i) {
        topCtx.clearRect(this.x, this.y - i * (this.h + this.space), this.w, this.space);
      }
      topCtx.fillStyle = '#950000';
      topCtx.fillRect(this.x, this.dy - this.h, this.w, this.h);
    }
  }
  export default {
    name: 'music-player',
    mounted () {
      this.init();
      const audioNode = document.querySelector('#music');
      const source = audioCtx.createMediaElementSource(audioNode);
      const gainNode = audioCtx.createGain();
      analyser = audioCtx.createAnalyser();
      gainNode.gain.value = 1;
      source.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      for (let i = 0; i < indexLen; ++i) {
        barArr.push(new RectBar(i * (rectBarWidth + indexSpace), canvasHeight / 2, rectBarWidth, rectBarHeight, verticalSpace));
      }
      this.animate();
    },
    methods: {
      init () {
        canvasWidth = document.querySelector('.right').getBoundingClientRect().width;
        rectBarWidth = (canvasWidth / indexLen - indexSpace) | 0;
        rectBarHeight = indexSpace;
        bottomCanvas = document.querySelector('#bottomCanvas');
        topCanvas.width = bottomCanvas.width = canvasWidth;
        bottomCanvas.height = canvasHeight;
        bottomCtx = bottomCanvas.getContext('2d');
      },
      createAudioSource () {
        analyser.fftSize = 64;
        const freqLength = analyser.frequencyBinCount;
        const freqData = new Uint8Array(freqLength);
        analyser.getByteFrequencyData(freqData);
        return freqData;
      },
      drawBottom () {
        bottomCtx.drawImage(topCanvas, 0, 0);
        bottomCtx.save();
        bottomCtx.scale(1, -1);
        bottomCtx.drawImage(topCanvas, 0, -canvasHeight);
        bottomCtx.restore();
        bottomCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        bottomCtx.fillRect(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);
      },
      animate () {
        const freqData = this.createAudioSource();
        bottomCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        topCtx.clearRect(0, 0, canvasWidth, canvasHeight / 2);
        for (let i = 0; i < indexLen; ++i) {
          barArr[i].update(freqData[i]);
        }
        this.drawBottom();
        RAF(this.animate);
      },
    },
  };
</script>

<style scode lang="less">
  .music-player-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: black;
    .left {
      width: 0;
    }
    .right {
      flex: 1;
      height: 540px;
    }
  }
</style>
