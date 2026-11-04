// Three.js (MIT License) by the three.js authors - https://threejs.org/
// It's loaded from jsDelivr, the link is in index.html
import * as THREE from 'three'


// Setup

const scene = new THREE.Scene()

const camera = new THREE.OrthographicCamera()
camera.position.z = 150
camera.far = 300

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // keeps it sharp on retina screens
document.getElementById('underwater-bg').appendChild(renderer.domElement)

// Keeps the scene the same size as the screen, with 0, 0 in the middle
function resize() {
  camera.left = -window.innerWidth / 2
  camera.right = window.innerWidth / 2
  camera.top = window.innerHeight / 2
  camera.bottom = -window.innerHeight / 2
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight, false)
}

resize()
window.addEventListener('resize', resize)

function loadImage(name) {
  const image = new THREE.TextureLoader().load(`./assets/svg/${name}.svg`)
  image.colorSpace = THREE.SRGBColorSpace
  return image
}

function random(min, max) {
  return min + Math.random() * (max - min)
}

const left = -window.innerWidth / 2
const right = window.innerWidth / 2
const top = window.innerHeight / 2
const bottom = -window.innerHeight / 2
const isPhone = window.innerWidth < 700


// Bubbles

const bubbleImage = loadImage('bubble')
const bubbles = []
const bubbleCount = isPhone ? 16 : 34

for (let i = 0; i < bubbleCount; i++) {
  const size = random(10, 44)

  const picture = new THREE.Sprite(new THREE.SpriteMaterial({
    map: bubbleImage,
    transparent: true,
    opacity: 0.35 + size / 70,
    depthWrite: false
  }))

  picture.scale.set(size, size, 1)
  picture.position.z = 100
  scene.add(picture)

  bubbles.push({
    picture,
    x: random(left, right),
    y: random(bottom, top),
    speed: 20 + size * 1.2,
    swayAmount: random(6, 22),
    swaySpeed: random(0.4, 1.1)
  })
}

function moveBubbles(seconds, time) {
  for (const bubble of bubbles) {
    bubble.y += bubble.speed * seconds

    // Goes back to the bottom after floating off the top
    if (bubble.y > window.innerHeight / 2 + 50) {
      bubble.y = -window.innerHeight / 2 - 50
      bubble.x = random(-window.innerWidth / 2, window.innerWidth / 2)
    }

    bubble.picture.position.x = bubble.x + Math.sin(time * bubble.swaySpeed) * bubble.swayAmount
    bubble.picture.position.y = bubble.y
  }
}


// Fish

const fishShape = new THREE.PlaneGeometry(60, 26)

function fishMaterial(name) {
  return new THREE.MeshBasicMaterial({
    map: loadImage(name),
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  })
}

const orangeFish = fishMaterial('fish-orange')
const redFish = fishMaterial('fish-red')

const allFish = []
const fishCount = isPhone ? 7 : 13

for (let i = 0; i < fishCount; i++) {
  const material = i % 2 === 0 ? orangeFish : redFish
  const picture = new THREE.Mesh(fishShape, material)
  const size = random(0.65, 1.15)

  picture.position.set(random(left, right), random(bottom, top), i * 5)
  picture.scale.set(size, size, 1)
  scene.add(picture)

  allFish.push({
    picture,
    size,
    speedX: random(-60, 60),
    speedY: random(-40, 40),
    spotX: random(-110, 110), // each fish has its own spot in the group
    spotY: random(-70, 70)
  })
}

function moveFish(seconds, time) {
  // The whole group follows this slow looping path
  const groupX = Math.sin(time * 0.17) * window.innerWidth * 0.38
  const groupY = Math.sin(time * 0.29 + 1) * window.innerHeight * 0.32

  for (const fish of allFish) {
    const position = fish.picture.position

    // Speed up toward its spot in the group
    fish.speedX += (groupX + fish.spotX - position.x) * 1.5 * seconds
    fish.speedY += (groupY + fish.spotY - position.y) * 1.5 * seconds

    // The water slows it down a little
    fish.speedX *= 1 - 0.9 * seconds
    fish.speedY *= 1 - 0.9 * seconds

    position.x += fish.speedX * seconds
    position.y += fish.speedY * seconds

    // Point the fish the way it's swimming
    fish.picture.rotation.z = Math.atan2(fish.speedY, fish.speedX)

    // Flip it when swimming left so the belly stays down
    fish.picture.scale.y = fish.speedX < 0 ? -fish.size : fish.size
  }
}


// Animation

let lastTime = performance.now()

function animate(now) {
  requestAnimationFrame(animate)

  // Capped so nothing jumps after switching tabs
  const seconds = Math.min((now - lastTime) / 1000, 0.05)
  lastTime = now

  moveBubbles(seconds, now / 1000)
  moveFish(seconds, now / 1000)

  renderer.render(scene, camera)
}

requestAnimationFrame(animate)
