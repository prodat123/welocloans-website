import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faBolt,
  faHeadset,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    num: '01',
    title: 'Apply in Minutes',
    desc: 'Fill out our simple online application. No paperwork stack, no branch visit required. Takes about 10 minutes.',
  },
  {
    num: '02',
    title: 'Get Pre-Approved',
    desc: "We review your finances and issue a pre-approval letter so you can shop with confidence and credibility.",
  },
  {
    num: '03',
    title: 'Lock Your Rate',
    desc: "Once you've found your home, we lock in your rate and guide you through underwriting with full transparency.",
  },
  {
    num: '04',
    title: 'Close & Move In',
    desc: "We coordinate with title and escrow to get you to closing day smoothly. Then it's time to celebrate.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">The Process</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-lg text-slate-500 max-w-xl">
            Getting a mortgage doesn't have to be complicated. Here's how we make it easy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div key={step.num} className="relative group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-gradient-to-r from-blue-200 to-transparent z-0" />
              )}
              <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-card hover:border-blue-300 hover:shadow-card-hover transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center mb-5 shadow-sm">
                  <span className="text-white font-extrabold text-sm">{step.num}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: faShieldHalved, label: 'Bank-Level Security', tile: 'bg-blue-50 text-blue-700' },
            { icon: faBolt, label: 'Fast Decisions', tile: 'bg-amber-50 text-amber-600' },
            { icon: faHeadset, label: 'Dedicated Loan Officer', tile: 'bg-coral-50 text-coral-600' },
            { icon: faCertificate, label: 'NMLS Licensed', tile: 'bg-blue-50 text-blue-700' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 shadow-xs hover:shadow-sm transition-shadow">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.tile}`}>
                <FontAwesomeIcon icon={item.icon} className="text-sm" />
              </span>
              <span className="text-sm font-medium text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
