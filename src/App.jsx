import { MotionConfig } from 'framer-motion'
import useSmoothScroll from './hooks/useSmoothScroll'
import Navbar from './sections/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import WhyGo from './sections/WhyGo/WhyGo'
import Theme from './sections/Theme/Theme'
import Passes from './sections/Passes/Passes'
import Venue from './sections/Venue/Venue'
import Faq from './sections/Faq/Faq'
import Speakers from './sections/Speakers/Speakers'
import Footer from './sections/Footer/Footer'

export default function App() {
  useSmoothScroll()

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <WhyGo />
        <Theme />
        <Passes />
        <Venue />
        <Faq />
        <Speakers />
      </main>
      <Footer />
    </MotionConfig>
  )
}
