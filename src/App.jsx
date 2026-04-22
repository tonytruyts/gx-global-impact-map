import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";

const gxColors = {
  orange: "#F4601A",
  black: "#0D0D0D",
  offWhite: "#FAFAF8",
  warmGray: "#F0EDE8",
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
  if (status === "live") return gxColors.live;
  if (status === "recent") return gxColors.recent;
  return gxColors.historic;
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
          <stop offset="0%" stop-color="#1c1c1c"/>
          <stop offset="100%" stop-color="#0d0d0d"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <circle cx="1020" cy="120" r="160" fill="rgba(244,96,26,0.25)"/>
      <text x="70" y="330" fill="#FAFAF8" font-size="64" font-family="Arial, sans-serif" font-weight="700">${label}</text>
      <text x="70" y="395" fill="#F4601A" font-size="28" font-family="Arial, sans-serif">GX International</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    let frameId;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(target * eased);
      setValue(start);
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
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value.toLocaleString()}</div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{value.toLocaleString()}</div>
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
    <div style={styles.testimonialCard}>
      <div style={styles.cardLabel}>LIVE TESTIMONIES</div>
      <p style={styles.testimonialQuote}>“{testimonials[index].quote}”</p>
      <div style={styles.testimonialPlace}>{testimonials[index].place}</div>
    </div>
  );
}

