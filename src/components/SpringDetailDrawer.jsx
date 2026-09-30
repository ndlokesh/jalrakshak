import React from 'react';

const PRIORITY_COLORS = { Critical: '#c62828', Moderate: '#e65100', Reviving: '#2e7d32' };
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function SpringDetailDrawer({ spring, onClose, onOpenFieldValidation, onOpenInterventions }) {
  if (!spring) return null;

  const pColor = PRIORITY_COLORS[spring.priority] || '#1d6fa4';
  const history = spring.monthlyDischargeHistory || [];
  const maxD = Math.max(...history.map(m => m.discharge), 1);

  return (
    <div className="right-panel" id="spring-detail-panel">
      {/* Panel Header */}
      <div className="right-panel-header">
        <span className="right-panel-title">Spring Details</span>
        <button id="close-spring-drawer-btn" className="panel-close-btn" onClick={onClose} title="Close">✕</button>
      </div>

      <div className="right-panel-body">
        {/* Spring Identity */}
        <div className="spring-header-info">
          <div className="spring-full-name">{spring.name}</div>
          <div className="spring-id-row">
            <span className="spring-id-badge">{spring.id}</span>
            <span className="spring-location-text">📍 {spring.village} · {spring.elevation}m ASL</span>
          </div>
          <div style={{ marginTop: 6 }}>
            <span
              className="validation-badge"
              style={{ backgroundColor: pColor + '18', color: pColor, border: `1px solid ${pColor}44` }}
            >
              ● {spring.priority} Priority
            </span>
            <span className={`validation-badge ${spring.validationStatus === 'Validated by Field Geologist' ? 'verified' : 'pending'}`} style={{ marginLeft: 4 }}>
              {spring.validationStatus === 'Validated by Field Geologist' ? '✓ Verified' : '⏳ Pending Review'}
            </span>
          </div>
        </div>

        {/* Discharge KPIs */}
        <div className="info-section">
          <div className="info-section-title">📊 Discharge Status</div>
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-label">Current</div>
              <div className="kpi-value" style={{ color: '#1d6fa4' }}>{spring.dischargeLpm}</div>
              <div className="kpi-sub">LPM measured</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Historic</div>
              <div className="kpi-value" style={{ color: '#2e7d32' }}>{spring.historicDischargeLpm}</div>
              <div className="kpi-sub">LPM baseline</div>
            </div>
          </div>
          <div className="progress-wrap" style={{ marginTop: 8 }}>
            <div className="progress-label-row">
              <span>Discharge Decline</span>
              <span style={{ color: '#c62828' }}>-{spring.dischargeDeclinePct}%</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${100 - spring.dischargeDeclinePct}%`, background: spring.dischargeDeclinePct > 50 ? '#c62828' : '#e65100' }} />
            </div>
            <div style={{ fontSize: 10, color: '#adb5bd', marginTop: 2 }}>{spring.seasonalType}</div>
          </div>
        </div>

        {/* Recharge Probability */}
        <div className="info-section">
          <div className="info-section-title">🎯 Recharge Suitability (AI Model)</div>
          <div className="progress-wrap">
            <div className="progress-label-row">
              <span>Recharge Potential</span>
              <span style={{ color: '#1d6fa4' }}>{Math.round(spring.rechargeProbability * 100)}% ({spring.confidenceInterval})</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${Math.round(spring.rechargeProbability * 100)}%` }} />
            </div>
          </div>
          <div className="data-row" style={{ marginTop: 6 }}>
            <span className="data-label">Catchment Area</span>
            <span className="data-value">{spring.catchmentAreaHa} Ha</span>
          </div>
          <div className="data-row">
            <span className="data-label">Dependent Households</span>
            <span className="data-value">{spring.dependantHouseholds} families</span>
          </div>
        </div>

        {/* Monthly Discharge Hydrograph */}
        {history.length > 0 && (
          <div className="info-section">
            <div className="info-section-title">📈 Annual Discharge Pattern (LPM)</div>
            <div className="discharge-chart">
              {history.map(m => {
                const h = Math.max(8, Math.round((m.discharge / maxD) * 100));
                const isDry = m.discharge < 8;
                return (
                  <div key={m.month} className="discharge-bar-col" title={`${m.month}: ${m.discharge} LPM`}>
                    <div className="discharge-bar" style={{ height: `${h}%`, background: isDry ? '#ef9a9a' : '#90caf9' }} />
                    <span className="discharge-bar-label">{m.month[0]}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#888' }}>
                <span style={{ width: 10, height: 6, background: '#90caf9', display: 'inline-block', borderRadius: 1 }} /> Normal
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#888' }}>
                <span style={{ width: 10, height: 6, background: '#ef9a9a', display: 'inline-block', borderRadius: 1 }} /> Stress / Dry
              </span>
            </div>
          </div>
        )}

        {/* Module B: Live IoT Telemetry & Satellite Data */}
        <div className="info-section">
          <div className="info-section-title" style={{ color: '#0277bd', display: 'flex', justifyContent: 'space-between' }}>
            <span>📡 Live IoT & Satellite Telemetry</span>
            <span style={{ fontSize: 10, background: '#0277bd', color: '#fff', padding: '2px 6px', borderRadius: 4, animation: 'pulse-glow 2s infinite' }}>LIVE</span>
          </div>
          
          <div className="data-row" style={{ marginTop: 8 }}>
            <span className="data-label">Sensor ID: <span style={{ fontFamily: 'monospace' }}>JRX-F-{spring.id.split('-')[1]}</span></span>
            <span className="data-value" style={{ color: '#2e7d32', fontWeight: 600 }}>{Math.floor(spring.dischargeLpm * (0.95 + Math.random() * 0.1))} LPM</span>
          </div>
          <div className="data-row">
            <span className="data-label">Soil Moisture (Depth 1m)</span>
            <span className="data-value">{Math.floor(22 + Math.random() * 5)}%</span>
          </div>
          
          <div style={{ marginTop: 12, padding: 8, background: '#f5f5f5', borderRadius: 4, border: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#424242', marginBottom: 4 }}>🛰 Sentinel-2 EO API Sync</div>
            <div className="data-row">
              <span className="data-label" style={{ fontSize: 10 }}>Current NDVI (Vegetation Index)</span>
              <span className="data-value" style={{ fontSize: 10 }}>0.48 (Moderate)</span>
            </div>
            <div className="data-row">
              <span className="data-label" style={{ fontSize: 10 }}>LST (Land Surface Temp)</span>
              <span className="data-value" style={{ fontSize: 10 }}>24.2°C</span>
            </div>
          </div>
        </div>

        {/* Geological Setting */}
        <div className="info-section">
          <div className="info-section-title">🪨 Hydrogeological Setting</div>
          <div className="data-row">
            <span className="data-label">Aquifer Type</span>
            <span className="data-value">{spring.aquiferType}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Strike / Dip</span>
            <span className="data-value" style={{ fontFamily: 'monospace', fontSize: 11 }}>{spring.strikeDip}</span>
          </div>
        </div>

        {/* Water Quality */}
        {spring.waterQuality && (
          <div className="info-section">
            <div className="info-section-title">🧪 Field Water Quality</div>
            <div className="wq-grid">
              <div className="wq-item">
                <div className="wq-param">pH</div>
                <div className="wq-val">{spring.waterQuality.pH}</div>
              </div>
              <div className="wq-item">
                <div className="wq-param">EC</div>
                <div className="wq-val">{spring.waterQuality.ec}</div>
                <div className="wq-unit">µS/cm</div>
              </div>
              <div className="wq-item">
                <div className="wq-param">Turbidity</div>
                <div className="wq-val">{spring.waterQuality.turbidityNtu}</div>
                <div className="wq-unit">NTU</div>
              </div>
              <div className="wq-item">
                <div className="wq-param">Coliform</div>
                <div className="wq-val" style={{ fontSize: 11, color: spring.waterQuality.fecalColiform === 'Negative' ? '#2e7d32' : '#c62828' }}>
                  {spring.waterQuality.fecalColiform}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Flags */}
        {spring.riskFlags?.length > 0 && (
          <div className="info-section">
            <div className="info-section-title">⚠️ Geological Risk Flags</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {spring.riskFlags.map((r, i) => (
                <div key={i} className={`alert-banner ${r.level === 'High' ? 'danger' : 'warning'}`}>
                  <span className="alert-icon">{r.level === 'High' ? '🚫' : '⚠️'}</span>
                  <div>
                    <div className="alert-title">{r.level}: {r.type}</div>
                    <div>{r.mitigation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last validated */}
        <div className="info-section">
          <div className="data-row">
            <span className="data-label">Last Validated</span>
            <span className="data-value">{spring.lastValidated}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="right-panel-footer">
        <button id="open-field-validation-modal-btn" className="btn-outline" onClick={() => onOpenFieldValidation(spring)}>
          📋 Log Field Data
        </button>
        <button id="view-interventions-btn" className="btn-primary" onClick={() => onOpenInterventions(spring)}>
          🛠 Intervention Plan
        </button>
      </div>
    </div>
  );
}
