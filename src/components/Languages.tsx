const languages = [
  { name: "English", native: "English", flag: "US" },
  { name: "Cantonese", native: "廣東話 ", flag: "CA" },
  { name: "Mandarin", native: "普通话", flag: "CN" },
  { name: "Vietnamese", native: "Tiếng Việt", flag: "VN" },
  { name: "Teochew", native: "潮州", flag: "TC" },
];

export default function Languages() {
  return (
    <section className="py-20 bg-blue-700">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-96 shrink-0 text-center lg:text-left">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-blue-200 mb-3">
              We Speak Your Language
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
              Getting a mortgage is easier when you're understood.
            </h2>
            <p className="text-blue-200 text-base leading-relaxed">
              Our team is fluent in multiple languages so you can ask questions,
              understand your options, and feel confident in the language you're
              most comfortable with.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="bg-blue-800/50 border border-blue-500/30 rounded-2xl px-5 py-5 flex items-center gap-3 hover:bg-blue-800/80 transition-colors"
              >
                <span className="text-3xl text-white">{lang.flag}</span>
                <div>
                  <p className="text-white font-bold text-sm">{lang.name}</p>
                  <p className="text-blue-300 text-xs">{lang.native}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
