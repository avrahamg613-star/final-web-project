"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Ticket,
  Instagram,
  Youtube as YoutubeIcon,
  Music2,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Copy,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

/* ------------------------ PUBLIC ASSETS ------------------------ */
const ASSETS = {
  logo: "/Capture.png",
  heroVideo: "/DavidFastMontage.mp4",
  video1: "/video1.mp4",
  video2: "/Outdoor2.mp4",
  video3: "/outdoor3.mp4",
  video4: "/utdoor4.mp4",
  portraitMain: "/performance-main.jpeg",
  performance1: "/performance-3.png",
  performance2: "/performance-3.png",
  performance3: "/performance-3.png",
  reviewsBG: "/reviewbackground.jpg",
};

/* ------------------------ THEME ------------------------ */
const THEME = {
  text: "#FFEFF6",
  textSoft: "rgba(255,235,242,.82)",
  black: "#050308",

  mint: "#D30021",
  mint08: "rgba(211,0,33,0.10)",
  mint20: "rgba(211,0,33,0.22)",

  blue: "#2563EB",
  blue08: "rgba(37,99,235,0.16)",
  blue20: "rgba(37,99,235,0.28)",

  border: "rgba(103,14,16,0.35)",

  red: "#670E10",
  red08: "rgba(103,14,16,0.10)",
  red20: "rgba(103,14,16,0.22)",
};

const BRAND_RED = "#670E10";
const BRAND_RED08 = "rgba(103,14,16,0.08)";
const BRAND_RED20 = "rgba(103,14,16,0.22)";
const BRAND_RED_BORDER = "rgba(103,14,16,0.45)";

/* --- Swipe / wipe red should match About section red (#D30020) --- */
const SWIPE_RED = "#D30020";
const SWIPE_RED20 = "rgba(211,0,32,0.22)";

/* ------------------------ GLOBAL BACKDROP ------------------------ */
const GlobalConnectedBG = () => (
  <>
    <div className="global-gradient pointer-events-none fixed inset-0 -z-10" />
    <div className="global-blobs pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="gb gb1" />
      <div className="gb gb2" />
      <div className="gb gb3" />
      <div className="gb gb4" />
    </div>
    <style>{`
      .global-gradient{
        background:
          linear-gradient(180deg,
            #0B0204 0%,
            #0D050B 14%,
            #0B0614 34%,
            #070515 58%,
            #05030B 100%
          );
      }
      .gb{
        position:absolute;
        width:70vw;
        height:70vw;
        border-radius:50%;
        filter: blur(90px);
        mix-blend-mode: screen;
        opacity:.28;
      }
      .gb1{
        left:-18%;
        top:-10%;
        background: radial-gradient(closest-side, ${BRAND_RED20}, transparent 70%);
        animation: f1 36s ease-in-out infinite;
      }
      .gb2{
        right:-20%;
        top:8%;
        background: radial-gradient(closest-side, ${THEME.blue20}, transparent 70%);
        animation: f2 38s ease-in-out infinite;
      }
      .gb3{
        left:10%;
        bottom:-20%;
        background: radial-gradient(closest-side, rgba(255,130,160,.25), transparent 70%);
        animation: f3 44s ease-in-out infinite;
      }
      .gb4{
        right:-10%;
        bottom:-16%;
        background: radial-gradient(closest-side, rgba(90,140,255,.22), transparent 70%);
        animation: f4 48s ease-in-out infinite;
      }
      @keyframes f1{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(6%,4%,0) scale(1.12)}100%{transform:translate3d(0,-3%,0) scale(1)}}
      @keyframes f2{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-5%,6%,0) scale(1.10)}100%{transform:translate3d(-2%,-3%,0) scale(1)}}
      @keyframes f3{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(4%,-6%,0) scale(1.14)}100%{transform:translate3d(-2%,2%,0) scale(1)}}
      @keyframes f4{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-4%,4%,0) scale(1.08)}100%{transform:translate3d(2%,-2%,0) scale(1)}}
      @media (max-width: 640px){
        .gb{ width:100vw; height:100vw; filter: blur(80px); }
      }
    `}</style>
  </>
);

/* ------------------------ PILL ------------------------ */
const Pill = ({
  href,
  label,
  color,
  icon,
}: {
  href: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-heading tracking-wide transition-all active:scale-[.97]"
    style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.15)",
      color: "#ffffff",
    }}
  >
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full"
      style={{
        background: color,
        color: "#ffffff",
      }}
    >
      {icon}
    </span>
    {label}
  </a>
);

/* ------------------------ ANIMATION ------------------------ */
const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const variants = {
  fade: {
    hidden: { opacity: 0, y: 8 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.04 * i, duration: 0.4, ease: easing },
    }),
  },
  rise: {
    hidden: { opacity: 0, y: 26, scale: 0.97 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.05 * i, duration: 0.55, ease: easing },
    }),
  },
  slideL: {
    hidden: { opacity: 0, x: -26, y: 6, scale: 0.98 },
    show: (i = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { delay: 0.05 * i, duration: 0.55, ease: easing },
    }),
  },
  slideR: {
    hidden: { opacity: 0, x: 26, y: 6, scale: 0.98 },
    show: (i = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { delay: 0.05 * i, duration: 0.55, ease: easing },
    }),
  },
  zoom: {
    hidden: { opacity: 0, y: 24, scale: 0.92 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.05 * i,
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1],
      },
    }),
  },
};

