import React from "react";
import { motion } from "framer-motion";
import { scrollToProductIndex } from "../utils/scrollToSection";
import "./Hero.css";

const NODES = [
  { label: "US East",  flag: "🇺🇸", top: "18%", left: "18%", delay: "0s",   ping: "12ms" },
  { label: "London",   flag: "🇬🇧", top: "14%", left: "58%", delay: "0.4s", ping: "28ms" },
  { label: "Tokyo",    flag: "🇯🇵", top: "32%", left: "82%", delay: "0.8s", ping: "48ms" },
  { label: "Sydney",   flag: "🇦🇺", top: "72%", left: "78%", delay: "1.2s", ping: "86ms" },
  { label: "Germany",  flag: "🇩🇪", top: "42%", left: "48%", delay: "0.6s", ping: "32ms" },
  { label: "Singapore",flag: "🇸🇬", top: "58%", left: "72%", delay: "1s",   ping: "22ms" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__grid" aria-hidden />

      <div className="hero__content">
        <div className="hero__text">
          <motion.div className="hero__eyebrow" {...fadeUp(0.1)}>
            <span className="hero__eyebrow-dot" />
            🔒 VPN PRO MAX · Trusted Worldwide
          </motion.div>

          <motion.h1 className="hero__headline" {...fadeUp(0.25)}>
            Browse Anonymously.<br />
            <span className="glow-text">Stay Invisible.</span>
          </motion.h1>

          <motion.p className="hero__sub" {...fadeUp(0.35)}>
            Military-grade <strong>AES-256 encryption</strong>. <strong>8 servers</strong> across <strong>4 continents</strong>.
            <strong> Zero logs</strong>. Available on <strong>Windows & Android</strong>.
          </motion.p>

          <motion.div className="hero__actions" {...fadeUp(0.45)}>
            <button
              type="button"
              className="hero__btn-primary"
              onClick={() => scrollToProductIndex(0)}
            >
              <span>🔒 Get Protected Now</span>
              <span className="hero__btn-arrow">→</span>
            </button>
          </motion.div>

          <motion.div className="hero__stats" {...fadeUp(0.55)}>
            <div className="hero__stat"><span className="hero__stat-num">50M+</span><span className="hero__stat-label">Protected Users</span></div>
            <div className="hero__stat"><span className="hero__stat-num">99.9%</span><span className="hero__stat-label">Uptime</span></div>
            <div className="hero__stat"><span className="hero__stat-num">8</span><span className="hero__stat-label">VPN Servers</span></div>
            <div className="hero__stat"><span className="hero__stat-num">AES-256</span><span className="hero__stat-label">🔐 Encryption</span></div>
          </motion.div>

          <motion.div className="hero__badges" {...fadeUp(0.65)}>
            {["Zero Logs", "Kill Switch", "DNS Leak Protection"].map((b) => (
              <span key={b} className="hero__badge">✓ {b}</span>
            ))}
          </motion.div>
        </div>

        {/* VPN shield + encrypted globe */}
        <motion.div
          className="hero__viz"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <div className="hero__viz-glow" />

          <div className="hero__globe hero__globe--float">
            <div className="hero__globe-ring hero__globe-ring--outer" />
            <div className="hero__globe-ring hero__globe-ring--mid" />
            <div className="hero__globe-sphere">
              <div className="hero__globe-lat" />
              <div className="hero__globe-lat hero__globe-lat--2" />
              <div className="hero__globe-lon" />
              <div className="hero__globe-lon hero__globe-lon--2" />
              <div className="hero__globe-core">
                <span className="hero__globe-lock">🔒</span>
              </div>
              {NODES.map((n) => (
                <div
                  key={n.label}
                  className="hero__globe-node"
                  style={{ top: n.top, left: n.left, animationDelay: n.delay }}
                  title={n.label}
                >
                  <span className="hero__globe-node-ping" />
                  <span className="hero__globe-node-dot" />
                </div>
              ))}
            </div>

            <div className="hero__shield-badge">
              <span className="hero__shield-badge-title">AES-256</span>
              <span className="hero__shield-badge-sub">Tunnel Active</span>
            </div>
          </div>

          <div className="hero__ip-card glass">
            <div className="hero__ip-row">
              <span className="hero__ip-label">Public IP</span>
              <span className="hero__ip-val hero__ip-val--masked">•••.•••.•••.•••</span>
            </div>
            <div className="hero__ip-arrow">↓ encrypted ↓</div>
            <div className="hero__ip-row">
              <span className="hero__ip-label">Exit Node</span>
              <span className="hero__ip-val hero__ip-val--safe">🇸🇬 Singapore · 12ms</span>
            </div>
          </div>

          {NODES.slice(0, 3).map((n, i) => (
            <div
              key={n.label}
              className="hero__float-badge glass"
              style={{ animationDelay: `${i * 0.7}s` }}
            >
              <span>{n.flag}</span>
              {n.label}
              <span className="hero__float-ping">{n.ping}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
