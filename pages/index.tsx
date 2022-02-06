import { Pane, majorScale } from 'evergreen-ui'
import Container from '../components/Container'
import Hero from '../components/Hero'
import HomeNav from '../components/HomeNav'
import FeatureSection from '../components/FeatureSection'

export default function Home() {
  return (
    <Pane>
      <header>
        <HomeNav />
        <Container>
          <Hero />
        </Container>
      </header>
      <main>
        <FeatureSection
          title="Record everything"
          body="blah blah blah blah blah blah blah blah blah blah blah blah"
          image="https://via.placeholder.com/300"
          invert
        />
        <FeatureSection
          title="Record everything"
          body="blah blah blah blah blah blah blah blah blah blah blah blah"
          image="https://via.placeholder.com/300"
        />
        <FeatureSection
          title="Record everything"
          body="blah blah blah blah blah blah blah blah blah blah blah blah"
          image="https://via.placeholder.com/300"
          invert
        />
      </main>
      <footer>
        <Pane background="overlay" paddingY={majorScale(9)}>
          <Container>Footer</Container>
        </Pane>
      </footer>
    </Pane>
  )
}