import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { TreemapController, TreemapElement } from "chartjs-chart-treemap";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { startCrawl, getTopWords, getWordByDomain } from "../services/api";

Chart.register(TreemapController, TreemapElement, MatrixController, MatrixElement);

function Configuration() {
  const [seedUrls, setSeedUrls] = useState("");
  const [crawlStatus, setCrawlStatus] = useState("");
  const [top50Data, setTop50Data] = useState([]);
  const [top50Loading, setTop50Loading] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);
  const [heatmapLoading, setHeatmapLoading] = useState(false);
  
  const treemapRef = useRef(null);
  const treemapInstance = useRef(null);
  const heatmapRef = useRef(null);
  const heatmapInstance = useRef(null);

  const handleStartCrawl = async () => {
    const urls = seedUrls.split("\n").map(u => u.trim()).filter(Boolean);
    if (urls.length === 0) {
      setCrawlStatus("Error: No URLs provided");
      return;
    }

    try {
      await startCrawl(urls);
      setCrawlStatus("Crawl started successfully!");
    } catch (err) {
      setCrawlStatus(`Error: ${err.message}`);
    }
  };

  const handleLoadTop50 = async () => {
    setTop50Loading(true);
    try {
      const data = await getTopWords(50);
      setTop50Data(data);
    } catch (err) {
      console.error("Failed to load top 50:", err);
    } finally {
      setTop50Loading(false);
    }
  };

  const handleLoadHeatmap = async () => {
    setHeatmapLoading(true);
    try {
      const topWords = await getTopWords(15);
      const matrix = [];
      
      for (const wordObj of topWords) {
        const domainData = await getWordByDomain(wordObj.word);
        for (const d of domainData) {
          matrix.push({
            word: wordObj.word,
            domain: d.domain,
            frequency: d.frequency
          });
        }
      }
      
      setHeatmapData(matrix);
    } catch (err) {
      console.error("Failed to load heatmap:", err);
    } finally {
      setHeatmapLoading(false);
    }
  };

  useEffect(() => {
    if (top50Data.length > 0 && treemapRef.current) {
      if (treemapInstance.current) {
        treemapInstance.current.destroy();
      }

      treemapInstance.current = new Chart(treemapRef.current, {
        type: "treemap",
        data: {
          datasets: [{
            tree: top50Data,
            key: "frequency",
            groups: ["word"],
            backgroundColor: (ctx) => {
              const value = ctx.raw.v;
              const max = Math.max(...top50Data.map(d => d.frequency));
              const intensity = value / max;
              return `rgba(77, 158, 255, ${0.3 + intensity * 0.7})`;
            },
            labels: {
              display: true,
              formatter: (ctx) => ctx.raw._data.word,
              color: "#fff",
              font: { size: 11, weight: "bold" }
            },
            spacing: 1,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false }, tooltip: { enabled: true } }
        }
      });
    }
  }, [top50Data]);

  useEffect(() => {
    if (heatmapData.length > 0 && heatmapRef.current) {
      if (heatmapInstance.current) {
        heatmapInstance.current.destroy();
      }

      const words = [...new Set(heatmapData.map(d => d.word))];
      const domains = [...new Set(heatmapData.map(d => d.domain))];

      const matrixPoints = heatmapData.map(d => ({
        x: domains.indexOf(d.domain),
        y: words.indexOf(d.word),
        v: d.frequency
      }));

      const maxFreq = Math.max(...heatmapData.map(d => d.frequency));

      heatmapInstance.current = new Chart(heatmapRef.current, {
        type: "matrix",
        data: {
          datasets: [{
            data: matrixPoints,
            backgroundColor: (ctx) => {
              const value = ctx.raw.v;
              const intensity = value / maxFreq;
              return `rgba(77, 158, 255, ${0.2 + intensity * 0.8})`;
            },
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.1)",
            width: ({ chart }) => (chart.chartArea || {}).width / domains.length - 2,
            height: ({ chart }) => (chart.chartArea || {}).height / words.length - 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: () => "",
                label: (ctx) => {
                  const word = words[ctx.raw.y];
                  const domain = domains[ctx.raw.x];
                  return `${word} @ ${domain}: ${ctx.raw.v}`;
                }
              }
            }
          },
          scales: {
            x: {
              type: "category",
              labels: domains,
              ticks: { color: "#aaa" },
              grid: { display: false }
            },
            y: {
              type: "category",
              labels: words,
              ticks: { color: "#aaa" },
              grid: { display: false }
            }
          }
        }
      });
    }
  }, [heatmapData]);

  return (
    <div className="app-shell">

      {/* TOPBAR */}
      <div className="topbar">
        <div className="topbar-status">
          <div className="topbar-section">
            <span>⊞</span>
            <span className="topbar-label">KEYWORD INTELLIGENCE</span>
          </div>

          <div className="status-live">
            <span className="dot-green"></span>
            IDLE
          </div>

          <span className="topbar-label">UPTIME: 00:42:15</span>
          <span className="topbar-label">12.4K KEYWORDS</span>
        </div>
      </div>

      <div className="main-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <nav className="sidebar-nav">

            <Link to="/configuration" className="nav-item active">
              <span className="nav-icon">⚙</span> Configuration
            </Link>

            <Link to="/live-monitor" className="nav-item">
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

          <h1 className="page-title">Analysis Configuration</h1>
          <p className="page-desc">
            Define parameters for the relationship analyzer. Higher worker density increases throughput but requires more resource allocation from the message broker.
          </p>

          <div className="config-grid">
            <div className="card">
              <div className="card-header">
                <span className="card-label">⊕ Seed Domain Origins</span>
              </div>

              <textarea 
                value={seedUrls}
                onChange={(e) => setSeedUrls(e.target.value)}
                placeholder={`https://example.com/blog\nhttps://nexus.ai/docs`}
              ></textarea>
            </div>

            {/* CRAWL ENGINE → COMING SOON */}
            <div className="card coming-soon-card">
              <div className="coming-soon-overlay">
                <h2>Coming Soon</h2>
              </div>
            </div>
          </div>

          {/* SYSTEM STATS */}
          <div className="system-stats">
            <div className="stat-card">
              <div className="stat-icon">⚙</div>
              <div className="stat-info">
                <div className="stat-label">Memory Footprint</div>
                <div className="stat-value">4.2 GB <span className="stat-badge green">OPTIMIZED</span></div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">↺</div>
              <div className="stat-info">
                <div className="stat-label">Est. Processing</div>
                <div className="stat-value">~14.5m <span className="stat-badge teal">LINEAR</span></div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✓</div>
              <div className="stat-info">
                <div className="stat-label">System Readiness</div>
                <div className="stat-value" style={{color: '#22d172'}}>100%</div>
              </div>
            </div>
          </div>

          {/* LAUNCH CRAWL BUTTON */}
          <button className="start-btn" onClick={handleStartCrawl}>
            🚀 LAUNCH CRAWL
          </button>
          {crawlStatus && (
            <div style={{ marginTop: "12px", fontSize: "13px", color: crawlStatus.includes("Error") ? "#ff6060" : "#22d172" }}>
              {crawlStatus}
            </div>
          )}

          {/* TOP 50 ANALYSIS */}
          <div style={{ marginTop: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 className="page-title" style={{ marginBottom: 0 }}>Top 50 Indexed Words</h2>
              <button className="import-btn" onClick={handleLoadTop50} disabled={top50Loading}>
                {top50Loading ? "Loading..." : "📊 LOAD"}
              </button>
            </div>

            {top50Data.length > 0 && (
              <>
                <div className="chart-card" style={{ marginBottom: "12px" }}>
                  <div className="chart-title" style={{ marginBottom: "12px" }}>Word Frequency Treemap</div>
                  <canvas ref={treemapRef} style={{ maxHeight: "400px" }}></canvas>
                </div>

                <div className="snippets-card">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Word</th>
                        <th>Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {top50Data.map((w, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{w.word}</td>
                          <td>{w.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* DOMAIN-WORD HEATMAP */}
          <div style={{ marginTop: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 className="page-title" style={{ marginBottom: 0 }}>Domain × Word Heatmap</h2>
              <button className="import-btn" onClick={handleLoadHeatmap} disabled={heatmapLoading}>
                {heatmapLoading ? "Loading..." : "🔥 LOAD"}
              </button>
            </div>

            {heatmapData.length > 0 && (
              <div className="chart-card">
                <canvas ref={heatmapRef} style={{ maxHeight: "500px" }}></canvas>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}

export default Configuration;