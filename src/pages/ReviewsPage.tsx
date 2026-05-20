import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

const reviews = [
  {
    name: "Maria G.",
    location: "Santa Ana, CA",
    program: "CalHFA Dream for All",
    rating: 5,
    date: "March 2025",
    text: "I had no idea this was even possible. I was renting for 8 years thinking I'd never be able to buy. Warren walked me through the Dream for All program and within 3 months I had keys in my hand. Zero down payment. I still can't believe it.",
  },
  {
    name: "Kevin & Lisa T.",
    location: "Garden Grove, CA",
    program: "Garden Grove Program + FHA",
    rating: 5,
    date: "January 2025",
    text: "We tried two other lenders before WELOC and kept getting told no. Warren found us a combo of the Garden Grove program and an FHA loan that covered almost everything. The whole team was patient and explained everything in plain English. Highly recommend.",
  },
  {
    name: "Thuy N.",
    location: "Westminster, CA",
    program: "LIPA Program",
    rating: 5,
    date: "February 2025",
    text: "Nói chuyện bằng tiếng Việt với nhóm của họ thực sự giúp ích rất nhiều. Tôi hiểu rõ từng bước của quy trình. Chương trình LIPA đã giúp tôi nhận được $90,000 hỗ trợ — tôi không tin được là điều này có thể xảy ra với tôi.",
    translated:
      '"Speaking Vietnamese with their team made such a difference. I understood every step of the process. The LIPA program got me $90,000 in assistance — I couldn\'t believe it was possible for me."',
  },
  {
    name: "James R.",
    location: "Anaheim, CA",
    program: "HOP Program",
    rating: 5,
    date: "April 2025",
    text: "I was skeptical at first because the programs sounded too good to be true. Warren explained everything clearly, showed me exactly what I'd be signing, and there were no hidden surprises. Closed in 35 days. Amazing experience.",
  },
  {
    name: "Sandra M.",
    location: "Temple City, CA",
    program: "Conventional + HOP",
    rating: 5,
    date: "December 2024",
    text: "As a single mom I thought homeownership was years away. WELOC Loans changed that completely. They found assistance I didn't even know existed and made the process feel totally manageable. My kids have their own rooms now. That means everything.",
  },
  {
    name: "David & Amy C.",
    location: "Rosemead, CA",
    program: "CalHFA Dream for All",
    rating: 5,
    date: "March 2025",
    text: "Warren was available whenever we had questions — evenings, weekends. We never felt lost. The Dream for All program covered 20% and our monthly payment is actually less than we were paying in rent. Couldn't ask for a better experience.",
  },
];

function Stars({ rating, total = 5 }: { rating: number; total?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={i < rating ? faStar : faStarOutline}
          className={i < rating ? "text-amber-400" : "text-slate-300"}
          style={{ fontSize: "13px" }}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const avg = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="bg-transparent min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-600 mb-3">
            Client Reviews
          </p>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Real buyers. Real stories.
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Don't take our word for it — here's what our clients have to say
            about buying their first home with WELOC Loans.
          </p>
        </div>

        {/* Summary bar */}
        <div className="bg-blue-700 rounded-2xl p-7 mb-12 flex flex-col sm:flex-row items-center gap-8">
          <div className="text-center sm:text-left shrink-0">
            <p className="text-7xl font-extrabold text-white leading-none">
              {avg}
            </p>
            <div className="flex justify-center sm:justify-start mt-2 mb-1">
              <Stars rating={5} />
            </div>
            <p className="text-blue-200 text-sm">out of 5 stars</p>
          </div>
          <div className="w-px h-16 bg-blue-600 hidden sm:block" />
          <div className="flex-1 grid grid-cols-3 gap-6 text-center">
            {[
              { value: `${reviews.length}+`, label: "Reviews" },
              { value: "98%", label: "Would Recommend" },
              { value: "100%", label: "5-Star Ratings" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-blue-200 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center shrink-0">
                    <span className="text-white font-extrabold text-sm">
                      {r.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.location}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 mt-0.5">
                  {r.date}
                </span>
              </div>

              <Stars rating={r.rating} />

              <span className="inline-block mt-3 text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full w-fit">
                {r.program}
              </span>

              {/* Review text */}
              <div className="mt-4 flex-1">
                <p className="text-sm text-slate-600 leading-relaxed">
                  "{expanded === i ? r.text : r.text.slice(0, 161)}
                  {r.text.length > 161 && expanded !== i ? "..." : ""}"
                </p>
                {r.translated && expanded === i && (
                  <p className="text-xs text-slate-400 italic mt-2 leading-relaxed">
                    {r.translated}
                  </p>
                )}
                {r.text.length > 161 && (
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="text-xs text-blue-600 font-semibold mt-2 hover:underline"
                  >
                    {expanded === i ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review CTA */}
        <div className="mt-14 text-center bg-slate-50 border border-slate-200 rounded-2xl p-10">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
            Did we help you get into your home?
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            We'd love to hear your story — your review helps other first-time
            buyers take the leap.
          </p>
          <a
            href="mailto:warrenc.welocloans@gmail.com?subject=My WELOC Loans Review"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md"
          >
            Share Your Story
          </a>
        </div>
      </div>
    </div>
  );
}
