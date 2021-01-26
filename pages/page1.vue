<template>
  <div>
    <h1>Hello page 1 !</h1>
    <div class="flex justify-center">
      <div>
        <Image3D
          :src="require('../assets/images/cat.jpeg')"
          :hover="require('../assets/images/cat2.jpeg')"
          :width="600"
          :height="900"
          alt=""
        />
      </div>
    </div>
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
