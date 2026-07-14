import Hero from '../components/Hero'
import Programs from '../components/Programs'
import LoanSolutions from '../components/LoanSolutions'
import Qualifier from '../components/Qualifier'
import Languages from '../components/Languages'
import CalculatorTeaser from '../components/CalculatorTeaser'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Reveal from '../components/Reveal'

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Programs & LoanSolutions animate their own cards in a cascade */}
      <Programs />
      <LoanSolutions />
      <Reveal><Qualifier /></Reveal>
      <Reveal><Languages /></Reveal>
      <Reveal><CalculatorTeaser /></Reveal>
      <Reveal><HowItWorks /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  )
}
