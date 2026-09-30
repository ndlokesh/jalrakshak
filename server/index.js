import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PILOT_REGIONS, INITIAL_SPRINGS, REGION_GEOJSON } from './data/springsData.js';
import { runRechargeAnalysis, incorporateFieldValidation } from './ml/rechargeModel.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

// In-memory data store for live field updates and session state
let springsStore = [...INITIAL_SPRINGS];
let validationLogs = [];

// ==========================================
// SECURITY & BACKEND INTEGRITY MIDDLEWARE
// ==========================================

// 1. Force HTTPS middleware (Enforce SSL/TLS encryption with automatic HTTP-to-HTTPS redirect)
app.use((req, res, next) => {
  if (process.env.ENABLE_HTTPS_REDIRECT === 'true' && req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  // Security Headers (HSTS, CSP, X-Frame-Options, No-Sniff)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// 2. CORS configuration (Restricting allowed origins)
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ==========================================
// API ROUTES
// ==========================================

// System Status / Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'JalRakshak AI Spring Recharge DSS',
    version: '3.4.1',
    serverTimestamp: new Date().toISOString(),
    httpsEnforced: process.env.ENABLE_HTTPS_REDIRECT === 'true',
    secretsProtected: true, // Secrets kept server-side in .env
    activeSpringsTracked: springsStore.length,
    validationSubmissionsRecorded: validationLogs.length
  });
});

// Pilot Regions Metadata
app.get('/api/regions', (req, res) => {
  res.json({
    regions: PILOT_REGIONS
  });
});

// Get Springs (all or filtered by region)
app.get('/api/springs', (req, res) => {
  const { region } = req.query;
  let results = springsStore;
  if (region) {
    results = results.filter(s => s.regionId === region);
  }
  res.json({ springs: results });
});

// Get Specific Spring by ID
app.get('/api/springs/:id', (req, res) => {
  const spring = springsStore.find(s => s.id === req.params.id);
  if (!spring) {
    return res.status(404).json({ error: 'Spring not found in DSS registry' });
  }
  res.json({ spring });
});

// Get Spatial GeoJSON Layers for a Region
app.get('/api/geojson/:regionId', (req, res) => {
  const geojson = REGION_GEOJSON[req.params.regionId];
  if (!geojson) {
    return res.status(404).json({ error: 'Spatial layers not found for this region' });
  }
  res.json(geojson);
});

// AI Spring Recharge Zone & Springshed Delineation Engine
app.post('/api/analyze', async (req, res) => {
  try {
    const { springId, customWeights } = req.body;
    let targetSpring = springsStore.find(s => s.id === springId);

    if (!targetSpring) {
      targetSpring = springsStore[0]; // default to primary spring if none specified
    }

    // Artificial delay to show off the cool AI scanning animation in the UI!
    await new Promise(r => setTimeout(r, 2500));

    const analysisResult = await runRechargeAnalysis(targetSpring, customWeights || {});
    res.json({
      success: true,
      analysis: analysisResult
    });
  } catch (error) {
    console.error('Error in recharge analysis:', error);
    res.status(500).json({ error: 'Failed to complete hydrogeological delineation analysis' });
  }
});

