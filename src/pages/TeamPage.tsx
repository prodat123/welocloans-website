import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import warrenImg from "../Picture - Warren.jpg";

const team = [
  {
    name: "Warren Chan",
    title: "Senior Loan Originator",
    phone: "(626) 374-8775",
    license: "NMLS#2311516",
    email: "warren@welocloans.com",
    bio: "Specializes in first-time homebuyer programs and down payment assistance across Southern California.",
    langs: ["English", "Cantonese", "Mandarin"],
    initials: "WC",
    color: "bg-blue-700",
    image: warrenImg,
  },
  {
    name: "Gina Chen",
    title: "Loan Originator",
    phone: "(626) 408-6669",
    license: "NMLS#352942",
    email: "gina@welocloans.com",
    bio: "Dedicated to helping families navigate the homebuying process with confidence and clarity.",
    langs: ["English", "Cantonese", "Chinese", "Vietnamese"],
    initials: "GC",
    color: "bg-blue-700",
    placeholder: false,
  },
  {
    name: "Jennifer Chan",
    title: "Loan Originator",
    phone: "(626) 569-1988",
    license: "NMLS#330536",
    email: "jennifer@welocloans.com",
    bio: "Passionate about making homeownership accessible and stress-free for every client she works with.",
    langs: ["English", "Cantonese", "Chinese", "Teochew", "Vietnamese"],
    initials: "JC",
    color: "bg-blue-700",
    placeholder: false,
  },
];

export default function TeamPage() {
  return (
    <div className="bg-transparent min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Our Team
          </p>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            People you can actually talk to.
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Our loan originators are real people who will walk you through every
            step — in your language, at your pace, with zero pressure.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name + member.title}
              className={`bg-white border rounded-2xl overflow-hidden transition-all ${
                member.placeholder
                  ? "border-dashed border-slate-200"
                  : "border-slate-200 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {/* Avatar area */}
              <div className="bg-slate-50 px-6 pt-8 pb-6 flex items-center gap-5">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover object-top shrink-0"
                  />
                ) : (
                  <div
                    className={`w-20 h-20 rounded-2xl ${member.color} flex items-center justify-center shrink-0`}
                  >
                    <span
                      className={`text-2xl font-extrabold ${member.placeholder ? "text-slate-400" : "text-white"}`}
                    >
                      {member.initials}
                    </span>
                  </div>
                )}
                <div>
                  <h2
                    className={`text-lg font-extrabold ${member.placeholder ? "text-slate-400" : "text-slate-900"}`}
                  >
                    {member.name}
                  </h2>
                  <p className="text-sm text-blue-600 font-semibold">
                    {member.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {member.license}
                  </p>
                  {member.langs.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {member.langs.map((l) => (
                        <span
                          key={l}
                          className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio + contact */}
              <div className="px-6 pb-6">
                <p
                  className={`text-sm leading-relaxed mb-5 ${member.placeholder ? "text-slate-400 italic" : "text-slate-500"}`}
                >
                  {member.bio}
                </p>

                {!member.placeholder && (
                  <div className="space-y-2.5">
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-3 text-sm text-slate-700 font-medium hover:text-blue-700 transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors shrink-0">
                        <FontAwesomeIcon icon={faPhone} className="text-xs" />
                      </span>
                      {member.phone}
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 text-sm text-slate-700 font-medium hover:text-blue-700 transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors shrink-0">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="text-xs"
                        />
                      </span>
                      <span className="truncate">{member.email}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-16 bg-blue-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-1">
              Ready to get started?
            </h3>
            <p className="text-blue-200 text-sm">
              Pick up the phone or send us a message — we'll respond within one
              business day.
            </p>
          </div>
          <a
            href="/#contact"
            className="shrink-0 bg-white text-blue-700 font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
