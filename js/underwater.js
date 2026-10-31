
import * as THREE from 'three'

const container = document.getElementById('underwater-bg')


const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(
  55,
  1,
  0.1,
  100
)

camera.position.z = 12


const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000000, 0)

container.appendChild(renderer.domElement)


function resizeScene() {
  const width = container.clientWidth
  const height = container.clientHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

resizeScene()
window.addEventListener('resize', resizeScene)


const geometry = new THREE.TorusGeometry(1, 0.09, 8, 32)

const material = new THREE.MeshBasicMaterial({
  color: 0xe6faff,
  transparent: true,
  opacity: 0.45,
  depthWrite: false
})

const bubbles = []

function getVisibleSize() {
  const height =
    2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) *
    camera.position.z

  return {
    width: height * camera.aspect,
    height
  }
}

for (let i = 0; i < 30; i++) {
  const bubble = new THREE.Mesh(geometry, material)
  const view = getVisibleSize()

  const scale = 0.1 + Math.random() * 0.25

  bubble.scale.setScalar(scale)

  bubble.position.set(
    (Math.random() - 0.5) * view.width,
    (Math.random() - 0.5) * view.height,
    Math.random() * 2 - 1
  )

  bubble.userData.speed = 0.3 + Math.random() * 0.5

  scene.add(bubble)
  bubbles.push(bubble)
}


const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)

  const delta = Math.min(clock.getDelta(), 0.05)
  const view = getVisibleSize()

  bubbles.forEach(bubble => {
    bubble.position.y += bubble.userData.speed * delta
    bubble.rotation.y += 0.2 * delta

    if (bubble.position.y > view.height / 2 + 1) {
      bubble.position.y = -view.height / 2 - 1
    }
  })

  renderer.render(scene, camera)
}


if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  renderer.render(scene, camera)
} else {
  animate()
}
