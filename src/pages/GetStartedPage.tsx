import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import logo from "../components/logo.png";

// Fix Leaflet's default marker icon (broken in bundlers)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type GeoResult = { lat: number; lon: number; display_name: string } | null;
type MapView = "street" | "satellite";

const TILES = {
  street: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri",
  },
};

function MapUpdater({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], 15, { duration: 1.2, easeLinearity: 0.25 });
  }, [lat, lon, map]);
  return null;
}

function LocationMap({ query }: { query: string }) {
  const [geo, setGeo] = useState<GeoResult>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "error">("idle");
  const [view, setView] = useState<MapView>("satellite");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 3) {
      setStatus("idle");
      setGeo(null);
      return;
    }
    setStatus("loading");
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=us`;
        const res = await fetch(url, {
          headers: { "Accept-Language": "en", "User-Agent": "WELOCLoans/1.0" },
        });
        const data = await res.json();
        if (data.length > 0) {
          setGeo({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), display_name: data[0].display_name });
          setStatus("found");
        } else {
          setGeo(null);
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }, 700);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  if (status === "idle") return null;

  return (
    <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
      {status === "loading" && (
        <div className="h-56 bg-slate-100 flex items-center justify-center">
          <svg className="animate-spin w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
          </svg>
        </div>
      )}
      {status === "error" && (
        <div className="h-12 bg-slate-50 flex items-center justify-center">
          <p className="text-xs text-slate-400">Location not found. Try adding a state (e.g. "Austin, TX")</p>
        </div>
      )}
      {status === "found" && geo && (
        <div className="relative">
          <MapContainer
            center={[geo.lat, geo.lon]}
            zoom={15}
            style={{ height: 260, width: "100%" }}
            zoomControl={false}
            scrollWheelZoom={false}
            attributionControl={false}
          >
            <TileLayer key={view} url={TILES[view].url} attribution={TILES[view].attribution} maxZoom={19} />
            <Marker position={[geo.lat, geo.lon]} />
            <MapUpdater lat={geo.lat} lon={geo.lon} />
          </MapContainer>

          {/* Clickable overlay to open Google Maps */}
          <a
            href={`https://www.google.com/maps?q=${geo.lat},${geo.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-[999] cursor-pointer"
            aria-label="Open in Google Maps"
          />

          {/* View toggle */}
          <div className="absolute top-3 right-3 z-[1000] flex rounded-lg overflow-hidden shadow-md border border-white/20">
            {(["satellite", "street"] as MapView[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  view === v
                    ? "bg-white text-slate-800"
                    : "bg-slate-800/60 text-white hover:bg-slate-800/80"
                }`}
              >
                {v === "satellite" ? "Satellite" : "Street"}
              </button>
            ))}
          </div>
        </div>
      )}
      {status === "found" && geo && (
        <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <p className="text-xs text-slate-500 truncate">{geo.display_name}</p>
        </div>
      )}
    </div>
  );
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

type FormData = {
  loanType: string;
  homeDescription: string;
  creditProfile: string;
  propertyUse: string;
  propertyLocation: string;
  purchasePrice: string;
  downPayment: string;
  rateType: string;
  employmentStatus: string;
  hasBankruptcy: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
};

const initial: FormData = {
  loanType: "",
  homeDescription: "",
  creditProfile: "",
  propertyUse: "",
  propertyLocation: "",
  purchasePrice: "",
  downPayment: "",
  rateType: "",
  employmentStatus: "",
  hasBankruptcy: "",
  name: "",
  email: "",
  phone: "",
  dob: "",
};

function OptionCard({
  label,
  sub,
  selected,
  onClick,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 ${
        selected
          ? "border-blue-600 bg-blue-50 text-blue-900"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <div>
        <p className="text-sm font-semibold leading-snug">{label}</p>
        {sub && (
          <p
            className={`text-xs mt-0.5 ${selected ? "text-blue-600/70" : "text-slate-400"}`}
          >
            {sub}
          </p>
        )}
      </div>
      <span
        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ml-4 transition-all duration-150 ${
          selected ? "border-blue-600 bg-blue-600" : "border-slate-300"
        }`}
      >
        {selected && (
          <FontAwesomeIcon icon={faCheck} className="text-white text-[8px]" />
        )}
      </span>
    </button>
  );
}

function TextInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-300 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
      />
    </div>
  );
}

type StepDef = {
  title: string;
  subtitle: string;
  isValid: (f: FormData) => boolean;
  render: (
    f: FormData,
    set: (k: keyof FormData, v: string) => void,
  ) => React.ReactNode;
};

