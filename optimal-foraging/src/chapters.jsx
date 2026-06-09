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

    // 00
    {
      number: "00",
      title: "Optimal Foraging",
      subtitle: "A bee with something to say",
      notes: [
        "This is your title slide. Let the graphic sit for a few seconds and let the class react before you say anything.",
        "Then say: this bee has been thinking about this problem for about 47 million years and I spent a few weeks turning her findings into calculus.",
        "Pause, then hit Next.",
      ],
      left: (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", paddingTop: 20 }}>
          <p style={{ color: "rgba(74,222,128,0.6)", fontSize: 16, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20 }}>
            AP Calculus AB — Final Project
          </p>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: "#f0f4f0", lineHeight: 1.2, marginBottom: 16 }}>
            How long should a bee stay in a flower patch?
          </p>
          <p style={{ color: "rgba(240,244,240,0.5)", fontSize: 19, lineHeight: 1.75, maxWidth: 460, marginBottom: 28 }}>
            A question from biology with an answer from calculus.
            This bee has been thinking about it for 47 million years
            and finally has some data to share.
          </p>
          <div style={{
            background: "rgba(26,58,32,0.35)",
            border: "1px solid rgba(74,222,128,0.2)",
            borderRadius: 12,
            padding: "14px 20px",
            maxWidth: 420,
            marginBottom: 28,
          }}>
            <p style={{ color: "rgba(240,244,240,0.4)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>
              Tonight's talk
            </p>
            <p style={{ color: "#f0f4f0", fontSize: 17, lineHeight: 1.7 }}>
              "Leaving on Time: A Mathematical Framework for Not Wasting Your Life in a Mediocre Flower Patch"
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ height: 1, width: 40, background: "rgba(74,222,128,0.3)" }} />
            <p style={{ color: "rgba(240,244,240,0.25)", fontSize: 15 }}>Press Next to begin</p>
          </div>
        </div>
      ),
      right: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>

          {/* TED banner across the top */}
          <div style={{
            width: "100%",
            background: "rgba(220,40,40,0.15)",
            border: "1px solid rgba(220,40,40,0.35)",
            borderRadius: 10,
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ color: "rgba(220,60,60,1)", fontWeight: 900, fontSize: 28, letterSpacing: "0.08em" }}>BEE</span>
            <span style={{ color: "rgba(240,244,240,0.5)", fontSize: 15, fontStyle: "italic" }}>
              "Ideas Worth Pollinating"
            </span>
            <span style={{ color: "rgba(220,60,60,0.6)", fontSize: 13 }}>LIVE</span>
          </div>

          {/* Main SVG stage */}
          <svg viewBox="0 0 500 420" width="100%" style={{ display: "block" }}>

            <radialGradient id="stageGlow" cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor="rgba(220,40,40,0.12)" />
              <stop offset="100%" stopColor="rgba(10,26,15,0)" />
            </radialGradient>
            <rect x={0} y={0} width={500} height={420} fill="url(#stageGlow)" />

            <defs>
              <radialGradient id="spotGlow" cx="50%" cy="0%" r="100%">
                <stop offset="0%" stopColor="rgba(251,191,36,0.18)" />
                <stop offset="100%" stopColor="rgba(251,191,36,0)" />
              </radialGradient>
            </defs>
            <polygon points="250,0 180,270 320,270" fill="url(#spotGlow)" />

            {/* Stage platform */}
            <rect x={80} y={310} width={340} height={18} rx={4} fill="#1a3a20" />
            <rect x={80} y={325} width={340} height={60} rx={0} fill="rgba(26,58,32,0.4)" />
            <ellipse cx={250} cy={312} rx={170} ry={10} fill="rgba(74,222,128,0.06)" />
            <ellipse cx={250} cy={312} rx={60} ry={8} fill="rgba(220,40,40,0.2)" />

            {/* Podium */}
            <polygon points="210,220 290,220 278,310 222,310" fill="#1a3a20" stroke="rgba(74,222,128,0.2)" strokeWidth={1} />
            <polygon points="210,220 290,220 286,238 214,238" fill="#2a5a30" />
            <rect x={222} y={258} width={56} height={32} rx={4} fill="rgba(10,26,15,0.8)" stroke="rgba(74,222,128,0.3)" strokeWidth={1} />
            <text x={250} y={272} textAnchor="middle" fill="rgba(74,222,128,0.6)" fontSize={9} fontFamily="monospace">dR/dt = 0</text>
            <text x={250} y={283} textAnchor="middle" fill="#4ade80" fontSize={10} fontFamily="monospace" fontWeight="bold">t* = ?</text>

            {/* Projector screen */}
            <rect x={310} y={130} width={130} height={90} rx={6} fill="#061008" stroke="rgba(240,244,240,0.2)" strokeWidth={2} />
            <rect x={310} y={130} width={130} height={14} rx={0} fill="rgba(220,40,40,0.4)" />
            <text x={375} y={142} textAnchor="middle" fill="white" fontSize={9} fontFamily="Inter" fontWeight={600}>PATCH EFFICIENCY</text>
            {[[0, 30, "#4ade80"], [1, 46, "#4ade80"], [2, 38, "#4ade80"], [3, 52, "#fbbf24"], [4, 34, "#4ade80"], [5, 28, "#4ade80"]].map(([i, h, c]) => (
              <rect key={i} x={322 + i * 18} y={210 - h} width={12} height={h} fill={c} opacity={0.85} />
            ))}
            <line x1={318} y1={210} x2={432} y2={210} stroke="rgba(240,244,240,0.2)" strokeWidth={1} />
            <text x={375} y={224} textAnchor="middle" fill="rgba(240,244,240,0.35)" fontSize={8} fontFamily="Inter">time in patch (s)</text>
            <rect x={368} y={220} width={14} height={30} fill="rgba(240,244,240,0.1)" rx={2} />
            <ellipse cx={375} cy={252} rx={20} ry={5} fill="rgba(240,244,240,0.08)" />

            {/* Bee body */}
            <ellipse cx={250} cy={195} rx={32} ry={22} fill="#fbbf24" />
            <rect x={236} y={173} width={11} height={44} fill="#1a1a00" opacity={0.4} rx={3} />
            <rect x={250} y={173} width={9} height={44} fill="#1a1a00" opacity={0.3} rx={3} />
            {/* Wings */}
            <ellipse cx={238} cy={172} rx={26} ry={14} fill="rgba(200,240,255,0.55)" stroke="rgba(200,240,255,0.3)" strokeWidth={1} />
            <ellipse cx={263} cy={172} rx={26} ry={14} fill="rgba(200,240,255,0.55)" stroke="rgba(200,240,255,0.3)" strokeWidth={1} />
            {/* Head */}
            <circle cx={278} cy={193} r={16} fill="#fbbf24" />
            <circle cx={283} cy={189} r={4} fill="#1a1a00" />
            <circle cx={284} cy={188} r={1.5} fill="white" />
            <path d="M274,198 Q279,204 286,199" stroke="#1a1a00" strokeWidth={2} fill="none" strokeLinecap="round" />
            {/* Antennae */}
            <line x1={276} y1={178} x2={268} y2={162} stroke="#d97706" strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={268} cy={160} r={3.5} fill="#d97706" />
            <line x1={282} y1={177} x2={290} y2={162} stroke="#d97706" strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={291} cy={160} r={3.5} fill="#d97706" />
            {/* Arms raised */}
            <line x1={278} y1={187} x2={298} y2={172} stroke="#d97706" strokeWidth={2} strokeLinecap="round" />
            <line x1={282} y1={185} x2={304} y2={174} stroke="#d97706" strokeWidth={2} strokeLinecap="round" />
            {/* Stinger */}
            <polygon points="218,195 208,199 208,191" fill="#d97706" />
            {/* Mic */}
            <rect x={293} y={205} width={5} height={14} rx={2} fill="rgba(240,244,240,0.4)" />
            <rect x={290} y={202} width={11} height={7} rx={3} fill="rgba(240,244,240,0.3)" />

            {/* Speech bubble */}
            <rect x={40} y={110} width={165} height={90} rx={14} fill="#1a3a20" stroke="rgba(74,222,128,0.4)" strokeWidth={2} />
            <polygon points="190,162 210,175 196,170" fill="#1a3a20" stroke="rgba(74,222,128,0.4)" strokeWidth={1.5} />
            <text x={122} y={135} textAnchor="middle" fill="#4ade80" fontSize={14} fontFamily="Inter" fontWeight={600}>good morning.</text>
            <text x={122} y={154} textAnchor="middle" fill="rgba(240,244,240,0.8)" fontSize={12} fontFamily="Inter">I have thoughts</text>
            <text x={122} y={170} textAnchor="middle" fill="rgba(240,244,240,0.8)" fontSize={12} fontFamily="Inter">about flowers.</text>
            <text x={122} y={190} textAnchor="middle" fill="rgba(240,244,240,0.45)" fontSize={11} fontFamily="Inter" fontStyle="italic">this will take 5 min.</text>

            {/* Pointer to screen */}
            <line x1={300} y1={172} x2={318} y2={160} stroke="rgba(240,244,240,0.25)" strokeWidth={1.5} strokeDasharray="4 3" />

            {/* Audience row 1 */}
            {[70, 110, 150, 190, 230, 270, 310, 350, 390, 430].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={355} r={11} fill="#1a3a20" stroke="rgba(74,222,128,0.2)" strokeWidth={1} />
                <circle cx={x} cy={342} r={8} fill="#1a3a20" stroke="rgba(74,222,128,0.15)" strokeWidth={1} />
                <circle cx={x - 3} cy={341} r={1.2} fill="rgba(240,244,240,0.4)" />
                <circle cx={x + 3} cy={341} r={1.2} fill="rgba(240,244,240,0.4)" />
              </g>
            ))}

            {/* Audience row 2 */}
            {[90, 135, 180, 225, 270, 315, 360, 405].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={385} r={9} fill="rgba(26,58,32,0.6)" stroke="rgba(74,222,128,0.1)" strokeWidth={1} />
                <circle cx={x} cy={374} r={7} fill="rgba(26,58,32,0.6)" stroke="rgba(74,222,128,0.1)" strokeWidth={1} />
              </g>
            ))}

            {/* One hand raised */}
            <line x1={150} y1={334} x2={155} y2={318} stroke="rgba(240,244,240,0.3)" strokeWidth={2} strokeLinecap="round" />

            <text x={250} y={408} textAnchor="middle" fill="rgba(220,60,60,0.5)" fontSize={11} fontFamily="Inter" fontWeight={700} letterSpacing={3}>
              B E E × T E D
            </text>
          </svg>
        </div>
      ),
    },

    // 01
    {
      number: "01",
      title: "The Question",
      subtitle: "A bee and a genuinely hard decision",
      notes: [
        "Ask the class: imagine you are a bee in a flower patch collecting nectar. When do you leave?",
        "Let them think. Most instincts are wrong. Staying until it is empty wastes time. Leaving too early wastes the flight.",
        "Introduce Charnov. A biologist who in 1976 asked this exact question and used calculus to find the answer.",
        "Point at the bee animation. It forages, the flower depletes and turns grey, then it flies to the next one. That cycle is exactly what the model describes.",
      ],
      left: (
        <div>
          <p style={body}>
            A bee has one job: collect as much nectar as possible. The catch is that
            every flower patch gets less productive over time. The more you take,
            the less there is, and at some point staying longer just is not worth it.
          </p>
          <p style={body}>
            But leaving early has a cost too. Flying to the next patch takes time,
            and that travel time is wasted if the current patch still had something left to give.
          </p>
          <div style={box}>
            <p style={{ color: "#4ade80", fontSize: 18, fontWeight: 600, marginBottom: 10 }}>The central question</p>
            <p style={{ color: "rgba(240,244,240,0.85)", fontSize: 18, lineHeight: 1.7 }}>
              How long should a forager stay in a patch to get the most energy
              out of an entire foraging trip, not just this one stop?
            </p>
            <p style={{ color: "rgba(240,244,240,0.4)", fontSize: 16, marginTop: 10 }}>
              Eric Charnov posed this in 1976 and solved it with calculus.
            </p>
          </div>
          <p style={{ ...small, marginTop: 16 }}>
            Watch the bee on the right. It forages until the flower goes grey, then flies to the next one.
            Travel time T is fixed. Patch time is what we need to figure out.
          </p>
        </div>
      ),
      right: (
        <div>
          <BeeScene travelTime={travelTime} patchTime={4} playing={true} />
          <div style={{ marginTop: 18 }}>
            <Slider label="Travel Time" symbol="T" min={1} max={15} step={0.5}
              value={travelTime} onChange={setTravelTime} unit="s" />
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
        "We need a function that captures diminishing returns. The saturating exponential does this perfectly.",
        "Walk through G(t) = a(1 minus e to the negative bt). a is the total nectar, the ceiling. b is how fast you hit it.",
        "As t gets very large, the exponential term goes to zero and G(t) approaches a. You can never extract more than what is there.",
        "Point at the gold curve. It rises fast then flattens. Each extra second gives you less than the one before.",
        "Drag b up. The curve bends much sooner. Drag a up. The ceiling rises. One line of code captures all of this.",
      ],
      left: (
        <div>
          <p style={body}>
            We need a function that describes how much energy a forager collects
            over time in a single patch. A saturating exponential works well here
            because it rises steeply at first and then levels off as the patch runs dry.
          </p>
          <div style={mathBox}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#fbbf24", fontStyle: "italic" }}>
              G(t) = a(1 − e<sup>−bt</sup>)
            </span>
          </div>
          <div style={{ ...box, marginBottom: 14 }}>
            <p style={{ ...small, lineHeight: 2.1 }}>
              <span style={{ color: "#4ade80" }}>a</span> is the total nectar in the patch, the ceiling you cannot exceed.<br />
              <span style={{ color: "#4ade80" }}>b</span> controls how fast the patch depletes.<br />
              When t gets very large, G(t) approaches a but never quite reaches it.
            </p>
          </div>
          <pre style={codeBox}>{`// src/math.js
export function gainCurve(t, a, b) {
  return a * (1 - Math.exp(-b * t));
}`}</pre>
        </div>
      ),
      right: (
        <div>
          <ForagingGraph data={data} tStar={null} showRate={false} showGain={true} showDerivative={false} />
          <div style={{ marginTop: 10 }}>
            <Slider label="Max Patch Energy" symbol="a" min={5} max={50} step={1}
              value={maxEnergy} onChange={setMaxEnergy} unit=" E" />
            <Slider label="Depletion Rate" symbol="b" min={0.05} max={0.5} step={0.01}
              value={depletionRate} onChange={setDepletionRate} />
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
        "The key insight: the bee does not want maximum total energy. It wants maximum energy per unit time.",
        "Example: 100 seconds for 50 units is 0.5 per second. 10 seconds for 30 units is 3 per second. The second is much better even though the total is lower.",
        "R(t) = G(t) divided by (T plus t). The denominator is total time. Travel time T is fixed and already paid. Patch time t is what we control.",
        "The green curve has a clear peak. That peak is t-star. Drag T higher and watch it shift right.",
        "This is the key biological prediction: when travel is expensive, stay longer per patch. Real animals do exactly this.",
      ],
      left: (
        <div>
          <p style={body}>
            Maximising total energy is not actually the right goal.
            What matters is energy per second, because every second of flight
            is a second not spent collecting from somewhere productive.
          </p>
          <div style={mathBox}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#4ade80", fontStyle: "italic" }}>
              R(t) = G(t) / (T + t)
            </span>
          </div>
          <p style={body}>
            R(t) is the overall foraging rate. The denominator accounts for both
            the travel time T and the patch time t, so no second goes unaccounted for.
            This is the function we want to maximise.
          </p>
          <pre style={codeBox}>{`export function totalRate(t, T, a, b) {
  return gainCurve(t, a, b) / (T + t);
}`}</pre>
          <div style={box}>
            <p style={small}>
              Increase T below and watch the green peak shift to the right.
              Expensive travel makes each visit worth more, so the bee should stay longer.
            </p>
          </div>
        </div>
      ),
      right: (
        <div>
          <ForagingGraph data={data} tStar={tStar} showRate={true} showGain={true} showDerivative={false} />
          <div style={{ marginTop: 10 }}>
            <Slider label="Travel Time" symbol="T" min={1} max={20} step={0.5}
              value={travelTime} onChange={setTravelTime} unit="s" />
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
      subtitle: "Finding t-star with derivatives",
      notes: [
        "To maximise R(t), differentiate it and set the result to zero.",
        "R(t) is a fraction so use the quotient rule. Top is G(t), bottom is (T plus t). Derivative of the bottom is just 1 since T is constant.",
        "You get G-prime of t times (T plus t), minus G(t), all over (T plus t) squared.",
        "The denominator is always positive so only the numerator can be zero. Set it to zero and rearrange.",
        "G-prime of t-star times (T plus t-star) equals G(t-star). Divide both sides by (T plus t-star) and you get G-prime of t-star equals R(t-star).",
        "Toggle the G-prime curve on the graph. T-star is exactly where the purple line crosses the green one.",
      ],
      left: (
        <div>
          <p style={body}>
            To find where R(t) peaks, we differentiate it and set the result to zero.
            R(t) is a fraction so we reach for the quotient rule.
          </p>
          <div style={mathBox}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#a78bfa", fontStyle: "italic", lineHeight: 2.2 }}>
              dR/dt = [G′(t)·(T+t) − G(t)] / (T+t)² = 0
            </span>
          </div>
          <p style={body}>
            The denominator is always positive so we only need the numerator to equal zero.
            After simplifying that gives us something surprisingly clean.
          </p>
          <div style={mathBox}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#4ade80", fontStyle: "italic" }}>
              G′(t*) = R(t*)
            </span>
          </div>
          <p style={body}>
            Leave when the marginal gain rate equals the average foraging rate.
            That is the Marginal Value Theorem.
          </p>
          <div style={box}>
            <p style={small}>
              Toggle G′(t) on the graph. T-star is where the purple line meets the green one.
            </p>
          </div>
        </div>
      ),
      right: (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
            <button onClick={() => setShowDerivative(v => !v)}
              style={{
                fontSize: 15, padding: "8px 18px", borderRadius: 999, cursor: "pointer",
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
              value={travelTime} onChange={setTravelTime} unit="s" />
          </div>
        </div>
      ),
    },

    // 05
    {
      number: "05",
      title: "The Playground",
      subtitle: "Try to break it",
      notes: [
        "Open it up. Ask someone in the class to call out a value for T, a, or b and show what happens.",
        "Try T equals 20. T-star shoots up. The model is saying: you paid a lot to get here, so stay a while.",
        "Try T equals 1. The bee barely stays. Fresh patches are close so there is no reason to drain this one.",
        "Try high a with high b. Rich patch but it depletes fast. The model finds the sweet spot automatically.",
        "The bee animation at the bottom right is running on the actual t-star value so you can see the optimal behavior live.",
      ],
      left: (
        <div>
          <p style={body}>All three parameters at once. Push them to extremes and see how t-star responds.</p>
          <Slider label="Travel Time" symbol="T" min={1} max={20} step={0.5}
            value={travelTime} onChange={setTravelTime} unit="s" />
          <Slider label="Max Patch Energy" symbol="a" min={5} max={50} step={1}
            value={maxEnergy} onChange={setMaxEnergy} unit=" E" />
          <Slider label="Depletion Rate" symbol="b" min={0.05} max={0.5} step={0.01}
            value={depletionRate} onChange={setDepletionRate} />
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
      subtitle: "Calculus predicted this before anyone tested it",
      notes: [
        "Charnov published in 1976 and ecologists went out to test it. The predictions held.",
        "The starling study is the cleanest example. Researchers varied how far birds had to fly to a worm pile. Birds stayed longer when the pile was farther away, exactly as t-star predicts.",
        "The animals were not doing calculus. Evolution found the optimum over millions of generations. Calculus just turns out to describe it.",
        "Closing line: a bee cannot do calculus. But calculus can do a bee.",
        "Thank Ms. Leyson and open for questions.",
      ],
      left: (
        <div>
          <p style={body}>
            Charnov published the theorem in 1976 and biologists immediately went out to test it.
            What they found was that real animals leave patches at almost exactly the time the model predicts.
          </p>
          <div style={{ ...box, marginBottom: 18 }}>
            <p style={{ color: "#4ade80", fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Tested in the field</p>
            <p style={{ color: "rgba(240,244,240,0.7)", fontSize: 18, lineHeight: 2.1 }}>
              Bees leaving flower patches. Starlings loading up on worms before flying back to the nest.
              Wolves deciding when to move to a new hunting area. Otters choosing how long to dive for sea urchins.
              In every case the predictions held up.
            </p>
          </div>
          <p style={body}>
            The animals had no idea they were solving an optimisation problem.
            Evolution did that work over millions of years.
            Calculus just turned out to describe the answer.
          </p>
          <div style={box}>
            <p style={{ color: "#a78bfa", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Worth noting</p>
            <p style={small}>
              The same move, writing a function, differentiating it, setting the derivative to zero,
              shows up in machine learning, economics, and engineering all the time.
              It is one of the most useful things calculus can actually do.
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