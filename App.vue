<template lang="pug">
  <div ref="cvs">
    <Nav></Nav>
    <Bird />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from './src/Nav.vue'
import Bird from './src/bird.vue'
 
export default {
  components: {  Nav, Bird },
  data() {
    return {
    }
  },
  mounted (){
    
  }
}
</script>

<style lang="scss" scoped>

.container {
  color: green;
}
</style>