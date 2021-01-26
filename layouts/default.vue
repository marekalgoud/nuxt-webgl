<template>
  <div class="site">
    <nav>
      <nuxt-link to="/">home</nuxt-link>
      <nuxt-link to="/page1">page1</nuxt-link>
    </nav>
    <Nuxt />
    <client-only>
      <WebGL ref="webgl" />
    </client-only>
  </div>
</template>

<script>
import WebGL from '@/components/WebGL'

export default {
  components: { WebGL }
}
</script>

<style lang="scss" scoped>
.site {
  position: relative;
}
</style>
