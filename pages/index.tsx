import { FC } from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import { home } from '../content'
import Container from '../components/Container'
import Hero from '../components/Hero'
import HomeNav from '../components/HomeNav'
import FeatureSection from '../components/FeatureSection'

const Home: FC<{ content: { hero: any; features: any[] } }> = ({ content }) => {
  return (
    <Pane>
      <header>
        <HomeNav />
        <Container>
          <Hero content={content.hero} />
        </Container>
      </header>
      <main>
        {content.features.map((feature, i) => (
          <FeatureSection
            key={feature.title}
            title={feature.title}
            body={feature.body}
            image="/docs.png"
            invert={i % 2 === 0}
          />
        ))}
      </main>
      <footer>
        <Pane background="overlay" paddingY={majorScale(9)}>
          <Container>hello</Container>
        </Pane>
      </footer>
    </Pane>
  )
}

Home.defaultProps = {
  content: {
    features: [{ title: 'default feature', body: 'default body' }],
    hero: { title: 'default title', body: 'default body' },
  },
}

export function getStaticProps(ctx) {
  return {
    props: {
      content: ctx.preview ? home.draft : home.published,
    },
  }
}

export default Home
