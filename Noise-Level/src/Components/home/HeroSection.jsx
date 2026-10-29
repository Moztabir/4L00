import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default function HeroSection() {
  return (
    <section id="home" className="bg-light py-5">
      <Container className="text-center py-5">
        <h1 className="display-4">
          Welcome to Noise Level
        </h1>

        <p className="lead mt-3">
          Dive into a new underwater adventure.
        </p>

        <Button variant="primary" href="#story">
          Explore Our Game
        </Button>
      </Container>
    </section>
  )
}