interface RevealProps {
  as?: any;
  type?: keyof typeof variants;
  i?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Reveal = ({
  as = motion.div,
  type = "rise",
  i = 0,
  className = "",
  style,
  children,
}: RevealProps) => {
  const Comp: any = as;
  return (
    <Comp
      className={className}
      variants={variants[type]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      custom={i}
      style={{ willChange: "transform, opacity", ...style }}
    >
      {children}
    </Comp>
  );
};

/* ------------------------ SAFE IMAGE ------------------------ */
const FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#670E10"/>
          <stop offset="1" stop-color="#2563EB"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`
  );

const SafeImg = ({
  src,
  alt,
  className = "",
  style,
  sizes,
  draggable = false,
  priority = false,
  fallback = FALLBACK_SVG,
}: {
  src?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  draggable?: boolean;
  priority?: boolean;
  fallback?: string;
}) => {
  const [error, setError] = useState(false);
  const finalSrc = !src || error ? fallback : src;
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      draggable={draggable}
      sizes={sizes}
      onError={() => setError(true)}
    />
  );
};

/* ------------------------ GLOBAL MOTION & FONTS ------------------------ */
const GlobalMotionPref = () => (
  <style>{`
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .01ms !important;
        scroll-behavior: auto !important;
      }
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const GlobalFonts = () => (
  <style>{`
    @font-face {
      font-family: 'MDGrotesque';
      src: url('/fonts/MDGrotesque-Thin.otf') format('opentype');
      font-weight: 100;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'MDGrotesque';
      src: url('/fonts/MDGrotesque-ThinItalic.otf') format('opentype');
      font-weight: 100;
      font-style: italic;
      font-display: swap;
    }

    :root {
      --font-heading: 'MDGrotesque', sans-serif;
      --font-body: 'MDGrotesque', sans-serif;
      --font-italic: 'MDGrotesque', sans-serif;
      --safe-bottom: env(safe-area-inset-bottom);
    }

    html, body {
      background: #050007;
      color: ${THEME.text};
      font-weight: 100 !important;
    }

    body {
      font-family: var(--font-body);
      font-weight: 100 !important;
    }

    .font-heading {
      font-family: var(--font-heading);
      font-weight: 100 !important;
      letter-spacing: 0.04em;
    }

    .font-italic {
      font-family: var(--font-italic);
      font-style: italic;
      font-weight: 100 !important;
    }
  `}</style>
);

/* ------------------------ GLOBAL SCROLLBAR — RED TRACK, VISIBLE THUMB ------------------------ */
const ScrollbarStyles = () => (
  <style>{`
    .app-scroll-shell {
      position: fixed;
      inset: 0;
      overflow-y: scroll;
      overflow-x: hidden;
      background: ${THEME.black};
      color: ${THEME.text};
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }

    .app-scroll-inner {
      min-height: 100vh;
      will-change: scroll-position;
    }

    html {
      scroll-behavior: smooth;
    }

    .app-scroll-shell {
      scrollbar-width: thin;
      scrollbar-color: #ffffff #D30020;
    }

    .app-scroll-shell::-webkit-scrollbar {
      width: 16px;
      background: #D30020;
    }

    .app-scroll-shell::-webkit-scrollbar-track {
      background: #D30020;
      border-radius: 0;
    }

    .app-scroll-shell::-webkit-scrollbar-thumb {
      background: #ffffff;
      border-radius: 8px;
      border: 4px solid #D30020;
      min-height: 40px;
    }

    .app-scroll-shell::-webkit-scrollbar-thumb:hover {
      background: #f0f0f0;
      border: 3px solid #D30020;
    }

    .app-scroll-shell::-webkit-scrollbar-thumb:active {
      background: #e0e0e0;
      border: 3px solid #D30020;
    }

    .app-scroll-shell::-webkit-scrollbar-corner {
      background: #D30020;
    }

    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `}</style>
);

/* ------------------------ UTIL ------------------------ */
const scrollToId = (id: string) => {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const fullBleed = "mx-[max(0px,calc(50%-50vw))] w-screen";

/* ------------------------ SECTION EFFECTS ------------------------ */
const SectionEffectsStyles = () => (
  <style>{`
    .section-shell {
      position: relative;
      overflow: hidden;
    }

    .section-shell .section-inner {
      position: relative;
      z-index: 2;
      opacity: 0;
      transform: translateY(32px);
      filter: blur(10px);
      transition:
        opacity 700ms ease-out,
        transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
        filter 900ms ease-out;
      will-change: opacity, transform, filter;
    }

    .section-shell.is-visible .section-inner {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }

    .section-shell[data-effect="diagonal"]::before,
    .section-shell[data-effect="diagonal"]::after {
      content: "";
      position: absolute;
      width: 140%;
      height: 60%;
      left: -20%;
      background-color: #050007;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.9);
      transform-origin: center;
      transition: transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1);
      z-index: 3;
      pointer-events: none;
    }

    .section-shell[data-effect="diagonal"]::before {
      top: -10%;
      transform: translateY(0) skewY(6deg);
    }

    .section-shell[data-effect="diagonal"]::after {
      bottom: -10%;
      transform: translateY(0) skewY(-6deg);
    }

    .section-shell.is-visible[data-effect="diagonal"]::before {
      transform: translateY(-140%) skewY(6deg);
    }

    .section-shell.is-visible[data-effect="diagonal"]::after {
      transform: translateY(140%) skewY(-6deg);
    }

    .section-shell[data-effect="color-wipe"]::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: ${SWIPE_RED};
      transform: translateX(-105%);
      z-index: 3;
      transition: transform 1100ms cubic-bezier(0.22, 0.61, 0.36, 1);
      pointer-events: none;
    }

    .section-shell.is-visible[data-effect="color-wipe"]::before {
      transform: translateX(105%);
    }

    .section-shell[data-effect="color-wipe"] .section-inner {
      transition-delay: 0.18s;
    }

    .section-shell[data-effect="aurora"]::before {
      content: "";
      position: absolute;
      top: -40%;
      left: -40%;
      width: 180%;
      height: 140%;
      background-image: linear-gradient(
        120deg,
        rgba(0, 0, 0, 0) 0%,
        ${SWIPE_RED20} 30%,
        ${SWIPE_RED20} 55%,
        rgba(0, 0, 0, 0) 90%
      );
      opacity: 1;
      transform: translateX(-40%) skewX(-12deg);
      filter: blur(24px);
      mix-blend-mode: screen;
      transition:
        transform 1300ms cubic-bezier(0.19, 1, 0.22, 1),
        opacity 900ms ease-out,
        filter 1100ms ease-out;
      z-index: 0;
      pointer-events: none;
    }

    .section-shell[data-effect="aurora"]::after {
      content: "";
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.35);
      opacity: 1;
      transition: opacity 900ms ease-out 0.22s;
      z-index: 0;
      pointer-events: none;
    }

    .section-shell.is-visible[data-effect="aurora"]::before {
      transform: translateX(140%) skewX(-12deg);
      opacity: 0;
      filter: blur(16px);
    }

    .section-shell.is-visible[data-effect="aurora"]::after {
      opacity: 0;
    }

    .glyph-heading {
      position: relative;
      display: inline-block;
      padding-inline: 0.3rem;
    }

    .glyph-heading::before,
    .glyph-heading::after {
      content: none !important;
    }
  `}</style>
);

/* ------------------------ SECTION WRAPPER ------------------------ */
type SectionEffect = "slide-up" | "diagonal" | "color-wipe" | "aurora";

const Section = ({
  id,
  className = "",
  style,
  children,
  effect = "slide-up",
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  effect?: SectionEffect;
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) target.classList.add("is-visible");
          else target.classList.remove("is-visible");
        });
      },
      { threshold: 0.35 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      data-effect={effect}
      className={`section-shell relative ${fullBleed} scroll-mt-24 ${className}`}
      style={style}
    >
      <div className="section-inner">{children}</div>
    </section>
  );
};

