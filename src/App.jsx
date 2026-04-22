import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { scaleSqrt } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  {
    id: "kansas-city",
    city: "Kansas City",
    country: "United States",
    region: "North America",
    coordinates: [-94.5786, 39.0997],
    year: 2026,
    status: "live",
    type: "base",
    title: "GX Base Hub",
    summary:
      "Current sending base and training hub. Mobilization, discipleship, mission preparation and team activation.",
    details: [
      "Training and sending base",
      "Mission mobilization hub",
      "Prayer, discipleship and activation",
    ],
  },
  {
    id: "tirana",
    city: "Tirana",
    country: "Albania",
    region: "Europe",
    coordinates: [19.8187, 41.3275],
    year: 2026,
    status: "live",
    type: "outreach",
    title: "Team on the Ground Now",
    summary:
      "GX team currently active in Tirana with outreach, evangelism and city impact.",
    details: [
      "Street evangelism",
      "School-related outreach focus",
      "City proclamation and follow-up",
    ],
  },
  {
    id: "milan",
    city: "Milan",
    country: "Italy",
    region: "Europe",
    coordinates: [9.19, 45.4642],
    year: 2026,
    status: "recent",
    type: "outreach",
    title: "Italy Outreach",
    summary:
      "GX was in Milan in February 2026 for evangelism and international ministry presence.",
    details: [
      "February 2026",
      "European outreach expression",
      "Creative evangelism",
    ],
  },
  {
    id: "san-francisco",
    city: "San Francisco",
    country: "United States",
    region: "North America",
    coordinates: [-122.4194, 37.7749],
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "California Tour",
    summary:
      "Part of the 2025 California outreach movement.",
    details: [
      "West Coast outreach",
      "Evangelism and ministry presence",
      "Part of California 2025 cluster",
    ],
  },
  {
    id: "santa-cruz",
    city: "Santa Cruz",
    country: "United States",
    region: "North America",
    coordinates: [-122.0308, 36.9741],
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "California Tour",
    summary:
      "Part of the 2025 California outreach movement.",
    details: [
      "West Coast outreach",
      "Evangelism and ministry presence",
      "Part of California 2025 cluster",
    ],
  },
  {
    id: "los-angeles",
    city: "Los Angeles",
    country: "United States",
    region: "North America",
    coordinates: [-118.2437, 34.0522],
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "California Tour",
    summary:
      "Part of the 2025 California outreach movement.",
    details: [
      "West Coast outreach",
      "Evangelism and ministry presence",
      "Part of California 2025 cluster",
    ],
  },
  {
    id: "san-diego",
    city: "San Diego",
    country: "United States",
    region: "North America",
    coordinates: [-117.1611, 32.7157],
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "California Tour",
    summary:
      "Part of the 2025 California outreach movement.",
    details: [
      "West Coast outreach",
      "Evangelism and ministry presence",
      "Part of California 2025 cluster",
    ],
  },
  {
    id: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    region: "Africa",
    coordinates: [18.4241, -33.9249],
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "Multiple 2025 Activations",
    summary:
      "GX was in Cape Town in February, October and November 2025.",
    details: [
      "February 2025",
      "October 2025",
      "November 2025",
    ],
  },
  {
    id: "newark",
    city: "Newark, NJ",
    country: "United States",
    region: "North America",
    coordinates: [-74.1724, 40.7357],
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "Outreach + Microtraining",
    summary:
      "Outreach with evangelism, presentation and a microtraining expression.",
    details: [
      "Outreach evangelism",
      "Creative presentation",
      "Microtraining component",
    ],
  },
  {
    id: "maysville",
    city: "Maysville, KY",
    country: "United States",
    region: "North America",
    coordinates: [-83.7449, 38.6412],
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "Regional Outreach",
    summary:
      "GX ministry presence in Maysville, Kentucky during 2025.",
    details: [
      "Regional ministry expression",
      "Evangelism presence",
      "U.S. outreach footprint",
    ],
  },
  {
    id: "lakeside",
    city: "Lakeside, Montana",
    country: "United States",
    region: "North America",
    coordinates: [-114.2223, 48.0194],
    year: 2025,
    status: "recent",
    type: "outreach",
    title: "Montana Outreach",
    summary:
      "GX ministry presence in Lakeside, Montana during 2025.",
    details: [
      "Lakeside, Montana",
      "U.S. outreach footprint",
      "Regional ministry impact",
    ],
  },
  {
    id: "faroe-islands",
    city: "Faroe Islands",
    country: "Faroe Islands",
    region: "Europe",
    coordinates: [-6.77, 62.01],
    year: 2024,
    status: "historic",
    type: "outreach",
    title: "International Mission Presence",
    summary:
      "GX reached the Faroe Islands in 2024 as part of its international movement.",
    details: [
      "2024 international outreach",
      "North Atlantic mission field",
      "Global GX footprint",
    ],
  },
];

const filters = ["all", "live", "2026", "2025", "2024"];

function getStatusColor(status) {
  if (status === "live") return "#7CFFB2";
  if (status === "recent") return "#FFFFFF";
  return "#7FA7FF";
}

