import Hero from '../components/Hero'
import Programs from '../components/Programs'
import Qualifier from '../components/Qualifier'
import Languages from '../components/Languages'
import Calculator from '../components/Calculator'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Programs />
      <Qualifier />
      <Languages />
      <Calculator />
      <HowItWorks />
      <FAQ />
      <Contact />
    </main>
  )
}
