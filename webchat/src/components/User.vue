<template>
  <div class="user" :style="{backgroundColor: color, width: width, height: height}">
    <h2>{{ name || '...' }}</h2>
    <img ref="image" :src="image">
  </div>
</template>

<script>
import { setInterval } from 'timers';


export default {
  name: 'User',
  props: ['image', 'color', 'name', 'width', 'height']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.user {
  position: relative;
}

.user h2 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  color: white;
  z-index: 10;
  margin: 0;
}

.user img {
  margin: 20px;
  width: calc(100% - 40px);
  object-fit: contain;
  height: calc(100% - 40px);
}
</style>
