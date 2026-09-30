import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const PRIORITY_COLORS = {
  Critical: '#c62828',
  Moderate: '#e65100',
  Reviving: '#2e7d32'
};

export default function MapView({ region, springs, geoJsonData, activeLayers, selectedSpring, onSelectSpring }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const layerRefs = useRef({});

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    // Real Satellite Imagery Basemap
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19
    }).addTo(map);

    // Add labels on top of the satellite imagery for readability
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB',
      maxZoom: 19,
      opacity: 0.9
    }).addTo(map);

    mapInstance.current = map;
    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  // Fly to region
  useEffect(() => {
    if (mapInstance.current && region) {
      mapInstance.current.flyTo(region.center, region.zoom, { duration: 1.0 });
    }
  }, [region]);

  // Rebuild layers
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;
    Object.values(layerRefs.current).forEach(l => { if (map.hasLayer(l)) map.removeLayer(l); });
    layerRefs.current = {};

    // Springshed boundary
    if (activeLayers.springshed && geoJsonData) {
      const feats = geoJsonData.features.filter(f => f.properties.layer === 'springshed');
      if (feats.length) {
        const layer = L.geoJSON(feats, {
          style: { color: '#1d6fa4', weight: 2, dashArray: '6 4', fillColor: '#1d6fa4', fillOpacity: 0.08 },
          onEachFeature: (f, l) => {
            l.bindPopup(`
              <div class="popup-card">
                <div class="popup-title">📍 ${f.properties.name}</div>
                <div class="popup-row"><span class="popup-row-label">Recharge Area</span><span class="popup-row-value">${f.properties.rechargeZoneAreaSqKm} sq km</span></div>
                <div class="popup-row"><span class="popup-row-label">Suitability Score</span><span class="popup-row-value" style="color:#1d6fa4;">${f.properties.suitabilityScore}/100</span></div>
                <div class="popup-row"><span class="popup-row-label">Confidence</span><span class="popup-row-value">${f.properties.confidence}</span></div>
              </div>`);
          }
        }).addTo(map);
        layerRefs.current.springshed = layer;
      }
    }

    // High recharge zone
    if (activeLayers.rechargeSuitability && geoJsonData) {
      const feats = geoJsonData.features.filter(f => f.properties.layer === 'recharge_high');
      if (feats.length) {
        const layer = L.geoJSON(feats, {
          style: { color: '#2e7d32', weight: 1.5, fillColor: '#43a047', fillOpacity: 0.25 },
          onEachFeature: (f, l) => {
            l.bindPopup(`<div class="popup-card"><div class="popup-title">✅ Primary Recharge Zone</div><div class="popup-row"><span class="popup-row-label">Infiltration</span><span class="popup-row-value">${f.properties.infiltrability}</span></div><div class="popup-row"><span class="popup-row-label">Slope</span><span class="popup-row-value">${f.properties.slopeCategory}</span></div></div>`);
          }
        }).addTo(map);
        layerRefs.current.rechargeSuitability = layer;
      }
    }

    // Hazard zone
    if (activeLayers.riskHazard && geoJsonData) {
      const feats = geoJsonData.features.filter(f => f.properties.layer === 'risk_hazard');
      if (feats.length) {
        const layer = L.geoJSON(feats, {
          style: { color: '#c62828', weight: 2, dashArray: '4 3', fillColor: '#e53935', fillOpacity: 0.2 },
          onEachFeature: (f, l) => {
            l.bindPopup(`<div class="popup-card"><div class="popup-title" style="color:#c62828;">⚠️ ${f.properties.name}</div><div class="popup-row"><span class="popup-row-label">Risk Level</span><span class="popup-row-value" style="color:#c62828;">${f.properties.riskLevel}</span></div><div class="popup-row"><span class="popup-row-label">Slope</span><span class="popup-row-value">${f.properties.slopeAngle}</span></div><p style="font-size:10px;color:#666;margin-top:4px;">${f.properties.hazardNotice}</p></div>`);
          }
        }).addTo(map);
        layerRefs.current.riskHazard = layer;
      }
    }

    // Fractures
    if (activeLayers.fractures && geoJsonData) {
      const feats = geoJsonData.features.filter(f => f.properties.layer === 'fractures');
      if (feats.length) {
        const layer = L.geoJSON(feats, {
          style: { color: '#6a1b9a', weight: 2, opacity: 0.75, dashArray: '8 4' },
          onEachFeature: (f, l) => {
            l.bindTooltip(f.properties.name, { sticky: true });
          }
        }).addTo(map);
        layerRefs.current.fractures = layer;
      }
    }

    // Contours
    if (activeLayers.contours && geoJsonData) {
      const feats = geoJsonData.features.filter(f => f.properties.layer === 'contour');
      if (feats.length) {
        const layer = L.geoJSON(feats, {
          style: { color: '#795548', weight: 1, opacity: 0.5 },
          onEachFeature: (f, l) => { l.bindTooltip(f.properties.label, { sticky: true }); }
        }).addTo(map);
        layerRefs.current.contours = layer;
      }
    }

    // Intervention points
    if (activeLayers.interventions && geoJsonData) {
      const feats = geoJsonData.features.filter(f => f.properties.layer === 'interventions');
      const markers = feats.map(f => {
        const [lng, lat] = f.geometry.coordinates;
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:20px;height:20px;background:#1d6fa4;border:2px solid white;border-radius:4px;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.3);font-size:11px;">🛠</div>`,
          iconSize: [20, 20], iconAnchor: [10, 10]
        });
        const m = L.marker([lat, lng], { icon });
        m.bindPopup(`<div class="popup-card"><div class="popup-title">Intervention Site</div><div class="popup-row"><span class="popup-row-label">Type</span><span class="popup-row-value">${f.properties.type}</span></div><div class="popup-row"><span class="popup-row-label">Elevation</span><span class="popup-row-value">${f.properties.elevation} m</span></div><div class="popup-row"><span class="popup-row-label">Recharge Boost</span><span class="popup-row-value">${f.properties.expectedInfiltrationBoost}</span></div></div>`);
        return m;
      });
      layerRefs.current.interventions = L.featureGroup(markers).addTo(map);
    }

    // Spring markers
    if (activeLayers.springs && springs?.length) {
      const markers = springs.map(spring => {
        const isSelected = selectedSpring?.id === spring.id;
        const color = PRIORITY_COLORS[spring.priority] || '#1d6fa4';
        const size = isSelected ? 22 : 16;
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:${size}px;height:${size}px;background:${color};border:2px solid white;border-radius:50%;box-shadow:${isSelected ? `0 0 0 3px ${color}55, ` : ''}0 1px 4px rgba(0,0,0,0.3);cursor:pointer;"></div>`,
          iconSize: [size, size], iconAnchor: [size/2, size/2]
        });
        const m = L.marker([spring.latitude, spring.longitude], { icon });
        m.bindPopup(`
          <div class="popup-card">
            <div class="popup-title">💧 ${spring.name}</div>
            <div class="popup-row"><span class="popup-row-label">Village</span><span class="popup-row-value">${spring.village}</span></div>
            <div class="popup-row"><span class="popup-row-label">Discharge</span><span class="popup-row-value">${spring.dischargeLpm} LPM</span></div>
            <div class="popup-row"><span class="popup-row-label">Decline</span><span class="popup-row-value" style="color:#c62828;">-${spring.dischargeDeclinePct}%</span></div>
            <div class="popup-row"><span class="popup-row-label">Priority</span><span class="popup-row-value" style="color:${color};">${spring.priority}</span></div>
            <button class="popup-btn" onclick="document.getElementById('select-spring-${spring.id}').click()">View Full Details →</button>
          </div>`);
        m.on('click', () => onSelectSpring(spring));
        return m;
      });
      layerRefs.current.springs = L.featureGroup(markers).addTo(map);
    }

    // Hidden trigger buttons for popup btn click (workaround for Leaflet popup)
    springs?.forEach(s => {
      const btn = document.createElement('button');
      btn.id = `select-spring-${s.id}`;
      btn.style.display = 'none';
      btn.onclick = () => onSelectSpring(s);
      document.body.appendChild(btn);
    });

    return () => {
      springs?.forEach(s => {
        const el = document.getElementById(`select-spring-${s.id}`);
        if (el) el.remove();
      });
    };
  }, [activeLayers, geoJsonData, springs, selectedSpring]);

  return <div ref={mapRef} id="leaflet-map" style={{ width: '100%', height: '100%' }} />;
}
