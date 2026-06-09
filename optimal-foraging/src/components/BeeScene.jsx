import { useEffect, useRef, useState } from "react";

const FLOWERS = [
  { x: 120, y: 260, r: 22 },
  { x: 320, y: 180, r: 28 },
  { x: 530, y: 240, r: 20 },
  { x: 700, y: 160, r: 25 },
];

function Flower({ x, y, r, active, depleted }) {
  const petals = 6;
  const petalColor = depleted ? "#3a4a3a" : active ? "#fbbf24" : "#4ade80";
  const centerColor = depleted ? "#2a3a2a" : "#fbbf24";
  return (
    <g>
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * Math.PI * 2;
        const px = x + Math.cos(angle) * r * 0.9;
        const py = y + Math.sin(angle) * r * 0.9;
        return (
          <ellipse
            key={i}
            cx={px} cy={py}
            rx={r * 0.45} ry={r * 0.28}
            transform={`rotate(${(angle * 180) / Math.PI + 90}, ${px}, ${py})`}
            fill={petalColor}
            opacity={depleted ? 0.35 : active ? 1 : 0.75}
            style={{ transition: "fill 0.6s, opacity 0.6s" }}
          />
        );
      })}
      <circle cx={x} cy={y} r={r * 0.38} fill={centerColor}
        opacity={depleted ? 0.3 : 1}
        style={{ transition: "fill 0.6s, opacity 0.6s" }} />
    </g>
  );
}

function Bee({ x, y, angle }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      {/* Body */}
      <ellipse cx={0} cy={0} rx={11} ry={7} fill="#fbbf24" />
      {/* Stripes */}
      <rect x={-4} y={-7} width={4} height={14} fill="#1a1a00" opacity={0.5} rx={1} />
      <rect x={2} y={-7} width={3} height={14} fill="#1a1a00" opacity={0.4} rx={1} />
      {/* Wings */}
      <ellipse cx={-3} cy={-9} rx={9} ry={5} fill="rgba(200,240,255,0.55)" />
      <ellipse cx={4}  cy={-9} rx={9} ry={5} fill="rgba(200,240,255,0.55)" />
      {/* Head */}
      <circle cx={11} cy={0} r={5} fill="#fbbf24" />
      {/* Eye */}
      <circle cx={13} cy={-1.5} r={1.2} fill="#1a1a00" />
      {/* Stinger */}
      <polygon points="-11,0 -15,2 -15,-2" fill="#d97706" />
    </g>
  );
}

