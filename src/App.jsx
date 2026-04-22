import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";

const GX = {
  orange: "#F4601A",
  black: "#0D0D0D",
  offWhite: "#FAFAF8",
  warmGray: "#F0EDE8",
  softText: "rgba(250,250,248,0.72)",
  softerText: "rgba(250,250,248,0.52)",
  border: "rgba(255,255,255,0.10)",
  panel: "rgba(255,255,255,0.04)",
  panelStrong: "rgba(255,255,255,0.06)",
  live: "#6EF3A5",
  recent: "#FAFAF8",
  historic: "#87A8FF",
};

const locations = [
  {
    id: "kansas-city",
    city: "Kansas City",
    country: "United States",
    region: "North America",
    lat: 39.0997,
    lng: -94.5786,
    year: 2026,
    status: "live",
    type: "base",
    title: "GX Base Hub",
    summary:
      "Current sending base and training hub. Mobilization, discipleship, mission preparation and team activation.",
    prayerFocus: [
      "Training and sending",
      "Mobilization of laborers",
      "Discipleship and activation",
    ],
    stats: {
      heardGospel: 4280,
      salvations: 690,
      healings: 37,
      testimonies: 24,
    },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kansas_City_skyline.jpg",
    },
  },
  {
    id: "tirana",
    city: "Tirana",
    country: "Albania",
    region: "Europe",
    lat: 41.3275,
    lng: 19.8187,
    year: 2026,
    status: "live",
    type: "outreach",
    title: "Team on the Ground Now",
    summary:
      "GX team currently active in Tirana with outreach, evangelism and city impact.",
    prayerFocus: [
      "Street evangelism",
      "School-related outreach focus",
      "City proclamation and follow-up",
    ],
    stats: {
      heardGospel: 2100,
      salvations: 143,
      healings: 11,
      testimonies: 16,
    },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/5/5d/Tirana_from_the_sky.jpg",
    },
  },
  {
    id: "milan",
    city: "Milan",
    country: "Italy",
    region: "Europe",
    lat: 45.4642,
    lng: 9.19,
    year: 2026,
    status: "recent",
    type: "outreach",
    title: "Italy Outreach",
    summary:
      "GX was in Milan in February 2026 for evangelism and international ministry presence.",
    prayerFocus: [
      "Creative evangelism",
      "European mission presence",
      "Open hearts for Jesus",
    ],
    stats: {
      heardGospel: 680,
      salvations: 33,
      healings: 3,
      testimonies: 7,
    },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/e/e6/Milan_skyline.jpg",
    },
  },
  {
    id: "san-francisco",
    city: "San Francisco",
    country: "United States",
    region: "North America",
    lat: 37.7749,
    lng: -122.4194,
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "California Tour",
    summary: "Part of the 2025 California outreach movement.",
    prayerFocus: [
      "Evangelism in the city",
      "Bold witness",
      "Long-term fruit",
    ],
    stats: { heardGospel: 840, salvations: 41, healings: 6, testimonies: 8 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/San_Francisco_from_the_Marin_Headlands_in_August_2022.jpg",
    },
  },
  {
    id: "santa-cruz",
    city: "Santa Cruz",
    country: "United States",
    region: "North America",
    lat: 36.9741,
    lng: -122.0308,
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "California Tour",
    summary: "Part of the 2025 California outreach movement.",
    prayerFocus: [
      "Gospel conversations",
      "Open doors",
      "Strong follow-up",
    ],
    stats: { heardGospel: 420, salvations: 19, healings: 2, testimonies: 5 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Santa_Cruz_Boardwalk_aerial.jpg",
    },
  },
  {
    id: "los-angeles",
    city: "Los Angeles",
    country: "United States",
    region: "North America",
    lat: 34.0522,
    lng: -118.2437,
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "California Tour",
    summary: "Part of the 2025 California outreach movement.",
    prayerFocus: [
      "Creative evangelism",
      "Youth outreach",
      "Kingdom connections",
    ],
    stats: { heardGospel: 530, salvations: 24, healings: 3, testimonies: 6 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Los_Angeles%2C_Winter_2016.jpg",
    },
  },
  {
    id: "san-diego",
    city: "San Diego",
    country: "United States",
    region: "North America",
    lat: 32.7157,
    lng: -117.1611,
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "California Tour",
    summary: "Part of the 2025 California outreach movement.",
    prayerFocus: [
      "Evangelism presence",
      "Unity with local church",
      "Transformation in the city",
    ],
    stats: { heardGospel: 610, salvations: 29, healings: 4, testimonies: 7 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/5/53/San_Diego_skyline_at_night.jpg",
    },
  },
  {
    id: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    region: "Africa",
    lat: -33.9249,
    lng: 18.4241,
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "Multiple 2025 Activations",
    summary:
      "GX was in Cape Town in February, October and November 2025.",
    prayerFocus: [
      "Ongoing fruit",
      "Kingdom relationships",
      "Revival in the city",
    ],
    stats: { heardGospel: 970, salvations: 51, healings: 9, testimonies: 9 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Cape_Town_CBD.jpg",
    },
  },
  {
    id: "newark",
    city: "Newark",
    country: "United States",
    region: "North America",
    lat: 40.7357,
    lng: -74.1724,
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "Outreach + Microtraining",
    summary:
      "Outreach with evangelism, presentation and a microtraining expression.",
    prayerFocus: [
      "Evangelism outreach",
      "Training multiplication",
      "Boldness and follow-up",
    ],
    stats: { heardGospel: 360, salvations: 18, healings: 1, testimonies: 4 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/7/73/Newark_Panorama.jpg",
    },
  },
  {
    id: "maysville",
    city: "Maysville",
    country: "United States",
    region: "North America",
    lat: 38.6412,
    lng: -83.7449,
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "Regional Outreach",
    summary: "GX ministry presence in Maysville, Kentucky during 2025.",
    prayerFocus: [
      "Regional impact",
      "Open hearts",
      "Sustainable fruit",
    ],
    stats: { heardGospel: 210, salvations: 9, healings: 1, testimonies: 3 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Maysville_Kentucky.jpg",
    },
  },
  {
    id: "lakeside",
    city: "Lakeside",
    country: "United States",
    region: "North America",
    lat: 48.0194,
    lng: -114.2223,
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "Montana Outreach",
    summary: "GX ministry presence in Lakeside, Montana during 2025.",
    prayerFocus: [
      "Regional witness",
      "Kingdom impact",
      "Strong testimony",
    ],
    stats: { heardGospel: 180, salvations: 7, healings: 0, testimonies: 2 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/6/68/Flathead_Lake_Montana.jpg",
    },
  },
  {
    id: "faroe-islands",
    city: "Faroe Islands",
    country: "Faroe Islands",
    region: "Europe",
    lat: 62.01,
    lng: -6.77,
    year: 2024,
    status: "historic",
    type: "outreach",
    title: "International Mission Presence",
    summary:
      "GX reached the Faroe Islands in 2024 as part of its international movement.",
    prayerFocus: [
      "Open hearts",
      "Long-term fruit",
      "Gospel witness",
    ],
    stats: { heardGospel: 120, salvations: 5, healings: 0, testimonies: 2 },
    media: {
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/9/99/Faroe_Islands_landscape.jpg",
    },
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "2026", label: "2026" },
  { id: "2025", label: "2025" },
  { id: "2024", label: "2024" },
];

