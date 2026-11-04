
export async function loadComponent(id, file) {
  const container = document.getElementById(id)

  if (!container) return

  const response = await fetch(file)

  if (!response.ok) {
    throw new Error(`Failed to load: ${file}`)
  }

  container.innerHTML = await response.text()
}


export function setupSound() {
  const WATER_VOLUME = 0.45

  const button = document.querySelector('.sound-button')
  const label = document.querySelector('.sound-button_text')

  const waterSound = new Audio('./assets/sound/Water%20Ambience%20Fixed%20Loop.mp3')
  waterSound.loop = true
  waterSound.volume = WATER_VOLUME

  let soundOn = false

  // Turns the water sound on or off when the button is clicked
  function toggleSound() {
    soundOn = !soundOn
    button.setAttribute('aria-pressed', soundOn) // the CSS uses this to pick the speaker icon
    label.textContent = soundOn ? 'Sound on' : 'Sound off'

    if (soundOn) {
      waterSound.play()
    } else {
      waterSound.pause()
    }
  }

  button.addEventListener('click', toggleSound)
}