const PrimaryButton = ({
  onClick,
  href,
  children,
  className = "",
  target,
  rel,
  type = "button",
}: {
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
}) => {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-heading font-semibold shadow-sm active:scale-[.98] transition";
  const style: React.CSSProperties = {
    backgroundColor: BRAND_RED,
    color: "#FFF7F9",
    border: "none",
    boxShadow: "0 12px 32px -14px rgba(103,14,16,0.8)",
  };
  if (href) {
    const safeRel = target === "_blank" ? rel || "noopener noreferrer" : rel;
    return (
      <a
        href={href}
        onClick={onClick as any}
        target={target}
        rel={safeRel}
        className={`${base} ${className}`}
        style={style}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick as any}
      className={`${base} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

/* ------------------------ LINKS & NAV ------------------------ */
const LINKS = {
  insta: "https://www.instagram.com/dovidhaziza/",
  tiktok: "https://tiktok.com/@Dovidhaziza",
  youtube: "https://www.youtube.com/channel/UCyDv954nbglo1mrjHB-wwIQ",
  twenty4six: "https://24six.app/preview/music/artist/31/dovid-haziza",
  spotify: "https://open.spotify.com/artist/6kOPdg9GatF2CYFPSJGvkD",
  apple: "https://music.apple.com/us/artist/dovid-haziza/1486711994",
  amazon: "https://music.amazon.com/artists/B08156JFH1/dovid-haziza",
};

const BRAND = {
  spotify: "#1DB954",
  apple: "#FA2A55",
  amazon: "#0077C1",
  youtube: "#FF3B3B",
  twenty4six: "#FFFFFF",
};

const nav = [
  { id: "home", label: "Home" },
  { id: "reviews", label: "Reviews" },
  { id: "about", label: "About" },
  { id: "music", label: "Music" },
  { id: "coverage", label: "Coverage" },
  { id: "videos", label: "Videos" },
  { id: "contact", label: "Contact" },
];

type NavBarProps = { active: string; onNav: (id: string) => void };

const NavBar = ({ active, onNav }: NavBarProps) => {
  const [open, setOpen] = useState(false);

  const IconBtn = ({
    href,
    label,
    imgSrc,
    children,
  }: {
    href: string;
    label: string;
    imgSrc?: string;
    children?: React.ReactNode;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors"
      style={{
        border: "1px solid rgba(255,255,255,0.22)",
        color: THEME.text,
        background: "rgba(5,0,0,.85)",
      }}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={label}
          className="h-5 w-5"
          loading="lazy"
          decoding="async"
        />
      ) : (
        children
      )}
    </a>
  );

  return (
    <header className="top-0 z-50 w-full transition duration-300">
      <div
        className="h-[74px]"
        style={{
          background: "transparent",
          borderBottom: "none",
        }}
      />

      <div className={fullBleed}>
        <div className="px-3 sm:px-6 lg:px-10">
          <div className="relative mx-auto -mt-[74px] grid h-[74px] max-w-7xl grid-cols-[auto,1fr,auto] items-center gap-3">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNav("home");
              }}
              className="inline-flex items-center"
              aria-label="Home"
            >
              <SafeImg
                src={ASSETS.logo}
                alt="Dovid Haziza Logo"
                className="h-12 w-auto object-contain sm:h-14"
                priority
                sizes="(max-width:768px) 160px, 220px"
                draggable={false}
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden min-w-0 items-center justify-center gap-2 font-heading md:flex">
              {nav.map((n, idx) => (
                <Reveal key={n.id} type="fade" i={idx}>
                  <button
                    onClick={() => onNav(n.id)}
                    className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm tracking-wide transition"
                    style={{
                      color: active === n.id ? "#FFEFF6" : THEME.text,
                      background:
                        active === n.id ? BRAND_RED : "rgba(5,0,0,.78)",
                      border: "none",
                      boxShadow:
                        active === n.id
                          ? "0 14px 30px -16px rgba(103,14,16,.9)"
                          : "none",
                    }}
                  >
                    {n.label}
                  </button>
                </Reveal>
              ))}
            </nav>

            {/* Right side icons + mobile menu */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <div
                className="hidden items-center gap-2 overflow-x-auto no-scrollbar md:flex"
                style={{ maxWidth: "38vw" }}
              >
                <Reveal type="fade" i={0}>
                  <IconBtn href={LINKS.insta} label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </IconBtn>
                </Reveal>
                <Reveal type="fade" i={0.3}>
                  <IconBtn
                    href={LINKS.tiktok}
                    label="TikTok"
                    imgSrc="https://cdn.simpleicons.org/tiktok/ffffff"
                  />
                </Reveal>
                <Reveal type="fade" i={0.6}>
                  <IconBtn href={LINKS.youtube} label="YouTube">
                    <YoutubeIcon className="h-5 w-5" />
                  </IconBtn>
                </Reveal>
                <Reveal type="fade" i={0.9}>
                  <IconBtn
                    href={LINKS.spotify}
                    label="Spotify"
                    imgSrc="https://cdn.simpleicons.org/spotify/ffffff"
                  />
                </Reveal>
                <Reveal type="fade" i={1.2}>
                  <IconBtn
                    href={LINKS.apple}
                    label="Apple Music"
                    imgSrc="https://cdn.simpleicons.org/apple/ffffff"
                  />
                </Reveal>
                <Reveal type="fade" i={1.5}>
                  <a
                    href={LINKS.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Amazon Music"
                    className="inline-flex h-9 shrink-0 items-center gap-1 rounded-full px-3 font-heading text-[11px] font-bold tracking-wide"
                    style={{
                      background: "rgba(5,0,0,.9)",
                      color: THEME.text,
                      border: "1px solid rgba(255,255,255,0.22)",
                    }}
                  >
                    Amazon&nbsp;Music <Music2 className="h-4 w-4" />
                  </a>
                </Reveal>
              </div>

              {/* Mobile toggle */}
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl md:hidden"
                onClick={() => setOpen((s) => !s)}
                aria-label="Toggle menu"
                style={{
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: THEME.text,
                  background: "rgba(5,0,0,.9)",
                }}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

     {/* Mobile drawer */}
<AnimatePresence>
  {open && (
    <>
      {/* Overlay */}
      <motion.button
        key="menu-overlay"
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-[9998] bg-black/60 md:hidden"
        style={{ WebkitTapHighlightColor: "transparent" }}
      />

      {/* Drawer */}
      <motion.aside
        key="menu-drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 520,
          damping: 46,
          mass: 0.9,
        }}
        className="fixed right-0 top-0 z-[9999] flex h-[100dvh] w-[78vw] max-w-[340px] flex-col md:hidden"
        style={{
          background: THEME.black,
          borderLeft: `1px solid ${THEME.border}`,
          color: THEME.text,
          paddingBottom: "calc(12px + var(--safe-bottom))",
        }}
      >
        <div className="flex items-center justify-between p-3">
          <SafeImg src={ASSETS.logo} alt="Dovid Haziza" className="h-10 w-auto" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-2">
          <div className="flex flex-col p-2">
            {nav.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => {
                  onNav(n.id);
                  setOpen(false);
                }}
                className="w-full rounded-lg px-3 py-3 text-left text-base font-heading tracking-wide hover:bg-white/10"
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 border-t" style={{ borderColor: THEME.border }}>
          <div className="flex flex-wrap items-center gap-2">
            <IconBtn href={LINKS.insta} label="Instagram">
              <Instagram className="h-5 w-5" />
            </IconBtn>
            <IconBtn href={LINKS.tiktok} label="TikTok" imgSrc="https://cdn.simpleicons.org/tiktok/ffffff" />
            <IconBtn href={LINKS.youtube} label="YouTube">
              <YoutubeIcon className="h-5 w-5" />
            </IconBtn>
            <IconBtn href={LINKS.spotify} label="Spotify" imgSrc="https://cdn.simpleicons.org/spotify/ffffff" />
            <IconBtn href={LINKS.apple} label="Apple Music" imgSrc="https://cdn.simpleicons.org/apple/ffffff" />
            <a
              href={LINKS.amazon}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Amazon Music"
              className="inline-flex h-9 items-center gap-1 rounded-full px-3 font-heading tracking-wide"
              style={{
                background: "rgba(5,0,0,.9)",
                color: THEME.text,
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              Amazon&nbsp;Music <Music2 className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>

    </header>
  );};

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) => {
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignCls} ${className}`}>
      <Reveal type="fade" i={0} className="inline-flex items-center gap-2">
        <span
          className="h-[1px] w-10"
          style={{
            background: `linear-gradient(90deg, ${BRAND_RED20}, ${THEME.blue20})`,
          }}
        />
        {eyebrow && (
          <span className="text-[11px] uppercase tracking-[0.22em] font-italic text-white/80">
            {eyebrow}
          </span>
        )}
      </Reveal>

      <Reveal
        type="zoom"
        i={0.5}
        as={motion.h2}
        className="font-heading leading-tight"
        style={{
          fontSize: "clamp(30px, 4.6vw, 52px)",
          color: THEME.text,
          textShadow: "0 10px 30px rgba(0,0,0,0.55)",
        }}
      >
        <span className="font-heading glyph-heading">{title}</span>
      </Reveal>

      {subtitle && (
        <Reveal
          type="rise"
          i={1}
          as={motion.p}
          className="text-sm sm:text-base"
          style={{ color: THEME.textSoft }}
        >
          {subtitle}
        </Reveal>
      )}
    </div>
  );
};

