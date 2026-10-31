import { MotionConfig } from 'framer-motion'
import useSmoothScroll from './hooks/useSmoothScroll'
import GridBackdrop from './components/GridBackdrop/GridBackdrop'
import Navbar from './sections/Navbar/Navbar'
import Hero from './sections/Hero/Hero'
import WhyGo from './sections/WhyGo/WhyGo'
import Theme from './sections/Theme/Theme'
import Speakers from './sections/Speakers/Speakers'
import Partners from './sections/Partners/Partners'
import Schedule from './sections/Schedule/Schedule'
import Passes from './sections/Passes/Passes'
import Venue from './sections/Venue/Venue'
import Faq from './sections/Faq/Faq'
import ContactForm from './sections/ContactForm/ContactForm'
import Footer from './sections/Footer/Footer'

// Section order follows the Canva file "OTG WEBSITE DESIGN".
export default function App() {
  useSmoothScroll()

  return (
    <MotionConfig reducedMotion="user">
      <GridBackdrop />
      <Navbar />
      <main className="page">
        <Hero />
        <WhyGo />
        <Theme />
        <Speakers />
        <Partners />
        <Schedule />
        <Passes />
        <Venue />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </MotionConfig>
  )
}
