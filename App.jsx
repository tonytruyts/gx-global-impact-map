import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { scaleSqrt } from "d3-scale";
import { Globe, MapPinned, Users, Cross, HeartHandshake, Radio, Filter, ArrowUpRight, Waves } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const locations = [
  { id: "kc", country: "United States", city: "Kansas City", region: "North America", coordinates: [-94.5786, 39.0997], status: "active", category: "training", year: 2026, peopleReached: 1200, salvations: 96, partners: 18, summary: "Base de envio, treinamento, mobilização e ativação evangelística com foco em discipulado e envio estratégico.", prayerFocus: "Ore por envio de trabalhadores, clareza estratégica e fogo missionário sustentável." },
  { id: "sf", country: "United States", city: "San Francisco", region: "North America", coordinates: [-122.4194, 37.7749], status: "historic", category: "outreach", year: 2025, peopleReached: 840, salvations: 41, partners: 6, summary: "Outreach urbano com evangelismo criativo, performance, discipulado local e conexão com igrejas.", prayerFocus: "Ore por transformação nas ruas, jovens famintos por Deus e pontes com a igreja local." },
  { id: "la", country: "United States", city: "Los Angeles", region: "North America", coordinates: [-118.2437, 34.0522], status: "historic", category: "outreach", year: 2025, peopleReached: 530, salvations: 24, partners: 4, summary: "Evangelismo público e ações em áreas de grande fluxo, com foco em presença profética e testemunho.", prayerFocus: "Ore por quebrantamento, unidade da igreja e portas abertas para proclamação pública." },
  { id: "tirana", country: "Albania", city: "Tirana", region: "Europe", coordinates: [19.8187, 41.3275], status: "active", category: "outreach", year: 2026, peopleReached: 2100, salvations: 143, partners: 12, summary: "Campanha de escolas, mobilização evangelística e proclamação em massa conectada a parcerias locais.", prayerFocus: "Ore por boldness, favor em escolas, follow-up real e uma colheita que permaneça." },
  { id: "pristina", country: "Kosovo", city: "Pristina", region: "Europe", coordinates: [21.1655, 42.6629], status: "upcoming", category: "prayer", year: 2026, peopleReached: 0, salvations: 0, partners: 3, summary: "Expansão para oração estratégica, conexões locais e possíveis ativações evangelísticas regionais.", prayerFocus: "Ore por favor, alianças certas e portas abertas para proclamação consistente." },
  { id: "milan", country: "Italy", city: "Milan", region: "Europe", coordinates: [9.19, 45.4642], status: "historic", category: "outreach", year: 2026, peopleReached: 680, salvations: 33, partners: 5, summary: "Evangelismo relacional e criativo em espaços públicos durante temporada de grande fluxo internacional.", prayerFocus: "Ore por continuidade do fruto, relacionamentos e discipulado local após o contato inicial." },
  { id: "sao-paulo", country: "Brazil", city: "São Paulo", region: "South America", coordinates: [-46.6333, -23.5505], status: "historic", category: "partner", year: 2024, peopleReached: 460, salvations: 19, partners: 7, summary: "Conexões ministeriais, mobilização e fortalecimento de relacionamento com igrejas e apoiadores.", prayerFocus: "Ore por expansão de parcerias, envio de equipes e base de sustentação saudável." },
  { id: "cape-town", country: "South Africa", city: "Cape Town", region: "Africa", coordinates: [18.4241, -33.9249], status: "upcoming", category: "partner", year: 2026, peopleReached: 0, salvations: 0, partners: 2, summary: "Região em observação para futuras expressões de treinamento, parceria e evangelismo criativo.", prayerFocus: "Ore por discernimento, alianças certas e visão clara para os próximos passos." }
];
const statCards = [
  { label: "Nações alcançadas", value: "25+", icon: Globe },
  { label: "Estados nos EUA", value: "45", icon: MapPinned },
  { label: "Pessoas alcançadas", value: "10K+", icon: Users },
  { label: "Decisões por Jesus", value: "Milhares", icon: Cross }
];
const filters = ["all", "active", "historic", "upcoming"];

