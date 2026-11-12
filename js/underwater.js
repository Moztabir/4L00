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


// Mouse

const mouse = { x: 0, y: 0, lastMoved: -10000 }

window.addEventListener('mousemove', (event) => {
  // Change the page position into a scene position, where 0, 0 is the middle
  mouse.x = event.clientX - window.innerWidth / 2
  mouse.y = window.innerHeight / 2 - event.clientY
  mouse.lastMoved = performance.now()
})


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
    size,
    opacity: picture.material.opacity,
    popping: false,
    pushX: 0,
    pushY: 0,
    x: random(left, right),
    y: random(bottom, top),
    speed: 20 + size * 1.2,
    swayAmount: random(6, 22),
    swaySpeed: random(0.4, 1.1)
  })
}

function moveBubbles(seconds, time) {
  for (const bubble of bubbles) {
    // A popped bubble grows and fades away, then starts again at the bottom
    if (bubble.popping) {
      bubble.picture.scale.x += 150 * seconds
      bubble.picture.scale.y += 150 * seconds
      bubble.picture.material.opacity -= 4 * seconds

      if (bubble.picture.material.opacity <= 0) {
        bubble.popping = false
        bubble.picture.scale.set(bubble.size, bubble.size, 1)
        bubble.picture.material.opacity = bubble.opacity
        bubble.y = window.innerHeight // the check below sends it back to the bottom
      }
    }

    bubble.y += bubble.speed * seconds

    // Get pushed away from the mouse, harder the closer it gets
    const gapX = bubble.picture.position.x - mouse.x
    const gapY = bubble.picture.position.y - mouse.y
    const distance = Math.hypot(gapX, gapY) || 1 // the || 1 is so we never divide by 0
    const mouseIsMoving = performance.now() - mouse.lastMoved < 4000

    // It stops running once the mouse is touching it, so it can be caught
    const touching = distance < bubble.size / 2

    if (mouseIsMoving && distance < 100 && !touching) {
      const strength = 600 * (1 - distance / 100) * seconds
      bubble.pushX += (gapX / distance) * strength
      bubble.pushY += (gapY / distance) * strength
    }

    // The push slowly fades, like the water slowing it down
    bubble.pushX *= 1 - 2.4 * seconds
    bubble.pushY *= 1 - 2.4 * seconds

    bubble.x += bubble.pushX * seconds
    bubble.y += bubble.pushY * seconds

    // Goes back to the bottom after floating off the top
    if (bubble.y > window.innerHeight / 2 + 50) {
      bubble.y = -window.innerHeight / 2 - 50
      bubble.x = random(-window.innerWidth / 2, window.innerWidth / 2)
    }

    bubble.picture.position.x = bubble.x + Math.sin(time * bubble.swaySpeed) * bubble.swayAmount
    bubble.picture.position.y = bubble.y
  }
}


// Popping bubbles

const popCounter = document.querySelector('.pop-counter')
const popNumber = document.querySelector('.pop-counter_number')

let points = 0

function showPoints() {
  popNumber.textContent = points
  popCounter.hidden = points === 0
}

// Refreshing the page starts the count again from 0
if (performance.getEntriesByType('navigation')[0].type === 'reload') {
  sessionStorage.removeItem('bubblesPopped')
}

// Load the saved points every time the page shows, even when coming back with the back button
window.addEventListener('pageshow', () => {
  points = Number(sessionStorage.getItem('bubblesPopped')) || 0
  showPoints()
})

// pointerdown happens the moment the button is pressed, so the bubble can't move away first
window.addEventListener('pointerdown', (event) => {
  // Clicking a link or button shouldn't pop anything
  if (event.target.closest('a, button, summary')) return

  // Change the page position into a scene position, where 0, 0 is the middle
  const x = event.clientX - window.innerWidth / 2
  const y = window.innerHeight / 2 - event.clientY

  for (const bubble of bubbles) {
    // Only counts if the click is inside the bubble's circle
    const distance = Math.hypot(bubble.picture.position.x - x, bubble.picture.position.y - y)

    if (distance < bubble.size / 2 && !bubble.popping) {
      bubble.popping = true
      points += 1
      sessionStorage.setItem('bubblesPopped', points)
      showPoints()
      break // only one bubble per click
    }
  }
})


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

// Used to place the fish in a triangle: 1 fish in the first row, 2 in the next, and so on
let row = 0
let column = 0

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
    // Its spot in the triangle, nudged a little so it doesn't look too perfect
    spotX: (column - row / 2) * 45 + random(-12, 12),
    spotY: 60 - row * 32 + random(-10, 10),
    wave: random(0, 6), // so each fish bobs at a different time
    flip: 1
  })

  // Move to the next spot, and start a new row once this one is full
  column += 1
  if (column > row) {
    row += 1
    column = 0
  }
}

function moveFish(seconds, time) {
  // The whole group follows this slow looping path
  let groupX = Math.sin(time * 0.17) * window.innerWidth * 0.38
  let groupY = Math.sin(time * 0.29 + 1) * window.innerHeight * 0.32

  // Follow the mouse instead if it moved in the last 4 seconds
  if (performance.now() - mouse.lastMoved < 4000) {
    groupX = mouse.x
    groupY = mouse.y
  }

  for (const fish of allFish) {
    const position = fish.picture.position

    // Bob gently up and down while swimming
    const bob = Math.sin(time * 1.5 + fish.wave) * 8

    // Speed up toward its spot in the group
    fish.speedX += (groupX + fish.spotX - position.x) * 1.5 * seconds
    fish.speedY += (groupY + fish.spotY + bob - position.y) * 1.5 * seconds

    // The water slows it down a little
    fish.speedX *= 1 - 2 * seconds
    fish.speedY *= 1 - 2 * seconds

    position.x += fish.speedX * seconds
    position.y += fish.speedY * seconds

    // Point the fish the way it's swimming
    fish.picture.rotation.z = Math.atan2(fish.speedY, fish.speedX)

    // Turn around slowly when swimming left so the belly stays down
    const facing = fish.speedX < 0 ? -1 : 1
    fish.flip += (facing - fish.flip) * 0.1
    fish.picture.scale.y = fish.size * fish.flip
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
