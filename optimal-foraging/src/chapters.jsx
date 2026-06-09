import { useState } from "react";
import BeeScene from "./components/BeeScene";
import ForagingGraph from "./components/ForagingGraph";
import Slider from "./components/Slider";
import StatCard from "./components/StatCard";
import { buildCurveData, findOptimalTime, gainCurve } from "./math";

const box = {
  background: "rgba(26,58,32,0.25)",
  border: "1px solid rgba(240,244,240,0.08)",
  borderRadius: 14,
  padding: "18px 22px",
};

const mathBox = {
  background: "rgba(10,26,15,0.8)",
  border: "1px solid rgba(74,222,128,0.2)",
  borderRadius: 10,
  padding: "14px 24px",
  textAlign: "center",
  margin: "18px 0",
};

const codeBox = {
  background: "#061008",
  border: "1px solid rgba(240,244,240,0.08)",
  borderRadius: 10,
  padding: "16px 20px",
  fontSize: 16,
  color: "rgba(74,222,128,0.85)",
  fontFamily: "monospace",
  lineHeight: 1.8,
  overflowX: "auto",
  margin: "14px 0",
};

const body = { color: "rgba(240,244,240,0.75)", lineHeight: 1.9, fontSize: 22, marginBottom: 18 };
const small = { color: "rgba(240,244,240,0.5)", fontSize: 18, lineHeight: 1.85 };

