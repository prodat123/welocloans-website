import { faLetterboxd } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocation,
  faMailBulk,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  loanType: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    loanType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "phone" ? formatPhone(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    const apiUrl = import.meta.env.VITE_API_URL;
    const companyId = import.meta.env.VITE_COMPANY_ID;

    try {
      const res = await fetch(`${apiUrl}/api/clients/${companyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          loanType: form.loanType,
          message: form.message,
        }),
      });

      // 409 = client already exists, still treat as success
      if (res.status === 409 || res.ok) {
        setSubmitted(true);
        return;
      }

      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? `Request failed (${res.status})`);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors";

  return (
    <section id="contact" className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
              Contact Us
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Let's talk about
              <br />
              your loan
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              Whether you're buying your first home or refinancing, our loan
              officers are ready to help you find the best solution.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <FontAwesomeIcon icon={faPhone} />,
                  label: "Phone",
                  value: "(626) 374-8775",
                  href: "tel:+16263748775",
                },
                {
                  icon: <FontAwesomeIcon icon={faEnvelope} />,
                  label: "Email",
                  value: "contact@welocloans.com",
                  href: "mailto:contact@welocloans.com",
                },
                {
                  icon: <FontAwesomeIcon icon={faLocation} />,
                  label: "Office",
                  value: "5948 Temple City Blvd, Temple City, CA 91780",
                  href: "https://www.google.com/maps/search/?api=1&query=5948+Temple+City+Blvd+Temple+City+CA+91780",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Office" ? "_blank" : undefined}
                  rel={
                    item.label === "Office" ? "noopener noreferrer" : undefined
                  }
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-700 font-medium group-hover:text-blue-700 transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2a7c8a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Message Received!
                </h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  A loan officer will reach out to you within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-blue-700 text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-5">
                  Get a Free Consultation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    I'm interested in
                  </label>
                  <select
                    name="loanType"
                    value={form.loanType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select loan type...</option>
                    <option value="conventional">Conventional Loan</option>
                    <option value="fha">FHA Loan</option>
                    <option value="va">VA Loan</option>
                    <option value="jumbo">Jumbo Loan</option>
                    <option value="refinance">Refinance</option>
                    <option value="heloc">HELOC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Message (optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your situation..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {submitError && (
                  <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-center">
                    ⚠️ {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg mt-2 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p className="text-center text-[10px] text-slate-400">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
