import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_LOGO } from "../data";
import "./Preloader.css";

const STEPS = [
  { text: "Opening encrypted tunnel…",   icon: "🌀", progress: 20,  stage: "tunnel" },
  { text: "Handshaking WireGuard…",      icon: "🔗", progress: 42,  stage: "handshake" },
  { text: "Applying AES-256 cipher…",    icon: "🔐", progress: 65,  stage: "encrypt" },
  { text: "Masking public IP…",          icon: "🎭", progress: 85,  stage: "mask" },
  { text: "Tunnel locked & secure",      icon: "✅", progress: 100, stage: "locked" },
];

const PACKETS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  delay: (i * 0.22) % 2.8,
  lane: i % 3,
}));

export default function Preloader({ onDone }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [ipFrom] = useState("203.0.113." + (40 + Math.floor(Math.random() * 50)));
  const [ipTo] = useState("10." + (8 + Math.floor(Math.random() * 20)) + ".0." + (1 + Math.floor(Math.random() * 200)));

  useEffect(() => {
    if (stepIdx >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIdx((i) => i + 1), 720);
    return () => clearTimeout(t);
  }, [stepIdx]);

  useEffect(() => {
    const target = STEPS[stepIdx].progress;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= target) {
          clearInterval(interval);
          return target;
        }
        return p + 1;
      });
    }, 14);
    return () => clearInterval(interval);
  }, [stepIdx]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      document.body.style.overflow = "";
      setTimeout(onDone, 650);
    }, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  const stage = STEPS[stepIdx].stage;
  const masked = stepIdx >= 3;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="pre__orb pre__orb--1" />
          <div className="pre__orb pre__orb--2" />
          <div className="pre__orb pre__orb--3" />
          <div className="pre__grid" />

          <div className="pre__center">
            {/* VPN tunnel visual */}
            <div className="pre__tunnel">
              <div className="pre__tunnel-rail pre__tunnel-rail--l" />
              <div className="pre__tunnel-rail pre__tunnel-rail--r" />
              <div className="pre__tunnel-core">
                {PACKETS.map((p) => (
                  <span
                    key={p.id}
                    className={`pre__packet pre__packet--${p.lane}`}
                    style={{ animationDelay: `${p.delay}s` }}
                  />
                ))}
              </div>

              <div className="pre__nodes">
                <div className={`pre__node pre__node--you ${stage !== "tunnel" ? "pre__node--lit" : ""}`}>
                  <span className="pre__node-label">YOU</span>
                  <span className="pre__node-ip">{masked ? "•••.•••.•••.•••" : ipFrom}</span>
                </div>

                <div className="pre__node-mid">
                  <motion.div
                    className="pre__lock-ring"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="pre__lock-ring pre__lock-ring--2"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  <div className={`pre__lock ${stage === "locked" ? "pre__lock--ok" : ""}`}>
                    <img src={BRAND_LOGO} alt="" className="pre__lock-logo" />
                  </div>
                </div>

                <div className={`pre__node pre__node--exit ${masked ? "pre__node--lit" : ""}`}>
                  <span className="pre__node-label">EXIT NODE</span>
                  <span className="pre__node-ip pre__node-ip--safe">{masked ? ipTo : "awaiting…"}</span>
                </div>
              </div>
            </div>

            <motion.p
              className="pre__brand"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              VPN <span className="pre__brand-pro">PRO</span>{" "}
              <span className="pre__brand-max">MAX</span>
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={stepIdx}
                className="pre__step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
              >
                <span className="pre__step-icon">{STEPS[stepIdx].icon}</span>
                <span className="pre__step-text">{STEPS[stepIdx].text}</span>
              </motion.div>
            </AnimatePresence>

            <div className="pre__bar-wrap">
              <div className="pre__bar-track">
                <div className="pre__bar-fill" style={{ width: `${progress}%` }} />
                <div className="pre__bar-tip" style={{ left: `calc(${progress}% - 7px)` }} />
              </div>
              <div className="pre__bar-labels">
                <span className="pre__bar-pct">{progress}%</span>
                <span className="pre__bar-enc">
                  {stage === "locked" ? "SECURE · ZERO LOGS" : "AES-256 · WIREGUARD"}
                </span>
              </div>
            </div>

            <div className="pre__layers">
              {["Transport", "Cipher", "Identity"].map((label, i) => (
                <div
                  key={label}
                  className={`pre__layer ${stepIdx > i ? "pre__layer--on" : ""}`}
                >
                  <span className="pre__layer-dot" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
