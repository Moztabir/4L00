const leadership = [
  {
    name: 'Alysha',
    role: 'Producer',
    bio: 'I am a producer and project manager. I help the team stay organized and on track to meet our goals.',
    photo: './assets/images/team/10_29_26_Alysha_Portrait.jpg'
  },
  {
    name: 'Matteo',
    role: 'Creative Director',
    bio: 'I am the Creative Director. I guide the artistic vision and overall creative direction of our game.',
    photo: './assets/images/team/10_29_26_Matteo_Portrait.jpg'
  },
  {
    name: 'Grayson',
    role: 'Tech Lead',
    bio: 'I oversee the technical aspects of our game development process.',
    photo: './assets/images/team/10_29_26_Grayson_Portrait.jpg'
  }
]

const departments = [
  {
    name: 'Art',

    lead: {
      name: 'Amy',
      role: 'Art Lead',
      bio: 'I oversee the art team and ensure that our game has a cohesive and visually appealing aesthetic.',
      photo: './assets/images/team/10_29_26_Amy_Portrait.jpg'
    },

    members: [
      {
        name: 'Stanlee',
        role: 'Artist',
        bio: 'I am a 3D artist. I create 3D models and assets for our game, bringing our world to life.',
        photo: './assets/images/team/10_29_26_Stanlee_Portrait.jpg'
      },
      {
        name: 'Noah',
        role: 'Artist',
        bio: 'I am an artist. I create concept art and UI elements for our game.',
        photo: './assets/images/team/10_29_26_Noah_Portrait.jpg'
      },
      {
        name: 'Nathan',
        role: 'Art Team',
        bio: 'I am an artist. I create concept art and UI elements for our game.',
        photo: './assets/images/team/10_29_26_Nathan_Portrait.jpg'
      },
      {
        name: 'Vinny',
        role: 'Art Team',
        bio: 'I am an artist. I create concept art and UI elements for our game.',
        photo: './assets/images/team/10_29_26_Vinny_Portrait.jpg'
      },
      {
        name: 'Carter',
        role: 'Art Team',
        bio: 'I am an artist. I create concept art and UI elements for our game.',
        photo: './assets/images/team/10_29_26_Carter_Portrait.jpg'
      }
    ]
  },

  {
    name: 'Design',

    lead: {
      name: 'Brad',
      role: 'Design Lead',
      bio: 'I oversee the design team and ensure that our game has a cohesive and engaging user experience.',
      photo: './assets/images/team/10_29_26_Brad_Portrait.jpg'
    },

    members: []
  },

  {
    name: 'Narrative',

    lead: {
      name: 'Ya’el',
      role: 'Narrative Lead',
      bio: 'I oversee the narrative team and ensure that our game has a compelling and well-structured story.',
      photo: './assets/images/team/10_29_26_Ya_el_Portrait.jpg'
    },

    members: [
      {
        name: 'Griffin',
        role: 'Narrative Team',
        bio: 'I am a narrative designer. I help create the story and dialogue for our game.',
        photo: './assets/images/team/10_29_26_Griffin_Portrait.jpg'
      }
    ]
  },

  {
    name: 'Marketing',

    lead: {
      name: 'Moztabir',
      role: 'Marketing Lead',
      bio: 'Coordinates studio marketing, promotional materials, and the LevelUp showcase strategy.',
      photo: './assets/images/team/10_29_26_Moztabir_Portrait.jpg'
    },

    members: [
      {
        name: 'Dimple',
        role: 'Marketing Team',
        bio: 'I am a marketing team member. I help with social media, promotional materials, and community engagement.',
        photo: './assets/images/team/10_29_26_Dimple_Portrait.jpg'
      },
      {
        name: 'Shayan',
        role: 'Marketing Team',
        bio: 'I am a marketing team member. I help with social media, promotional materials, and community engagement.',
        photo: './assets/images/team/10_29_26_Shayan_Portrait.jpg'
      },
      {
        name: 'Megan',
        role: 'Marketing Team',
        bio: 'I am a marketing team member. I help with social media, promotional materials, and community engagement.',
        photo: './assets/images/team/10_29_26_Megan_Portrait.jpg'
      },
      {
        name: 'Danielle',
        role: 'Marketing Team',
        bio: 'I am a marketing team member. I help with social media, promotional materials, and community engagement.',
        photo: './assets/images/team/10_29_26_Danielle_Portrait.jpg'
      },
      {
        name: 'Tomas',
        role: 'Marketing Team',
        bio: 'I am a marketing team member. I help with social media, promotional materials, and community engagement.',
        photo: './assets/images/team/10_29_26_Tomas_Portrait.jpg'
      }
    ]
  },

  {
    name: 'Sound',

    lead: {
      name: 'Kylan',
      role: 'Sound Lead',
      bio: 'I oversee the audio team and ensure that our game has a compelling and immersive sound design.',
      photo: './assets/images/team/10_29_26_Kylan_Portrait.jpg'
    },

    members: []
  },

  {
    name: 'Programming',

    lead: {
      name: 'Emily',
      role: 'Programming Lead',
      bio: 'I oversee the programming team and ensure that our game has a solid and efficient codebase.',
      photo: './assets/images/team/10_29_26_Emily_Portrait.jpg'
    },

    members: [
      {
        name: 'Cadence',
        role: 'Programming Team',
        bio: 'I am a programmer. I help implement game mechanics and features, and ensure that our game runs smoothly.',
        photo: './assets/images/team/10_29_26_Cadence_Portrait.jpg'
      }
    ]
  }
]

