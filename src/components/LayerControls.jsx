import React from 'react';

const LAYERS = [
  { id: 'springshed', name: 'Springshed Boundary', desc: 'AI-delineated micro-watershed', color: '#1d6fa4', type: 'Polygon' },
  { id: 'rechargeSuitability', name: 'Recharge Core Zone', desc: 'High infiltration potential area', color: '#43a047', type: 'Polygon' },
  { id: 'riskHazard', name: 'Landslide Hazard Zone', desc: 'Slopes >32° — restricted intervention', color: '#e53935', type: 'Hazard' },
  { id: 'fractures', name: 'Fault & Fracture Lines', desc: 'Geological secondary conduits', color: '#6a1b9a', type: 'Line' },
  { id: 'contours', name: 'Elevation Contours', desc: 'DEM-derived terrain isolines', color: '#795548', type: 'Elevation' },
  { id: 'interventions', name: 'Intervention Sites', desc: 'Proposed conservation structures', color: '#1d6fa4', type: 'Point' },
  { id: 'springs', name: 'Spring Discharge Points', desc: 'Gauged water sources', color: '#c62828', type: 'Point' }
];

const PRIORITY_COLORS = { Critical: '#c62828', Moderate: '#e65100', Reviving: '#2e7d32' };

export default function LeftPanel({ activeLayers, onToggleLayer, springs, selectedSpring, onSelectSpring, activeTab, setActiveTab }) {
  return (
    <div className="left-panel" id="left-panel">
      {/* Panel Tabs */}
      <div className="panel-tabs">
        <button className={`panel-tab ${activeTab === 'layers' ? 'active' : ''}`} onClick={() => setActiveTab('layers')}>Layers</button>
        <button className={`panel-tab ${activeTab === 'springs' ? 'active' : ''}`} onClick={() => setActiveTab('springs')}>
          Springs ({springs.length})
        </button>
      </div>

      {/* Panel Content */}
      <div className="panel-content">
        {activeTab === 'layers' && (
          <>
            <div className="layer-group-title">Spatial GIS Layers</div>
            {LAYERS.map(layer => (
              <div key={layer.id} className="layer-row">
                <div className="layer-swatch" style={{ backgroundColor: layer.color }} />
                <div className="layer-row-text">
                  <div className="layer-row-name">{layer.name}</div>
                  <div className="layer-row-desc">{layer.desc}</div>
                </div>
                <button
                  id={`toggle-layer-${layer.id}`}
                  className={`toggle ${activeLayers[layer.id] ? 'on' : ''}`}
                  onClick={() => onToggleLayer(layer.id)}
                  aria-label={`Toggle ${layer.name}`}
                />
              </div>
            ))}

            {/* Map Legend */}
            <div className="layer-group-title" style={{ marginTop: '12px' }}>Priority Legend</div>
            {Object.entries(PRIORITY_COLORS).map(([label, color]) => (
              <div key={label} className="layer-row" style={{ cursor: 'default' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, flexShrink: 0, border: '2px solid white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                <div className="layer-row-name">{label}</div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'springs' && (
          <>
            <div className="layer-group-title">
              {springs.filter(s => s.priority === 'Critical').length} Critical · {springs.filter(s => s.priority === 'Moderate').length} Moderate · {springs.filter(s => s.priority === 'Reviving').length} Reviving
            </div>
            {springs.map(spring => {
              const color = PRIORITY_COLORS[spring.priority] || '#1d6fa4';
              return (
                <div
                  key={spring.id}
                  id={`spring-list-item-${spring.id}`}
                  className={`spring-list-item ${selectedSpring?.id === spring.id ? 'selected' : ''}`}
                  onClick={() => onSelectSpring(spring)}
                >
                  <div className="spring-dot" style={{ backgroundColor: color }} />
                  <div style={{ flex: 1 }}>
                    <div className="spring-item-name">{spring.name}</div>
                    <div className="spring-item-meta">{spring.village} · {spring.dischargeLpm} LPM · Elev. {spring.elevation}m</div>
                  </div>
                  <span
                    className="spring-item-badge"
                    style={{ backgroundColor: color + '18', color: color, border: `1px solid ${color}44` }}
                  >
                    {spring.priority}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
