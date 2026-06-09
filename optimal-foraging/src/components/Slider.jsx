export default function Slider({ label, symbol, min, max, step, value, onChange, unit = "", description }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ color: "#f0f4f0cc", fontSize: 13 }}>
          <span style={{ color: "#4ade80", fontWeight: 600 }}>{symbol}</span> — {label}
        </span>
        <span style={{ color: "#fbbf24", fontWeight: 600, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>
          {value}{unit}
        </span>
      </div>
      {description && (
        <p style={{ color: "#f0f4f055", fontSize: 11, marginBottom: 6 }}>{description}</p>
      )}
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))} />
    </div>
  );
}