function createElement(tag, className, text) {
  const element = document.createElement(tag)

  if (className) {
    element.className = className
  }

  if (text !== undefined) {
    element.textContent = text
  }

  return element
}

function getInitials(name) {
  const number = name.match(/\d+$/)

  if (number) {
    return number[0]
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

function createAvatar(member) {
  const avatar = createElement(
    'div',
    'member-avatar'
  )

  const initials = createElement(
    'span',
    'avatar-initials',
    getInitials(member.name)
  )

  initials.setAttribute('aria-hidden', 'true')
  avatar.appendChild(initials)

  if (member.photo) {
    const image = document.createElement('img')

    image.alt = `Portrait of ${member.name}`
    image.loading = 'lazy'
    image.decoding = 'async'

    image.onload = () => {
      avatar.classList.add('has-photo')
    }

    image.onerror = () => {
      console.warn(
        'Could not load portrait:',
        member.photo
      )

      image.remove()
    }

    avatar.appendChild(image)
    image.src = member.photo.trim()
  }

  return avatar
}

function createMemberCard(member, type = 'member') {
  const card = createElement(
    'article',
    `member-card member-card--${type}`
  )

  const avatar = createAvatar(member)

  const content = createElement(
    'div',
    'member-content'
  )

  const name = createElement(
    'h4',
    'member-name',
    member.name
  )

  const role = createElement(
    'p',
    'member-role',
    member.role
  )

  const bio = createElement(
    'p',
    'member-bio',
    member.bio
  )

  content.append(name, role, bio)
  card.append(avatar, content)

  const hoverEnabled = window.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
  ).matches

  if (hoverEnabled) {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect()

      const x = (
        (event.clientX - rect.left) / rect.width
      ) * 100

      const y = (
        (event.clientY - rect.top) / rect.height
      ) * 100

      card.style.setProperty('--glow-x', `${x}%`)
      card.style.setProperty('--glow-y', `${y}%`)
    })

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--glow-x', '50%')
      card.style.setProperty('--glow-y', '0%')
    })
  }

  return card
}


function createDepartmentPanel(department, index) {
  const panel = createElement(
    'section',
    'department-panel'
  )

  const heading = createElement(
    'div',
    'department-heading'
  )

  const headingId = `department-${index + 1}`
  panel.setAttribute('aria-labelledby', headingId)

  const title = createElement(
    'h3',
    '',
    department.name
  )

  title.id = headingId

  const number = createElement(
    'span',
    'department-number',
    String(index + 1).padStart(2, '0')
  )

  heading.append(title, number)

  const leadCard = createMemberCard(
    department.lead,
    'lead'
  )

  panel.append(heading, leadCard)

  const members = Array.isArray(department.members)
    ? department.members
    : []

  if (members.length > 0) {
    const membersGrid = createElement(
      'div',
      'department-members'
    )

    members.forEach(member => {
      membersGrid.appendChild(
        createMemberCard(member, 'member')
      )
    })

    panel.appendChild(membersGrid)
  }

  return panel
}


function renderTeam() {

  const leadershipGrid = document.getElementById('leadership-grid')
  const leadsGrid = document.getElementById('leads-grid')
  const membersGrid = document.getElementById('members-grid')

  leadership.forEach(person => {
    leadershipGrid.appendChild(createMemberCard(person, 'executive'))
  })

  departments.forEach(department => {
    if (department.lead) {
      leadsGrid.appendChild(createMemberCard(department.lead, 'lead'))
    }
  })

  departments.forEach(department => {
    department.members.forEach(person => {
      membersGrid.appendChild(createMemberCard(person, 'member'))
    })
  })

}

renderTeam()
