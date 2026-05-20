import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 4) return digits
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

type FormData = {
  loanType: string
  homeDescription: string
  creditProfile: string
  propertyUse: string
  propertyLocation: string
  purchasePrice: string
  downPayment: string
  rateType: string
  employmentStatus: string
  hasBankruptcy: string
  name: string
  email: string
  phone: string
  dob: string
}

const initial: FormData = {
  loanType: '', homeDescription: '', creditProfile: '', propertyUse: '',
  propertyLocation: '', purchasePrice: '', downPayment: '', rateType: '',
  employmentStatus: '', hasBankruptcy: '', name: '', email: '', phone: '', dob: '',
}

function OptionCard({
  icon, label, sub, selected, onClick,
}: { icon: string; label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all ${
        selected
          ? 'border-blue-600 bg-blue-50 text-blue-700'
          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
      }`}
    >
      <span className="text-xl shrink-0">{icon}</span>
      <div>
        <p className="text-sm font-semibold leading-snug">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
      {selected && (
        <span className="ml-auto shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
          <FontAwesomeIcon icon={faCheck} className="text-white text-[9px]" />
        </span>
      )}
    </button>
  )
}

function TextInput({ label, type = 'text', placeholder, value, onChange }: {
  label: string; type?: string; placeholder: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  )
}

type StepDef = {
  title: string
  subtitle: string
  field?: keyof FormData
  isValid: (f: FormData) => boolean
  render: (f: FormData, set: (k: keyof FormData, v: string) => void) => React.ReactNode
}

const steps: StepDef[] = [
  {
    title: "What type of loan are you looking for?",
    subtitle: "Pick the one that best fits your situation. Not sure? Just choose the last option.",
    field: 'loanType',
    isValid: f => !!f.loanType,
    render: (f, set) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {[
          { icon: '🏠', label: 'Purchase', sub: 'Buying a new home' },
          { icon: '🔄', label: 'Refinance', sub: 'Replace my current loan' },
          { icon: '🏛️', label: 'FHA Loan', sub: 'Low down payment option' },
          { icon: '🎖️', label: 'VA Loan', sub: 'For veterans & military' },
          { icon: '💎', label: 'Jumbo Loan', sub: 'High-value homes' },
          { icon: '🏦', label: 'HELOC', sub: 'Tap my home equity' },
          { icon: '🤷', label: "Not Sure", sub: "Help me figure it out" },
        ].map(o => (
          <OptionCard key={o.label} {...o} selected={f.loanType === o.label} onClick={() => set('loanType', o.label)} />
        ))}
      </div>
    ),
  },
  {
    title: "What type of home is it?",
    subtitle: "Tell us about the property you're looking to buy.",
    field: 'homeDescription',
    isValid: f => !!f.homeDescription,
    render: (f, set) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {[
          { icon: '🏡', label: 'Single Family Home', sub: 'Standalone house' },
          { icon: '🏢', label: 'Condo / Townhouse', sub: 'Shared building or complex' },
          { icon: '🏘️', label: 'Multi-Family (2–4 units)', sub: 'Duplex, triplex, or fourplex' },
          { icon: '🚐', label: 'Manufactured / Mobile', sub: 'Factory-built home' },
          { icon: '🤷', label: "Not Sure Yet", sub: 'Still looking around' },
        ].map(o => (
          <OptionCard key={o.label} {...o} selected={f.homeDescription === o.label} onClick={() => set('homeDescription', o.label)} />
        ))}
      </div>
    ),
  },
  {
    title: "How would you describe your credit?",
    subtitle: "This helps us find programs that fit your profile. We don't pull your credit here.",
    field: 'creditProfile',
    isValid: f => !!f.creditProfile,
    render: (f, set) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {[
          { icon: '🌟', label: 'Excellent', sub: '740 or above' },
          { icon: '😊', label: 'Good', sub: '680 – 739' },
          { icon: '🙂', label: 'Fair', sub: '620 – 679' },
          { icon: '😟', label: 'Needs Work', sub: 'Below 620' },
          { icon: '🤷', label: "I Don't Know", sub: "Haven't checked recently" },
        ].map(o => (
          <OptionCard key={o.label} {...o} selected={f.creditProfile === o.label} onClick={() => set('creditProfile', o.label)} />
        ))}
      </div>
    ),
  },
  {
    title: "How will you use this property?",
    subtitle: "This affects your loan options and the programs available to you.",
    field: 'propertyUse',
    isValid: f => !!f.propertyUse,
    render: (f, set) => (
      <div className="grid grid-cols-1 gap-2.5">
        {[
          { icon: '🏠', label: 'Primary Residence', sub: "I'll live here full-time — this is my main home" },
          { icon: '🏖️', label: 'Second Home', sub: "Vacation or seasonal property — I'll visit periodically" },
          { icon: '💰', label: 'Investment Property', sub: "I'll rent it out to tenants" },
        ].map(o => (
          <OptionCard key={o.label} {...o} selected={f.propertyUse === o.label} onClick={() => set('propertyUse', o.label)} />
        ))}
      </div>
    ),
  },
  {
    title: "Where is the property located?",
    subtitle: "City and state help us match you with the right local programs.",
    field: 'propertyLocation',
    isValid: f => f.propertyLocation.trim().length > 2,
    render: (f, set) => (
      <div className="space-y-4 max-w-sm">
        <TextInput label="City & State" placeholder="e.g. Santa Ana, CA" value={f.propertyLocation} onChange={v => set('propertyLocation', v)} />
        <p className="text-xs text-slate-400">If you haven't found a property yet, enter the city you're searching in.</p>
      </div>
    ),
  },
  {
    title: "Purchase price & down payment",
    subtitle: "Give us your best estimate — you can adjust this later.",
    isValid: f => f.purchasePrice.length > 0 && f.downPayment.length > 0,
    render: (f, set) => (
      <div className="space-y-4 max-w-sm">
        <TextInput label="Estimated Purchase Price" type="text" placeholder="e.g. $450,000" value={f.purchasePrice} onChange={v => set('purchasePrice', v)} />
        <TextInput label="Estimated Down Payment" type="text" placeholder="e.g. $15,000 or 3.5%" value={f.downPayment} onChange={v => set('downPayment', v)} />
        <p className="text-xs text-slate-400">Don't have these numbers yet? Just write your best guess — it won't lock you in.</p>
      </div>
    ),
  },
  {
    title: "What type of interest rate do you prefer?",
    subtitle: "Not sure? Fixed is the most common choice for first-time buyers.",
    field: 'rateType',
    isValid: f => !!f.rateType,
    render: (f, set) => (
      <div className="grid grid-cols-1 gap-2.5">
        {[
          { icon: '🔒', label: 'Fixed Rate', sub: 'Same payment every month for the life of the loan — no surprises' },
          { icon: '📈', label: 'Adjustable Rate (ARM)', sub: 'Lower to start, then adjusts periodically — good if you plan to sell or refi soon' },
          { icon: '🤷', label: "Not Sure", sub: "Walk me through the options" },
        ].map(o => (
          <OptionCard key={o.label} {...o} selected={f.rateType === o.label} onClick={() => set('rateType', o.label)} />
        ))}
      </div>
    ),
  },
  {
    title: "Employment & financial history",
    subtitle: "This helps us find the right loan products for your situation.",
    isValid: f => !!f.employmentStatus && !!f.hasBankruptcy,
    render: (f, set) => (
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2.5">Current employment status</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { icon: '💼', label: 'Employed (W-2)', sub: 'Receive a regular paycheck' },
              { icon: '🧾', label: 'Self-Employed / 1099', sub: 'Freelance, business owner' },
              { icon: '🌴', label: 'Retired', sub: 'On fixed or pension income' },
              { icon: '🔍', label: 'Other / Unemployed', sub: 'Currently between jobs' },
            ].map(o => (
              <OptionCard key={o.label} {...o} selected={f.employmentStatus === o.label} onClick={() => set('employmentStatus', o.label)} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2.5">Any bankruptcies in the past 7 years?</p>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: '✅', label: 'No', sub: 'Clean record' },
              { icon: '📋', label: 'Yes', sub: "I'll explain more later" },
            ].map(o => (
              <OptionCard key={o.label} {...o} selected={f.hasBankruptcy === o.label} onClick={() => set('hasBankruptcy', o.label)} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Last step — how can we reach you?",
    subtitle: "A loan officer will follow up within one business day. No spam, ever.",
    isValid: f => f.name.trim().length > 1 && f.email.includes('@') && f.phone.replace(/\D/g, '').length === 10 && f.dob.length >= 8,
    render: (f, set) => (
      <div className="space-y-4 max-w-sm">
        <TextInput label="Full Name" type="text" placeholder="Jane Smith" value={f.name} onChange={v => set('name', v)} />
        <TextInput label="Email Address" type="email" placeholder="you@example.com" value={f.email} onChange={v => set('email', v)} />
        <TextInput label="Phone Number" type="tel" placeholder="(555) 000-0000" value={f.phone} onChange={v => set('phone', formatPhone(v))} />
        <TextInput label="Date of Birth" type="date" placeholder="MM/DD/YYYY" value={f.dob} onChange={v => set('dob', v)} />
        <p className="text-xs text-slate-400">Your date of birth is used only for identity verification purposes.</p>
      </div>
    ),
  },
]

export default function GetStartedModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [sliding, setSliding] = useState(false)
  const [visibleStep, setVisibleStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const set = (key: keyof FormData, value: string) => setFormData(f => ({ ...f, [key]: value }))

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(0)
        setVisibleStep(0)
        setFormData(initial)
        setSubmitted(false)
        setSliding(false)
        setSubmitError('')
        setLoading(false)
      }, 300)
    }
  }, [open])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const goTo = (next: number, dir: 'forward' | 'back') => {
    if (sliding) return
    setDirection(dir)
    setSliding(true)
    setTimeout(() => {
      setStep(next)
      setVisibleStep(next)
      setSliding(false)
    }, 280)
  }

  const canNext = steps[step]?.isValid(formData)

  const handleSubmit = async () => {
    if (!canNext || loading) return
    setLoading(true)
    setSubmitError('')

    const apiUrl = import.meta.env.VITE_API_URL
    const companyId = import.meta.env.VITE_COMPANY_ID

    try {
      const res = await fetch(`${apiUrl}/api/clients/${companyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          loanType: formData.loanType,
          homeDescription: formData.homeDescription,
          creditProfile: formData.creditProfile,
          propertyUse: formData.propertyUse,
          propertyLocation: formData.propertyLocation,
          purchasePrice: formData.purchasePrice,
          downPayment: formData.downPayment,
          rateType: formData.rateType,
          employmentStatus: formData.employmentStatus,
          hasBankruptcy: formData.hasBankruptcy,
        }),
      })

      // 409 means the client already exists — treat as success
      if (res.status === 409 || res.ok) {
        setSubmitted(true)
        return
      }

      const data = await res.json().catch(() => ({}))
      throw new Error(data.error ?? `Request failed (${res.status})`)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const progress = ((step + 1) / steps.length) * 100

  // Slide animation classes
  const enterClass = direction === 'forward'
    ? 'translate-x-8 opacity-0'
    : '-translate-x-8 opacity-0'
  const exitClass = direction === 'forward'
    ? '-translate-x-8 opacity-0'
    : 'translate-x-8 opacity-0'

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none`}
      >
        <div
          className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden pointer-events-auto transition-all duration-300 ${
            open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}
          onClick={e => e.stopPropagation()}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                <FontAwesomeIcon icon={faCheck} className="text-blue-700 text-2xl" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">You're all set!</h3>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
                We received your information. A loan officer will reach out to you at <strong>{formData.email}</strong> within one business day.
              </p>
              <button
                onClick={onClose}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="px-7 pt-6 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 mb-4 text-center">
                  <span className="text-xs text-slate-500">Prefer to talk?</span>
                  <a href="tel:+16263748775" className="text-xs font-bold text-blue-700 hover:underline">
                    Call (626) 374-8775
                  </a>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Step {step + 1} of {steps.length}
                  </span>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-sm" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Step content */}
              <div className="overflow-hidden">
                <div
                  className={`px-7 py-6 transition-all duration-280 ease-in-out ${sliding ? exitClass : 'translate-x-0 opacity-100'}`}
                  style={{ transitionDuration: '280ms' }}
                >
                  <h2 className="text-xl font-extrabold text-slate-900 mb-1.5 leading-snug">
                    {steps[visibleStep].title}
                  </h2>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    {steps[visibleStep].subtitle}
                  </p>

                  <div className="overflow-y-auto max-h-[42vh] pr-1">
                    {steps[visibleStep].render(formData, set)}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-7 py-5 border-t border-slate-100">
                {submitError && (
                  <p className="text-xs text-red-500 font-medium mb-3 text-center bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                    ⚠️ {submitError}
                  </p>
                )}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => goTo(step - 1, 'back')}
                    disabled={step === 0 || loading}
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                    Back
                  </button>

                  {step < steps.length - 1 ? (
                    <button
                      onClick={() => canNext && goTo(step + 1, 'forward')}
                      disabled={!canNext}
                      className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold px-6 py-2.5 rounded-xl transition-colors disabled:cursor-not-allowed"
                    >
                      Continue
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!canNext || loading}
                      className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold px-6 py-2.5 rounded-xl transition-colors disabled:cursor-not-allowed min-w-[110px] justify-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit
                          <FontAwesomeIcon icon={faCheck} className="text-xs" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
