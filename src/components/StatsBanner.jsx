import React from 'react';
import { Activity, ShieldAlert, Droplets, MapPin, Download } from 'lucide-react';

export default function StatsBanner({
  region,
  springs,
  onLaunchAnalysis,
  onExportData
}) {
  const totalSprings = springs.length;
  const criticalCount = springs.filter(s => s.priority === 'Critical').length;
  const avgDischarge = totalSprings > 0
    ? (springs.reduce((a, b) => a + b.dischargeLpm, 0) / totalSprings).toFixed(1)
    : 0;

  return (
    <div className="dashboard-telemetry-bar" id="dashboard-telemetry-bar">
      <div className="telemetry-left">
        <div className="telemetry-item">
          <span className="telemetry-dot"></span>
          <span style={{ fontWeight: 600, color: '#f8fafc' }}>
            {region ? region.name : 'All Regions'}
          </span>
          <span style={{ color: '#64748b' }}>({region?.state})</span>
        </div>

        <div className="telemetry-item">
          <span style={{ color: '#94a3b8' }}>Gauged Springs:</span>
          <strong style={{ color: '#38bdf8' }}>{totalSprings}</strong>
        </div>

        <div className="telemetry-item">
          <span style={{ color: '#94a3b8' }}>Critical Depletion:</span>
          <strong style={{ color: '#f43f5e' }}>{criticalCount}</strong>
        </div>

        <div className="telemetry-item">
          <span style={{ color: '#94a3b8' }}>Mean Discharge:</span>
          <strong style={{ color: '#10b981' }}>{avgDischarge} LPM</strong>
        </div>

        <div className="telemetry-item">
          <span style={{ color: '#94a3b8' }}>Lithology:</span>
          <span style={{ color: '#cbd5e1', fontSize: '0.74rem' }}>{region?.primaryLithology?.split('&')[0]}</span>
        </div>
      </div>

      <div className="telemetry-right">
        <button
          id="telemetry-export-btn"
          className="telemetry-btn"
          onClick={onExportData}
          title="Download Hydrogeological Spring Dossier"
        >
          <Download size={13} />
          <span>Export Dossier</span>
        </button>
      </div>
    </div>
  );
}
