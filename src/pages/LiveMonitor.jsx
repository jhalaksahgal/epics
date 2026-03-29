import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LiveMonitor() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: Array.from({ length: 24 }, (_, i) => i),
        datasets: [
          {
            data: [
              45, 80, 130, 340, 190, 220, 160, 110,
              95, 140, 180, 130, 90, 75, 60, 50,
              120, 200, 170, 130, 100, 85, 70, 55
            ],
            backgroundColor: [
              ...Array(24).fill("rgba(77,158,255,0.25)")
            ].map((c, i) => (i === 10 ? "#4d9eff" : c)),
            borderRadius: 4,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#aaa" } },
          y: { ticks: { color: "#aaa" } },
        },
      },
    });

    return () => chart.destroy();
  }, []);

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
          <div className="title-row">
            <div>
              <div className="deep-dive-label">ACTIVE DEEP-DIVE</div>
              <div className="deep-dive-title">"Jai Shree Ram"</div>
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
                <div className="stream-badge-value">LAST 24 HOURS</div>
              </div>
            </div>
          </div>

          {/* KPI ROW */}
          <div className="kpi-row">

            <div className="kpi-card">
              <div className="kpi-body">
                <div className="kpi-label">Total Frequency</div>
                <div className="kpi-value">
                  2,410 <span style={{ fontSize: "12px", color: "#4d9eff" }}>+12%</span>
                </div>
              </div>
              <div className="kpi-icon">#</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-body">
                <div className="kpi-label">Unique Domains</div>
                <div className="kpi-value">12</div>
              </div>
              <div className="kpi-icon">⊞</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-body">
                <div className="kpi-label">Avg Sentiment</div>
                <div className="kpi-value positive">Positive</div>
              </div>
              <div className="kpi-icon">😊</div>
            </div>

            <div className="kpi-card">
              <div className="kpi-body">
                <div className="kpi-label">Peak Frequency Hour</div>
                <div className="kpi-value">09:00</div>
              </div>
              <div className="kpi-icon">⏰</div>
            </div>

          </div>

          {/* CHARTS */}
          <div className="charts-row">

            {/* GRAPH */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <div className="chart-title">Frequency over 24H Crawl</div>
                  <div className="chart-sub">Real-time spike monitoring</div>
                </div>
              </div>
              <canvas ref={chartRef}></canvas>
            </div>

            {/* GAUGE */}
            <div className="chart-card">
              <div className="chart-title" style={{ marginBottom: "12px" }}>
                Sentiment Analysis Gauge
              </div>

              <div className="gauge-wrapper">
                <svg className="gauge-svg" viewBox="0 0 120 70">
                  <path d="M10,60 A50,50 0 0,1 110,60"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <path d="M10,60 A50,50 0 0,1 110,60"
                    stroke="#22d172"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="157"
                    strokeDashoffset="40"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="gauge-pct">74%</div>
                <div className="gauge-label">OPTIMISTIC SIGNAL</div>

                <div className="gauge-breakdown">
                  <div className="gb-item">
                    <div className="gb-label">NEG</div>
                    <div className="gb-value neg">12%</div>
                  </div>
                  <div className="gb-item">
                    <div className="gb-label">NEU</div>
                    <div className="gb-value neu">14%</div>
                  </div>
                  <div className="gb-item">
                    <div className="gb-label">POS</div>
                    <div className="gb-value pos">74%</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* TABLE */}
          <div className="snippets-card">

            <div className="snippets-header">
              <div className="snippets-title">Keyword Context & Snippets</div>

              <div className="snippets-actions">
                <div className="action-btn">FILTER</div>
                <div className="action-btn">SORT</div>
              </div>
            </div>

            <div className="snippets-sub">
              Real-time phrase extraction and linguistic mapping
            </div>

            <table>
              <thead>
                <tr>
                  <th>Source URL</th>
                  <th>Word Count</th>
                  <th>Context Snippet</th>
                  <th>Crawl Timestamp</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="source-link">ndtv.com/india-news/...</td>
                  <td>1,240</td>
                  <td>...echoes of <span className="highlight">Jai Shree Ram</span>...</td>
                  <td>2023-18-27</td>
                </tr>

                <tr>
                  <td className="source-link">timesofindia...</td>
                  <td>856</td>
                  <td>chanting <span className="highlight">Jai Shree Ram</span>...</td>
                  <td>2023-18-27</td>
                </tr>

                <tr>
                  <td className="source-link">bbc.com/news...</td>
                  <td>2,104</td>
                  <td>digital footprint of <span className="highlight">Jai Shree Ram</span>...</td>
                  <td>2023-18-27</td>
                </tr>

                <tr>
                  <td className="source-link">aljazeera.com...</td>
                  <td>1,412</td>
                  <td>cultural identification <span className="highlight">Jai Shree Ram</span>...</td>
                  <td>2023-18-27</td>
                </tr>
              </tbody>
            </table>

          </div>

        </main>
      </div>
    </div>
  );
}

export default LiveMonitor;