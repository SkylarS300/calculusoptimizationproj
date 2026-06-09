// Marginal Value Theorem — Optimal Foraging Model
// E(t) = energy gained in patch t time
// G(t) = a * (1 - e^(-b*t))  ... diminishing returns curve
// Total rate R(t) = G(t) / (T + t)  where T = travel time
// Optimal t* where dR/dt = 0  =>  G'(t*) = R(t*)

export function gainCurve(t, a, b) {
  // Cumulative energy gain: saturating function
  return a * (1 - Math.exp(-b * t));
}

export function gainRate(t, a, b) {
  // Instantaneous rate of gain = derivative of G
  return a * b * Math.exp(-b * t);
}

export function totalRate(t, T, a, b) {
  // Overall foraging efficiency = gain / (travel + patch time)
  if (t <= 0) return 0;
  return gainCurve(t, a, b) / (T + t);
}

export function findOptimalTime(T, a, b, steps = 2000) {
  // Numerically find t* that maximises totalRate
  let bestT = 0.01;
  let bestR = -Infinity;
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * 60;
    const r = totalRate(t, T, a, b);
    if (r > bestR) { bestR = r; bestT = t; }
  }
  return { tStar: bestT, rStar: bestR };
}

export function buildCurveData(T, a, b) {
  const points = [];
  for (let t = 0.1; t <= 50; t += 0.4) {
    points.push({
      t: parseFloat(t.toFixed(2)),
      gain: parseFloat(gainCurve(t, a, b).toFixed(3)),
      rate: parseFloat(totalRate(t, T, a, b).toFixed(4)),
      derivative: parseFloat(gainRate(t, a, b).toFixed(4)),
    });
  }
  return points;
}