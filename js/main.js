
import { loadComponent, setupSound } from './components.js'

async function initializeWebsite() {
  try {
    // Load Header and Footer
    await Promise.all([
      loadComponent('site-header', './components/header.html'),
      loadComponent('site-footer', './components/footer.html')
    ])

    // Initialize Mobile Navigation
    const menuButton = document.querySelector('.menu-toggle')
    const navLinks = document.querySelector('.nav-links')

    if (menuButton && navLinks) {
      menuButton.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open')
        menuButton.setAttribute(
          'aria-expanded',
          String(isOpen)
        )
      })

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('is-open')
          menuButton.setAttribute('aria-expanded', 'false')
        })
      })
    }

    // Copyright Year
    const yearElement = document.getElementById('year')

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }

  } catch (error) {
    console.error('Website initialization failed:', error)
  }

  setupSound()
}

initializeWebsite()