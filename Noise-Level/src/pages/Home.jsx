
import Container from 'react-bootstrap/Container'

import Header from '../Components/layout/Header.jsx'
import Footer from '../Components/layout/Footer.jsx'

import HeroSection from '../Components/home/HeroSection.jsx'
import StorySection from '../Components/home/StorySection.jsx'

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />

        <StorySection />

        <section id="about" className="py-5">
          <Container>
            <h2>About Noise Level</h2>

            <p>
              Noise Level is a student game
              development studio focused on
              creating interactive experiences.
            </p>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  )
}
