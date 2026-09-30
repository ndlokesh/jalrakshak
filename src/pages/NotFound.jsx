import React from 'react';

export default function NotFound({ onNavigateHome, onNavigateInterventions }) {
  return (
    <div className="notfound-page" id="custom-404-page-view">
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-desc">
        The page or GIS layer you're looking for doesn't exist in the JalRakshak portal.
        It may have been moved, deleted, or you may have typed the wrong URL.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button id="btn-404-return-dashboard" className="btn-sm-primary" style={{ padding: '8px 20px' }} onClick={onNavigateHome}>
          ← Return to Dashboard
        </button>
        <button id="btn-404-view-interventions" className="btn-sm-outline" style={{ padding: '8px 20px' }} onClick={onNavigateInterventions}>
          🛠 View Interventions
        </button>
      </div>
      <div style={{ marginTop: 24, fontSize: 12, color: '#adb5bd' }}>
        Need help? Email: <a href="mailto:support@jalrakshak.gov.in" style={{ color: '#1d6fa4' }}>support@jalrakshak.gov.in</a>
      </div>
    </div>
  );
}
