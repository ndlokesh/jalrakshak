import React from 'react';

export default function PrivacyPolicy({ onBackToDashboard }) {
  return (
    <div className="static-page" id="privacy-policy-view">
      <div className="static-page-card">
        <button className="page-back-btn" id="back-to-dashboard-btn-privacy" onClick={onBackToDashboard}>
          ← Back to Dashboard
        </button>

        <h1 className="page-title">Data Privacy & Governance Policy</h1>
        <div className="page-meta">
          JalRakshak DSS · Ministry of Tribal Affairs & Ministry of Jal Shakti, Government of India · Effective: October 2026
        </div>

        <section className="legal-section">
          <h2>1. Statutory Framework</h2>
          <p>
            The JalRakshak Decision Support System operates under the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, the <strong>National Geospatial Policy (2022)</strong>, and the <strong>PESA Act, 1996</strong>.
            All data collection, processing, and storage is performed in accordance with these statutes.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Data We Collect</h2>
          <ul>
            <li><strong>Terrain & Geological Data:</strong> DEM slope, aspect, fracture lineaments, lithological maps — processed server-side only.</li>
            <li><strong>Hydrometric Field Data:</strong> Spring discharge readings, pH, EC, turbidity submitted by authorized field surveyors.</li>
            <li><strong>Surveyor Identity:</strong> Name and agency affiliation of field hydrogeologists for record traceability.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Protection of Tribal Water Sources</h2>
          <p>
            Springs holding cultural or ceremonial significance within tribal hamlets (e.g., <em>Devithan</em>, sacred groves) are geometrically obfuscated in all public GIS exports. Precise coordinates of such sources are accessible only to designated government officials.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Backend Security</h2>
          <ul>
            <li>All API keys, model tokens, and database credentials are stored exclusively in server-side environment variables — never exposed to the browser.</li>
            <li>All data in transit is encrypted via SSL/TLS with HTTPS enforcement.</li>
            <li>Automated bot submissions are blocked using server-side Honeypot validation.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Your Rights</h2>
          <p>
            Field surveyors may request correction or retraction of submitted observations by contacting the State Nodal Officer or District Project Management Unit (DPMU).
          </p>
        </section>
      </div>
    </div>
  );
}
