import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default function Footer() {
  return (
    <footer
      className="text-white py-4"
      style={{ backgroundColor: '#064663' }}
    >
      <Container className="text-center">
        <div className="mb-3">
          <a
            href="https://www.instagram.com/noiselevelstudios?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@noiselevelstudios?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            TikTok
          </a>
          <a
            href="https://www.linkedin.com/in/noise-level-brock-university-a0a78343a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            LinkedIn
          </a>
        </div>

        <div className="mb-3 d-flex justify-content-center gap-2">
          <Button
            variant="outline-light"
            size="sm"
            disabled
          >
            Terms and Conditions
          </Button>

          <Button
            variant="outline-light"
            size="sm"
            disabled
          >
            Privacy Policy
          </Button>
        </div>
      </Container>
    </footer>
  )
}