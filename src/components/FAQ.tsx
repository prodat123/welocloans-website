import { useState } from 'react'

const faqs = [
  {
    q: 'What counts as a "first-time homebuyer"?',
    a: "You're considered a first-time homebuyer if you haven't owned a primary residence in the past 3 years. Even if you've owned a home before, many previous homeowners still qualify for these programs.",
  },
  {
    q: 'How much money do I need to buy my first home?',
    a: "With first-time homebuyer programs, you may need very little. Sometimes $0. Programs like CalHFA Dream for All can cover up to 20% of the purchase price, and FHA loans require as little as 3.5% down. Closing costs can also be covered through assistance programs or seller credits.",
  },
  {
    q: 'What credit score do I need to qualify?',
    a: "Most first-time homebuyer programs require a minimum score of 620. FHA loans can go as low as 580 with a 3.5% down payment. If your score is below that, we can work with you on a plan to improve it. Sometimes within just a few months.",
  },
  {
    q: 'What is the CalHFA Dream for All program?',
    a: "CalHFA Dream for All is a shared appreciation loan from the California Housing Finance Agency. It covers up to 20% of your home's purchase price with no monthly payments on that portion. When you sell or refinance, CalHFA receives 20% of any appreciation. It's one of the most powerful programs available in California.",
  },
  {
    q: 'What is a "silent second mortgage"?',
    a: "A silent second mortgage is a loan that sits behind your primary mortgage with no monthly payment required. You repay it only when you sell the home, refinance, or pay off your first mortgage. Programs like LIPA and HOP use this structure to keep your monthly payments low.",
  },
  {
    q: 'Do the Santa Ana and Garden Grove programs have limited funds?',
    a: "Yes. Both city programs are funded annually and awarded on a first-come, first-served basis. Funds can run out mid-year. We recommend contacting us as soon as possible to check current availability and get your application ready.",
  },
  {
    q: 'What is a homebuyer education course and do I need one?',
    a: "A homebuyer education course is typically a 6 to 8 hour online class that covers budgeting, the purchase process, and homeownership responsibilities. CalHFA Dream for All requires it. We'll point you to an approved HUD provider. It's straightforward and worth it for the programs it unlocks.",
  },
  {
    q: 'How long does the homebuying process take?',
    a: "From application to closing typically takes 30 to 45 days once you're under contract. The pre-approval process with us takes just a few days. Getting pre-approved first puts you in a strong position when you find the right home.",
  },
  {
    q: 'Can I use these programs if I have student loans?',
    a: "Yes. Student loan debt doesn't disqualify you from these programs. Lenders look at your debt-to-income (DTI) ratio, so the key is that your total monthly debts including the new mortgage stay within acceptable limits. We'll run the numbers with you.",
  },
  {
    q: 'Is there a fee to talk to one of your loan officers?',
    a: "No. Our initial consultations are completely free. We'll review your situation, tell you which programs you qualify for, and give you a clear picture of your options with zero pressure.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">FAQ</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Common questions
          </h2>
          <p className="text-lg text-slate-500">
            Everything you want to know before getting started.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className={`bg-white border rounded-2xl overflow-hidden transition-all cursor-pointer select-none ${
                open === i ? 'border-blue-300 shadow-md' : 'border-slate-200'
              }`}
            >
              <div className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                <span className={`text-sm font-semibold leading-snug ${open === i ? 'text-blue-700' : 'text-slate-800'}`}>
                  {faq.q}
                </span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  open === i ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </div>

              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm mb-4">Still have questions? We're happy to help.</p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md">
            Talk to a Loan Officer
          </a>
        </div>
      </div>
    </section>
  )
}