export default function App() {
  const globeRef = useRef();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("tirana");
  const [drawerOpen, setDrawerOpen] = useState(true);
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
        color: [gxColors.orange, gxColors.orange],
      }));
  }, []);

  const totals = useMemo(() => {
    return {
      locations: locations.length,
      liveNow: locations.filter((item) => item.status === "live").length,
      heardGospel: locations.reduce(
        (sum, item) => sum + item.stats.heardGospel,
        0
      ),
      salvations: locations.reduce((sum, item) => sum + item.stats.salvations, 0),
      healings: locations.reduce((sum, item) => sum + item.stats.healings, 0),
      testimonies: locations.reduce(
        (sum, item) => sum + item.stats.testimonies,
        0
      ),
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
    setDrawerOpen(true);

    if (!globeRef.current) return;

    globeRef.current.pointOfView(
      { lat: location.lat, lng: location.lng, altitude: 1.2 },
      1400
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundGlowLeft}></div>
      <div style={styles.backgroundGlowRight}></div>
      <div style={styles.particlesLayer}>
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.particle,
              left: `${(i * 4.3) % 96}%`,
              top: `${(i * 13.7) % 88}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <section style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroGrid}>
            <div>
              <div style={styles.eyebrow}>GX INTERNATIONAL · GLOBAL MOVEMENT</div>
              <h1 style={styles.heroTitle}>
                REACHING THE LOST{"\n"}
                <span style={styles.heroTitleSoft}>NO MATTER THE COST</span>
              </h1>
              <p style={styles.heroText}>
                A living global experience of where GX has been, where teams are
                active now, and where the gospel is moving through outreach,
                training, discipleship and mission.
              </p>

              <div style={styles.buttonRow}>
                <button style={styles.primaryButton}>Explore the Movement</button>
                <button style={styles.secondaryButton}>Become a Partner</button>
              </div>
            </div>

            <div style={styles.heroInfoCard}>
              <div style={styles.cardLabel}>LIVE FOCUS</div>
              <h3 style={styles.cardTitle}>{selected.city}</h3>
              <p style={styles.cardSub}>
                {selected.country} · {selected.region}
              </p>
              <p style={styles.cardText}>{selected.summary}</p>

              <div style={styles.tagRow}>
                <span style={styles.tag}>{selected.year}</span>
                <span style={styles.tag}>{selected.type}</span>
                <span style={styles.tag}>
                  {selected.status === "live" ? "Live Now" : selected.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
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
        </div>
      </section>

      <section style={styles.globeSection}>
        <div style={styles.container}>
          <div style={styles.globeHeader}>
            <div>
              <div style={styles.eyebrow}>INTERACTIVE GLOBE</div>
              <h2 style={styles.globeTitle}>GX Global Impact in Motion</h2>
              <p style={styles.globeText}>
                Explore active fields, recent outreaches and historic mission
                footprint across the nations.
              </p>
            </div>

            <div style={styles.filterRow}>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    ...styles.filterButton,
                    ...(activeFilter === filter.id
                      ? styles.filterButtonActive
                      : {}),
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.globeWrap}>
            <div style={styles.globeCard}>
              <div style={styles.globeAura}></div>
              <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere={true}
                atmosphereColor={gxColors.orange}
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
                width={1120}
                height={820}
              />
            </div>

            <div
              style={{
                ...styles.drawer,
                ...(drawerOpen ? styles.drawerOpen : styles.drawerClosed),
              }}
            >
              <div style={styles.drawerTop}>
                <div>
                  <div style={styles.cardLabel}>SELECTED LOCATION</div>
                  <h3 style={styles.drawerTitle}>{selected.city}</h3>
                  <p style={styles.drawerSub}>
                    {selected.country} · {selected.region}
                  </p>
                </div>

                <button
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  style={styles.drawerToggle}
                >
                  {drawerOpen ? "Close" : "Open"}
                </button>
              </div>

              <img
                src={imageSrc}
                alt={selected.city}
                style={styles.coverImage}
                onError={() => setImageSrc(createFallbackImage(selected.city))}
              />

              <div style={styles.tagRow}>
                <span style={styles.tag}>{selected.year}</span>
                <span style={styles.tag}>{selected.type}</span>
                <span style={styles.tag}>
                  {selected.status === "live" ? "Live Now" : selected.status}
                </span>
              </div>

              <p style={styles.cardText}>{selected.summary}</p>

              <div style={styles.metricsGrid}>
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

              <div style={styles.sectionBlock}>
                <div style={styles.cardLabel}>PRAYER FOCUS</div>
                <div style={styles.bulletList}>
                  {selected.prayerFocus.map((item) => (
                    <div key={item} style={styles.bulletRow}>
                      <span style={styles.bulletDot}></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.sectionBlock}>
                <div style={styles.cardLabel}>LOCATIONS</div>
                <div style={styles.locationList}>
                  {visibleLocations.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => focusLocation(item)}
                      style={{
                        ...styles.locationItem,
                        ...(selected.id === item.id
                          ? styles.locationItemActive
                          : {}),
                      }}
                    >
                      <div>
                        <div style={styles.locationName}>{item.city}</div>
                        <div style={styles.locationMeta}>
                          {item.country} · {item.year}
                        </div>
                      </div>
                      <span
                        style={{
                          ...styles.locationDot,
                          background:
                            item.status === "live"
                              ? gxColors.live
                              : item.status === "recent"
                              ? gxColors.offWhite
                              : gxColors.historic,
                        }}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.testimonialWrap}>
            <TestimonialSlider />
          </div>
        </div>
      </section>

      <section style={styles.bottomSection}>
        <div style={styles.container}>
          <div style={styles.bottomCard}>
            <div>
              <div style={styles.eyebrow}>MORE THAN A MAP</div>
              <h2 style={styles.bottomTitle}>
                This is an invitation into the movement.
              </h2>
              <p style={styles.bottomText}>
                Explore the nations, follow the field, pray with us, give into
                the vision, and help fuel a ministry that is always in motion.
              </p>
            </div>

            <div style={styles.buttonRow}>
              <button style={styles.primaryButton}>Join the Mission</button>
              <button style={styles.secondaryButton}>Give to the Vision</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 15% 10%, rgba(244,96,26,0.12), transparent 18%), radial-gradient(circle at 86% 22%, rgba(244,96,26,0.08), transparent 22%), #0D0D0D",
    color: gxColors.offWhite,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    position: "relative",
    overflow: "hidden",
  },
  backgroundGlowLeft: {
    position: "absolute",
    top: -180,
    left: -140,
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: "rgba(244,96,26,0.14)",
    filter: "blur(120px)",
    pointerEvents: "none",
  },
  backgroundGlowRight: {
    position: "absolute",
    top: 120,
    right: -180,
    width: 560,
    height: 560,
    borderRadius: "50%",
    background: "rgba(244,96,26,0.08)",
    filter: "blur(130px)",
    pointerEvents: "none",
  },
  particlesLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    overflow: "hidden",
    zIndex: 1,
  },
  particle: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "rgba(250,250,248,0.18)",
    boxShadow: "0 0 10px rgba(244,96,26,0.35)",
    animation: "gxFloat 9s ease-in-out infinite",
  },
  container: {
    width: "min(1480px, calc(100% - 40px))",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },
  heroSection: {
    padding: "52px 0 24px",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 24,
    alignItems: "end",
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "rgba(250,250,248,0.55)",
    marginBottom: 14,
  },
  heroTitle: {
    margin: 0,
    fontSize: "clamp(56px, 7vw, 102px)",
    lineHeight: 0.9,
    letterSpacing: "-0.07em",
    maxWidth: 980,
    whiteSpace: "pre-line",
  },
  heroTitleSoft: {
    color: "rgba(250,250,248,0.62)",
  },
  heroText: {
    marginTop: 22,
    maxWidth: 860,
    color: "rgba(250,250,248,0.8)",
    fontSize: 18,
    lineHeight: 1.8,
  },
  buttonRow: {
    marginTop: 24,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryButton: {
    background: gxColors.orange,
    color: gxColors.offWhite,
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 18,
    padding: "14px 18px",
    cursor: "pointer",
    fontWeight: 700,
  },
  secondaryButton: {
    background: "rgba(255,255,255,0.05)",
    color: gxColors.offWhite,
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 18,
    padding: "14px 18px",
    cursor: "pointer",
    fontWeight: 700,
  },
  heroInfoCard: {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 28,
    padding: 24,
    backdropFilter: "blur(18px)",
    boxShadow: "0 0 40px rgba(244,96,26,0.08)",
  },
  cardLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "rgba(250,250,248,0.5)",
    marginBottom: 10,
  },
  cardTitle: {
    margin: 0,
    fontSize: 34,
    letterSpacing: "-0.03em",
  },
  cardSub: {
    marginTop: 8,
    marginBottom: 14,
    color: "rgba(250,250,248,0.68)",
  },
  cardText: {
    color: "rgba(250,250,248,0.82)",
    lineHeight: 1.72,
    fontSize: 16,
  },
  tagRow: {
    marginTop: 16,
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 999,
    padding: "8px 12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: gxColors.offWhite,
    fontSize: 12,
    textTransform: "capitalize",
  },
  statsSection: {
    padding: "8px 0 22px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 12,
  },
  statCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 22,
    padding: 18,
    minHeight: 108,
    boxShadow: "0 0 20px rgba(244,96,26,0.03)",
  },
  statLabel: {
    color: "rgba(250,250,248,0.54)",
    fontSize: 13,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 34,
    fontWeight: 700,
    letterSpacing: "-0.04em",
  },
  globeSection: {
    paddingBottom: 30,
  },
  globeHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 18,
    alignItems: "flex-end",
    marginBottom: 18,
  },
  globeTitle: {
    margin: 0,
    fontSize: 44,
    letterSpacing: "-0.04em",
  },
  globeText: {
    color: "rgba(250,250,248,0.74)",
    lineHeight: 1.7,
    maxWidth: 760,
    marginTop: 12,
  },
  filterRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  filterButton: {
    borderRadius: 999,
    padding: "10px 14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: gxColors.offWhite,
    cursor: "pointer",
  },
  filterButtonActive: {
    background: gxColors.orange,
    color: gxColors.offWhite,
    border: "1px solid rgba(255,255,255,0.08)",
  },
  globeWrap: {
    display: "grid",
    gridTemplateColumns: "1.22fr 0.78fr",
    gap: 18,
    alignItems: "stretch",
  },
  globeCard: {
    minHeight: 820,
    borderRadius: 30,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.12)",
    background:
      "radial-gradient(circle at center, rgba(244,96,26,0.16), rgba(255,255,255,0.06) 36%, rgba(255,255,255,0.02) 62%)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 0 80px rgba(244,96,26,0.12)",
    position: "relative",
  },
  globeAura: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 520,
    height: 520,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    background: "rgba(244,96,26,0.18)",
    filter: "blur(100px)",
    pointerEvents: "none",
    zIndex: 0,
    animation: "gxPulse 5.2s ease-in-out infinite",
  },
  drawer: {
    borderRadius: 30,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    backdropFilter: "blur(18px)",
    padding: 22,
    transition: "all 0.3s ease",
    overflow: "hidden",
    boxShadow: "0 0 40px rgba(244,96,26,0.06)",
  },
  drawerOpen: {
    opacity: 1,
    transform: "translateX(0)",
  },
  drawerClosed: {
    opacity: 0.92,
    transform: "translateX(6px)",
  },
  drawerTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  drawerToggle: {
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
    color: gxColors.offWhite,
    padding: "10px 12px",
    cursor: "pointer",
  },
  drawerTitle: {
    margin: 0,
    fontSize: 36,
    letterSpacing: "-0.03em",
  },
  drawerSub: {
    marginTop: 8,
    color: "rgba(250,250,248,0.7)",
  },
  coverImage: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    borderRadius: 22,
    marginTop: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "#181818",
  },
  metricsGrid: {
    marginTop: 18,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 10,
  },
  metricCard: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.18)",
    padding: 14,
  },
  metricLabel: {
    color: "rgba(250,250,248,0.48)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: "-0.03em",
  },
  sectionBlock: {
    marginTop: 22,
  },
  bulletList: {
    display: "grid",
    gap: 12,
    marginTop: 14,
  },
  bulletRow: {
    display: "flex",
    gap: 10,
    color: "rgba(250,250,248,0.82)",
    lineHeight: 1.6,
    alignItems: "flex-start",
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    background: gxColors.orange,
    marginTop: 9,
    flexShrink: 0,
  },
  locationList: {
    display: "grid",
    gap: 10,
    marginTop: 14,
    maxHeight: 320,
    overflowY: "auto",
    paddingRight: 4,
  },
  locationItem: {
    width: "100%",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    color: gxColors.offWhite,
    padding: 14,
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  locationItemActive: {
    background: "rgba(244,96,26,0.12)",
    border: "1px solid rgba(244,96,26,0.28)",
  },
  locationName: {
    fontWeight: 600,
    marginBottom: 4,
  },
  locationMeta: {
    color: "rgba(250,250,248,0.52)",
    fontSize: 13,
  },
  locationDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    flexShrink: 0,
  },
  testimonialWrap: {
    marginTop: 18,
  },
  testimonialCard: {
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    padding: 24,
    boxShadow: "0 0 30px rgba(244,96,26,0.06)",
  },
  testimonialQuote: {
    margin: 0,
    fontSize: 24,
    lineHeight: 1.6,
    color: gxColors.offWhite,
    maxWidth: 980,
  },
  testimonialPlace: {
    marginTop: 14,
    color: gxColors.orange,
    fontWeight: 700,
    letterSpacing: "0.02em",
  },
  bottomSection: {
    paddingBottom: 60,
  },
  bottomCard: {
    borderRadius: 28,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    padding: 28,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 20,
    alignItems: "center",
  },
  bottomTitle: {
    margin: 0,
    fontSize: 42,
    letterSpacing: "-0.04em",
  },
  bottomText: {
    marginTop: 14,
    color: "rgba(250,250,248,0.76)",
    lineHeight: 1.7,
    maxWidth: 780,
  },
};

if (typeof document !== "undefined" && !document.getElementById("gx-keyframes")) {
  const style = document.createElement("style");
  style.id = "gx-keyframes";
  style.innerHTML = `
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
  `;
  document.head.appendChild(style);
}
