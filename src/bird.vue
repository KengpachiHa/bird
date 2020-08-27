<template lang="pug">
  <div ref="cvs">
    <canvas style="border:1px solid"></canvas>
  </div>
</template>

<script lang="ts">
   
export default {
  data() {
    return {
      
    }
  },
  mounted() {
    const dom = this.$refs.cvs
    const cvs = dom.children[0]
    cvs.width = dom.offsetWidth
    cvs.height = 500
  }
}
</script>