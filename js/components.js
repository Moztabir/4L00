
export async function loadComponent(id, file) {
  const container = document.getElementById(id)

  if (!container) return

  const response = await fetch(file)

  if (!response.ok) {
    throw new Error(`Failed to load: ${file}`)
  }

  container.innerHTML = await response.text()
}
