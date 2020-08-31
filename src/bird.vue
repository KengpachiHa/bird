<template lang="pug">
  <div ref="cvs" class="cvs-box">
    <canvas   ref="background" style="border:1px solid red" class="bac-canvas"></canvas>
    <canvas id="birdCvs" ref="canvas" style="border:1px solid" class="bird-canvas"></canvas>
  </div>
</template>

<script lang="ts">

import { Bird  } from './bird.ts'
export default {
  data() {
    return {
      bird: null
    }
  },
  mounted() {
    const dom = this.$refs.cvs
    const cvs = dom.children[0]
    cvs.width = dom.offsetWidth
    cvs.height = 500

    dom.children[1].width  = dom.offsetWidth
    dom.children[1].height = 500

    const birdCanvas       = this.$refs.canvas
    const backgroundCanvas = this.$refs.background
    this.bird = new Bird(birdCanvas, backgroundCanvas)
    this.bird.init()

    document.getElementsByTagName('body')[0].addEventListener('touchstart', (e) => {
      this.bird.fly()
    })

    console.log(document.getElementsByTagName('canvas'))

    window.onkeydown = (e) => {
      if(e.keyCode == 32) {
        this.bird.fly()
      }
      if(e.keyCode == 13) {
        this.birdStop()
      }
    }
  },
  methods: {
    birdStop() {
      this.bird.pause()
    }
  }
}
</script>

<style>
.bac-canvas, .bird-canvas {
  position: absolute;
}
.cvs-box {
  position: relative;
}
</style>