import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";

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
      heardGospel: 0,
      salvations: 0,
      healings: 0,
      testimonies: 0,
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
      heardGospel: 0,
      salvations: 0,
      healings: 0,
      testimonies: 0,
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
      heardGospel: 0,
      salvations: 0,
      healings: 0,
      testimonies: 0,
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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
    stats: { heardGospel: 0, salvations: 0, healings: 0, testimonies: 0 },
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

const gxColors = {
  orange: "#F4601A",
  black: "#0D0D0D",
  offWhite: "#FAFAF8",
  warmGray: "#F0EDE8",
  live: "#6EF3A5",
  recent: "#FAFAF8",
  historic: "#87A8FF",
};

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

export default function App() {
  const globeRef = useRef();
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("tirana");
  const [drawerOpen, setDrawerOpen] = useState(true);

  const visibleLocations = useMemo(
    () => locations.filter((item) => getFilterMatch(item, activeFilter)),
    [activeFilter]
  );

  const selected =
    locations.find((item) => item.id === selectedId) || locations[0];

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
      nations: 5,
      heardGospel: locations.reduce((sum, item) => sum + item.stats.heardGospel, 0),
      salvations: locations.reduce((sum, item) => sum + item.stats.salvations, 0),
      healings: locations.reduce((sum, item) => sum + item.stats.healings, 0),
      testimonies: locations.reduce((sum, item) => sum + item.stats.testimonies, 0),
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.pointOfView({ lat: 18, lng: 0, altitude: 2.1 }, 0);
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.35;
    globeRef.current.controls().enablePan = false;
  }, []);

  const focusLocation = (location) => {
    setSelectedId(location.id);
    setDrawerOpen(true);

    if (!globeRef.current) return;

    globeRef.current.pointOfView(
      { lat: location.lat, lng: location.lng, altitude: 1.45 },
      1200
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundGlowLeft}></div>
      <div style={styles.backgroundGlowRight}></div>

      <section style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroGrid}>
            <div>
              <div style={styles.eyebrow}>GX INTERNATIONAL · GLOBAL MOVEMENT</div>
              <h1 style={styles.heroTitle}>
                Reaching the lost, <span style={styles.heroTitleSoft}>no matter the cost.</span>
              </h1>
              <p style={styles.heroText}>
                A living global experience of where GX has been, where teams are active now,
                and where the gospel is moving through outreach, training, discipleship and mission.
              </p>

              <div style={styles.buttonRow}>
                <button style={styles.primaryButton}>Explore the Movement</button>
                <button style={styles.secondaryButton}>Become a Partner</button>
              </div>
            </div>

            <div style={styles.heroInfoCard}>
              <div style={styles.cardLabel}>Live Focus</div>
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
            <StatCard label="Tracked Locations" value={totals.locations} />
            <StatCard label="Live Locations" value={totals.liveNow} />
            <StatCard label="People Heard Gospel" value={totals.heardGospel} />
            <StatCard label="People Said Yes to Jesus" value={totals.salvations} />
            <StatCard label="Healings Reported" value={totals.healings} />
            <StatCard label="Testimonies Logged" value={totals.testimonies} />
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
                Explore active fields, recent outreaches and historic mission footprint across
                the nations.
              </p>
            </div>

            <div style={styles.filterRow}>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  style={{
                    ...styles.filterButton,
                    ...(activeFilter === filter.id ? styles.filterButtonActive : {}),
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.globeWrap}>
            <div style={styles.globeCard}>
              <Globe
                ref={globeRef}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere={true}
                atmosphereColor={gxColors.orange}
                atmosphereAltitude={0.14}
                pointsData={visibleLocations}
                pointLat="lat"
                pointLng="lng"
                pointColor={(d) => getPointColor(d.status)}
                pointAltitude={(d) => (d.status === "live" ? 0.2 : 0.12)}
                pointRadius={(d) => (d.status === "live" ? 0.52 : 0.34)}
                pointResolution={18}
                pointsMerge={false}
                arcsData={arcsData}
                arcColor={"color"}
                arcStroke={0.8}
                arcAltitude={0.18}
                arcDashLength={0.45}
                arcDashGap={1.8}
                arcDashAnimateTime={2500}
                onPointClick={(point) => focusLocation(point)}
                onPointHover={(point) => {
                  if (point?.id) setSelectedId(point.id);
                }}
                width={900}
                height={720}
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
                  <div style={styles.cardLabel}>Selected Location</div>
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
                src={selected.media.cover}
                alt={selected.city}
                style={styles.coverImage}
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
                <MiniMetric label="Heard Gospel" value={selected.stats.heardGospel} />
                <MiniMetric label="Salvations" value={selected.stats.salvations} />
                <MiniMetric label="Healings" value={selected.stats.healings} />
                <MiniMetric label="Testimonies" value={selected.stats.testimonies} />
              </div>

              <div style={styles.sectionBlock}>
                <div style={styles.cardLabel}>Prayer Focus</div>
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
                <div style={styles.cardLabel}>Locations</div>
                <div style={styles.locationList}>
                  {visibleLocations.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => focusLocation(item)}
                      style={{
                        ...styles.locationItem,
                        ...(selected.id === item.id ? styles.locationItemActive : {}),
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
        </div>
      </section>

      <section style={styles.bottomSection}>
        <div style={styles.container}>
          <div style={styles.bottomCard}>
            <div>
              <div style={styles.eyebrow}>MORE THAN A MAP</div>
              <h2 style={styles.bottomTitle}>A living movement, not a static archive.</h2>
              <p style={styles.bottomText}>
                Next we can connect every location to real GX photos, videos, testimonies,
                impact numbers and stories of transformation.
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

function StatCard({ label, value }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div style={styles.metricCard}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{value}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: gxColors.black,
    color: gxColors.offWhite,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    position: "relative",
    overflow: "hidden",
  },
  backgroundGlowLeft: {
    position: "absolute",
    top: -200,
    left: -180,
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: "rgba(244,96,26,0.18)",
    filter: "blur(110px)",
    pointerEvents: "none",
  },
  backgroundGlowRight: {
    position: "absolute",
    top: 120,
    right: -220,
    width: 560,
    height: 560,
    borderRadius: "50%",
    background: "rgba(244,96,26,0.10)",
    filter: "blur(130px)",
    pointerEvents: "none",
  },
  container: {
    width: "min(1440px, calc(100% - 40px))",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },
  heroSection: {
    padding: "56px 0 24px",
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.15fr 0.85fr",
    gap: 24,
    alignItems: "end",
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(250,250,248,0.55)",
    marginBottom: 14,
  },
  heroTitle: {
    margin: 0,
    fontSize: "clamp(48px, 6vw, 84px)",
    lineHeight: 0.94,
    letterSpacing: "-0.05em",
    maxWidth: 860,
  },
  heroTitleSoft: {
    color: "rgba(250,250,248,0.56)",
  },
  heroText: {
    marginTop: 20,
    maxWidth: 820,
    color: "rgba(250,250,248,0.78)",
    fontSize: 18,
    lineHeight: 1.75,
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
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: "14px 18px",
    cursor: "pointer",
    fontWeight: 600,
  },
  secondaryButton: {
    background: "rgba(255,255,255,0.05)",
    color: gxColors.offWhite,
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 18,
    padding: "14px 18px",
    cursor: "pointer",
    fontWeight: 600,
  },
  heroInfoCard: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 28,
    padding: 24,
    backdropFilter: "blur(18px)",
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
    fontSize: 32,
    letterSpacing: "-0.03em",
  },
  cardSub: {
    marginTop: 8,
    marginBottom: 14,
    color: "rgba(250,250,248,0.68)",
  },
  cardText: {
    color: "rgba(250,250,248,0.80)",
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
    padding: "6px 0 22px",
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
    paddingBottom: 34,
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
    fontSize: 42,
    letterSpacing: "-0.04em",
  },
  globeText: {
    color: "rgba(250,250,248,0.74)",
    lineHeight: 1.7,
    maxWidth: 740,
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
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 18,
    alignItems: "stretch",
  },
  globeCard: {
    minHeight: 720,
    borderRadius: 30,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "radial-gradient(circle at center, rgba(244,96,26,0.08), rgba(255,255,255,0.02) 34%, rgba(255,255,255,0.01) 50%)",
    backdropFilter: "blur(20px)",
  },
  drawer: {
    borderRadius: 30,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    backdropFilter: "blur(18px)",
    padding: 22,
    transition: "all 0.3s ease",
    overflow: "hidden",
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
    fontSize: 34,
    letterSpacing: "-0.03em",
  },
  drawerSub: {
    marginTop: 8,
    color: "rgba(250,250,248,0.7)",
  },
  coverImage: {
    width: "100%",
    height: 220,
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
    maxHeight: 290,
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
  bottomSection: {
    paddingBottom: 60,
  },
  bottomCard: {
    borderRadius: 28,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
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
