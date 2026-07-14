import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const methods: {
  icon: IconDefinition;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}[] = [
  {
    icon: faPhone,
    label: "Call us",
    value: "(626) 569-1988",
    href: "tel:+16265691988",
  },
  {
    icon: faEnvelope,
    label: "Email us",
    value: "contact@welocloans.com",
    href: "mailto:contact@welocloans.com",
  },
  {
    icon: faLocationDot,
    label: "Visit us",
    value: "5948 Temple City Blvd, Temple City, CA 91780",
    href: "https://www.google.com/maps/search/?api=1&query=5948+Temple+City+Blvd+Temple+City+CA+91780",
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-transparent scroll-mt-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* CTA band */}
        <div className="relative overflow-hidden rounded-3xl bg-blue-700 px-8 py-14 lg:px-16 lg:py-16 shadow-lg text-center">
          {/* Ambient glow — teal + a warm coral corner */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-coral-500/30 blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-800/50 blur-3xl rounded-full" />

          <div className="relative">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-200 mb-3">
              Contact Us
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Ready when you are
            </h2>
            <p className="text-lg text-blue-100 leading-relaxed max-w-xl mx-auto mb-8">
              Whether you're buying your first home or refinancing, a loan officer
              is ready to help you find the best solution. No pressure, no
              obligation.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-blue-700 font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Get Started
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
              </Link>
              <a
                href="tel:+16265691988"
                className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faPhone} className="text-sm" />
                (626) 569-1988
              </a>
            </div>
          </div>
        </div>

        {/* Contact method cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {methods.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target={m.external ? "_blank" : undefined}
              rel={m.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-5 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <span className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 transition-colors">
                <FontAwesomeIcon icon={m.icon} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                  {m.label}
                </p>
                <p className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                  {m.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
