<template>
  <img
    ref="image"
    class="image-3D"
    :src="src"
    :width="width"
    :height="height"
    :alt="alt"
    @load="loaded"
  >
</template>

<script>
import * as THREE from 'three'
import gsap from 'gsap'

import fragmentShader from '@/assets/shaders/fragmentShader.frag'
import vertexShader from '@/assets/shaders/vertexShader.vert'

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    hover: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: null
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    }
  },

  mounted () {
    this.mouse = new THREE.Vector2(0, 0)

    const image = new THREE.TextureLoader().load(this.src)
    const hover = new THREE.TextureLoader().load(this.hover)

    const uniforms = {
      u_image: { type: 't', value: image },
      u_imagehover: { type: 't', value: hover },
      u_mouse: { value: this.mouse },
      u_time: { value: 0 },
      u_res: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      }
    }

    const geometry = new THREE.PlaneGeometry(1, 1)
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      defines: {
        PR: window.devicePixelRatio.toFixed(1)
      }
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.$webgl.scene.add(this.mesh)

    this.bindScroll()
  },

  destroyed () {
    this.$webgl.scene.remove(this.mesh)
  },

  methods: {
    loaded () {
      const bounding = this.$refs.image.getBoundingClientRect()
      const bodyBounding = document.body.getBoundingClientRect()

      this.left = bounding.left - bodyBounding.left - window.innerWidth / 2 + bounding.width / 2
      this.top = -(bounding.top - bodyBounding.top) + window.innerHeight / 2 - bounding.height / 2

      this.mesh.scale.set(bounding.width, bounding.height, 1)

      this.mesh.position.x = this.left
      const docScroll = window.pageYOffset || document.documentElement.scrollTop
      this.mesh.position.y = this.top + docScroll
    },
    bindScroll () {
      window.addEventListener('scroll', () => {
        const docScroll = window.pageYOffset || document.documentElement.scrollTop
        this.mesh.position.y = this.top + docScroll
      })

      this.$refs.image.addEventListener('mousemove', (e) => {
        console.log('mousemove !', { e, left: this.left, top: this.top })
        gsap.to(this.mouse, 0.5, {
          x: ((event.offsetX) / this.width) * 2 - 1,
          y: -((event.offsetY) / this.height) * 2 + 1
        })
        console.log(this.mouse)

        gsap.to(this.mesh.rotation, 0.5, {
          x: -this.mouse.y * 0.3,
          y: this.mouse.x * (Math.PI / 16)
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.image-3D {
  opacity: 0;
}
</style>
