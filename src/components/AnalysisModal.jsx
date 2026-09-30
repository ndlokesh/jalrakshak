import React, { useState } from 'react';

export default function AnalysisModal({ isOpen, onClose, spring, region, onAnalysisComplete }) {
  const [weights, setWeights] = useState({ slope: 25, fracture: 25, lithology: 20, rainfall: 15, lulc: 15 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  const run = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          springId: spring?.id || 'SPR-AR-01',
          customWeights: {
            slopeWeight: weights.slope / 100,
            fractureWeight: weights.fracture / 100,
            lithologyWeight: weights.lithology / 100,
            rainfallWeight: weights.rainfall / 100,
            lulcWeight: weights.lulc / 100
          }
        })
      });
      if (!res.ok) throw new Error('Analysis engine returned an error. Please try again.');
      const data = await res.json();
      setResult(data.analysis);
      if (onAnalysisComplete) onAnalysisComplete(data.analysis);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const sliders = [
    { key: 'slope', label: 'DEM Slope & Terrain Gradient', color: '#1d6fa4' },
    { key: 'fracture', label: 'Fracture & Fault Lineament Density', color: '#6a1b9a' },
    { key: 'lithology', label: 'Lithology & Aquifer Permeability', color: '#2e7d32' },
    { key: 'rainfall', label: 'Rainfall & Runoff (SCS-CN)', color: '#0277bd' },
    { key: 'lulc', label: 'Land Use / Forest Canopy Cover', color: '#558b2f' }
  ];

  return (
    <div className="modal-backdrop" id="analysis-modal-overlay">
      <div className="modal-box" id="analysis-modal-dialog">
        <div className="modal-header">
          <div className="modal-icon">⚡</div>
          <div style={{ flex: 1 }}>
            <div className="modal-title">Recharge Zone Delineation</div>
            <div className="modal-subtitle">
              AHP Multi-Criteria Hydrogeological Analysis
              {spring && ` — ${spring.name}`}
            </div>
          </div>
          <button id="close-analysis-modal-btn" className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Target site info */}
          <div style={{ background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: 6, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, color: '#6c757d', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>Analysis Target</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#212529', marginTop: 2 }}>
              {spring?.name || `${region?.name} — General Basin`}
            </div>
            <div style={{ fontSize: 11, color: '#6c757d', marginTop: 2 }}>
              Catchment: {spring?.catchmentAreaHa || 48.6} Ha · Aquifer: {spring?.aquiferType || 'Weathered Metamorphic Rock'}
            </div>
          </div>

          {/* Weight Sliders */}
          <div>
            <div className="form-section-title">
              Parameter Sensitivity Weights — Total: <strong style={{ color: total === 100 ? '#2e7d32' : '#c62828' }}>{total}%</strong>
              {total !== 100 && <span style={{ color: '#e65100', fontWeight: 400, marginLeft: 6, fontSize: 10 }}>(should sum to 100%)</span>}
            </div>
            {sliders.map(s => (
              <div key={s.key} className="slider-field" style={{ marginBottom: 10 }}>
                <div className="slider-label-row">
                  <span>{s.label}</span>
                  <span style={{ color: s.color, fontWeight: 700 }}>{weights[s.key]}%</span>
                </div>
                <input
                  type="range"
                  id={`slider-${s.key}-weight`}
                  className="slider-input"
                  min="5" max="50"
                  value={weights[s.key]}
                  onChange={e => setWeights(p => ({ ...p, [s.key]: parseInt(e.target.value) }))}
                  style={{ accentColor: s.color }}
                />
              </div>
            ))}
          </div>

          {/* Module C: Climate Scenario Simulation */}
          <div style={{ marginTop: 16, background: '#fff3e0', border: '1px solid #ffb74d', padding: 12, borderRadius: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#e65100', textTransform: 'uppercase', marginBottom: 6 }}>
              🌡️ Module C: Climate Stress Testing
            </div>
            <select
              style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #ffb74d', borderRadius: 4, background: '#fff' }}
              onChange={e => console.log('Climate scenario:', e.target.value)}
            >
              <option value="baseline">Baseline (Historical Averages)</option>
              <option value="drought">Extended Drought (-30% precipitation)</option>
              <option value="intense_monsoon">Intense Monsoon / Flash Flood Scenario</option>
              <option value="warming">Warming (+2°C) / High Evapotranspiration</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="alert-banner danger">
              <span className="alert-icon">⚠️</span>
              <div><div className="alert-title">Error</div><div>{error}</div></div>
            </div>
          )}

          {/* AI Radar Effect (Shows when loading) */}
          {loading && (
            <div className="ai-radar-container">
              <div className="ai-radar-grid"></div>
              <div className="ai-radar-sweep"></div>
              <div className="ai-radar-target" style={{ top: '30%', left: '40%' }}></div>
              <div className="ai-radar-target" style={{ top: '70%', left: '60%', width: 6, height: 6, animationDelay: '0.5s' }}></div>
              <div className="ai-analyzing-text">NEURAL NET ANALYZING TARGET SITE...</div>
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div className="result-card">
              <div style={{ fontSize: 11, fontWeight: 700, color: '#155e8b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                ✅ Delineation Complete — {result.analysisTimestamp ? new Date(result.analysisTimestamp).toLocaleTimeString() : ''}
              </div>
              <div className="result-grid">
                <div className="result-metric">
                  <div className="result-metric-label">Suitability Index</div>
                  <div className="result-metric-value">{result.suitabilityScore}<span style={{ fontSize: 14 }}>/100</span></div>
                  <div className="result-metric-sub">Composite Recharge Score</div>
                </div>
                <div className="result-metric">
                  <div className="result-metric-label">Recharge Probability</div>
                  <div className="result-metric-value">{Math.round(result.rechargeProbability * 100)}<span style={{ fontSize: 14 }}>%</span></div>
                  <div className="result-metric-sub">Confidence: {result.confidenceInterval}</div>
                </div>
              </div>
              <div className="score-bars" style={{ marginTop: 12 }}>
                {[
                  { label: 'DEM Slope', val: result.parameterScores.demSlope },
                  { label: 'Fractures', val: result.parameterScores.geologicalFractures },
                  { label: 'Lithology', val: result.parameterScores.lithology },
                  { label: 'Rainfall', val: result.parameterScores.climaticRainfall },
                  { label: 'Forest Cover', val: result.parameterScores.lulcForestCover }
                ].map(({ label, val }) => (
                  <div key={label} className="score-bar-row">
                    <div className="score-bar-label">{label}</div>
                    <div className="score-bar-track">
                      <div className="score-bar-fill" style={{ width: `${val}%` }} />
                    </div>
                    <div className="score-bar-num">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button id="cancel-analysis-btn" className="btn-outline" onClick={onClose} style={{ flex: 'none', padding: '7px 16px' }}>Cancel</button>
          <button
            id="execute-ai-delineation-btn"
            className="btn-primary btn-ai-magic"
            onClick={run}
            disabled={loading}
            style={{ flex: 'none', padding: '7px 20px', minWidth: 160 }}
          >
            {loading ? '⏳ Computing...' : '⚡ Run Analysis'}
          </button>
        </div>
      </div>
    </div>
  );
}
