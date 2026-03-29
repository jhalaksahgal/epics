import { Link } from "react-router-dom";
import { useState } from "react";

function Configuration() {
  const [workers, setWorkers] = useState(24);
  const [threshold, setThreshold] = useState(0.75);
  const [broker, setBroker] = useState("NATS");
  const [toggle, setToggle] = useState(true);

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

          {/* GRID 1 */}
          <div className="config-grid">

            <div className="card">
              <div className="card-header">
                <span className="card-label">⊞ Keyword Dictionary</span>
                <span className="required-badge">Required Field</span>
              </div>

              <textarea placeholder="Enter keywords separated by new lines (e.g., machine learning, artificial intelligence, neural networks)..."></textarea>

              <div className="card-footer">
                <span className="density-label">
                  INPUT DENSITY: <span className="density-value">NORMAL</span>
                </span>
                <button className="import-btn">⬆ IMPORT CSV</button>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <span className="card-label">⊕ Seed Domain Origins</span>
              </div>

              <textarea placeholder={`https://example.com/blog\nhttps://nexus.ai/docs`}></textarea>
            </div>

          </div>

          {/* GRID 2 */}
          <div className="config-grid">

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

        </main>
      </div>
    </div>
  );
}

export default Configuration;