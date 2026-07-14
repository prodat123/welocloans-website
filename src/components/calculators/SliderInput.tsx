import { useRef } from "react";
import { formatCurrency } from "../../utils/mortgage";

export default function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  display?: string;
}) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <span
          ref={displayRef}
          className="text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg shadow-2xs"
        >
          {display ??
            (unit === "$" ? formatCurrency(value) : `${value}${unit}`)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        onInput={(e) => {
          const v = Number((e.target as HTMLInputElement).value);
          if (displayRef.current) {
            displayRef.current.textContent =
              unit === "$"
                ? formatCurrency(v)
                : unit === "%"
                  ? `${v.toFixed(step < 1 ? 2 : 0)}%`
                  : `${v}${unit}`;
          }
        }}
        onPointerUp={(e) =>
          onChange(Number((e.target as HTMLInputElement).value))
        }
        onKeyUp={(e) => onChange(Number((e.target as HTMLInputElement).value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #2a7c8a 0%, #2a7c8a ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
        }}
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>{unit === "$" ? formatCurrency(min) : `${min}${unit}`}</span>
        <span>{unit === "$" ? formatCurrency(max) : `${max}${unit}`}</span>
      </div>
    </div>
  );
}
