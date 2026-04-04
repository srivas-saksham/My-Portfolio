import PageWrapper      from '@components/layout/PageWrapper'
import SEO             from '@components/seo/SEO'
import HeroSection     from '@components/home/HeroSection'
import FeaturedProjects from '@components/home/FeaturedProjects'
import { META }        from '@data/meta'

export default function HomePage() {
  return (
    <PageWrapper style={{ paddingTop: 0 }}>
      <SEO
        title={META.home.title}
        description={META.home.description}
      />
      <HeroSection />
      <FeaturedProjects />
    </PageWrapper>
  )
}