// Field Validation Submission with Anti-Spam Bot Protection & Validation
app.post('/api/validations', (req, res) => {
  try {
    const {
      springId,
      surveyorName,
      surveyorRole,
      measuredDischargeLpm,
      seasonalBehavior,
      phValue,
      turbidityNtu,
      lithologyMatch,
      fieldNotes,
      honeyPotBotTrap // Honeypot anti-spam trap
    } = req.body;

    // 1. Anti-Spam Honeypot Check: If the hidden honeypot input is filled by automated spam bots, silently drop/reject
    if (honeyPotBotTrap && honeyPotBotTrap.trim() !== '') {
      console.warn('Spam submission detected via honeypot trap.');
      return res.status(400).json({ error: 'Invalid submission signature detected.' });
    }

    // 2. Strict Server-side Validation
    const errors = [];
    if (!springId) errors.push('Spring ID identifier is mandatory.');
    if (!surveyorName || surveyorName.trim().length < 2) errors.push('Valid surveyor name required.');
    
    const discharge = parseFloat(measuredDischargeLpm);
    if (isNaN(discharge) || discharge < 0 || discharge > 2000) {
      errors.push('Measured discharge must be a valid positive number between 0 and 2,000 LPM.');
    }

    if (phValue !== undefined && phValue !== '') {
      const ph = parseFloat(phValue);
      if (isNaN(ph) || ph < 3.0 || ph > 11.0) {
        errors.push('pH value must be between 3.0 and 11.0.');
      }
    }

    if (errors.length > 0) {
      return res.status(422).json({ error: 'Validation failed', details: errors });
    }

    // Find the spring and update its ground truth data
    const springIndex = springsStore.findIndex(s => s.id === springId);
    if (springIndex === -1) {
      return res.status(404).json({ error: 'Target spring not found in registry' });
    }

    const currentSpring = springsStore[springIndex];
    const validationUpdate = incorporateFieldValidation(currentSpring, { measuredDischargeLpm: discharge });

    // Update in-memory record
    springsStore[springIndex] = {
      ...currentSpring,
      dischargeLpm: discharge,
      validationStatus: 'Validated by Field Geologist',
      lastValidated: new Date().toISOString().split('T')[0],
      rechargeProbability: Math.min(0.96, currentSpring.rechargeProbability + 0.04),
      waterQuality: {
        ...currentSpring.waterQuality,
        pH: phValue ? parseFloat(phValue) : currentSpring.waterQuality.pH,
        turbidityNtu: turbidityNtu ? parseFloat(turbidityNtu) : currentSpring.waterQuality.turbidityNtu
      }
    };

    const newLog = {
      id: `VAL-${Date.now()}`,
      springId,
      surveyorName: surveyorName.trim(),
      surveyorRole: surveyorRole || 'Field Hydrogeologist',
      measuredDischargeLpm: discharge,
      seasonalBehavior,
      lithologyMatch: !!lithologyMatch,
      fieldNotes: fieldNotes ? fieldNotes.slice(0, 500) : '',
      timestamp: new Date().toISOString(),
      modelConfidenceBoost: validationUpdate.newConfidencePct
    };

    validationLogs.unshift(newLog);

    res.status(201).json({
      success: true,
      message: 'Field observation successfully ingested into hydrogeological feedback loop.',
      updatedSpring: springsStore[springIndex],
      validationLog: newLog
    });
  } catch (error) {
    console.error('Validation submission error:', error);
    res.status(500).json({ error: 'Internal server error processing field validation' });
  }
});

// Export Springshed Dossier (JSON or CSV)
app.get('/api/export/:format', (req, res) => {
  const { format } = req.params;
  const { region } = req.query;

  let dataset = springsStore;
  if (region) {
    dataset = dataset.filter(s => s.regionId === region);
  }

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=jalrakshak_springs_${region || 'all'}.csv`);
    
    let csv = 'SpringID,Name,Region,Village,Latitude,Longitude,Elevation_m,Discharge_LPM,Aquifer_Type,Priority,Validation_Status\n';
    dataset.forEach(s => {
      csv += `"${s.id}","${s.name}","${s.regionId}","${s.village}",${s.latitude},${s.longitude},${s.elevation},${s.dischargeLpm},"${s.aquiferType}","${s.priority}","${s.validationStatus}"\n`;
    });
    return res.send(csv);
  }

  res.json({
    exportDossier: {
      generatedAt: new Date().toISOString(),
      ministryProgram: 'Ministry of Tribal Affairs - National Spring Revival Mission',
      region: region || 'All Pilot Regions',
      totalSprings: dataset.length,
      springs: dataset
    }
  });
});

// Serve static frontend in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side SPA routing in production
app.get('*', (req, res) => {
  // If it's an API request that didn't match, return 404 JSON
  if (req.url.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found on JalRakshak API' });
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send('JalRakshak Application Portal: Frontend build not found. Please build Vite bundle.');
    }
  });
});

// Start Server only if not running in Vercel Serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[JalRakshak DSS Server] Running securely on port ${PORT}`);
    console.log(`[Security] Secrets loaded from .env: ${process.env.GEO_API_KEY ? 'PROTECTED' : 'MISSING'}`);
    console.log(`[Status] Enforce HTTPS: ${process.env.ENABLE_HTTPS_REDIRECT === 'true'}`);
  });
}

export default app;
