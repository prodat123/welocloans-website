import { useModal } from "../ModalContext";

export default function Hero() {
  const { openModal } = useModal();
  return (
    <section className="relative bg-transparent pt-40 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative">
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-5">
            Your first home
            <br />
            <span className="text-blue-700">is within reach.</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed max-w-lg mb-6">
            Homeownership is the American dream, and we're here to make sure you
            actually get there.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
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
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5"
            >
              View Programs
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="relative hidden lg:flex justify-center items-center h-96">
          <div
            className="absolute bg-white border border-slate-200 rounded-2xl shadow-xl p-6"
            style={{
              width: "275px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3">
              You may qualify for
            </p>
            {[
              { name: "CalHFA Dream for All", pct: "Up to 20% down" },
              { name: "HOP Program", pct: "Up to $80,000" },
              { name: "LIPA Program", pct: "Up to $140,000" },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-xs font-semibold text-slate-700">
                    {p.name}
                  </span>
                </div>
                <span className="text-xs text-blue-700 font-bold">{p.pct}</span>
              </div>
            ))}
            <div className="mt-4 bg-blue-700 text-white text-xs font-bold text-center py-2.5 rounded-xl">
              Check your eligibility →
            </div>
          </div>

          <div className="absolute bottom-10 left-0 flex items-center gap-2 bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-2.5 text-blue-700 text-sm font-semibold">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            $0 down options available
          </div>

          <div className="absolute top-6 right-0 flex flex-col items-center bg-blue-700 rounded-xl shadow-lg px-5 py-3.5">
            <span className="text-3xl font-extrabold text-white tracking-tight leading-none">
              6.75<span className="text-base">%</span>
            </span>
            <span className="text-[10px] text-blue-200 mt-1 font-medium">
              Current Rate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
