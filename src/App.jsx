import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import LeftPanel from './components/LayerControls';
import SpringDetailDrawer from './components/SpringDetailDrawer';
import AnalysisModal from './components/AnalysisModal';
import FieldValidationModal from './components/FieldValidationModal';
import InterventionPlanner from './components/InterventionPlanner';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';
import { PILOT_REGIONS, INITIAL_SPRINGS, REGION_GEOJSON } from '../server/data/springsData';

export default function App() {
  const [view, setView] = useState('dashboard');
  const regions = PILOT_REGIONS;
  const [regionId, setRegionId] = useState('araku');
  const [springs, setSprings] = useState(INITIAL_SPRINGS.filter(s => s.regionId === 'araku'));
  const [geoJson, setGeoJson] = useState(REGION_GEOJSON.araku);
  const [activeLayers, setActiveLayers] = useState({
    springshed: true, rechargeSuitability: true, riskHazard: true,
    fractures: true, contours: true, interventions: true, springs: true
  });
  const [selectedSpring, setSelectedSpring] = useState(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [validationOpen, setValidationOpen] = useState(false);
  const [validationSpring, setValidationSpring] = useState(null);
  const [toast, setToast] = useState(null);
  const [leftTab, setLeftTab] = useState('layers');

  useEffect(() => {
    fetch(`/api/springs?region=${regionId}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.springs) setSprings(d.springs); else setSprings(INITIAL_SPRINGS.filter(s => s.regionId === regionId)); })
      .catch(() => setSprings(INITIAL_SPRINGS.filter(s => s.regionId === regionId)));

    fetch(`/api/geojson/${regionId}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.features) setGeoJson(d); else setGeoJson(REGION_GEOJSON[regionId]); })
      .catch(() => setGeoJson(REGION_GEOJSON[regionId]));

    setSelectedSpring(null);
  }, [regionId]);

  const region = regions.find(r => r.id === regionId) || regions[0];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSelectSpring = (spring) => {
    setSelectedSpring(spring);
    setLeftTab('springs');
  };

  const handleValidationSuccess = (updated, log) => {
    setSprings(prev => prev.map(s => s.id === updated.id ? updated : s));
    if (selectedSpring?.id === updated.id) setSelectedSpring(updated);
    showToast(`✅ Field data saved for ${updated.name}`);
  };

  const handleInterventions = (spring) => {
    setSelectedSpring(spring);
    setView('interventions');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header
        activeView={view} setActiveView={setView}
        selectedRegion={region} onRegionChange={setRegionId} regions={regions}
        onLaunchAnalysis={() => setAnalysisOpen(true)}
      />

      {/* Toolbar (only on dashboard) */}
      {view === 'dashboard' && (
        <div className="map-toolbar" id="map-toolbar">
          <div className="toolbar-section">
            <span className="toolbar-label">Basemap</span>
            <button className="toolbar-btn active">🗺 OpenStreetMap</button>
          </div>
          <div className="toolbar-divider" />
          <div className="toolbar-section">
            <span className="toolbar-label">View</span>
            <button className="toolbar-btn" onClick={() => setLeftTab('layers')}>⬛ Layers</button>
            <button className="toolbar-btn" onClick={() => setLeftTab('springs')}>💧 Springs</button>
          </div>
          <div className="toolbar-divider" />
          <div className="toolbar-section">
            <button className="toolbar-btn" onClick={() => setAnalysisOpen(true)}>⚡ Run AI Analysis</button>
            <button className="toolbar-btn" onClick={() => { setValidationSpring(selectedSpring || springs[0]); setValidationOpen(true); }}>
              📋 Log Field Data
            </button>
            <button className="toolbar-btn" onClick={() => window.location.href = `/api/export/csv?region=${regionId}`}>
              📥 Export CSV
            </button>
          </div>
          <div className="toolbar-status">
            <span className="status-dot" />
            <span>Server Online</span>
            <span style={{ color: '#666' }}>·</span>
            <span>{springs.length} springs · {region?.name}</span>
          </div>
        </div>
      )}

      {/* Main content area */}
      {view === 'dashboard' && (
        <div className="app-layout" id="main-dashboard-viewport">
          <LeftPanel
            activeLayers={activeLayers}
            onToggleLayer={id => setActiveLayers(p => ({ ...p, [id]: !p[id] }))}
            springs={springs}
            selectedSpring={selectedSpring}
            onSelectSpring={handleSelectSpring}
            activeTab={leftTab}
            setActiveTab={setLeftTab}
          />
          <div className="map-container" id="gis-map-viewport-container">
            <MapView
              region={region}
              springs={springs}
              geoJsonData={geoJson}
              activeLayers={activeLayers}
              selectedSpring={selectedSpring}
              onSelectSpring={handleSelectSpring}
            />
          </div>
          {selectedSpring && (
            <SpringDetailDrawer
              spring={selectedSpring}
              onClose={() => setSelectedSpring(null)}
              onOpenFieldValidation={s => { setValidationSpring(s); setValidationOpen(true); }}
              onOpenInterventions={handleInterventions}
            />
          )}
        </div>
      )}

      {view === 'interventions' && (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <InterventionPlanner
            springs={springs}
            region={region}
            onSelectSpringOnMap={spring => { setSelectedSpring(spring); setView('dashboard'); }}
          />
        </div>
      )}

      {view === 'privacy' && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <PrivacyPolicy onBackToDashboard={() => setView('dashboard')} />
        </div>
      )}

      {view === 'terms' && (
        <div style={{ flex: 1, overflow: 'auto' }}>
          <TermsConditions onBackToDashboard={() => setView('dashboard')} />
        </div>
      )}

      {view === '404' && (
        <div style={{ flex: 1, display: 'flex' }}>
          <NotFound onNavigateHome={() => setView('dashboard')} onNavigateInterventions={() => setView('interventions')} />
        </div>
      )}

      {/* Modals */}
      <AnalysisModal
        isOpen={analysisOpen} onClose={() => setAnalysisOpen(false)}
        spring={selectedSpring || springs[0]} region={region}
        onAnalysisComplete={r => showToast(`⚡ Analysis complete — Suitability: ${r.suitabilityScore}/100`)}
      />
      <FieldValidationModal
        isOpen={validationOpen} onClose={() => setValidationOpen(false)}
        spring={validationSpring || springs[0]}
        onValidationSuccess={handleValidationSuccess}
      />

      {/* Toast */}
      {toast && <div className="toast" id="app-toast-notification">{toast}</div>}
    </div>
  );
}
