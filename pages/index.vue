<template>
  <div>
    <h1>Hello world !</h1>
    <Image3D
      :src="require('../assets/images/cat.jpeg')"
      :hover="require('../assets/images/cat2.jpeg')"
      :width="200"
      :height="300"
      alt=""
    />
    <div class="space" />
    <Image3D
      :src="require('../assets/images/cat.jpeg')"
      :hover="require('../assets/images/cat2.jpeg')"
      :width="200"
      :height="300"
      alt=""
    />
    <h2>End</h2>
  </div>
</template>

<script>
import Image3D from '@/components/Image3D'

export default {
  components: { Image3D }
}
</script>

<style>
  h1 {
    color: red;
  }

  .space {
    height: 1700px;
  }
</style>
