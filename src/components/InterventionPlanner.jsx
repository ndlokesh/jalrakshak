import React, { useState } from 'react';

const PRIORITY_COLORS = { Critical: '#c62828', Moderate: '#e65100', Reviving: '#2e7d32' };

export default function InterventionPlanner({ springs, region, onSelectSpringOnMap }) {
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL' ? springs : springs.filter(s => s.priority.toUpperCase() === filter);
  const totalHH = springs.reduce((s, x) => s + (x.dependantHouseholds || 0), 0);
  const criticalCount = springs.filter(s => s.priority === 'Critical').length;
  const totalBudget = springs.reduce((s, x) => s + (x.recommendedInterventions || []).reduce((a, b) => a + b.unitCost, 0), 0);

  return (
    <div style={{ overflow: 'auto', flex: 1 }}>
      <div className="planner-page" id="intervention-planner-view">
        {/* Header */}
        <div className="planner-header">
          <div>
            <div style={{ fontSize: 11, color: '#6c757d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>
              Ministry of Tribal Affairs — Spring Revival Mission
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: '#212529' }}>
              Site Intervention & Geological Risk Register
            </h1>
            <p style={{ fontSize: 12, color: '#6c757d', marginTop: 2 }}>
              Region: <strong>{region?.name}</strong> · {region?.district}, {region?.state}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              id="export-dossier-csv-btn"
              className="btn-sm-outline"
              onClick={() => window.location.href = `/api/export/csv?region=${region?.id}`}
            >
              📥 Export CSV
            </button>
            <button
              id="export-dossier-json-btn"
              className="btn-sm-primary"
              onClick={() => window.location.href = `/api/export/json?region=${region?.id}`}
            >
              📄 Full Dossier (JSON)
            </button>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="planner-kpi-bar">
          <div className="planner-kpi">
            <div className="planner-kpi-label">Springs Gauged</div>
            <div className="planner-kpi-value">{springs.length}</div>
            <div className="planner-kpi-sub">{criticalCount} critical sites</div>
          </div>
          <div className="planner-kpi">
            <div className="planner-kpi-label">Tribal Households</div>
            <div className="planner-kpi-value" style={{ color: '#1d6fa4' }}>{totalHH.toLocaleString()}</div>
            <div className="planner-kpi-sub">dependent on springs</div>
          </div>
          <div className="planner-kpi">
            <div className="planner-kpi-label">Estimated Outlay</div>
            <div className="planner-kpi-value" style={{ color: '#2e7d32' }}>₹{(totalBudget / 100000).toFixed(1)}L</div>
            <div className="planner-kpi-sub">MGNREGS / MoTA funds</div>
          </div>
          <div className="planner-kpi">
            <div className="planner-kpi-label">Primary Lithology</div>
            <div className="planner-kpi-value" style={{ fontSize: 13, marginTop: 4 }}>{region?.primaryLithology?.split('&')[0].trim()}</div>
            <div className="planner-kpi-sub">Rainfall: {region?.avgRainfallMm} mm/yr</div>
          </div>
        </div>

        {/* Priority Filter */}
        <div className="filter-bar">
          <span style={{ fontSize: 11, color: '#6c757d', fontWeight: 600, marginRight: 4 }}>Filter:</span>
          {['ALL', 'CRITICAL', 'MODERATE', 'REVIVING'].map(f => (
            <button key={f} id={`filter-tab-${f.toLowerCase()}`} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#6c757d' }}>{filtered.length} site(s) shown</span>
        </div>

        {/* Spring Cards */}
        <div id="intervention-springs-list">
          {filtered.map(spring => {
            const color = PRIORITY_COLORS[spring.priority] || '#1d6fa4';
            const totalCost = (spring.recommendedInterventions || []).reduce((a, b) => a + b.unitCost, 0);
            return (
              <div key={spring.id} className="spring-card">
                <div className="spring-card-header">
                  <div className="priority-stripe" style={{ background: color }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 10, background: '#343a40', color: '#f8f9fa', padding: '1px 5px', borderRadius: 3 }}>{spring.id}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10, background: color + '18', color, border: `1px solid ${color}33` }}>{spring.priority}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#212529', marginTop: 2 }}>{spring.name}</div>
                    <div style={{ fontSize: 11, color: '#6c757d' }}>
                      {spring.village} · Discharge: {spring.dischargeLpm} LPM (declined {spring.dischargeDeclinePct}%) · {spring.dependantHouseholds} households
                    </div>
                  </div>
                  <button
                    id={`locate-spring-btn-${spring.id}`}
                    className="btn-sm-outline"
                    onClick={() => onSelectSpringOnMap(spring)}
                  >
                    🗺 View on Map
                  </button>
                </div>

                <div className="spring-card-body">
                  {/* Geological info row */}
                  <div style={{ fontSize: 11, color: '#495057', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: 4, padding: '6px 10px', marginBottom: 8 }}>
                    <strong>Aquifer:</strong> {spring.aquiferType} · <strong>Strike/Dip:</strong> {spring.strikeDip}
                  </div>

                  {/* Risk Flags */}
                  {spring.riskFlags?.length > 0 && (
                    <div style={{ marginBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {spring.riskFlags.map((r, i) => (
                        <div key={i} className={`alert-banner ${r.level === 'High' ? 'danger' : 'warning'}`}>
                          <span>{r.level === 'High' ? '🚫' : '⚠️'}</span>
                          <div>
                            <div className="alert-title">{r.level} Risk — {r.type}</div>
                            <div>{r.mitigation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interventions table */}
                  {spring.recommendedInterventions?.length > 0 && (
                    <>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#495057', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                        Recommended Physical Interventions
                      </div>
                      <table className="intervention-table">
                        <thead>
                          <tr>
                            <th>Intervention Type</th>
                            <th>Quantity / Specs</th>
                            <th>Location / Slope Range</th>
                            <th>Est. Cost (INR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spring.recommendedInterventions.map((item, i) => (
                            <tr key={i}>
                              <td><strong>{item.type}</strong></td>
                              <td>{item.qty}</td>
                              <td style={{ color: '#6c757d' }}>{item.location || item.slopeRange || '—'}</td>
                              <td>₹{item.unitCost.toLocaleString()}</td>
                            </tr>
                          ))}
                          <tr style={{ background: '#f8f9fa' }}>
                            <td colSpan="3" style={{ fontWeight: 700, textAlign: 'right' }}>Total Site Budget</td>
                            <td style={{ fontWeight: 700, color: '#2e7d32' }}>₹{totalCost.toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
