import { useModal } from "../ModalContext";
import house1 from "../house1.jpg";
import house2 from "../house2.jpg";
import house3 from "../house3.jpg";

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

        {/* Image collage */}
        <div className="relative hidden lg:block h-[420px]">
          {/* Large image — left, tall */}
          <img
            src={house1}
            alt="Home"
            className="absolute left-0 top-0 w-[54%] h-full object-cover rounded-2xl shadow-lg"
          />
          <img
            src={house2}
            alt="Home"
            className="absolute right-0 top-0 w-[44%] h-[49%] object-cover rounded-2xl shadow-lg"
          />
          <img
            src={house3}
            alt="Home"
            className="absolute right-0 bottom-0 w-[44%] h-[49%] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