export default function App() {
  const [selectedId, setSelectedId] = useState("tirana");
  const [activeFilter, setActiveFilter] = useState("all");
  const [position, setPosition] = useState({
    coordinates: [5, 20],
    zoom: 1,
  });

  const visibleLocations = useMemo(() => {
    return locations.filter((item) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "live") return item.status === "live";
      if (activeFilter === "2026") return item.year === 2026;
      if (activeFilter === "2025") return item.year === 2025;
      if (activeFilter === "2024") return item.year === 2024;
      return true;
    });
  }, [activeFilter]);

  const selected =
    visibleLocations.find((item) => item.id === selectedId) ||
    locations.find((item) => item.id === selectedId) ||
    locations[0];

  const sizeScale = useMemo(
    () => scaleSqrt().domain([1, 3]).range([8, 18]),
    []
  );

  const totals = useMemo(() => {
    return {
      totalLocations: locations.length,
      nations: 5,
      usaCities: 8,
      activeNow: locations.filter((item) => item.status === "live").length,
    };
  }, []);

  const focusLocation = (location) => {
    setSelectedId(location.id);
    setPosition({
      coordinates: location.coordinates,
      zoom: location.country === "United States" ? 2.4 : 3.2,
    });
  };

  return (
    <div className="gx-page">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-left">
            <div className="eyebrow">GX INTERNATIONAL · GLOBAL IMPACT</div>
            <h1>
              Reaching the lost, <span>no matter the cost.</span>
            </h1>
            <p className="hero-text">
              From Kansas City to Tirana, California to Cape Town, Faroe Islands
              to Milan — this map captures the recent movement of GX
              International across nations, cities and mission fields.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn">Explore the Movement</button>
              <button className="secondary-btn">Become a Partner</button>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <div>
                <div className="small-label">Current highlight</div>
                <h3>{selected.city}</h3>
              </div>
              <div className={`status-pill ${selected.status}`}>
                {selected.status === "live" ? "LIVE NOW" : String(selected.year)}
              </div>
            </div>

            <p className="card-summary">{selected.summary}</p>

            <div className="mini-stats">
              <div className="mini-box">
                <span className="mini-label">Type</span>
                <strong>{selected.type}</strong>
              </div>
              <div className="mini-box">
                <span className="mini-label">Year</span>
                <strong>{selected.year}</strong>
              </div>
              <div className="mini-box">
                <span className="mini-label">Region</span>
                <strong>{selected.region}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-row container">
        <div className="stat-card">
          <span className="stat-label">Tracked Locations</span>
          <strong>{totals.totalLocations}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Nations / Territories</span>
          <strong>{totals.nations}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">U.S. Cities Listed</span>
          <strong>{totals.usaCities}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Live Locations</span>
          <strong>{totals.activeNow}</strong>
        </div>
      </section>

      <section className="container map-section">
        <div className="map-panel">
          <div className="map-topbar">
            <div>
              <h2>GX Global Movement Map</h2>
              <p>
                Filter by live activity and recent years to visualize the
                current and recent footprint of GX International.
              </p>
            </div>

            <div className="filters">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === "all" ? "All" : filter}
                </button>
              ))}
            </div>
          </div>

          <div className="map-shell">
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 145 }}>
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={(pos) =>
                  setPosition({
                    coordinates: pos.coordinates,
                    zoom: pos.zoom,
                  })
                }
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#121722"
                        stroke="#2D3443"
                        strokeWidth={0.6}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#1B2230", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {visibleLocations.map((item) => {
                  const isSelected = selected.id === item.id;
                  const markerSize = sizeScale(item.status === "live" ? 3 : item.year === 2025 ? 2 : 1);

                  return (
                    <Marker key={item.id} coordinates={item.coordinates}>
                      <g className="marker-group" onClick={() => focusLocation(item)}>
                        <circle
                          r={isSelected ? markerSize + 8 : markerSize + 4}
                          fill="rgba(255,255,255,0.08)"
                        />
                        <circle
                          r={markerSize}
                          fill={getStatusColor(item.status)}
                        />
                        <circle r={2.5} fill="#0A0A0A" />
                      </g>
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>

            <div className="legend">
              <span><i className="dot live"></i> Live Now</span>
              <span><i className="dot recent"></i> 2025 / 2026</span>
              <span><i className="dot historic"></i> 2024</span>
            </div>
          </div>
        </div>

        <aside className="side-panel">
          <div className="side-card">
            <div className="small-label">Selected location</div>
            <h3>{selected.city}</h3>
            <p className="side-subtitle">
              {selected.country} · {selected.region}
            </p>

            <div className="side-tags">
              <span>{selected.year}</span>
              <span>{selected.type}</span>
              <span>{selected.status}</span>
            </div>

            <p className="side-description">{selected.summary}</p>

            <div className="bullet-list">
              {selected.details.map((detail) => (
                <div className="bullet-item" key={detail}>
                  <span className="bullet"></span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="side-card">
            <div className="small-label">Locations</div>
            <div className="locations-list">
              {visibleLocations.map((item) => (
                <button
                  key={item.id}
                  className={`location-item ${selected.id === item.id ? "selected" : ""}`}
                  onClick={() => focusLocation(item)}
                >
                  <div>
                    <div className="location-title">{item.city}</div>
                    <div className="location-meta">
                      {item.country} · {item.year}
                    </div>
                  </div>
                  <div className={`tiny-status ${item.status}`}></div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="container bottom-cta">
        <div className="bottom-card">
          <div>
            <div className="eyebrow">MORE THAN HISTORY</div>
            <h2>This is an invitation to move.</h2>
            <p>
              GX is not just documenting where it has been. It is showing where
              God is moving, where laborers are needed, and where partners can
              help fuel the mission.
            </p>
          </div>

          <div className="hero-buttons">
            <button className="primary-btn">Join the Mission</button>
            <button className="secondary-btn">Give to the Vision</button>
          </div>
        </div>
      </section>
    </div>
  );
}
