function Home() {
  return (
    <>
      
      <nav>
        

        <a href="/configuration" className="nav-links nav-cta">
          Get Started
        </a>
      </nav>

     
      <section className="hero">
        <div className="hero-grid-overlay"></div>

        <div className="status-badge">
          <span className="status-dot"></span>
          System Status: Optimal
        </div>

        <h1 className="hero-title">
          The Sovereign<br />
          <span>Observer</span>
        </h1>

        <p className="hero-desc">
          <strong>Executive Summary:</strong> Nexus Obsidian is a high-performance intelligence suite that
          scrapes keywords from specified URLs, analyzes semantic co-occurrence
          patterns, and visualizes complex relationships alongside real-time crawler
          performance metrics.
        </p>

        <div className="hero-actions">
          <a href="/configuration" className="btn-primary">
            Get Started →
          </a>
          <a href="#" className="btn-secondary">
            View Documentation
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <div className="footer-brand-name">Nexus Obsidian</div>
          <div className="footer-brand-sub">
            High-Performance Intelligence Suite
          </div>
        </div>

        <span className="footer-copy">
          © 2024 Nexus Obsidian. All rights reserved.
        </span>

        <div className="footer-links">
          <a href="#">GitHub</a>
          <a href="#">X</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </>
  );
}

export default Home;