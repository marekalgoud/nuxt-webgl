<template>
  <div
    ref="webgl"
    class="webgl"
  />
</template>

<script>

export default {
  mounted () {
    this.$refs.webgl.appendChild(this.$webgl.renderer.domElement)
  }
}
</script>

<style lang="scss" scoped>
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}
</style>