export default function BeeScene({ travelTime, patchTime, playing }) {
  const [beePos, setBeePos] = useState({ x: FLOWERS[0].x, y: FLOWERS[0].y });
  const [beeAngle, setBeeAngle] = useState(0);
  const [currentFlower, setCurrentFlower] = useState(0);
  const [phase, setPhase] = useState("foraging"); // foraging | traveling
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [depleted, setDepleted] = useState([false, false, false, false]);
  const [particles, setParticles] = useState([]);
  const rafRef = useRef();
  const lastRef = useRef(null);
  const stateRef = useRef({ phase: "foraging", timer: 0, flower: 0, pos: { x: FLOWERS[0].x, y: FLOWERS[0].y } });

  useEffect(() => {
    if (!playing) return;

    const tick = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.05);
      lastRef.current = ts;

      const s = stateRef.current;
      s.timer += dt;

      if (s.phase === "foraging") {
        const duration = patchTime;
        const progress = Math.min(s.timer / duration, 1);

        // Emit pollen particles
        if (Math.random() < 0.15) {
          const f = FLOWERS[s.flower];
          setParticles(p => [...p.slice(-12), {
            id: Math.random(),
            x: f.x + (Math.random() - 0.5) * 20,
            y: f.y + (Math.random() - 0.5) * 20,
            life: 1,
          }]);
        }

        if (progress >= 1) {
          const next = (s.flower + 1) % FLOWERS.length;
          setDepleted(d => { const n = [...d]; n[s.flower] = true; return n; });
          s.phase = "traveling";
          s.timer = 0;
          s.target = FLOWERS[next];
          s.from = { x: s.pos.x, y: s.pos.y };
          s.nextFlower = next;
          setPhase("traveling");
        } else {
          // Wiggle while foraging
          const f = FLOWERS[s.flower];
          const wx = f.x + Math.sin(ts * 0.004) * 8;
          const wy = f.y + Math.cos(ts * 0.003) * 6;
          s.pos = { x: wx, y: wy };
          setBeePos({ x: wx, y: wy });
          setBeeAngle(Math.sin(ts * 0.005) * 20);
          setPhaseTimer(progress);
        }
      } else {
        // Traveling
        const speed = 1 / Math.max(travelTime, 1);
        const progress = Math.min(s.timer * speed, 1);
        const tx = s.from.x + (s.target.x - s.from.x) * progress;
        const ty = s.from.y + (s.target.y - s.from.y) * progress;
        const dx = s.target.x - s.from.x;
        const dy = s.target.y - s.from.y;
        s.pos = { x: tx, y: ty };
        setBeePos({ x: tx, y: ty });
        setBeeAngle(Math.atan2(dy, dx) * (180 / Math.PI));

        if (progress >= 1) {
          // Reset depleted when cycling back to flower 0
          if (s.nextFlower === 0) setDepleted([false, false, false, false]);
          s.flower = s.nextFlower;
          s.phase = "foraging";
          s.timer = 0;
          setCurrentFlower(s.nextFlower);
          setPhase("foraging");
          setPhaseTimer(0);
        }
      }

      // Age particles
      setParticles(p => p.map(pt => ({ ...pt, life: pt.life - dt * 1.5 })).filter(pt => pt.life > 0));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [playing, travelTime, patchTime]);

  return (
    <svg viewBox="0 0 820 340" width="100%" style={{ borderRadius: 16, background: "rgba(10,26,15,0.6)", border: "1px solid rgba(74,222,128,0.15)" }}>
      {/* Ground */}
      <rect x={0} y={290} width={820} height={50} fill="rgba(26,58,32,0.4)" rx={0} />
      {/* Grass blades */}
      {Array.from({ length: 40 }).map((_, i) => (
        <line key={i} x1={20 + i * 20} y1={290} x2={18 + i * 20 + Math.sin(i) * 4} y2={275 + Math.sin(i * 1.3) * 6}
          stroke="#1a5a28" strokeWidth={1.5} strokeLinecap="round" />
      ))}

      {/* Flight path dashes */}
      {FLOWERS.map((f, i) => {
        const next = FLOWERS[(i + 1) % FLOWERS.length];
        return (
          <line key={i} x1={f.x} y1={f.y} x2={next.x} y2={next.y}
            stroke="rgba(74,222,128,0.12)" strokeWidth={1.5} strokeDasharray="6 5" />
        );
      })}

      {/* Flowers */}
      {FLOWERS.map((f, i) => (
        <Flower key={i} {...f} active={currentFlower === i && phase === "foraging"} depleted={depleted[i]} />
      ))}

      {/* Pollen particles */}
      {particles.map(pt => (
        <circle key={pt.id} cx={pt.x} cy={pt.y - (1 - pt.life) * 20}
          r={2.5} fill="#fbbf24" opacity={pt.life * 0.8} />
      ))}

      {/* Bee */}
      <Bee x={beePos.x} y={beePos.y} angle={beeAngle} />

      {/* Phase label */}
      <text x={16} y={24} fill="rgba(240,244,240,0.5)" fontSize={11} fontFamily="Inter">
        {phase === "foraging" ? `🍯 Foraging patch ${currentFlower + 1}` : `✈️ Traveling to next patch`}
      </text>
    </svg>
  );
}