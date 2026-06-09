import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine, Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a3a20", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "8px 12px", fontSize: 12 }}>
      <p style={{ color: "#fbbf24", fontWeight: 600, marginBottom: 4 }}>t = {label}s</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function ForagingGraph({ data, tStar, showDerivative, showRate = true, showGain = true }) {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 40, right: 32, left: -10, bottom: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(26,58,32,0.8)" />
          <XAxis
            dataKey="t"
            stroke="rgba(240,244,240,0.25)"
            tick={{ fill: "rgba(240,244,240,0.4)", fontSize: 10 }}
            label={{ value: "Patch Time (s)", position: "insideBottom", offset: -8, fill: "rgba(240,244,240,0.35)", fontSize: 11 }}
          />
          <YAxis stroke="rgba(240,244,240,0.25)" tick={{ fill: "rgba(240,244,240,0.4)", fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            formatter={v => <span style={{ color: "rgba(240,244,240,0.5)" }}>{v}</span>}
          />
          {showGain && (
            <Line type="monotone" dataKey="gain" name="Energy Gained G(t)"
              stroke="#fbbf24" strokeWidth={2} dot={false} activeDot={{ r: 3 }} />
          )}
          {showRate && (
            <Line type="monotone" dataKey="rate" name="Foraging Rate R(t)"
              stroke="#4ade80" strokeWidth={2.5} dot={false} activeDot={{ r: 3 }} />
          )}
          {showDerivative && (
            <Line type="monotone" dataKey="derivative" name="Marginal Gain G′(t)"
              stroke="#a78bfa" strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
          )}
          {tStar && (
            <ReferenceLine
              x={parseFloat(tStar.toFixed(1))}
              stroke="#4ade80"
              strokeDasharray="4 2"
              strokeWidth={1.5}
              label={{
                value: `🐝 t* = ${tStar.toFixed(1)}s`,
                fill: "#4ade80",
                fontSize: 11,
                position: "insideTopLeft",
                offset: 8,
              }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}