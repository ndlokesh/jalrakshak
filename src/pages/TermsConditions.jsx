import React from 'react';

export default function TermsConditions({ onBackToDashboard }) {
  return (
    <div className="static-page" id="terms-conditions-view">
      <div className="static-page-card">
        <button className="page-back-btn" id="back-to-dashboard-btn-terms" onClick={onBackToDashboard}>
          ← Back to Dashboard
        </button>

        <h1 className="page-title">Terms of Use & Hydrogeological Disclaimer</h1>
        <div className="page-meta">
          JalRakshak DSS · Government of India · Version 3.4 · September 2026
        </div>

        <section className="legal-section">
          <h2>1. Acceptance</h2>
          <p>
            By accessing the JalRakshak Spring Recharge Zone DSS, you agree to these Terms.
            This system is exclusively for authorized government hydrogeologists, tribal welfare agencies, and field teams engaged in spring revival planning.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Advisory Disclaimer — Mandatory Field Verification</h2>
          <div className="alert-banner warning" style={{ marginBottom: 10 }}>
            <span>⚠️</span>
            <div>
              <div className="alert-title">Mandatory On-Site Geotechnical Assessment Required</div>
              <div>All AI-generated springshed polygons and intervention recommendations are advisory only and must be independently verified by a licensed hydrogeologist before any civil works commence.</div>
            </div>
          </div>
          <p>Prior to constructing any check dams, contour trenches, or sub-surface structures, field teams must verify:</p>
          <ul>
            <li>True strike and dip of bedding/joint planes via compass and clinometer.</li>
            <li>Soil shear strength and colluvial thickness.</li>
            <li>Absence of unmapped landslide scarps or shear fault gouges.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Liability Limitation</h2>
          <p>
            The Ministry of Tribal Affairs, its technical partners, and contractors assume no liability for slope failures, landslides, or property damage resulting from physical interventions implemented without proper geotechnical site investigation.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Prohibited Actions</h2>
          <ul>
            <li>Submitting falsified, fabricated, or automated hydrometric records.</li>
            <li>Commercial exploitation or unauthorized redistribution of tribal water datasets.</li>
            <li>Attempting to circumvent server-side security controls.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Republic of India. All disputes shall be subject to the exclusive jurisdiction of courts in New Delhi.
          </p>
        </section>
      </div>
    </div>
  );
}
