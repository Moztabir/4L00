const artworks = [
  {
    title: 'Noise Level Logo',
    artist: 'Vinny',
    image: './assets/artWork/PFP.png'
  },
  {
    title: 'Fish n Guppies Logo',
    artist: 'Vinny',
    image: './assets/artWork/FG logo.PNG'
  },
  {
    title: 'Blue Fish',
    artist: 'Carter',
    image: './assets/artWork/BlueFish.png'
  },
  {
    title: 'Hermit Crab',
    artist: 'Carter',
    image: './assets/artWork/Harmit.png'
  },
  {
    title: 'Environment Concept Art',
    artist: 'Noah',
    image: './assets/artWork/Environment.png '
  },
  {
    title: 'Dumbo Octopus',
    artist: 'Unknown',
    image: './assets/artWork/DumboAngled.png'
  }
]

const galleryGrid = document.getElementById('gallery-grid')

artworks.forEach((artwork, index) => {


  const card = document.createElement(
    artwork.image ? 'a' : 'article'
  )

  card.className = 'gallery-card'

  if (artwork.image) {

    card.href = artwork.image
    card.target = '_blank'
    card.rel = 'noopener noreferrer'

    card.setAttribute(
      'aria-label',
      `View ${artwork.title} by ${artwork.artist}`
    )

    const image = document.createElement('img')
    image.src = artwork.image
    image.alt = `${artwork.title}, by ${artwork.artist}`
    image.loading = index < 3 ? 'eager' : 'lazy'
    image.decoding = 'async'

    card.appendChild(image)

  } else {

    const placeholder = document.createElement('span')

    placeholder.className = 'gallery-placeholder'
    placeholder.textContent = 'ARTWORK COMING SOON'

    card.appendChild(placeholder)
  }

  const caption = document.createElement('div')
  caption.className = 'gallery-caption'
  const title = document.createElement('h3')
  title.textContent = artwork.title
  const artist = document.createElement('p')
  artist.textContent = `By ${artwork.artist}`

  caption.append(title, artist)

  card.appendChild(caption)
  galleryGrid.appendChild(card)

})