const testimonials = [
  {
    quote:
      "We saw hearts opening in simple street conversations and people responding to the love of Jesus.",
    place: "California Outreach",
  },
  {
    quote:
      "What started as a public presentation became real ministry moments, prayer and bold gospel proclamation.",
    place: "Newark Microtraining",
  },
  {
    quote:
      "The Lord keeps moving through creative evangelism, relationships and courageous witness in the nations.",
    place: "Cape Town",
  },
  {
    quote:
      "Tirana is not just a point on the map — it is a field where God is actively drawing people right now.",
    place: "Albania 2026",
  },
];

function getPointColor(status) {
  if (status === "live") return GX.live;
  if (status === "recent") return GX.recent;
  return GX.historic;
}

function getFilterMatch(item, activeFilter) {
  if (activeFilter === "all") return true;
  if (activeFilter === "live") return item.status === "live";
  if (activeFilter === "2026") return item.year === 2026;
  if (activeFilter === "2025") return item.year === 2025;
  if (activeFilter === "2024") return item.year === 2024;
  return true;
}

function createFallbackImage(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#1b1b1b"/>
          <stop offset="100%" stop-color="#0D0D0D"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <circle cx="1010" cy="120" r="160" fill="rgba(244,96,26,0.24)"/>
      <text x="68" y="330" fill="#FAFAF8" font-size="64" font-family="Arial, sans-serif" font-weight="700">${label}</text>
      <text x="68" y="390" fill="#F4601A" font-size="28" font-family="Arial, sans-serif">GX International</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration]);

  return value;
}

