import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TunnelShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: 0,
    title: "Your Real IP Hidden",
    tag: "Identity Cloak",
    desc: "Your public address never leaves your device. Every request enters an encrypted VPN tunnel first — trackers see nothing.",
    visual: "cloak",
  },
  {
    id: 1,
    title: "AES-256 Tunnel",
    tag: "Military Cipher",
    desc: "Traffic is wrapped in military-grade AES-256 encryption over WireGuard. Even on public Wi-Fi, your data stays unreadable.",
    visual: "cipher",
  },
  {
    id: 2,
    title: "Global Exit Node",
    tag: "8 Servers · 4 Continents",
    desc: "You emerge from a secure exit node anywhere in our network. Location spoofed. Latency optimized. Zero logs retained.",
    visual: "exit",
  },
];

export default function TunnelShowcase() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const visualsRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const visuals = visualsRef.current.filter(Boolean);
      gsap.set(visuals, { opacity: 0, scale: 0.92, position: "absolute", inset: 0 });
      gsap.set(visuals[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=240%",
          pin: pinRef.current,
          scrub: 1.15,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * STAGES.length),
              STAGES.length - 1
            );
            setActiveIdx(idx);
          },
        },
      });

      for (let i = 0; i < visuals.length - 1; i++) {
        tl.to(visuals[i], { opacity: 0, scale: 0.9, duration: 0.5 }, i * 1.2)
          .fromTo(
            visuals[i + 1],
            { opacity: 0, scale: 1.06 },
            { opacity: 1, scale: 1, duration: 0.7 },
            i * 1.2 + 0.25
          );
      }
      tl.to({}, { duration: 0.45 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="tun" ref={sectionRef} id="tunnel">
      <div className="tun__pin" ref={pinRef}>
        <div className="tun__left">
          <div className="tun__stage-wrap">
            {/* Stage 0 — IP cloak */}
            <div className="tun__stage" ref={(el) => (visualsRef.current[0] = el)}>
              <div className="tun__cloak">
                <div className="tun__cloak-card tun__cloak-card--raw">
                  <span className="tun__cloak-label">Exposed</span>
                  <span className="tun__cloak-ip">203.0.113.87</span>
                  <span className="tun__cloak-meta">ISP · City · Device</span>
                </div>
                <div className="tun__cloak-beam" />
                <div className="tun__cloak-card tun__cloak-card--safe">
                  <span className="tun__cloak-label">Protected</span>
                  <span className="tun__cloak-ip">•••.•••.•••.•••</span>
                  <span className="tun__cloak-meta">Identity masked</span>
                </div>
              </div>
            </div>

            {/* Stage 1 — cipher layers */}
            <div className="tun__stage" ref={(el) => (visualsRef.current[1] = el)}>
              <div className="tun__cipher">
                <div className="tun__cipher-ring tun__cipher-ring--1" />
                <div className="tun__cipher-ring tun__cipher-ring--2" />
                <div className="tun__cipher-ring tun__cipher-ring--3" />
                <div className="tun__cipher-core">
                  <span className="tun__cipher-icon">🔐</span>
                  <span className="tun__cipher-title">AES-256</span>
                  <span className="tun__cipher-sub">WireGuard Protocol</span>
                </div>
                <div className="tun__cipher-bits" aria-hidden>
                  {"101100101101011010".split("").map((bit, i) => (
                    <span key={i} className="tun__cipher-bit" style={{ "--i": i }}>
                      {bit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage 2 — exit node globe */}
            <div className="tun__stage" ref={(el) => (visualsRef.current[2] = el)}>
              <div className="tun__exit">
                <div className="tun__exit-orbit" />
                <div className="tun__exit-orbit tun__exit-orbit--2" />
                <div className="tun__exit-hub">
                  <span>🌍</span>
                  <strong>Exit Node</strong>
                  <em>Singapore · 12ms</em>
                </div>
                {[
                  { flag: "🇺🇸", t: "12%", l: "20%" },
                  { flag: "🇬🇧", t: "18%", l: "70%" },
                  { flag: "🇯🇵", t: "55%", l: "78%" },
                  { flag: "🇩🇪", t: "62%", l: "28%" },
                ].map((n) => (
                  <div
                    key={n.flag}
                    className="tun__exit-node"
                    style={{ top: n.t, left: n.l }}
                  >
                    {n.flag}
                  </div>
                ))}
                <div className="tun__exit-badge">8 Servers Online</div>
              </div>
            </div>
          </div>
        </div>

        <div className="tun__right">
          <span className="tun__eyebrow">🔒 How VPN PRO MAX Works</span>
          <h2 className="tun__title">
            Your Traffic. <span className="glow-text">Fully Sealed.</span>
          </h2>

          <div className="tun__steps">
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                className={"tun__step" + (i === activeIdx ? " tun__step--active" : "")}
              >
                <div
                  className="tun__step-num"
                  style={
                    i === activeIdx
                      ? { background: "linear-gradient(135deg,#00aeef,#d946ef)", color: "#fff" }
                      : {}
                  }
                >
                  {i + 1}
                </div>
                <div className="tun__step-text">
                  <span className="tun__step-title">{s.title}</span>
                  <span className="tun__step-tag">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeIdx}
              className="tun__desc"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {STAGES[activeIdx].desc}
            </motion.p>
          </AnimatePresence>

          <div className="tun__dots">
            {STAGES.map((_, i) => (
              <div
                key={i}
                className="tun__dot"
                style={
                  i === activeIdx
                    ? { width: 28, background: "linear-gradient(90deg,#00aeef,#fbbf24)", opacity: 1 }
                    : { width: 8, background: "rgba(255,255,255,0.2)", opacity: 0.5 }
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