/* ------------------------ HERO ------------------------ */
const Hero = () => {
  const [ready, setReady] = useState(false);

  return (
    <Section id="home" className="relative" effect="diagonal">
      <div className="relative h-[86vh] min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onLoadedData={() => setReady(true)}
        >
          <source src={ASSETS.heroVideo} type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px 420px at 50% 0%, ${THEME.red20}, transparent 65%),
              radial-gradient(1200px 520px at 10% 100%, ${THEME.blue08}, transparent 70%)
            `,
          }}
        />
      <div className="relative z-[1] h-full w-full flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4 mt-auto mb-20">
            <PrimaryButton onClick={() => scrollToId("contact")}>
              <Phone className="h-4 w-4" /> Book Dovid for Your Wedding
           </PrimaryButton>

  href="tel:+19175009253"
  className= "text-white/70 text-sm font-heading tracking-widest hover:text-white transition"
>
  917-500-9253
</a>
          </div>
        </div>

      </div>
    </Section>
  );
};
      </div>
    </Section>
  );
};

/* ------------------------ REVIEWS ------------------------ */
type Review = {
  photo?: string;
  text: string;
  couple: string;
};

const REVIEWS: Review[] = [
  {
    photo: "/imag1.jpeg",
    text: "Dovid carried the room from the very first note. His voice brought everyone together in a way that felt deeply personal and joyful. We couldn't have asked for a better performer.",
    couple: "Daniel & Shani",
  },
  {
    photo: "/sharon-zajac.jpeg",
    text: "Dovid’s voice is truly beautiful and added so much emotion, joy, and life to our wedding. His singing during the chuppah was moving and elegant, and during the hora he brought incredible energy that completely lifted the room and turned the celebration into a true party. We received endless compliments from our guests about his stunning voice and the refined, special atmosphere he created. We are beyond grateful to Dovid—our wedding simply would not have been the same without him.",
    couple: "Sharon & Zajac",
  },
  {
    photo: "/imag2.jpeg",
    text: "From soft tefillah under the chuppah to electric hora sets, Dovid was completely present. His energy is contagious and his professionalism is unmatched.",
    couple: "Moshe & Rivka",
  },
];

const getInitials = (couple: string) => {
  const parts = couple
    .split("&")
    .map((s) => s.trim())
    .filter(Boolean);

  const a = parts[0]?.[0]?.toUpperCase() || "";
  const b = parts[1]?.[0]?.toUpperCase() || "";
  return [a, b].filter(Boolean).join(" ");
};

const ReviewAvatar = ({ src, label }: { src?: string; label: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const showFallback = !src || errored;

  return (
    <div className="mx-auto -mt-16 mb-4 h-24 w-24 overflow-hidden rounded-full bg-black/40 ring-2 ring-white/40 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.9)] sm:h-28 sm:w-28 grid place-items-center">
      {!showFallback && (
        <img
          src={src}
          alt={`${label} review`}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setErrored(true);
            setLoaded(false);
          }}
        />
      )}

      {showFallback && (
        <span className="font-heading text-lg text-white/90">
          {getInitials(label)}
        </span>
      )}
    </div>
  );
};

const Reviews = () => {
  return (
    <Section
      id="reviews"
      effect="color-wipe"
      className="relative py-16 sm:py-28"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0,0,0,0.78), rgba(0,0,0,0.96)), url('/reviewbackground.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <SectionHeader eyebrow="" title="Reviews" />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3 sm:gap-7 max-w-5xl mx-auto">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={`${r.couple}-${i}`}
              type={i % 2 === 0 ? "slideL" : "slideR"}
              i={i}
            >
              <figure className="relative overflow-visible rounded-3xl bg-black/55 px-6 py-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                <ReviewAvatar src={r.photo} label={r.couple} />

                <blockquote className="text-[12px] sm:text-[15px] text-white/85">
                  "{r.text}"
                </blockquote>

                <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-white/45 to-transparent" />

                <figcaption className="text-right text-[11px] tracking-wide text-white/80">
                  — {r.couple}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

/* ------------------------ ABOUT ------------------------ */
const About = () => (
  <Section
    id="about"
    className="py-12 sm:py-20"
    style={{ background: "#D30020" }}
    effect="aurora"
  >
    <div className="relative mx-auto max-w-6xl px-3 sm:px-6 lg:px-10">
      <div className="grid items-stretch gap-8 md:grid-cols-[1.1fr,1fr] min-h-[420px] lg:min-h-[520px]">
        <Reveal type="slideL" i={0} className="h-full">
          <div className="relative h-full w-full">
            <SafeImg
              src="/Performance-about.png"
              alt="Dovid Haziza performing live"
              className="h-full w-full object-cover object-right"
              style={{
                filter: "grayscale(1) contrast(1.08)",
              }}
              sizes="(max-width: 768px) 100vw, 520px"
              draggable={false}
            />
          </div>
        </Reveal>

        <Reveal type="rise" i={0.5} className="flex flex-col justify-center">
          <div className="space-y-4 text-[#FFEFF6]">
            <p className="text-[20px] uppercase tracking-[0.26em] font-italic">
              About
            </p>

            <h2
              className="font-heading glyph-heading uppercase leading-[0.9]"
              style={{
                fontSize: "clamp(38px, 5.4vw, 62px)",
                letterSpacing: "0.05em",
              }}
            >
              DOVID
              <br />
              <br />
            </h2>

            <p className="max-w-lg text-xs sm:text-sm leading-relaxed text-[#FFEFF6]/95">
              A Miami–based Jewish wedding singer, Dovid began on stage with the
              Yeshiva Boys Choir and has grown into one of the most sought-after
              voices on the simcha circuit. From the first bracha under the
              chuppah to the last dance of the night, his sound blends classic
              niggunim with a modern, emotional edge.
            </p>

            <p className="max-w-lg text-xs sm:text-sm leading-relaxed text-[#FFEFF6]/90">
              With original songs, international performances, and a calm,
              professional presence, Dovid shapes each wedding around the couple
              — building the ruach gradually and keeping the room focused on the
              simcha itself.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </Section>
);

/* ------------------------ COVERAGE (MAP) ------------------------ */
const US_TOPO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

type City = {
  name: string;
  coords: [number, number];
};

const CITIES: City[] = [
  { name: "Los Angeles", coords: [-118.2437, 34.0522] },
  { name: "Phoenix", coords: [-112.074, 33.4484] },
  { name: "Denver", coords: [-104.9903, 39.7392] },
  { name: "Chicago", coords: [-87.6298, 41.8781] },
  { name: "Detroit", coords: [-83.0458, 42.3314] },
  { name: "Cleveland", coords: [-81.6944, 41.4993] },
  { name: "Philadelphia", coords: [-75.1652, 39.9526] },
  { name: "New Jersey", coords: [-74.4057, 40.0583] },
  { name: "Miami", coords: [-80.1918, 25.7617] },
];

const Coverage = () => {
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  return (
    <Section
      id="coverage"
      className="py-14 sm:py-24"
      style={{ background: "#D30020" }}
      effect="diagonal"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 relative">
        <SectionHeader eyebrow="" title="Coverage" />
      </div>

      <div className="mt-4 px-2 sm:px-6 lg:px-8">
        <Reveal
          type="zoom"
          i={0}
          className="mx-auto max-w-6xl rounded-3xl border overflow-hidden relative"
          style={{
            borderColor: BRAND_RED_BORDER,
            background: "#000",
          }}
        >
          <div className="relative w-full min-h-[260px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[520px]">
            <ComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{
                scale: 1150,
              }}
              className="absolute inset-0 h-full w-full [&_path]:outline-none"
              style={{
                width: "100%",
                height: "100%",
                background: "#000",
                touchAction: "pan-y",
              }}
            >
              <Geographies geography={US_TOPO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => {
                        const name = (geo.properties as { name: string }).name;
                        setTooltip({ x: e.clientX, y: e.clientY, text: name });
                      }}
                      onMouseMove={(e) => {
                        setTooltip((prev) =>
                          prev ? { ...prev, x: e.clientX, y: e.clientY } : prev
                        );
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: {
                          fill: "#000",
                          stroke: "rgba(255,255,255,0.28)",
                          strokeWidth: 0.7,
                        },
                        hover: {
                          fill: "#050505",
                          stroke: "rgba(255,255,255,0.55)",
                          strokeWidth: 0.9,
                        },
                        pressed: {
                          fill: "#000",
                          stroke: "rgba(255,255,255,0.28)",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {CITIES.map((c) => (
                <Marker key={c.name} coordinates={c.coords}>
                  <g transform="translate(0,0)">
                    <circle r={10} fill="none" stroke="#fff" strokeOpacity={0.35}>
                      <animate
                        attributeName="r"
                        dur="2.2s"
                        values="5;10;5"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-opacity"
                        dur="2.2s"
                        values="0.7;0;0.7"
                        repeatCount="indefinite"
                      />
                    </circle>

                    <circle r={4} fill="#ffffff" />

                    <text
                      y={-12}
                      x={12}
                      style={{
                        fontFamily: "OneThinLine, Zevada, system-ui, sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: 0.2,
                        fill: "#ffffff",
                        paintOrder: "stroke",
                        stroke: "rgba(0,0,0,.8)",
                        strokeWidth: 2,
                      }}
                    >
                      {c.name}
                    </text>
                  </g>
                </Marker>
              ))}
            </ComposableMap>

            {tooltip && (
              <div
                className="pointer-events-none fixed z-50 rounded-md px-2 py-1 text-xs"
                style={{
                  top: tooltip.y + 12,
                  left: tooltip.x + 12,
                  background: "#000",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.18)",
                }}
              >
                {tooltip.text}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

/* ------------------------ MUSIC ------------------------ */
const TRACKS = [
  {
    title: "Bou Nirkod",
    file: "/audio/SpotiDown.App - Bou Nirkod - Dovid Haziza.mp3",
  },
  {
    title: "Bou Nirkod – Akiva Hammond Remix",
    file: "/audio/SpotiDown.App - Bou Nirkod _Akiva Hammond Remix_ - Dovid Haziza.mp3",
  },
  {
    title: "Bou Nirkod – Akay Remix",
    file: "/audio/SpotiDown.App - Bou Nirkod - Akay Remix - Dovid Haziza.mp3",
  },
  {
    title: "Matanot",
    file: "/audio/SpotiDown.App - Matanot - Dovid Haziza.mp3",
  },
  {
    title: "Shir HaChuppa",
    file: "/audio/SpotiDown.App - Shir HaChuppa - Dovid Haziza.mp3",
  },
  {
    title: "Tombe",
    file: "/audio/SpotiDown.App - Tombe - Dovid Haziza.mp3",
  },
  {
    title: "Zchuto",
    file: "/audio/SpotiDown.App - Zchuto - Dovid Haziza.mp3",
  },
  {
    title: "Zeh Tov",
    file: "/audio/SpotiDown.App - Zeh Tov - Dovid Haziza.mp3",
  },
];

const Music = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  const current = TRACKS[index];

  useEffect(() => {
    if (!shouldPlay) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.load();

    audio
      .play()
      .then(() => setPlaying(true))
      .catch((err) => {
        console.error("Audio play failed:", err);
        setPlaying(false);
      })
      .finally(() => setShouldPlay(false));
  }, [shouldPlay, index]);

  const playTrack = (i: number) => {
    setIndex(i);
    setShouldPlay(true);
  };

  const toggleCurrent = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setShouldPlay(true);
    }
  };

  const nextTrack = () => playTrack((index + 1) % TRACKS.length);
  const prevTrack = () => playTrack((index - 1 + TRACKS.length) % TRACKS.length);

  return (
    <Section id="music" style={{ background: "#000" }} effect="slide-up">
      <div className="relative mx-auto max-w-[110rem] px-4 sm:px-8 lg:px-10 py-16 sm:py-24">
        <SectionHeader
          eyebrow=""
          title="Music"
          align="center"
        />

        <Reveal
          type="fade"
          i={0}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <Pill
            href={LINKS.spotify}
            label="Spotify"
            color={BRAND.spotify}
            icon={
              <img
                src="https://cdn.simpleicons.org/spotify/ffffff"
                alt="Spotify"
                className="h-4 w-4"
              />
            }
          />
          <Pill
            href={LINKS.apple}
            label="Apple Music"
            color={BRAND.apple}
            icon={
              <img
                src="https://cdn.simpleicons.org/apple/ffffff"
                alt="Apple Music"
                className="h-4 w-4"
              />
            }
          />
          <Pill
            href={LINKS.amazon}
            label="Amazon Music"
            color={BRAND.amazon}
            icon={
              <img
                src="https://cdn.simpleicons.org/amazonmusic/ffffff"
                alt="Amazon Music"
                className="h-4 w-4"
              />
            }
          />
          <Pill
            href={LINKS.youtube}
            label="YouTube"
            color={BRAND.youtube}
            icon={
              <img
                src="https://cdn.simpleicons.org/youtube/ffffff"
                alt="YouTube"
                className="h-4 w-4"
              />
            }
          />
          <Pill
            href={LINKS.twenty4six}
            label="24Six"
            color="#ffffff"
            icon={<Music2 className="h-4 w-4" />}
          />
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Reveal
            type="rise"
            i={0.5}
            className="w-full max-w-2xl rounded-3xl border p-5 sm:p-6"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              background: "rgba(0,0,0,0.85)",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-white/65">
                Playlist
              </p>
              <p className="text-[11px] text-white/70 truncate max-w-[220px] sm:max-w-none">
                Now playing: <span className="font-heading">{current.title}</span>
              </p>
            </div>

            <audio
              ref={audioRef}
              src={current.file}
              preload="auto"
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              onError={() => {
                console.error(
                  "Audio error. File not found or unsupported:",
                  current.file
                );
                setPlaying(false);
              }}
            />

            <ul
              className="divide-y"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              {TRACKS.map((t, i) => {
                const isActive = i === index;
                return (
                  <li key={t.file} className="py-3">
                    <button
                      onClick={() => (i === index ? toggleCurrent() : playTrack(i))}
                      className="flex w-full items-center gap-3 text-left text-white"
                    >
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full"
                        style={{
                          background: isActive
                            ? "#D30021"
                            : "rgba(255,255,255,0.1)",
                          color: "#fff",
                        }}
                      >
                        {isActive && playing ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </span>

                      <span className="font-heading text-sm sm:text-base">
                        {t.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={prevTrack}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={toggleCurrent}
                className="inline-flex h-10 px-5 items-center justify-center rounded-full bg-[#D30021] text-sm font-heading tracking-wide text-white shadow-lg"
              >
                {playing ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" /> Play
                  </>
                )}
              </button>

              <button
                onClick={nextTrack}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
/* ------------------------ YOUTUBE HELPERS ------------------------ */
const getYouTubeId = (url: string) => {
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    if (v) return v;

    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");

    const parts = u.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];

    return "";
  } catch {
    return "";
  }
};

// NEW: allow overriding the inactive thumbnail with a local file
const getInactiveThumb = (video: { youtubeUrl?: string; thumbnail: string }) => {
  return video.thumbnail; // if you set thumbnail to "/youtubeThumb.png", it will use local
};


const getYouTubeThumbs = (id: string) => ({
  max: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
  hq: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
});

/* ------------------------ VIDEOS ------------------------ */
const Videos = React.memo(() => {
  const [activeTop, setActiveTop] = useState<string | null>(null);
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const [activeRight, setActiveRight] = useState<string | null>(null);

  // CENTER VIDEO = YOUTUBE
 const topVideo = {
  id: "v3",
  title: "Yosis",
  subtitle: "Live at The Plaza",
  youtubeUrl: "https://www.youtube.com/watch?v=CIHtwIJnXB8",
  thumbnail: "/youtubeThumb.png", // <-- put this in /public
};


  const leftVideos = [
    {
      id: "v1",
      title: "Mashiach",
      subtitle: "Live Performance",
      videoUrl: ASSETS.video1,
      thumbnail: "/performance-1.png",
    },
    {
      id: "v2",
      title: "Mi Shemamin",
      subtitle: "Wedding Celebration",
      videoUrl: ASSETS.video2,
      thumbnail: "/performance-2.png",
    },
  ];

  const VideoCard = React.memo(
    ({
      video,
      isActive,
      onActivate,
      onDeactivate,
    }: {
      video: {
        id: string;
        title: string;
        subtitle: string;
        videoUrl?: string;
        youtubeUrl?: string;
        thumbnail: string;
      };
      isActive: boolean;
      onActivate: () => void;
      onDeactivate: () => void;
    }) => {
      const vidRef = useRef<HTMLVideoElement | null>(null);
      const [isPlaying, setIsPlaying] = useState(false);

      const isYouTube = !!video.youtubeUrl;
      const ytId = video.youtubeUrl ? getYouTubeId(video.youtubeUrl) : "";
      const ytSrc = ytId
        ? `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`
        : "";

   const inactivePosterSrc = getInactiveThumb(video);
const inactivePosterFallback = FALLBACK_SVG;


      // Cleanup when deactivated (mp4 only)
      useEffect(() => {
        if (!isActive) {
          const el = vidRef.current;
          if (el) {
            el.pause();
            el.currentTime = 0;
          }
          setIsPlaying(false);
        }
      }, [isActive]);

      // Auto-pause when scrolled out of view (mp4 only)
      useEffect(() => {
        if (!isActive || isYouTube || typeof IntersectionObserver === "undefined")
          return;

        const el = vidRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting && !el.paused) {
                el.pause();
                setIsPlaying(false);
              }
            });
          },
          { threshold: 0.25 }
        );

        observer.observe(el);
        return () => observer.disconnect();
      }, [isActive, isYouTube]);

      const handlePlay = () => {
        onActivate();

        // autoplay only for mp4
        if (!isYouTube) {
          setTimeout(() => {
            const el = vidRef.current;
            if (el) {
              el
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            }
          }, 100);
        }
      };

      return (
        <div
          className={`group relative isolate aspect-video overflow-hidden rounded-2xl bg-black/45 ${
            !isActive ? "cursor-pointer" : ""
          }`}
          onClick={!isActive ? handlePlay : undefined}
          role={!isActive ? "button" : undefined}
          tabIndex={!isActive ? 0 : -1}
          onKeyDown={
            !isActive
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePlay();
                  }
                }
              : undefined
          }
        >
          {!isActive && (
            <>
              <SafeImg
                src={inactivePosterSrc}
                fallback={inactivePosterFallback}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
                draggable={false}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#D30020]/70 via-black/35 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-black/10" />

              {/* PLAY BUTTON OVERLAY (kept) */}
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-black/55 ring-1 ring-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.75)]">
                  <Play className="h-6 w-6 text-white translate-x-[1px]" />
                </div>
              </div>
            </>
          )}

          {isActive && (
            <div className="absolute inset-0 bg-black">
              {isYouTube ? (
                <iframe
                  className="h-full w-full"
                  src={ytSrc}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={vidRef}
                  className="h-full w-full object-contain"
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  preload="metadata"
                  playsInline
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={onDeactivate}
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate"
                />
              )}
            </div>
          )}
        </div>
      );
    }
  );

  return (
    <Section
      id="videos"
      className="py-14 sm:py-24"
      style={{ background: "#000000" }}
      effect="color-wipe"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 mb-10 sm:mb-12 relative">
        <SectionHeader eyebrow="" title="Performance Gallery" align="center" />
      </div>

      <div className="mx-auto max-w-[2000px] px-2 sm:px-3 py-3 relative">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          {/* LEFT (unchanged) */}
          <div className="flex-1">
            <Reveal type="rise" i={0}>
              <VideoCard
                video={leftVideos[0]}
                isActive={activeLeft === leftVideos[0].id}
                onActivate={() => {
                  setActiveLeft(leftVideos[0].id);
                  setActiveTop(null);
                  setActiveRight(null);
                }}
                onDeactivate={() => setActiveLeft(null)}
              />
            </Reveal>
          </div>

          {/* CENTER (YouTube) */}
          <div className="flex-1">
            <Reveal type="rise" i={1}>
              <VideoCard
                video={topVideo}
                isActive={activeTop === topVideo.id}
                onActivate={() => {
                  setActiveTop(topVideo.id);
                  setActiveLeft(null);
                  setActiveRight(null);
                }}
                onDeactivate={() => setActiveTop(null)}
              />
            </Reveal>
          </div>

          {/* RIGHT (unchanged) */}
          <div className="flex-1">
            <Reveal type="rise" i={2}>
              <VideoCard
                video={leftVideos[1]}
                isActive={activeRight === leftVideos[1].id}
                onActivate={() => {
                  setActiveRight(leftVideos[1].id);
                  setActiveTop(null);
                  setActiveLeft(null);
                }}
                onDeactivate={() => setActiveRight(null)}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
});


/* ------------------------ CONTACT ------------------------ */
const Contact = () => {
  const PHONE_E164 = "+19175009253";
const PHONE_DISPLAY = "917-500-9253";
  const EMAIL = "HazizaBookings@gmail.com";
  const formId = "bookingForm";
  const formRef = useRef<HTMLFormElement | null>(null);

  const [wantsMusic, setWantsMusic] = useState<"No" | "Yes">("No");
  const [hasMusicians, setHasMusicians] = useState<"No" | "Yes">("No");
  const [musicianCount, setMusicianCount] = useState("");
  const [musicType, setMusicType] = useState("");

  const copy = async (text: string) => {
    try {
      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // ignore
    }
  };

  const sendToWhatsApp = (form: HTMLFormElement) => {
    const fd = new FormData(form);
    const lines = [
      "Booking Inquiry — Dovid Haziza",
      `Name: ${fd.get("firstName")} ${fd.get("lastName")}`,
      `Email: ${fd.get("email")}`,
      `Phone: ${fd.get("phone")}`,
      `Date: ${fd.get("date") || "—"}`,
      `Guests: ${fd.get("guests") || "—"}`,
      `Location: ${fd.get("location")}`,
      `Music Wanted: ${wantsMusic}`,
      `Has Musicians: ${hasMusicians}`,
      ...(hasMusicians === "Yes"
        ? [
            `Musician Count: ${musicianCount || "—"}`,
            `Type: ${musicType || "—"}`,
          ]
        : []),
      "Message:",
      (fd.get("message") || "").toString(),
    ];
    const msg = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${PHONE_E164.replace(/\D/g, "")}?text=${msg}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
  };

  const Toggle = ({
    label,
    value,
    set,
  }: {
    label: string;
    value: "No" | "Yes";
    set: (v: "No" | "Yes") => void;
  }) => (
    <div className="grid gap-1">
      <label className="text-sm text-white/80">{label}</label>
      <div className="flex gap-2">
        {["No", "Yes"].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => set(opt as "No" | "Yes")}
            className="rounded-full px-3 py-1.5 text-xs transition font-heading tracking-wide"
            style={{
              color: opt === value ? "#FFEFF2" : THEME.text,
              background: opt === value ? BRAND_RED : "transparent",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Section
      id="contact"
      className="pb-24 sm:pb-24 pt-14 sm:pt-24"
      style={{ background: "#040004" }}
      effect="color-wipe"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="" title="Tell Us About Your Date" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px,1fr]">
          <Reveal
            type="rise"
            i={0}
            className="rounded-3xl p-4 sm:p-6 backdrop-blur bg-white/5"
          >
            <div className="flex items-center gap-4">
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl font-heading"
                style={{ background: BRAND_RED, color: "#FFEFF2" }}
              >
                DH
              </div>
              <div>
                <div className="font-heading font-semibold">Book Dovid Haziza</div>
           
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:gap-3">
              <Reveal type="fade" i={0.2}>
                <a
                  href={`tel:${PHONE_E164}`}
                  className="group inline-flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-white bg-white/5 hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {PHONE_DISPLAY}
                  </span>
                  <span className="text-xs text-white/70">Tap to call</span>
                </a>
              </Reveal>

              <Reveal type="fade" i={0.4}>
                <a
                  href={`mailto:${EMAIL}?subject=Booking%20Inquiry&body=Hi%20Dovid%2C%0A%0AWe%27d%20love%20to%20book%20you%20for...`}
                  className="group inline-flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-white bg-white/5 hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {EMAIL}
                  </span>
                  <span className="text-xs text-white/70">Tap to email</span>
                </a>
              </Reveal>

              <Reveal type="fade" i={0.6}>
                <a
                  href={`https://wa.me/${PHONE_E164.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-white bg-white/5 hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </span>
                  <span className="text-xs text-white/70">Open chat</span>
                </a>
              </Reveal>

              <Reveal type="fade" i={0.8}>
                <div className="mt-2 grid gap-2 text-sm text-white/80">
                  <div className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Typical response: under 24 hours
                  </div>
                  <div>
                    Prefer copy/paste?
                    <button
                      onClick={() => copy(`${PHONE_DISPLAY} • ${EMAIL}`)}
                      className="ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-white/80 hover:bg-white/10"
                    >
                      <Copy className="h-3.5 w-3.5" /> Copy details
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>

          <Reveal
            type="slideR"
            i={0}
            className="rounded-3xl p-4 sm:p-6 backdrop-blur bg-white/5"
          >
            <form
              id={formId}
              ref={formRef}
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                sendToWhatsApp(e.currentTarget);
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    lab: "First Name *",
                    name: "firstName",
                    ph: "First name",
                    type: "text",
                  },
                  {
                    lab: "Last Name *",
                    name: "lastName",
                    ph: "Last name",
                    type: "text",
                  },
                  {
                    lab: "Email *",
                    name: "email",
                    ph: "you@example.com",
                    type: "email",
                  },
                  {
                    lab: "Phone *",
                    name: "phone",
                    ph: "608-944-3640",
                    type: "tel",
                  },
                  { lab: "Event Date", name: "date", ph: "", type: "date" },
                  {
                    lab: "Guest Count",
                    name: "guests",
                    ph: "Approximate",
                    type: "text",
                  },
                ].map((f, idx) => (
                  <Reveal key={f.name} type="fade" i={idx * 0.2}>
                    <div className="grid gap-1">
                      <label className="text-sm text-white/80">{f.lab}</label>
                      <input
                        required={f.lab.includes("*")}
                        name={f.name}
                        type={f.type}
                        className="h-11 rounded-xl px-3 bg-black/50 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder={f.ph}
                        autoComplete="off"
                      />
                    </div>
                  </Reveal>
                ))}

                <Reveal type="fade" i={1.4}>
                  <div className="grid gap-1 sm:col-span-2">
                    <label className="text-sm text-white/80">
                      Event Location *
                    </label>
                    <input
                      name="location"
                      required
                      className="h-11 rounded-xl px-3 bg-black/50 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="City, Venue"
                      autoComplete="off"
                    />
                  </div>
                </Reveal>

                <Toggle label="Music" value={wantsMusic} set={setWantsMusic} />
                <Toggle
                  label="Musicians"
                  value={hasMusicians}
                  set={setHasMusicians}
                />

                {hasMusicians === "Yes" && (
                  <>
                    <div className="grid gap-1">
                      <label className="text-sm text-white/80">
                        How many musicians?
                      </label>
                      <input
                        name="musicianCount"
                        value={musicianCount}
                        onChange={(e) => setMusicianCount(e.target.value)}
                        className="h-11 rounded-xl px-3 bg-black/50 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="e.g., 2–4"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label className="text-sm text-white/80">Type of music</label>
                      <input
                        name="musicType"
                        value={musicType}
                        onChange={(e) => setMusicType(e.target.value)}
                        className="h-11 rounded-xl px-3 bg-black/50 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="e.g., strings, sax, percussion"
                      />
                    </div>
                  </>
                )}

                <div className="grid gap-1 sm:col-span-2">
                  <label className="text-sm text-white/80">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="rounded-xl px-3 py-2 bg-black/50 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Tell us about the vibe, timing, special moments, etc."
                  />
                </div>
              </div>

              <div className="mt-3 hidden sm:block">
                <PrimaryButton type="submit">
                  <Ticket className="h-4 w-4" /> Send via WhatsApp
                </PrimaryButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <div className="sm:hidden fixed left-4 right-4 bottom-[calc(16px+var(--safe-bottom))] z-40">
        <button
          form={formId}
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-heading font-semibold shadow-sm"
          style={{ backgroundColor: BRAND_RED, color: "#FFEFF2" }}
        >
          <Ticket className="h-4 w-4" /> Send via WhatsApp
        </button>
      </div>
    </Section>
  );
};