export function useChapters() {
  const [travelTime, setTravelTime] = useState(8);
  const [maxEnergy, setMaxEnergy] = useState(20);
  const [depletionRate, setDepletionRate] = useState(0.15);
  const [showDerivative, setShowDerivative] = useState(false);

  const data = buildCurveData(travelTime, maxEnergy, depletionRate);
  const { tStar, rStar } = findOptimalTime(travelTime, maxEnergy, depletionRate);
  const energyAtOptimal = gainCurve(tStar, maxEnergy, depletionRate);

  const chapters = [

    // 01
    {
      number: "01",
      title: "The Question",
      subtitle: "A bee and its mathematical decision",
      notes: [
        "Start by asking the class: 'Imagine you're a bee. You're in a flower patch collecting nectar. When do you leave?'",
        "Let them think for a second. Most people's instinct is wrong — they either say 'when it's empty' (too late) or 'quickly' (too early).",
        "Introduce Eric Charnov — a biologist who in 1976 asked this exact question and used calculus to answer it.",
        "The key tension: staying longer gets you more energy, but you're missing out on fresh patches. Travel time is a fixed cost you've already paid.",
        "Point at the bee animation — it forages, the flower depletes (turns grey), then it flies to the next one. This is exactly what we're modelling.",
      ],
      left: (
        <div>
          <p style={body}>
            A bee has one job: collect as much nectar as possible. The catch is that
            every flower patch gets less productive over time. The more you take, the
            less there is, and at some point staying longer just isn't worth it.
          </p>
          <p style={body}>
            But leaving early has a cost too. Flying to the next patch takes time,
            and that travel time is wasted if the current patch still had something left to give.
          </p>
          <div style={box}>
            <p style={{ color: "#4ade80", fontSize: 15, fontWeight: 600, marginBottom: 10 }}>The central question</p>
            <p style={{ color: "rgba(240,244,240,0.85)", fontSize: 15, lineHeight: 1.7 }}>
              How long should a forager stay in a patch to get the most energy
              out of an entire foraging trip, not just this one patch?
            </p>
            <p style={{ color: "rgba(240,244,240,0.4)", fontSize: 18, marginTop: 10 }}>
              Eric Charnov posed this in 1976 and solved it with calculus.
            </p>
          </div>
          <p style={{ ...small, marginTop: 16 }}>
            Watch the bee. It forages until the flower goes grey, then flies to the next one.
            The travel time T is fixed. The patch time is what we need to figure out.
          </p>
        </div>
      ),
      right: (
        <div>
          <BeeScene travelTime={travelTime} patchTime={4} playing={true} />
          <div style={{ marginTop: 18 }}>
            <Slider label="Travel Time" symbol="T" min={1} max={15} step={0.5}
              value={travelTime} onChange={setTravelTime} unit="s"/>
          </div>
        </div>
      ),
    },

    // 02
    {
      number: "02",
      title: "Modelling the Patch",
      subtitle: "The energy gain function G(t)",
      notes: [
        "We need a mathematical function that captures diminishing returns. The saturating exponential is perfect for this.",
        "G(t) = a(1 − e^{−bt}): explain each part. 'a' is the total nectar available, the ceiling. 'b' is how fast you reach it.",
        "As t approaches infinity, e^{−bt} approaches 0, so G(t) approaches a. The patch is fully depleted.",
        "Point at the gold curve: it rises steeply at first, then flattens. Each extra second in the patch gives you less and less.",
        "Drag the b slider to show how a fast-depleting patch flattens much sooner. Drag a to show richer vs poorer patches.",
        "The code is literally one line. This is the power of a good mathematical model.",
      ],
      left: (
        <div>
          <p style={body}>
            To work with this mathematically, we need a function that describes
            how much energy a forager collects over time in a single patch.
            A saturating exponential fits perfectly because it rises quickly at first
            and then levels off as the patch runs dry.
          </p>
          <div style={mathBox}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#fbbf24", fontStyle: "italic" }}>
              G(t) = a(1 − e<sup>−bt</sup>)
            </span>
          </div>
          <div style={{ ...box, marginBottom: 14 }}>
            <p style={{ ...small, lineHeight: 2.1 }}>
              <span style={{ color: "#4ade80" }}>a</span> is the total nectar in the patch, the ceiling you can never exceed.<br />
              <span style={{ color: "#4ade80" }}>b</span> controls how fast the patch depletes.<br />
              When t gets very large, G(t) gets very close to a but never quite reaches it.
            </p>
          </div>
          <pre style={codeBox}>{`// src/math.js
export function gainCurve(t, a, b) {
  return a * (1 - Math.exp(-b * t));
}`}</pre>
          <p style={small}>
            Try dragging <span style={{ color: "#4ade80" }}>a</span> and <span style={{ color: "#4ade80" }}>b</span> on
            the right and watch the gold curve respond.
          </p>
        </div>
      ),
      right: (
        <div>
          <ForagingGraph data={data} tStar={null} showRate={false} showGain={true} showDerivative={false} />
          <div style={{ marginTop: 10 }}>
            <Slider label="Max Patch Energy" symbol="a" min={5} max={50} step={1}
              value={maxEnergy} onChange={setMaxEnergy} unit=" E"
              description="Total nectar available. Raises the ceiling of G(t)." />
            <Slider label="Depletion Rate" symbol="b" min={0.05} max={0.5} step={0.01}
              value={depletionRate} onChange={setDepletionRate}
              description="How quickly the patch depletes. Higher b means the curve bends sooner." />
          </div>
        </div>
      ),
    },

    // 03
    {
      number: "03",
      title: "The Objective Function",
      subtitle: "What are we actually maximising?",
      notes: [
        "Key insight here: the bee doesn't want maximum total energy, it wants maximum energy per unit time.",
        "If you spend 100 seconds getting 50 units, that's 0.5 E/s. If you spend 10 seconds getting 30 units, that's 3 E/s. The second is way better.",
        "R(t) = G(t) / (T + t). The denominator is total time: travel time T (fixed, already paid) plus patch time t (our variable).",
        "Show the green curve on the graph. It has a clear peak. That peak is t*, the optimal patch time.",
        "Drag T higher. Watch the peak shift right. Animals in habitats with costly travel stay longer per patch. This matches what biologists actually observe.",
        "The stat cards update live. Point out that t* and R(t*) are being recalculated in real time.",
      ],
      left: (
        <div>
          <p style={body}>
            Maximising total energy collected isn't actually the right goal.
            What matters is how much energy the bee collects per second of its life,
            because time spent flying is time not foraging somewhere else.
          </p>
          <div style={mathBox}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#4ade80", fontStyle: "italic" }}>
              R(t) = G(t) / (T + t)
            </span>
          </div>
          <p style={body}>
            R(t) is the overall foraging rate. The denominator adds up the travel time T
            and the patch time t, so every second of flight is accounted for.
            Maximising R(t) is the actual goal.
          </p>
          <pre style={codeBox}>{`export function totalRate(t, T, a, b) {
  return gainCurve(t, a, b) / (T + t);
}`}</pre>
          <div style={box}>
            <p style={small}>
              Notice what happens when you increase T below. The optimal patch time shifts later
              because expensive travel makes each visit worth more.
            </p>
          </div>
        </div>
      ),
      right: (
        <div>
          <ForagingGraph data={data} tStar={tStar} showRate={true} showGain={true} showDerivative={false} />
          <div style={{ marginTop: 10 }}>
            <Slider label="Travel Time" symbol="T" min={1} max={20} step={0.5}
              value={travelTime} onChange={setTravelTime} unit="s"
              description="Watch the green peak shift right as T increases." />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
            <StatCard label="Optimal t*" value={tStar.toFixed(1)} unit="s" highlight sub="argmax R(t)" />
            <StatCard label="Max Rate R(t*)" value={rStar.toFixed(3)} unit="E/s" highlight sub="at t*" />
          </div>
        </div>
      ),
    },

    // 04
    {
      number: "04",
      title: "The Calculus",
      subtitle: "Finding t* with derivatives",
      notes: [
        "This is the core calculus slide. To maximise R(t), we take its derivative and set it to zero.",
        "Apply the quotient rule to R(t) = G(t)/(T+t). You get [G′(t)(T+t) − G(t)] / (T+t)².",
        "Setting the numerator to zero: G′(t*)(T+t*) = G(t*). Divide both sides by (T+t*) to get G′(t*) = R(t*).",
        "The condition is: marginal gain equals average rate. This is the Marginal Value Theorem.",
        "Toggle G′(t) on the graph. The purple dashed line is the derivative of G. Where it crosses the green R(t) line is exactly t*.",
        "There is no closed-form algebraic solution for t*, but the geometric interpretation is completely clear.",
      ],
      left: (
        <div>
          <p style={body}>
            To find where R(t) peaks, we differentiate it and set the result to zero.
            Using the quotient rule on R(t) = G(t) / (T + t):
          </p>
          <div style={mathBox}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#a78bfa", fontStyle: "italic", lineHeight: 2.2 }}>
              dR/dt = [G′(t)·(T+t) − G(t)] / (T+t)² = 0
            </span>
          </div>
          <p style={body}>
            The denominator is always positive, so we only need the numerator to equal zero.
            After simplifying, the condition becomes surprisingly clean:
          </p>
          <div style={mathBox}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#4ade80", fontStyle: "italic" }}>
              G′(t*) = R(t*)
            </span>
          </div>
          <p style={body}>
            Leave when your marginal gain rate equals your average foraging rate.
            That is the Marginal Value Theorem.
          </p>
          <div style={box}>
            <p style={small}>
              Toggle G′(t) on the graph to see the purple derivative curve.
              The crossing point with the green line is t*.
            </p>
          </div>
        </div>
      ),
      right: (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
            <button onClick={() => setShowDerivative(v => !v)}
              style={{
                fontSize: 13, padding: "7px 16px", borderRadius: 999, cursor: "pointer",
                border: `1px solid ${showDerivative ? "rgba(167,139,250,0.5)" : "rgba(240,244,240,0.15)"}`,
                color: showDerivative ? "#a78bfa" : "rgba(240,244,240,0.4)",
                background: showDerivative ? "rgba(167,139,250,0.08)" : "transparent",
              }}>
              {showDerivative ? "Hide" : "Show"} G′(t)
            </button>
          </div>
          <ForagingGraph data={data} tStar={tStar} showRate={true} showGain={true} showDerivative={showDerivative} />
          <div style={{ marginTop: 12 }}>
            <Slider label="Travel Time" symbol="T" min={1} max={20} step={0.5}
              value={travelTime} onChange={setTravelTime} unit="s"
              description="As T increases, the intersection point shifts right." />
          </div>
        </div>
      ),
    },

    // 05
    {
      number: "05",
      title: "The Playground",
      subtitle: "Explore all parameters live",
      notes: [
        "Open sandbox. Invite the audience to suggest values.",
        "Ask: what happens if the patch is very rich but depletes fast? Let someone guess, then show them.",
        "Try T=20. Notice t* shoots way up. The model says: if getting here was hard, stay a while.",
        "Try T=1. The bee leaves almost immediately. Why spend time on a mediocre patch when a fresh one is close?",
        "The bee animation updates to use the actual t* so you can see the optimal behaviour play out.",
        "Good slide for questions. Let classmates drag the sliders if you're presenting in person.",
      ],
      left: (
        <div>
          <p style={body}>All three parameters at once. Try pushing them to extremes and see how t* responds.</p>
          <Slider label="Travel Time" symbol="T" min={1} max={20} step={0.5}
            value={travelTime} onChange={setTravelTime} unit="s"
            description="Higher T means it is worth staying longer per patch." />
          <Slider label="Max Patch Energy" symbol="a" min={5} max={50} step={1}
            value={maxEnergy} onChange={setMaxEnergy} unit=" E"
            description="Richer patches warrant more time." />
          <Slider label="Depletion Rate" symbol="b" min={0.05} max={0.5} step={0.01}
            value={depletionRate} onChange={setDepletionRate}
            description="Fast depletion means leave sooner." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
            <StatCard label="Optimal t*" value={tStar.toFixed(1)} unit="s" highlight sub="argmax R(t)" />
            <StatCard label="Max Rate" value={rStar.toFixed(3)} unit="E/s" highlight sub="R(t*)" />
            <StatCard label="Energy at t*" value={energyAtOptimal.toFixed(1)} unit="E" sub="G(t*)" />
            <StatCard label="Travel Time" value={travelTime} unit="s" sub="T (fixed cost)" />
          </div>
        </div>
      ),
      right: (
        <div>
          <ForagingGraph data={data} tStar={tStar} showRate={true} showGain={true} showDerivative={true} />
          <div style={{ marginTop: 16 }}>
            <BeeScene travelTime={travelTime} patchTime={Math.max(tStar, 1)} playing={true} />
          </div>
        </div>
      ),
    },

    // 06
    {
      number: "06",
      title: "Real Biology",
      subtitle: "Did calculus predict animal behaviour?",
      notes: [
        "End on the big picture. Charnov's theorem was tested in the field and it worked.",
        "Starlings carrying worms to their nest: researchers varied the distance to the feeding site (travel time T). Birds stayed longer when the site was farther, exactly as the model predicts.",
        "The animals didn't learn this. Evolution optimised it over millions of generations. Calculus just describes what evolution found.",
        "Zoom out: maximise a rate function, take the derivative, set it to zero. That same move is how Netflix optimises recommendations, how engineers design efficient engines, how economists model decisions.",
        "Closing line: a bee cannot do calculus. But calculus can do a bee.",
        "Thank Ms. Leyson and open for questions.",
      ],
      left: (
        <div>
          <p style={body}>
            Charnov published this theorem in 1976 and ecologists immediately started
            testing it in the field. What they found was that real animals actually do leave
            patches at approximately the time the model predicts.
          </p>
          <div style={{ ...box, marginBottom: 14 }}>
            <p style={{ color: "#4ade80", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Tested in nature</p>
            <p style={{ color: "rgba(240,244,240,0.7)", fontSize: 14, lineHeight: 2.1 }}>
              Bees leaving flower patches. Starlings loading up on worms.
              Wolves deciding when to move hunting grounds. Otters choosing
              how long to dive for sea urchins. In each case the predictions held.
            </p>
          </div>
          <p style={body}>
            The animals had no idea they were solving an optimisation problem.
            Evolution did the work over millions of generations, and calculus
            just turned out to describe the answer.
          </p>
          <div style={box}>
            <p style={{ color: "#a78bfa", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Worth noting</p>
            <p style={small}>
              The same core move — write a function, differentiate it, set the derivative to zero —
              shows up in machine learning, economics, and engineering constantly.
              It is one of the most practically useful things calculus can do.
            </p>
          </div>
        </div>
      ),
      right: (
        <div>
          <BeeScene travelTime={travelTime} patchTime={Math.max(tStar, 1)} playing={true} />
          <pre style={{ ...codeBox, marginTop: 16 }}>{`// The full solution in 8 lines
export function findOptimalTime(T, a, b) {
  let bestT = 0, bestR = -Infinity;
  for (let t = 0.1; t <= 60; t += 0.03) {
    const r = gainCurve(t,a,b) / (T + t);
    if (r > bestR) { bestR = r; bestT = t; }
  }
  return { tStar: bestT, rStar: bestR };
}`}</pre>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
            <StatCard label="Your t*" value={tStar.toFixed(1)} unit="s" highlight sub="from the model" />
            <StatCard label="Max Rate" value={rStar.toFixed(3)} unit="E/s" highlight sub="R(t*)" />
          </div>
        </div>
      ),
    },

  ];

  return { chapters, travelTime, maxEnergy, depletionRate };
}