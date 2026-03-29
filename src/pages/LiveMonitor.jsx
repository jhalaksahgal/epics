import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";
import Chart from "chart.js/auto";
import { getDomains, searchWords } from "../services/api";

function LiveMonitor() {
  const chartRef = useRef(null);
  const donutRef = useRef(null);

  const [globalDomains, setGlobalDomains] = useState([]);
  const [activeQuery, setActiveQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [queryData, setQueryData] = useState([]);

  // Fetch initial base data
  useEffect(() => {
    async function fetchData() {
      try {
        const doms = await getDomains();
        setGlobalDomains(doms);

        // Optional: fetch a default search if none is selected
        const defaultSearch = "data"; // fallback if you don't keep topWords anymore
        setSearchTerm(defaultSearch);
        handleSearch(defaultSearch);
      } catch (err) {
        console.error("LiveMonitor fetch failed:", err);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (queryToSearch) => {
    const query = queryToSearch || searchTerm;
    if (!query) return;
    try {
      const results = await searchWords(query);
      // Sort to get best domains first
      results.sort((a, b) => b.frequency - a.frequency);
      setQueryData(results);
      setActiveQuery(query);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  // KPIs centered on activeQuery
  const totalFrequency = useMemo(() => queryData.reduce((sum, d) => sum + d.frequency, 0), [queryData]);
  const uniqueDomainsCount = queryData.length;
  const pagesIndexed = useMemo(() => globalDomains.reduce((sum, d) => sum + (d.total_words || 0), 0), [globalDomains]);
  const topDomain = queryData.length > 0 ? queryData[0].domain : "N/A";

  // Bar Chart (Frequency per domain for activeQuery)
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: queryData.map(d => d.domain),
        datasets: [
          {
            data: queryData.map(d => d.frequency),
            backgroundColor: queryData.map((_, i) => i === 0 ? "#4d9eff" : "rgba(77,158,255,0.25)"),
            borderRadius: 4,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#aaa", autoSkip: false, maxRotation: 45, minRotation: 45 } },
          y: { ticks: { color: "#aaa" } },
        },
      },
    });
    return () => chart.destroy();
  }, [queryData]);

  // Donut Chart (Domain breakdown for activeQuery)
  useEffect(() => {
    if (!donutRef.current) return;
    const chart = new Chart(donutRef.current, {
      type: "doughnut",
      data: {
        labels: queryData.map(d => d.domain),
        datasets: [{
          data: queryData.map(d => d.frequency),
          backgroundColor: queryData.map((_, i) => `hsl(${210 + (i % 5) * 20}, 70%, ${50 + (i % 3) * 10}%)`),
          borderWidth: 0,
        }],
      },
      options: {
        cutout: '75%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        }
      }
    });
    return () => chart.destroy();
  }, [queryData]);

  return (
    <div className="app-shell">

      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-status">
          <div className="topbar-section">
            <span>📡</span>
            <span className="topbar-label">LIVE MONITOR</span>
          </div>

          <div className="status-live">
            <span className="dot-green"></span>
            LIVE
          </div>

          <span className="topbar-label">STREAM ACTIVE</span>
        </div>


      </div>

      <div className="main-layout">

        {/* SIDEBAR (UNCHANGED) */}
        <aside className="sidebar">
          <nav className="sidebar-nav">

            <Link to="/configuration" className="nav-item">
              <span className="nav-icon">⚙</span> Configuration
            </Link>

            <Link to="/live-monitor" className="nav-item active">
              <span className="nav-icon">📡</span> Live Monitor
            </Link>


          </nav>

          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="user-avatar">SO</div>
              <div className="user-info">
                <div className="user-name">System Operator</div>
                <div className="user-id">ID: NX-8842</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="content-area">

          {/* HEADER */}
          <div className="title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="deep-dive-label">ACTIVE DEEP-DIVE</div>
              <div className="deep-dive-title" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                "{activeQuery}"
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', padding: '0 8px' }}>
                  <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    placeholder="Search query..."
                    style={{ background: 'transparent', border: 'none', color: '#fff', padding: '8px', outline: 'none', fontSize: '1rem', width: '200px' }}
                  />
                  <button onClick={() => handleSearch()} style={{ background: 'transparent', border: 'none', color: '#4d9eff', cursor: 'pointer', fontWeight: 'bold' }}>🔍</button>
                </div>
              </div>
              <div className="deep-dive-sub">
                Cross-platform analytical mapping across global news ecosystems
              </div>
            </div>

            <div className="stream-badges">
              <div className="stream-badge">
                <div className="stream-badge-label">Stream Health</div>
                <div className="live-dot">
                  <span className="g-dot"></span> LIVE DATA
                </div>
              </div>

              <div className="stream-badge">
                <div className="stream-badge-label">Timeframe</div>
                <div className="stream-badge-value">ALL TIME</div>
              </div>
            </div>
          </div>

          {/* KPI ROW */}
          <div className="kpi-row">

            <div className="kpi-card">
              <div className="kpi-body">
                <div className="kpi-label">Query Total Frequency</div>
                <div className="kpi-value">
                  {totalFrequency.toLocaleString()}
                </div>
              </div>
              <div className="kpi-icon">#</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-body">
                <div className="kpi-label">Domains Containing Query</div>
                <div className="kpi-value">{uniqueDomainsCount}</div>
              </div>
              <div className="kpi-icon">⊞</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-body">
                <div className="kpi-label">Total Indexed Words</div>
                <div className="kpi-value">{pagesIndexed.toLocaleString()}</div>
              </div>
              <div className="kpi-icon">📄</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-body">
                <div className="kpi-label">Top Domain for Query</div>
                <div className="kpi-value" style={{ fontSize: '1.2rem', wordBreak: 'break-all' }}>{topDomain}</div>
              </div>
              <div className="kpi-icon">🌐</div>
            </div>

          </div>

          {/* CHARTS */}
          <div className="charts-row">

            {/* GRAPH */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <div className="chart-title">Frequency per Domain</div>
                  <div className="chart-sub">Where is "{activeQuery}" mentioned?</div>
                </div>
              </div>
              <canvas ref={chartRef}></canvas>
            </div>

            {/* DONUT */}
            <div className="chart-card">
              <div className="chart-title" style={{ marginBottom: "12px" }}>
                Domain Corpus Share
              </div>

              <div className="gauge-wrapper" style={{ position: "relative", height: "180px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <canvas ref={donutRef} style={{ maxHeight: "180px" }}></canvas>
                <div style={{ position: "absolute", textAlign: "center", pointerEvents: "none" }}>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>{queryData.length}</div>
                  <div style={{ fontSize: "10px", color: "#aaa" }}>DOMAINS</div>
                </div>
              </div>
            </div>

          </div>

          {/* TABLE */}
          <div className="snippets-card">

            <div className="snippets-header">
              <div className="snippets-title">Domain Breakdown: {activeQuery}</div>

              <div className="snippets-actions">
                <div className="action-btn">FILTER</div>
                <div className="action-btn">SORT</div>
              </div>
            </div>

            <div className="snippets-sub">
              Detailed frequency breakdown across all indexed domains.
            </div>

            <table>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Domain</th>
                  <th>Frequency</th>
                </tr>
              </thead>

              <tbody>
                {queryData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.word}</td>
                    <td className="source-link">{row.domain}</td>
                    <td>{row.frequency}</td>
                  </tr>
                ))}
                {queryData.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", color: "#aaa" }}>No data available for "{activeQuery}"</td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>

        </main>
      </div>
    </div>
  );
}

export default LiveMonitor;