const steps: StepDef[] = [
  {
    title: "What type of loan are you looking for?",
    subtitle:
      "Select the option that best fits your situation. Not sure? Choose the last option.",
    isValid: (f) => !!f.loanType,
    render: (f, set) => (
      <div className="grid grid-cols-1 gap-3">
        {[
          { label: "Purchase", sub: "Buying a new home" },
          { label: "Refinance", sub: "Replace my current loan" },
          { label: "Pre-Approval", sub: "Find out how much you qualify for" },
        ].map((o) => (
          <OptionCard
            key={o.label}
            {...o}
            selected={f.loanType === o.label}
            onClick={() => set("loanType", o.label)}
          />
        ))}
      </div>
    ),
  },
  {
    title: "What type of home is it?",
    subtitle: "Tell us about the property you're looking to buy or finance.",
    isValid: (f) => !!f.homeDescription,
    render: (f, set) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "Single Family Home", sub: "Standalone house" },
          { label: "Condo / Townhouse", sub: "Shared building or complex" },
          { label: "Multi-Family (2–4 units)", sub: "Duplex, triplex, or fourplex" },
          { label: "Manufactured / Mobile", sub: "Factory-built home" },
          { label: "Not Sure Yet", sub: "Still exploring options" },
        ].map((o) => (
          <OptionCard
            key={o.label}
            {...o}
            selected={f.homeDescription === o.label}
            onClick={() => set("homeDescription", o.label)}
          />
        ))}
      </div>
    ),
  },
  {
    title: "How would you describe your credit?",
    subtitle:
      "This helps us match you with the right programs. We don't pull your credit at this stage.",
    isValid: (f) => !!f.creditProfile,
    render: (f, set) => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "Excellent", sub: "740 or above" },
          { label: "Good", sub: "680 – 739" },
          { label: "Fair", sub: "620 – 679" },
          { label: "Needs Work", sub: "Below 620" },
          { label: "Not Sure", sub: "Haven't checked recently" },
        ].map((o) => (
          <OptionCard
            key={o.label}
            {...o}
            selected={f.creditProfile === o.label}
            onClick={() => set("creditProfile", o.label)}
          />
        ))}
      </div>
    ),
  },
  {
    title: "How will you use this property?",
    subtitle:
      "Your intended use affects your loan options and available programs.",
    isValid: (f) => !!f.propertyUse,
    render: (f, set) => (
      <div className="grid grid-cols-1 gap-3">
        {[
          {
            label: "Primary Residence",
            sub: "I'll live here full-time, this is my main home",
          },
          {
            label: "Second Home",
            sub: "Vacation or seasonal property I'll visit periodically",
          },
          {
            label: "Investment Property",
            sub: "I'll rent it out to tenants",
          },
        ].map((o) => (
          <OptionCard
            key={o.label}
            {...o}
            selected={f.propertyUse === o.label}
            onClick={() => set("propertyUse", o.label)}
          />
        ))}
      </div>
    ),
  },
  {
    title: "Where is the property located?",
    subtitle: "City and state help us match you with the right local programs.",
    isValid: (f) => f.propertyLocation.trim().length > 2,
    render: (f, set) => (
      <div className="max-w-sm">
        <TextInput
          label="City & State"
          placeholder="e.g. Santa Ana, CA"
          value={f.propertyLocation}
          onChange={(v) => set("propertyLocation", v)}
        />
        <p className="text-xs text-slate-400 leading-relaxed mt-2">
          If you haven't found a property yet, enter the city you're searching in.
        </p>
        <LocationMap query={f.propertyLocation} />
      </div>
    ),
  },
  {
    title: "Purchase price & down payment",
    subtitle: "Give us your best estimate. You can adjust this later.",
    isValid: (f) => f.purchasePrice.length > 0 && f.downPayment.length > 0,
    render: (f, set) => (
      <div className="space-y-4 max-w-sm">
        <TextInput
          label="Estimated Purchase Price"
          placeholder="e.g. $450,000"
          value={f.purchasePrice}
          onChange={(v) => set("purchasePrice", v)}
        />
        <TextInput
          label="Estimated Down Payment"
          placeholder="e.g. $15,000 or 3.5%"
          value={f.downPayment}
          onChange={(v) => set("downPayment", v)}
        />
        <p className="text-xs text-slate-400 leading-relaxed">
          These numbers are estimates only and won't lock you into anything.
        </p>
      </div>
    ),
  },
  {
    title: "What type of interest rate do you prefer?",
    subtitle:
      "Fixed is the most common choice for first-time buyers. Not sure? We'll walk you through it.",
    isValid: (f) => !!f.rateType,
    render: (f, set) => (
      <div className="grid grid-cols-1 gap-3">
        {[
          {
            label: "Fixed Rate",
            sub: "Same payment every month for the life of the loan",
          },
          {
            label: "Adjustable Rate (ARM)",
            sub: "Lower to start, then adjusts periodically",
          },
          { label: "Not Sure", sub: "Walk me through the options" },
        ].map((o) => (
          <OptionCard
            key={o.label}
            {...o}
            selected={f.rateType === o.label}
            onClick={() => set("rateType", o.label)}
          />
        ))}
      </div>
    ),
  },
  {
    title: "Employment & financial history",
    subtitle: "This helps us identify the right loan products for your situation.",
    isValid: (f) => !!f.employmentStatus && !!f.hasBankruptcy,
    render: (f, set) => (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Current employment status
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Employed (W-2)", sub: "Receive a regular paycheck" },
              { label: "Self-Employed / 1099", sub: "Freelance or business owner" },
              { label: "Retired", sub: "On fixed or pension income" },
              { label: "Other / Unemployed", sub: "Currently between jobs" },
            ].map((o) => (
              <OptionCard
                key={o.label}
                {...o}
                selected={f.employmentStatus === o.label}
                onClick={() => set("employmentStatus", o.label)}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Any bankruptcies in the past 7 years?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "No", sub: "Clean record" },
              { label: "Yes", sub: "I'll provide more detail later" },
            ].map((o) => (
              <OptionCard
                key={o.label}
                {...o}
                selected={f.hasBankruptcy === o.label}
                onClick={() => set("hasBankruptcy", o.label)}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Last step: how can we reach you?",
    subtitle:
      "A loan officer will follow up within one business day. No spam, ever.",
    isValid: (f) =>
      f.name.trim().length > 1 &&
      f.email.includes("@") &&
      f.phone.replace(/\D/g, "").length === 10 &&
      f.dob.length >= 8,
    render: (f, set) => (
      <div className="space-y-4 max-w-sm">
        <TextInput
          label="Full Name"
          placeholder="Jane Smith"
          value={f.name}
          onChange={(v) => set("name", v)}
        />
        <TextInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={f.email}
          onChange={(v) => set("email", v)}
        />
        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="(555) 000-0000"
          value={f.phone}
          onChange={(v) => set("phone", formatPhone(v))}
        />
        <TextInput
          label="Date of Birth"
          type="date"
          placeholder="MM/DD/YYYY"
          value={f.dob}
          onChange={(v) => set("dob", v)}
        />
        <p className="text-xs text-slate-400 leading-relaxed">
          Your date of birth is used only for identity verification purposes.
        </p>
      </div>
    ),
  },
];

export default function GetStartedPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [sliding, setSliding] = useState(false);
  const [visibleStep, setVisibleStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (key: keyof FormData, value: string) =>
    setFormData((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const goTo = (next: number, dir: "forward" | "back") => {
    if (sliding) return;
    setDirection(dir);
    setSliding(true);
    setTimeout(() => {
      setStep(next);
      setVisibleStep(next);
      setSliding(false);
    }, 240);
  };

  const canNext = steps[step]?.isValid(formData);

  const handleSubmit = async () => {
    if (!canNext || loading) return;
    setLoading(true);
    setSubmitError("");

    const apiUrl = import.meta.env.VITE_API_URL;
    const companyId = import.meta.env.VITE_COMPANY_ID;

    try {
      const res = await fetch(`${apiUrl}/api/clients/${companyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      });

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

  const progress = ((step + 1) / steps.length) * 100;

  const exitClass =
    direction === "forward"
      ? "-translate-x-6 opacity-0"
      : "translate-x-6 opacity-0";

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faCheck} className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          You're all set
        </h2>
        <p className="text-slate-500 text-base max-w-sm leading-relaxed mb-8">
          We received your information. A loan officer will reach out to you at{" "}
          <span className="font-semibold text-slate-700">{formData.email}</span>{" "}
          within one business day.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#f8f9fb] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="shrink-0 flex items-center justify-between px-6 md:px-10 h-16 bg-white border-b border-slate-100">
        <img src={logo} alt="WELOC Loans" className="h-8 w-auto" />
        <div className="flex items-center gap-5">
          <a
            href="tel:+16265691988"
            className="hidden sm:block text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors"
          >
            (626) 569-1988
          </a>
          <button
            onClick={() => navigate("/")}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faXmark} className="text-sm" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="shrink-0 h-0.5 bg-slate-100">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          {/* Step counter */}
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Step {step + 1} of {steps.length}
          </p>

          {/* Animated step content */}
          <div className="overflow-hidden">
            <div
              className={`transition-all ease-in-out ${sliding ? exitClass : "translate-x-0 opacity-100"}`}
              style={{ transitionDuration: "240ms" }}
            >
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug mb-2 tracking-tight">
                {steps[visibleStep].title}
              </h1>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                {steps[visibleStep].subtitle}
              </p>

              {steps[visibleStep].render(formData, set)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="shrink-0 bg-white border-t border-slate-100 px-6 md:px-10 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => goTo(step - 1, "back")}
            disabled={step === 0 || loading}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            Back
          </button>

          <div className="flex items-center gap-3">
            {submitError && (
              <p className="text-xs text-red-500 font-medium">
                {submitError}
              </p>
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={() => canNext && goTo(step + 1, "forward")}
                disabled={!canNext}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:cursor-not-allowed"
              >
                Continue
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext || loading}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:cursor-not-allowed min-w-[110px] justify-center"
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
      </div>
    </div>
  );
}
