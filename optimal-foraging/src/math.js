export function gainCurve(t, a, b) {
  return a * (1 - Math.exp(-b * t));
}

export function gainRate(t, a, b) {
  return a * b * Math.exp(-b * t);
}

export function totalRate(t, T, a, b) {
  if (t <= 0) return 0;
  return gainCurve(t, a, b) / (T + t);
}

export function findOptimalTime(T, a, b, steps = 2000) {
  let bestT = 0.01;
  let bestR = -Infinity;
  for (let i = 1; i <= steps; i++) {
    const t = (i / steps) * 80;
    const r = totalRate(t, T, a, b);
    if (r > bestR) { bestR = r; bestT = t; }
  }
  return { tStar: bestT, rStar: bestR };
}

export function buildCurveData(T, a, b) {
  const points = [];
  for (let t = 0.1; t <= 80; t += 0.4) {
    points.push({
      t: parseFloat(t.toFixed(2)),
      gain: parseFloat(gainCurve(t, a, b).toFixed(3)),
      rate: parseFloat(totalRate(t, T, a, b).toFixed(4)),
      derivative: parseFloat(gainRate(t, a, b).toFixed(4)),
    });
  }
  return points;
}