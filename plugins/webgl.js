import * as THREE from 'three'

export default (context, inject) => {
  const perspective = 800
  const scene = new THREE.Scene()
  let width = window.innerWidth
  let height = window.innerHeight
  let camera
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    failIfMajorPerformanceCaveat: true,
    powerPreference: 'high-performance'
  })
  renderer.setSize(width, height)
  // renderer.setClearColor(0xFFFFFF)
  renderer.setPixelRatio(window.devicePixelRatio)

  const initCamera = () => {
    const fov = (180 * (2 * Math.atan(height / 2 / perspective))) / Math.PI
    camera = new THREE.PerspectiveCamera(fov, width / height, 1, 10000)
    camera.position.set(0, 0, perspective)
    camera.updateProjectionMatrix()
  }

  const ambientlight = new THREE.AmbientLight(0xFFFFFF, 2)
  scene.add(ambientlight)

  initCamera()

  const update = () => {
    requestAnimationFrame(update)
    renderer.render(scene, camera)
  }
  update()

  window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight

    initCamera()
    renderer.setSize(width, height)
  })

  const webgl = {
    scene,
    camera,
    renderer
  }
  inject('webgl', webgl)
}