function CountCard({ label, target }) {
  const value = useCountUp(target);
  return (
    <div className="gx-stat-card">
      <div className="gx-stat-label">{label}</div>
      <div className="gx-stat-value">{value.toLocaleString()}</div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="gx-mini-metric">
      <div className="gx-mini-label">{label}</div>
      <div className="gx-mini-value">{value.toLocaleString()}</div>
    </div>
  );
}

function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="gx-testimonial-card">
      <div className="gx-eyebrow">LIVE TESTIMONIES</div>
      <p className="gx-testimonial-quote">“{testimonials[index].quote}”</p>
      <div className="gx-testimonial-place">{testimonials[index].place}</div>
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      html, body, #root { margin: 0; min-height: 100%; background: #0D0D0D; }
      button { font: inherit; }

      @keyframes gxPulse {
        0% { transform: translate(-50%, -50%) scale(0.96); opacity: 0.65; }
        50% { transform: translate(-50%, -50%) scale(1.04); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.96); opacity: 0.65; }
      }

      @keyframes gxFloat {
        0% { transform: translateY(0px); opacity: 0.35; }
        50% { transform: translateY(-14px); opacity: 0.8; }
        100% { transform: translateY(0px); opacity: 0.35; }
      }

      .gx-page {
        min-height: 100vh;
        background:
          radial-gradient(circle at 15% 10%, rgba(244,96,26,0.12), transparent 18%),
          radial-gradient(circle at 86% 22%, rgba(244,96,26,0.08), transparent 22%),
          #0D0D0D;
        color: #FAFAF8;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        position: relative;
        overflow: hidden;
      }

      .gx-glow-left {
        position: absolute;
        top: -180px;
        left: -140px;
        width: 520px;
        height: 520px;
        border-radius: 50%;
        background: rgba(244,96,26,0.14);
        filter: blur(120px);
        pointer-events: none;
      }

      .gx-glow-right {
        position: absolute;
        top: 120px;
        right: -180px;
        width: 560px;
        height: 560px;
        border-radius: 50%;
        background: rgba(244,96,26,0.08);
        filter: blur(130px);
        pointer-events: none;
      }

      .gx-particles {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 1;
      }

      .gx-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(250,250,248,0.18);
        box-shadow: 0 0 10px rgba(244,96,26,0.35);
        animation: gxFloat 9s ease-in-out infinite;
      }

      .gx-container {
        width: min(1480px, calc(100% - 40px));
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }

      .gx-hero {
        padding: 52px 0 24px;
        display: grid;
        grid-template-columns: 1.18fr 0.82fr;
        gap: 24px;
        align-items: end;
      }

      .gx-eyebrow {
        font-size: 12px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: rgba(250,250,248,0.55);
        margin-bottom: 14px;
      }

      .gx-hero-title {
        margin: 0;
        font-size: clamp(44px, 6vw, 86px);
        line-height: 0.92;
        letter-spacing: -0.065em;
        white-space: normal;
      }

      .gx-hero-line {
        display: block;
        color: #FAFAF8;
      }

      .gx-hero-line-muted {
        display: block;
        color: rgba(250,250,248,0.62);
      }

      .gx-hero-text {
        margin-top: 22px;
        max-width: 820px;
        color: rgba(250,250,248,0.8);
        font-size: 18px;
        line-height: 1.8;
      }

      .gx-button-row {
        margin-top: 24px;
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .gx-primary-btn,
      .gx-secondary-btn,
      .gx-filter-btn,
      .gx-location-btn {
        appearance: none;
        outline: none;
      }

      .gx-primary-btn {
        background: #F4601A;
        color: #FAFAF8;
        border: 1px solid rgba(255,255,255,0.10);
        border-radius: 18px;
        padding: 14px 18px;
        cursor: pointer;
        font-weight: 700;
      }

      .gx-secondary-btn {
        background: rgba(255,255,255,0.05);
        color: #FAFAF8;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 18px;
        padding: 14px 18px;
        cursor: pointer;
        font-weight: 700;
      }

      .gx-hero-card,
      .gx-bottom-card,
      .gx-testimonial-card,
      .gx-stat-card,
      .gx-location-panel,
      .gx-location-list-card {
        background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
        border: 1px solid rgba(255,255,255,0.10);
        box-shadow: 0 0 40px rgba(244,96,26,0.06);
      }

      .gx-hero-card {
        border-radius: 28px;
        padding: 24px;
        backdrop-filter: blur(18px);
      }

      .gx-card-title {
        margin: 0;
        font-size: 32px;
        letter-spacing: -0.03em;
      }

      .gx-card-sub {
        margin-top: 8px;
        margin-bottom: 14px;
        color: rgba(250,250,248,0.68);
      }

      .gx-card-text {
        color: rgba(250,250,248,0.82);
        line-height: 1.72;
        font-size: 16px;
      }

      .gx-tag-row {
        margin-top: 16px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .gx-tag {
        border-radius: 999px;
        padding: 8px 12px;
        border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.05);
        color: #FAFAF8;
        font-size: 12px;
        text-transform: capitalize;
      }

      .gx-stats {
        padding: 8px 0 22px;
      }

      .gx-stats-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 12px;
      }

      .gx-stat-card {
        border-radius: 22px;
        padding: 18px;
        min-height: 108px;
      }

      .gx-stat-label {
        color: rgba(250,250,248,0.54);
        font-size: 13px;
        margin-bottom: 10px;
      }

      .gx-stat-value {
        font-size: 34px;
        font-weight: 700;
        letter-spacing: -0.04em;
      }

      .gx-globe-section {
        padding-bottom: 30px;
      }

      .gx-globe-header {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        align-items: flex-end;
        margin-bottom: 18px;
      }

      .gx-globe-title {
        margin: 0;
        font-size: 40px;
        letter-spacing: -0.04em;
      }

      .gx-globe-text {
        color: rgba(250,250,248,0.74);
        line-height: 1.7;
        max-width: 760px;
        margin-top: 12px;
      }

      .gx-filter-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .gx-filter-btn {
        border-radius: 999px;
        padding: 10px 14px;
        border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.05);
        color: #FAFAF8;
        cursor: pointer;
      }

      .gx-filter-btn.active {
        background: #F4601A;
        color: #FAFAF8;
        border-color: rgba(255,255,255,0.08);
      }

      .gx-globe-card {
        min-height: 860px;
        border-radius: 30px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.12);
        background: radial-gradient(circle at center, rgba(244,96,26,0.16), rgba(255,255,255,0.06) 36%, rgba(255,255,255,0.02) 62%);
        backdrop-filter: blur(20px);
        box-shadow: 0 0 80px rgba(244,96,26,0.12);
        position: relative;
      }

      .gx-globe-aura {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 520px;
        height: 520px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: rgba(244,96,26,0.18);
        filter: blur(100px);
        pointer-events: none;
        z-index: 0;
        animation: gxPulse 5.2s ease-in-out infinite;
      }

      .gx-location-section {
        margin-top: 18px;
        display: grid;
        grid-template-columns: 1fr 0.8fr;
        gap: 18px;
        align-items: stretch;
      }

      .gx-location-panel,
      .gx-location-list-card {
        border-radius: 28px;
        padding: 22px;
        backdrop-filter: blur(18px);
      }

      .gx-location-title {
        margin: 0;
        font-size: 34px;
        letter-spacing: -0.03em;
      }

      .gx-location-sub {
        margin-top: 8px;
        color: rgba(250,250,248,0.70);
      }

      .gx-cover {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 22px;
        margin-top: 18px;
        border: 1px solid rgba(255,255,255,0.08);
        background: #181818;
      }

      .gx-metrics-grid {
        margin-top: 18px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
      }

      .gx-mini-metric {
        border-radius: 18px;
        border: 1px solid rgba(255,255,255,0.10);
        background: rgba(0,0,0,0.18);
        padding: 14px;
      }

      .gx-mini-label {
        color: rgba(250,250,248,0.48);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        margin-bottom: 10px;
      }

      .gx-mini-value {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: -0.03em;
      }

      .gx-section-block {
        margin-top: 22px;
      }

      .gx-bullet-list {
        display: grid;
        gap: 12px;
        margin-top: 14px;
      }

      .gx-bullet-row {
        display: flex;
        gap: 10px;
        color: rgba(250,250,248,0.82);
        line-height: 1.6;
        align-items: flex-start;
      }

      .gx-bullet-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #F4601A;
        margin-top: 9px;
        flex-shrink: 0;
      }

      .gx-location-list {
        display: grid;
        gap: 10px;
        margin-top: 14px;
        max-height: 520px;
        overflow-y: auto;
        padding-right: 4px;
      }

      .gx-location-btn {
        width: 100%;
        border-radius: 18px;
        border: 1px solid rgba(255,255,255,0.10);
        background: rgba(255,255,255,0.03);
        color: #FAFAF8;
        padding: 14px;
        cursor: pointer;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      }

      .gx-location-btn.active {
        background: rgba(244,96,26,0.12);
        border-color: rgba(244,96,26,0.28);
      }

      .gx-location-name {
        font-weight: 600;
        margin-bottom: 4px;
      }

      .gx-location-meta {
        color: rgba(250,250,248,0.52);
        font-size: 13px;
      }

      .gx-location-dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        flex-shrink: 0;
      }

      .gx-testimonial-wrap {
        margin-top: 18px;
      }

      .gx-testimonial-card {
        border-radius: 24px;
        padding: 24px;
      }

      .gx-testimonial-quote {
        margin: 0;
        font-size: 24px;
        line-height: 1.6;
        color: #FAFAF8;
        max-width: 980px;
      }

      .gx-testimonial-place {
        margin-top: 14px;
        color: #F4601A;
        font-weight: 700;
        letter-spacing: 0.02em;
      }

      .gx-bottom {
        padding-bottom: 60px;
      }

      .gx-bottom-card {
        border-radius: 28px;
        padding: 28px;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 20px;
        align-items: center;
      }

      .gx-bottom-title {
        margin: 0;
        font-size: 42px;
        letter-spacing: -0.04em;
      }

      .gx-bottom-text {
        margin-top: 14px;
        color: rgba(250,250,248,0.76);
        line-height: 1.7;
        max-width: 780px;
      }

      @media (max-width: 1280px) {
        .gx-stats-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .gx-location-section {
          grid-template-columns: 1fr;
        }

        .gx-metrics-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .gx-globe-card {
          min-height: 760px;
        }
      }

      @media (max-width: 980px) {
        .gx-hero {
          grid-template-columns: 1fr;
        }

        .gx-globe-header {
          flex-direction: column;
          align-items: flex-start;
        }

        .gx-bottom-card {
          grid-template-columns: 1fr;
        }

        .gx-hero-title {
          font-size: clamp(44px, 12vw, 72px);
        }

        .gx-globe-card {
          min-height: 620px;
        }
      }

      @media (max-width: 720px) {
        .gx-container {
          width: min(100% - 24px, 1480px);
        }

        .gx-stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .gx-metrics-grid {
          grid-template-columns: 1fr 1fr;
        }

        .gx-cover {
          height: 210px;
        }

        .gx-location-title,
        .gx-card-title {
          font-size: 28px;
        }

        .gx-globe-title,
        .gx-bottom-title {
          font-size: 32px;
        }

        .gx-testimonial-quote {
          font-size: 20px;
        }
      }

      @media (max-width: 520px) {
        .gx-stats-grid,
        .gx-metrics-grid {
          grid-template-columns: 1fr;
        }

        .gx-globe-card {
          min-height: 520px;
        }
      }
    `}</style>
  );
}

export default function App() {
  const globeRef = useRef();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("tirana");
  const [imageSrc, setImageSrc] = useState("");

  const visibleLocations = useMemo(
    () => locations.filter((item) => getFilterMatch(item, activeFilter)),
    [activeFilter]
  );

  const selected =
    locations.find((item) => item.id === selectedId) || locations[0];

  useEffect(() => {
    setImageSrc(selected.media.cover || createFallbackImage(selected.city));
  }, [selected]);

  const arcsData = useMemo(() => {
    const kc = locations.find((item) => item.id === "kansas-city");
    if (!kc) return [];
    return locations
      .filter((item) => item.id !== "kansas-city")
      .map((item) => ({
        startLat: kc.lat,
        startLng: kc.lng,
        endLat: item.lat,
        endLng: item.lng,
        color: [GX.orange, GX.orange],
      }));
  }, []);

  const totals = useMemo(() => {
    return {
      locations: locations.length,
      liveNow: locations.filter((item) => item.status === "live").length,
      heardGospel: locations.reduce((sum, item) => sum + item.stats.heardGospel, 0),
      salvations: locations.reduce((sum, item) => sum + item.stats.salvations, 0),
      healings: locations.reduce((sum, item) => sum + item.stats.healings, 0),
      testimonies: locations.reduce((sum, item) => sum + item.stats.testimonies, 0),
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.pointOfView({ lat: 18, lng: 0, altitude: 1.8 }, 0);
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.18;
    globeRef.current.controls().enablePan = false;
    globeRef.current.controls().minDistance = 180;
    globeRef.current.controls().maxDistance = 420;
  }, []);

  const focusLocation = (location) => {
    setSelectedId(location.id);

    if (!globeRef.current) return;

    globeRef.current.pointOfView(
      { lat: location.lat, lng: location.lng, altitude: 1.22 },
      1400
    );
  };

  return (
    <div className="gx-page">
      <GlobalStyles />

      <div className="gx-glow-left"></div>
      <div className="gx-glow-right"></div>

      <div className="gx-particles">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="gx-particle"
            style={{
              left: `${(i * 4.3) % 96}%`,
              top: `${(i * 13.7) % 88}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="gx-container">
        <section className="gx-hero">
          <div>
            <div className="gx-eyebrow">GX INTERNATIONAL · GLOBAL MOVEMENT</div>

            <h1 className="gx-hero-title">
              <span className="gx-hero-line">REACHING THE LOST</span>
              <span className="gx-hero-line-muted">NO MATTER THE COST</span>
            </h1>

            <p className="gx-hero-text">
              A living global experience of where GX has been, where teams are
              active now, and where the gospel is moving through outreach,
              training, discipleship and mission.
            </p>

            <div className="gx-button-row">
              <button className="gx-primary-btn">Explore the Movement</button>
              <button className="gx-secondary-btn">Become a Partner</button>
            </div>
          </div>

          <div className="gx-hero-card">
            <div className="gx-eyebrow">LIVE FOCUS</div>
            <h3 className="gx-card-title">{selected.city}</h3>
            <p className="gx-card-sub">
              {selected.country} · {selected.region}
            </p>
            <p className="gx-card-text">{selected.summary}</p>

            <div className="gx-tag-row">
              <span className="gx-tag">{selected.year}</span>
              <span className="gx-tag">{selected.type}</span>
              <span className="gx-tag">
                {selected.status === "live" ? "Live Now" : selected.status}
              </span>
            </div>
          </div>
        </section>

        <section className="gx-stats">
          <div className="gx-stats-grid">
            <CountCard label="Tracked Locations" target={totals.locations} />
            <CountCard label="Live Locations" target={totals.liveNow} />
            <CountCard label="People Heard Gospel" target={totals.heardGospel} />
            <CountCard
              label="People Said Yes to Jesus"
              target={totals.salvations}
            />
            <CountCard label="Healings Reported" target={totals.healings} />
            <CountCard
              label="Testimonies Logged"
              target={totals.testimonies}
            />
          </div>
        </section>

        <section className="gx-globe-section">
          <div className="gx-globe-header">
            <div>
              <div className="gx-eyebrow">INTERACTIVE GLOBE</div>
              <h2 className="gx-globe-title">GX Global Impact in Motion</h2>
              <p className="gx-globe-text">
                Explore active fields, recent outreaches and historic mission
                footprint across the nations.
              </p>
            </div>

            <div className="gx-filter-row">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`gx-filter-btn ${
                    activeFilter === filter.id ? "active" : ""
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="gx-globe-card">
            <div className="gx-globe-aura"></div>
            <Globe
              ref={globeRef}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundColor="rgba(0,0,0,0)"
              showAtmosphere={true}
              atmosphereColor={GX.orange}
              atmosphereAltitude={0.22}
              pointsData={visibleLocations}
              pointLat="lat"
              pointLng="lng"
              pointColor={(d) => getPointColor(d.status)}
              pointAltitude={(d) => (d.status === "live" ? 0.26 : 0.16)}
              pointRadius={(d) => (d.status === "live" ? 0.7 : 0.45)}
              pointResolution={20}
              pointsMerge={false}
              arcsData={arcsData}
              arcColor={"color"}
              arcStroke={0.9}
              arcAltitude={0.2}
              arcDashLength={0.48}
              arcDashGap={1.6}
              arcDashAnimateTime={2800}
              onPointClick={(point) => focusLocation(point)}
              onPointHover={(point) => {
                if (point?.id) setSelectedId(point.id);
              }}
              width={1280}
              height={860}
            />
          </div>

          <div className="gx-location-section">
            <div className="gx-location-panel">
              <div className="gx-eyebrow">SELECTED LOCATION</div>
              <h3 className="gx-location-title">{selected.city}</h3>
              <p className="gx-location-sub">
                {selected.country} · {selected.region}
              </p>

              <img
                src={imageSrc}
                alt={selected.city}
                className="gx-cover"
                onError={() => setImageSrc(createFallbackImage(selected.city))}
              />

              <div className="gx-tag-row">
                <span className="gx-tag">{selected.year}</span>
                <span className="gx-tag">{selected.type}</span>
                <span className="gx-tag">
                  {selected.status === "live" ? "Live Now" : selected.status}
                </span>
              </div>

              <p className="gx-card-text">{selected.summary}</p>

              <div className="gx-metrics-grid">
                <MiniMetric
                  label="Heard Gospel"
                  value={selected.stats.heardGospel}
                />
                <MiniMetric label="Salvations" value={selected.stats.salvations} />
                <MiniMetric label="Healings" value={selected.stats.healings} />
                <MiniMetric
                  label="Testimonies"
                  value={selected.stats.testimonies}
                />
              </div>

              <div className="gx-section-block">
                <div className="gx-eyebrow">PRAYER FOCUS</div>
                <div className="gx-bullet-list">
                  {selected.prayerFocus.map((item) => (
                    <div key={item} className="gx-bullet-row">
                      <span className="gx-bullet-dot"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="gx-location-list-card">
              <div className="gx-eyebrow">LOCATIONS</div>
              <div className="gx-location-list">
                {visibleLocations.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => focusLocation(item)}
                    className={`gx-location-btn ${
                      selected.id === item.id ? "active" : ""
                    }`}
                  >
                    <div>
                      <div className="gx-location-name">{item.city}</div>
                      <div className="gx-location-meta">
                        {item.country} · {item.year}
                      </div>
                    </div>
                    <span
                      className="gx-location-dot"
                      style={{
                        background:
                          item.status === "live"
                            ? GX.live
                            : item.status === "recent"
                            ? GX.offWhite
                            : GX.historic,
                      }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="gx-testimonial-wrap">
            <TestimonialSlider />
          </div>
        </section>

        <section className="gx-bottom">
          <div className="gx-bottom-card">
            <div>
              <div className="gx-eyebrow">MORE THAN A MAP</div>
              <h2 className="gx-bottom-title">
                This is an invitation into the movement.
              </h2>
              <p className="gx-bottom-text">
                Explore the nations, follow the field, pray with us, give into
                the vision, and help fuel a ministry that is always in motion.
              </p>
            </div>

            <div className="gx-button-row">
              <button className="gx-primary-btn">Join the Mission</button>
              <button className="gx-secondary-btn">Give to the Vision</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
