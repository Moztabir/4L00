
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'

export default function StorySection() {
  return (
    <>
      <section id="story" className="py-5">
        <Container>
          <h2>Our Game</h2>

          <p>
            We are developing a third-person
            underwater adventure game featuring
            a young merfolk shepherd.
          </p>

          <p>
            Explore underwater environments,
            solve puzzles, and experience
            a story about finding your way home.
          </p>
        </Container>
      </section>

      <section id="faq" className="bg-light py-5">
        <Container>
          <h2 className="mb-4">
            Frequently Asked Questions
          </h2>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                What is Noise Level?
              </Accordion.Header>
              <Accordion.Body>
                Noise Level is a student
                game development studio.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                What type of game are you making?
              </Accordion.Header>
              <Accordion.Body>
                A third-person underwater
                adventure and puzzle game.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>
                When will the game release?
              </Accordion.Header>
              <Accordion.Body>
                April 3rd, 2027 yay
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>
    </>
  )
}
