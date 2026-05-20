const loans = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    name: 'Conventional',
    tag: 'Most Popular',
    desc: 'Ideal for buyers with solid credit. Competitive rates with flexible down payment options starting at 3%.',
    highlights: ['Down payment as low as 3%', 'No upfront mortgage insurance', 'Loan limits up to $726,200'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    name: 'FHA Loan',
    tag: 'First-Time Buyers',
    desc: 'Government-backed loan with relaxed credit requirements — great for first-time homebuyers.',
    highlights: ['Down payment as low as 3.5%', 'Credit scores from 580+', 'Competitive interest rates'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    name: 'VA Loan',
    tag: 'Veterans & Military',
    desc: 'Zero down payment for eligible veterans and active-duty service members. No PMI required.',
    highlights: ['0% down payment', 'No private mortgage insurance', 'No prepayment penalty'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    name: 'Jumbo Loan',
    tag: 'High-Value Homes',
    desc: 'Finance luxury or high-cost properties that exceed conforming loan limits with tailored terms.',
    highlights: ['Loan amounts over $726,200', 'Competitive jumbo rates', 'Flexible repayment terms'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
      </svg>
    ),
    name: 'Refinance',
    tag: 'Lower Your Rate',
    desc: 'Reduce your monthly payment, tap home equity, or shorten your loan term with a streamlined refi.',
    highlights: ['Rate & term refinance', 'Cash-out refinance', 'Streamline options available'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    name: 'HELOC',
    tag: 'Tap Your Equity',
    desc: 'Access your home equity as a revolving credit line — ideal for renovations or consolidating debt.',
    highlights: ['Flexible draw period', 'Interest-only payment options', 'Competitive variable rates'],
  },
]

export default function Loans() {
  return (
    <section id="loans" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">Loan Programs</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Find the right loan for you
          </h2>
          <p className="text-lg text-slate-500 max-w-xl">
            We offer a full range of mortgage solutions to match your unique financial situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loans.map(loan => (
            <div
              key={loan.name}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 group-hover:bg-blue-100 transition-colors">
                  {loan.icon}
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                  {loan.tag}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">{loan.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">{loan.desc}</p>

              <ul className="space-y-1.5">
                {loan.highlights.map(h => (
                  <li key={h} className="flex items-center gap-2 text-xs text-slate-600">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2a7c8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
