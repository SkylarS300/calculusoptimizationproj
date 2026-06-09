export default function StatCard({ label, value, unit, highlight, sub }) {
  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${highlight ? "rgba(74,222,128,0.4)" : "rgba(240,244,240,0.1)"}`,
      background: highlight ? "rgba(74,222,128,0.08)" : "rgba(26,58,32,0.4)",
      padding: "12px 16px",
    }}>
      <p style={{ color: "#f0f4f066", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 32, fontFamily: "'DM Serif Display', serif", color: highlight ? "#4ade80" : "#fbbf24" }}>
        {value}<span style={{ fontSize: 12, marginLeft: 4, opacity: 0.6 }}>{unit}</span>
      </p>
      {sub && <p style={{ color: "#f0f4f044", fontSize: 11, marginTop: 2 }}>{sub}</p>}
    </div>
  );
}