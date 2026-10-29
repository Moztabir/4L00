import Container from 'react-bootstrap/Container'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-4">
      <Container className="text-center">
        <h5>Noise Level</h5>

        <p>
          Creating an underwater adventure.
        </p>

        <small>
          © {new Date().getFullYear()} Noise Level.
          All rights reserved.
        </small>
      </Container>
    </footer>
  )
}
