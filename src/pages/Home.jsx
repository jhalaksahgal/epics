function Home() {
  return (
    <>
      
      <nav>
        

        
      </nav>

     
      <section className="hero">
        <div className="hero-grid-overlay"></div>

        <div className="status-badge">
          <span className="status-dot"></span>
          System Status: Optimal
        </div>

        <h1 className="hero-title">
          Digital<br />
          <span>Sentinel</span>
        </h1>

        <p className="hero-desc">
          Web-Based Intelligence Platform for Online Threat Detection
        </p>

        <div className="hero-actions">
          <a href="/configuration" className="btn-primary">
            Get Started →
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