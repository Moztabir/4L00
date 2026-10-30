
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export default function Header() {
  return (
    

<Navbar
  bg="primary"
  data-bs-theme="dark"
  expand="lg"
  style={{
    fontFamily: "'Peralta', serif",
    fontWeight: 400
  }}
>
      <Container>
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center"
        >

          <span>Noise Level</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#story">Our Game</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
            <Nav.Link href="#faq">FAQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
