import React from 'react';

export default function Header({
  activeView, setActiveView,
  selectedRegion, onRegionChange, regions,
  onLaunchAnalysis
}) {
  return (
    <header className="app-header" id="main-app-header">
      {/* Government Emblem Area */}
      <div className="gov-emblem-area">
        <svg className="emblem-seal" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="38" fill="#f5f5f5" stroke="#1d6fa4" strokeWidth="2"/>
          <circle cx="40" cy="40" r="28" fill="none" stroke="#1d6fa4" strokeWidth="1" strokeDasharray="3 2"/>
          <text x="40" y="38" textAnchor="middle" fontSize="22" fill="#1d6fa4">⚘</text>
          <text x="40" y="54" textAnchor="middle" fontSize="7" fill="#1d6fa4" fontWeight="bold">सत्यमेव जयते</text>
        </svg>
        <div className="ministry-text">
          <span className="ministry-line1">Government of India</span>
          <span className="ministry-line2">Ministry of Tribal Affairs</span>
        </div>
      </div>

      {/* Brand */}
      <div className="header-brand" onClick={() => setActiveView('dashboard')} title="Go to Dashboard">
        <div className="brand-icon-circle">💧</div>
        <div className="brand-text">
          <span className="brand-name-en">JalRakshak</span>
          <span className="brand-name-hi">जल रक्षक — Spring Revival DSS</span>
        </div>
      </div>

      <div className="header-divider" />

      {/* Region Selector */}
      {activeView === 'dashboard' && (
        <div className="region-selector-group">
          <span className="region-selector-label">Active Region</span>
          <select
            id="region-select-dropdown"
            className="region-select"
            value={selectedRegion?.id || 'araku'}
            onChange={e => onRegionChange(e.target.value)}
            aria-label="Select springshed region"
          >
            {regions.map(r => (
              <option key={r.id} value={r.id}>
                {r.name} — {r.state}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="header-nav" id="primary-navigation-bar">
        <button id="nav-dashboard" className={`nav-tab ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>
          🗺 Map & Analysis
        </button>
        <button id="nav-interventions" className={`nav-tab ${activeView === 'interventions' ? 'active' : ''}`} onClick={() => setActiveView('interventions')}>
          🛠 Interventions
        </button>
        
        {/* Module A: Offline-First PWA Sync Indicator */}
        <div className="offline-sync-indicator" style={{ display: 'flex', alignItems: 'center', margin: '0 8px', fontSize: '11px', color: '#2e7d32', fontWeight: 600 }}>
           <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', marginRight: 4, animation: 'pulse-glow 2s infinite' }}></span>
           Synced
        </div>

        {/* Module A: Vernacular Multilingual Toggle */}
        <select className="region-select" style={{ minWidth: '90px', padding: '4px 8px', margin: '0 8px', fontSize: '11px' }}>
          <option>English</option>
          <option>हिंदी</option>
          <option>తెలుగు</option>
          <option>ଓଡ଼ିଆ</option>
        </select>

        {/* Module D: DPR & Budget Engine */}
        <button
          className="cta-btn"
          style={{ background: '#2e7d32', marginRight: '8px' }}
          onClick={() => alert("Automated DPR & BoQ Generator Initializing...\n\n(This module generates an official PDF with structural blueprints and bill of quantities.)")}
          title="Generate Detailed Project Report"
        >
          📄 Generate DPR
        </button>

        <button
          id="launch-recharge-analysis-cta"
          className="cta-btn"
          onClick={onLaunchAnalysis}
          title="Launch AI Recharge Zone Analysis"
        >
          <span className="icon">⚡</span>
          Launch Recharge Analysis
        </button>
      </nav>
    </header>
  );
}