function MetricMini({ label, value }) {
  return <div className="mini-metric"><div className="mini-label">{label}</div><div className="mini-value">{value}</div></div>;
}
function SnapshotRow({ label, value }) {
  return <div className="snapshot-row"><span>{label}</span><strong>{value}</strong></div>;
}

export default function App() {
  const [selectedId, setSelectedId] = useState("tirana");
  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState({ coordinates: [12, 18], zoom: 1 });
  const sizeScale = useMemo(() => scaleSqrt().domain([0, 2200]).range([5, 22]), []);

  const visibleLocations = useMemo(() => locations.filter((item) => {
    const statusMatch = statusFilter === "all" ? true : item.status === statusFilter;
    const queryMatch = [item.city, item.country, item.region, item.category].join(" ").toLowerCase().includes(query.toLowerCase());
    return statusMatch && queryMatch;
  }), [statusFilter, query]);

  const selected = visibleLocations.find((item) => item.id === selectedId) ?? visibleLocations[0] ?? locations[0];
  const totals = useMemo(() => visibleLocations.reduce((acc, item) => {
    acc.peopleReached += item.peopleReached;
    acc.salvations += item.salvations;
    acc.partners += item.partners;
    return acc;
  }, { peopleReached: 0, salvations: 0, partners: 0 }), [visibleLocations]);

  const focusLocation = (item) => {
    setSelectedId(item.id);
    setPosition({ coordinates: item.coordinates, zoom: 3.2 });
  };

  return (
    <div className="page">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="badge">GX INTERNATIONAL · GLOBAL IMPACT MAP</div>
            <h1>Reaching the lost, <span>no matter the cost.</span></h1>
            <p className="hero-text">Um mapa global interativo para visualizar presença, impacto, campanhas, parcerias e frentes de oração do GX International com estética premium, narrativa missionária e leitura clara para mobilização.</p>
            <div className="cta-row">
              <button className="btn btn-light">Explore the map</button>
              <button className="btn btn-dark">Become a partner</button>
            </div>
          </div>

          <div className="card featured-card">
            <div className="card-top">
              <div><div className="eyebrow">Current focus</div><h3>{selected.city}, {selected.country}</h3></div>
              <div className={`status-pill ${selected.status}`}>{selected.status}</div>
            </div>
            <p className="muted">{selected.summary}</p>
            <div className="mini-grid">
              <MetricMini label="Reached" value={selected.peopleReached.toLocaleString()} />
              <MetricMini label="Yes to Jesus" value={selected.salvations.toLocaleString()} />
              <MetricMini label="Partners" value={selected.partners.toLocaleString()} />
            </div>
          </div>
        </div>
      </section>

      <section className="container stats">
        {statCards.map((item) => {
          const Icon = item.icon;
          return <div className="card stat-card" key={item.label}><div><div className="muted">{item.label}</div><div className="stat-value">{item.value}</div></div><div className="icon-wrap"><Icon size={20} /></div></div>;
        })}
      </section>

      <section className="container map-layout">
        <div className="card map-card">
          <div className="map-toolbar">
            <div>
              <h2>Global presence and movement</h2>
              <p className="muted">Visualize activity by region, recent campaigns, strategic prayer points and ministry footprint.</p>
            </div>
            <div className="toolbar-right">
              <div className="search-box"><Filter size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search country, city, region..." /></div>
              <div className="filter-row">
                {filters.map((item) => <button key={item} className={`filter-chip ${statusFilter === item ? "active" : ""}`} onClick={() => setStatusFilter(item)}>{item}</button>)}
              </div>
            </div>
          </div>

          <div className="map-shell">
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }}>
              <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={(pos) => setPosition({ coordinates: pos.coordinates, zoom: pos.zoom })}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) => geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} fill="#141821" stroke="#2A3142" strokeWidth={0.5}
                      style={{ default: { outline: "none" }, hover: { fill: "#1E2634", outline: "none" }, pressed: { outline: "none" } }} />
                  ))}
                </Geographies>

                {visibleLocations.map((item) => {
                  const isSelected = selected.id === item.id;
                  const size = sizeScale(Math.max(item.peopleReached, 180));
                  const fill = item.status === "active" ? "#FFFFFF" : item.status === "upcoming" ? "#70F3C0" : "#7FA7FF";
                  return (
                    <Marker key={item.id} coordinates={item.coordinates}>
                      <g className="marker-group" onClick={() => focusLocation(item)}>
                        <motion.circle r={isSelected ? size + 8 : size + 4} fill="rgba(255,255,255,0.08)" animate={{ opacity: isSelected ? 0.8 : 0.35, scale: isSelected ? 1.12 : 1 }} transition={{ duration: 0.4 }} />
                        <motion.circle r={size} fill={fill} animate={{ scale: isSelected ? 1.06 : 1 }} transition={{ duration: 0.25 }} />
                        <circle r={2.2} fill="#0A0A0A" />
                      </g>
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>
            <div className="legend">
              <span><i className="dot active" /> Active</span>
              <span><i className="dot historic" /> Historic</span>
              <span><i className="dot upcoming" /> Upcoming</span>
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="card side-card">
            <h3>Region snapshot</h3>
            <div className="stack-list">
              <SnapshotRow label="People Heard Gospel" value={totals.peopleReached.toLocaleString()} />
              <SnapshotRow label="People Said Yes to Jesus" value={totals.salvations.toLocaleString()} />
              <SnapshotRow label="Strategic Partners" value={totals.partners.toLocaleString()} />
              <SnapshotRow label="Visible Locations" value={String(visibleLocations.length)} />
            </div>
          </div>

          <div className="card side-card">
            <div className="side-header">
              <div><h3>{selected.city}</h3><div className="muted small">{selected.country} · {selected.region}</div></div>
              <div className="year-pill">{selected.year}</div>
            </div>
            <div className="mini-grid">
              <MetricMini label="Reached" value={selected.peopleReached.toLocaleString()} />
              <MetricMini label="Yes" value={selected.salvations.toLocaleString()} />
              <MetricMini label="Partners" value={selected.partners.toLocaleString()} />
            </div>
            <div><div className="eyebrow">Summary</div><p className="muted">{selected.summary}</p></div>
            <div><div className="eyebrow">Prayer focus</div><p className="muted">{selected.prayerFocus}</p></div>
            <button className="btn btn-light full">View full field report <ArrowUpRight size={16} /></button>
          </div>

          <div className="card side-card">
            <h3>Locations</h3>
            <div className="locations-list">
              {visibleLocations.map((item) => (
                <button key={item.id} className={`location-item ${selected.id === item.id ? "selected" : ""}`} onClick={() => focusLocation(item)}>
                  <div className="location-top">
                    <div><div className="location-title">{item.city}, {item.country}</div><div className="muted small">{item.region} · {item.category}</div></div>
                    <div className="status-pill slim">{item.status}</div>
                  </div>
                  <div className="location-bottom muted small"><span>{item.peopleReached.toLocaleString()} reached</span><span>{item.salvations.toLocaleString()} yes</span></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container bottom-cta">
        <div className="card cta-card">
          <div>
            <div className="cta-eyebrow"><Waves size={18} /> Mobilize · Pray · Give · Go</div>
            <h2>This is more than a map. It is a call to action.</h2>
            <p className="muted">Transforme esse módulo em uma ferramenta de visão: cada ponto do mapa pode abrir relatórios, vídeos, testemunhos, fotos, pedidos de oração, botões de doação e chamadas para participação missionária.</p>
          </div>
          <div className="cta-row">
            <button className="btn btn-light"><HeartHandshake size={16} /> Become a partner</button>
            <button className="btn btn-dark"><Radio size={16} /> Submit report</button>
          </div>
        </div>
      </section>
    </div>
  );
}