/* ------------------------ FOOTER ------------------------ */
const Footer = () => (
  <footer
    className={`py-10 text-white/80 ${fullBleed}`}
    style={{
      background: "#050007",
      borderTop: `1px solid ${THEME.border}`,
    }}
  >
    <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm">
        © {new Date().getFullYear()} Dovid Haziza | Powered by{" "}
        <a
          href="https://inexia.com.pk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:opacity-90"
        >
          Inexia IT Solutions (Pvt.) Ltd.
        </a>
      </div>
    </div>
  </footer>
);

/* ------------------------ ACTIVE SECTION HOOK ------------------------ */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        {
          rootMargin: "-60% 0px -35% 0px",
          threshold: [0, 0.2, 0.5, 1],
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids.join(",")]);

  return active;
};

/* ------------------------ PAGE ------------------------ */
export default function Index() {
  const active = useActiveSection([
    "home",
    "reviews",
    "about",
    "music",
    "coverage",
    "videos",
    "contact",
  ]);

  const onNav = (id: string) => scrollToId(id);

  return (
    <>
      <GlobalMotionPref />
      <GlobalFonts />
      <ScrollbarStyles />
      <SectionEffectsStyles />
      <div className="app-scroll-shell">
        <div className="app-scroll-inner">
          <GlobalConnectedBG />
          <NavBar active={active} onNav={onNav} />
          <main>
            <Hero />
            <Reviews />
            <About />
            <Music />
            <Videos />
            <Coverage />
            <Contact />
          </main>
          <Footer />

          <button
            onClick={() => scrollToId("home")}
            className="fixed bottom-5 left-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white z-40"
            aria-label="Back to top"
            style={{ border: `1px solid ${THEME.border}` }}
          >
            ↑
          </button>
        </div>
      </div>
    </>
  );
}
