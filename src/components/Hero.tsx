import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../ModalContext";
import house1 from "../house1.jpg";
import house2 from "../house2.jpg";
import house3 from "../house3.jpg";

const perks = [
  "Down payment assistance up to $161K",
  "Loans with as little as 0–3.5% down",
  "A loan officer with you from day one",
];

export default function Hero() {
  const { openModal } = useModal();
  return (
    <section className="relative bg-transparent pt-40 pb-24 overflow-hidden">
      {/* Animated ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -top-20 -left-24 w-[32rem] h-[32rem] rounded-full bg-blue-200/40 blur-3xl" />
        <div
          className="animate-blob absolute top-10 right-[-8rem] w-[30rem] h-[30rem] rounded-full bg-coral-200/40 blur-3xl"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative">
        <div>
          <span
            className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            First-Time Buyer Specialists
          </span>

          <h1
            className="animate-fade-up text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-slate-900 mb-5"
            style={{ animationDelay: "80ms" }}
          >
            Your first home
            <br />
            <span className="text-gradient">is within reach.</span>
          </h1>

          <p
            className="animate-fade-up text-lg text-slate-500 leading-relaxed max-w-lg mb-6"
            style={{ animationDelay: "160ms" }}
          >
            Buying your first home is our specialty, not a side offer. We pair you
            with the assistance programs and low-down-payment loans that get you to
            the keys sooner.
          </p>

          <ul
            className="animate-fade-up space-y-2.5 mb-8"
            style={{ animationDelay: "240ms" }}
          >
            {perks.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 text-sm font-medium text-slate-700"
              >
                <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2a7c8a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div
            className="animate-fade-up flex flex-wrap gap-3 mb-8"
            style={{ animationDelay: "320ms" }}
          >
            <button
              onClick={openModal}
              className="group inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-glow hover:shadow-lg"
            >
              Get Started
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <Link
              to="/first-time-homebuyer"
              className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              First-Time Buyer Programs
            </Link>
          </div>

          {/* Trust row */}
          <div
            className="animate-fade-up flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
            style={{ animationDelay: "400ms" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                ))}
              </span>
              <span className="font-semibold text-slate-700">Rated by real homeowners</span>
            </span>
            <span className="hidden sm:block w-px h-4 bg-slate-300" />
            <span className="font-medium">NMLS #2696277 · Equal Housing Lender</span>
          </div>
        </div>

        {/* Image collage */}
        <div className="relative hidden lg:block h-[420px] animate-fade-in" style={{ animationDelay: "200ms" }}>
          {/* Ambient glow behind the collage for extra depth */}
          <div className="absolute -inset-6 bg-blue-200/30 blur-3xl rounded-[3rem] -z-10" />

          {/* Large image — left, tall */}
          <img
            src={house1}
            alt="Home"
            className="animate-float-slow absolute left-0 top-0 w-[54%] h-full object-cover rounded-2xl shadow-xl ring-1 ring-black/5"
          />
          <img
            src={house2}
            alt="Home"
            className="animate-float absolute right-0 top-0 w-[44%] h-[49%] object-cover rounded-2xl shadow-xl ring-1 ring-black/5"
            style={{ animationDelay: "-2s" }}
          />
          <img
            src={house3}
            alt="Home"
            className="animate-float-slow absolute right-0 bottom-0 w-[44%] h-[49%] object-cover rounded-2xl shadow-xl ring-1 ring-black/5"
            style={{ animationDelay: "-4s" }}
          />
        </div>
      </div>
    </section>
  );
}
