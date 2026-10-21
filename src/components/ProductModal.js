import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCT_THEMES } from "../productThemes";
import { ModalVisual } from "./ProductVisuals";
import "./ProductModal.css";

gsap.registerPlugin(ScrollTrigger);

const DOWNLOADS = [
  {
    id: "windows",
    platform: "Windows",
    file: "VPNProMax-Setup.exe",
    href: "https://vpnpromax.com/VPNProMax-Setup.exe",
    hint: "Desktop installer · .exe",
  },
  {
    id: "android",
    platform: "Android",
    file: "VPNProMax.apk",
    href: "https://vpnpromax.com/VPNProMax.apk",
    hint: "Mobile app · .apk",
  },
];

const MODAL_DATA = {
  1: {
    headline: "8 Servers. 4 Continents. Total Privacy.",
    about: "vpnpromax VPN is built for Windows and Android with military-grade encryption. Connect across 8 global servers spanning 4 continents — your identity stays hidden, your freedom stays unlimited.",
    highlights: [
      { icon: "🌍", title: "8 Servers • 4 Continents", desc: "Fast, reliable servers across four continents worldwide." },
      { icon: "💻", title: "Windows App",                desc: "Full-featured desktop client built for Windows PCs." },
      { icon: "📱", title: "Android App",                desc: "Lightweight Android app — connect with one tap." },
      { icon: "🔒", title: "AES-256 Encryption",         desc: "Same standard used by governments and banks worldwide." },
      { icon: "📵", title: "Strict Zero Logs",             desc: "We never store, track, or share your activity. Ever." },
      { icon: "⚡", title: "WireGuard Protocol",           desc: "Blazing-fast tunnels with iron-clad security." },
    ],
    stats: [["8", "Servers"], ["4", "Continents"], ["Windows", "& Android"], ["0", "Logs Stored"]],
  },
};

function enableMobileNormalizeScroll() {
  if (window.matchMedia("(max-width: 640px)").matches) {
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      type: "touch,wheel,pointer",
    });
  }
}

export default function ProductModal({ product, onClose }) {
  const data  = MODAL_DATA[product?.id];
  const theme = PRODUCT_THEMES[product?.id];
  const isLight = theme?.mode === "light";
  const panelRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!product) return;

    // GSAP normalizeScroll blocks touch inside overlays — disable while modal is open
    ScrollTrigger.normalizeScroll(false);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      enableMobileNormalizeScroll();
    };
  }, [product]);

  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!product || !data || !theme) {
    return (
      <AnimatePresence>
        {null}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="pm__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            className={`pm__panel${isLight ? " pm__panel--light" : ""}`}
            style={{ background: theme.bg }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              // iOS: transform on parent breaks overflow scroll — clear after open
              const el = panelRef.current;
              if (el && product) {
                el.style.transform = "none";
              }
              if (scrollRef.current) {
                scrollRef.current.scrollTop = 0;
              }
            }}
          >
            <div className="pm__orb pm__orb--1" style={{ background: theme.orb1 }} />
            <div className="pm__orb pm__orb--2" style={{ background: theme.orb2 }} />

            <button className={`pm__close${isLight ? " pm__close--light" : ""}`} onClick={onClose} aria-label="Close">✕</button>

            <div className="pm__scroll" ref={scrollRef}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ModalVisual id={product.id} accent={theme.accent} accent2={theme.accent2} accent3={theme.accent3} />
              </motion.div>

              <div className="pm__hero">
                <div>
                  <div
                    className="pm__eyebrow"
                    style={{ color: theme.accent, borderColor: theme.accent + "44", background: theme.accent + (isLight ? "14" : "12") }}
                  >
                    {product.emoji} {product.name}
                  </div>
                  <h2
                    className="pm__headline"
                    style={{
                      WebkitTextFillColor: "transparent",
                      background: theme.headlineGradient,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {data.headline}
                  </h2>
                  <p className="pm__about">{data.about}</p>
                </div>

                <div className="pm__stats">
                  {data.stats.map(([num, label], i) => (
                    <div
                      key={i}
                      className="pm__stat"
                      style={{
                        borderColor: theme.accent + "33",
                        background: isLight ? "rgba(255,255,255,0.75)" : theme.accent + "08",
                      }}
                    >
                      <span className="pm__stat-num" style={{ color: theme.accent }}>{num}</span>
                      <span className="pm__stat-label">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pm__divider" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />

              <div className="pm__downloads">
                <div className="pm__downloads-head">
                  <h3 className="pm__section-title pm__section-title--inline">Download VPN PRO MAX</h3>
                  <p className="pm__downloads-sub">Official apps for Windows &amp; Android — free to install</p>
                </div>
                <div className="pm__download-grid">
                  {DOWNLOADS.map((d, i) => (
                    <motion.a
                      key={d.id}
                      href={d.href}
                      className={`pm__download pm__download--${d.id}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="pm__download-icon" aria-hidden>
                        {d.id === "windows" ? (
                          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                            <path d="M3 5.5L10.5 4.4v7.1H3V5.5zm8.5-1.3L21 3v8.5h-9.5V4.2zM3 13.5h7.5v7.1L3 19.5v-6zm8.5 0H21V21l-9.5-1.3v-6.2z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                            <path d="M17.6 9.5l1.9-3.3a.6.6 0 10-1-.6l-2 3.4A9.4 9.4 0 0012 8.2c-1.6 0-3.1.4-4.5 1L5.5 5.6a.6.6 0 10-1 .6l1.9 3.3A9.5 9.5 0 002.5 17h19a9.5 9.5 0 00-3.9-7.5zM7.2 14.2a1 1 0 110-2 1 1 0 010 2zm9.6 0a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        )}
                      </span>
                      <span className="pm__download-body">
                        <span className="pm__download-platform">
                          {d.platform}
                          <span className="pm__download-pill">Free</span>
                        </span>
                        <span className="pm__download-hint">{d.hint}</span>
                        <span className="pm__download-file">{d.file}</span>
                      </span>
                      <span className="pm__download-cta">
                        <span className="pm__download-cta-label">Download</span>
                        <span className="pm__download-cta-arrow">↓</span>
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="pm__divider" style={{ background: `linear-gradient(90deg, ${theme.accent}, transparent)` }} />

              <h3 className="pm__section-title">What's Included</h3>
              <div className="pm__grid">
                {data.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="pm__card"
                    style={{
                      borderColor: theme.accent + "22",
                      background: isLight ? "rgba(255,255,255,0.8)" : theme.accent + "06",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <span className="pm__card-icon" style={{ background: theme.accent + "18" }}>{h.icon}</span>
                    <div>
                      <p className="pm__card-title" style={{ color: theme.accent }}>{h.title}</p>
                      <p className="pm__card-desc">{h.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
