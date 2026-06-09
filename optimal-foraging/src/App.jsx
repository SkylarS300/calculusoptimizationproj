import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChapters } from "./chapters";

function SpeakerNotes({ notes, current, total, title, onPrev, onNext }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#050f07",
      color: "#f0f4f0",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      padding: "24px 20px",
      maxWidth: 640,
      margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid rgba(74,222,128,0.2)" }}>
        <p style={{ color: "rgba(74,222,128,0.6)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
          Speaker Notes
        </p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: "#f0f4f0", lineHeight: 1.2 }}>
          {title}
        </h2>
      </div>

      {/* Notes */}
      <div style={{ flex: 1 }}>
        {notes.map((note, i) => (
          <div key={i} style={{
            background: "rgba(26,58,32,0.4)",
            border: "1px solid rgba(74,222,128,0.15)",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 12,
          }}>
            <p style={{ color: "rgba(240,244,240,0.85)", fontSize: 17, lineHeight: 1.75 }}>{note}</p>
          </div>
        ))}
      </div>

      {/* Mobile nav */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 24,
        paddingTop: 16,
        borderTop: "1px solid rgba(240,244,240,0.06)",
        gap: 12,
      }}>
        <button
          onClick={onPrev}
          disabled={current === 0}
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 10,
            fontSize: 16,
            cursor: "pointer",
            border: "1px solid rgba(240,244,240,0.15)",
            color: "rgba(240,244,240,0.5)",
            background: "transparent",
            opacity: current === 0 ? 0.3 : 1,
          }}>
          ← Prev
        </button>
        <span style={{ color: "rgba(240,244,240,0.25)", fontSize: 14, whiteSpace: "nowrap" }}>
          {current + 1} / {total}
        </span>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 10,
            fontSize: 16,
            cursor: "pointer",
            border: "1px solid rgba(74,222,128,0.4)",
            color: "#4ade80",
            background: "rgba(74,222,128,0.06)",
            opacity: current === total - 1 ? 0.3 : 1,
          }}>
          Next →
        </button>
      </div>

      <p style={{ color: "rgba(240,244,240,0.2)", fontSize: 12, textAlign: "center", marginTop: 12 }}>
        Only visible at ?notes
      </p>
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { chapters } = useChapters();
  const total = chapters.length;
  const chapter = chapters[current];
  const isNotes = new URLSearchParams(window.location.search).has("notes");

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  const go = (dir) => {
    const next = current + dir;
    if (next < 0 || next >= total) return;
    setDirection(dir);
    setCurrent(next);
  };

if (isNotes) {
  return (
    <SpeakerNotes
      notes={chapter.notes}
      current={current}
      total={total}
      title={chapter.title}
      onPrev={() => go(-1)}
      onNext={() => go(1)}
    />
  );
}

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a1a0f", overflow: "hidden" }}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 40px", borderBottom: "1px solid rgba(240,244,240,0.06)", flexShrink: 0 }}>
        <span style={{ color: "rgba(74,222,128,0.5)", fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500 }}>
          AP Calculus AB
        </span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {chapters.map((c, i) => (
            <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              title={c.title}
              style={{
                width: i === current ? 28 : 9, height: 9, borderRadius: 5,
                background: i === current ? "#4ade80" : i < current ? "rgba(74,222,128,0.35)" : "rgba(240,244,240,0.15)",
                border: "none", cursor: "pointer", transition: "all 0.25s", padding: 0,
              }} />
          ))}
        </div>
        <span style={{ color: "rgba(240,244,240,0.25)", fontSize: 13, fontVariantNumeric: "tabular-nums" }}>
          {current + 1} / {total}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -48 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Chapter header */}
            <div style={{ padding: "20px 40px 0", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "rgba(74,222,128,0.45)", letterSpacing: "0.1em" }}>
                  {chapter.number}
                </span>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 52, color: "#f0f4f0", lineHeight: 1 }}>
                  {chapter.title}
                </h1>
              </div>
              <p style={{ color: "rgba(240,244,240,0.4)", fontSize: 20, fontStyle: "italic" }}>
                {chapter.subtitle}
              </p>
            </div>

            {/* Two columns */}
            <div style={{
              flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: 24, padding: "14px 32px", overflow: "auto", minHeight: 0,
            }}>
              <div style={{ overflow: "auto" }}>{chapter.left}</div>
              <div style={{ overflow: "auto" }}>{chapter.right}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 40px", borderTop: "1px solid rgba(240,244,240,0.06)", flexShrink: 0 }}>
        <button onClick={() => go(-1)} disabled={current === 0}
          style={{ padding: "9px 24px", borderRadius: 8, fontSize: 14, cursor: "pointer", border: "1px solid rgba(240,244,240,0.15)", color: "rgba(240,244,240,0.5)", background: "transparent", opacity: current === 0 ? 0.3 : 1 }}>
          ← Prev
        </button>
        <p style={{ color: "rgba(240,244,240,0.2)", fontSize: 12, fontStyle: "italic" }}>{chapter.subtitle}</p>
        <button onClick={() => go(1)} disabled={current === total - 1}
          style={{ padding: "9px 24px", borderRadius: 8, fontSize: 14, cursor: "pointer", border: "1px solid rgba(74,222,128,0.4)", color: "#4ade80", background: "rgba(74,222,128,0.06)", opacity: current === total - 1 ? 0.3 : 1 }}>
          Next →
        </button>
      </div>
    </div>
  );
}