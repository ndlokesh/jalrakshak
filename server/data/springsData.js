// JalRakshak Hydrogeological Spatial Dataset
// Co-developed for Ministry of Tribal Affairs / Spring Revival Mission

export const PILOT_REGIONS = [
  {
    id: 'araku',
    name: 'Araku Valley Springshed',
    district: 'Alluri Sitharama Raju',
    state: 'Andhra Pradesh',
    tribalCommunities: ['Bagata', 'Valmiki', 'Konda Dora'],
    center: [18.3273, 82.8775],
    zoom: 13,
    avgRainfallMm: 1380,
    elevationRange: '850m - 1410m',
    primaryLithology: 'Charnockite & Khondalite Suite',
    geologicalSetting: 'Eastern Ghats Mobile Belt, deeply weathered with strike N40E, dip 32° SE',
    springsCount: 14,
    criticalSprings: 5,
    description: 'High-altitude tribal valley dependent on fractured crystalline rock aquifers for drinking and organic coffee irrigation.'
  },
  {
    id: 'tehri',
    name: 'Tehri Garhwal Springshed',
    district: 'Tehri Garhwal',
    state: 'Uttarakhand',
    tribalCommunities: ['Jaunsari', 'Garhwali Hill Communities'],
    center: [30.3782, 78.4803],
    zoom: 13,
    avgRainfallMm: 1650,
    elevationRange: '1150m - 2280m',
    primaryLithology: 'Quartzite, Phyllite & Mica Schist (Jaunsar Group)',
    geologicalSetting: 'Lesser Himalayas with tectonic thrust zones, steep dip 48° NW, highly jointed',
    springsCount: 18,
    criticalSprings: 7,
    description: 'Steep montane springshed experiencing drying discharge due to pine invasion and climate extremes.'
  },
  {
    id: 'koraput',
    name: 'Koraput Highland Springshed',
    district: 'Koraput',
    state: 'Odisha',
    tribalCommunities: ['Paroja', 'Bonda', 'Gadaba'],
    center: [18.8135, 82.7123],
    zoom: 13,
    avgRainfallMm: 1520,
    elevationRange: '890m - 1320m',
    primaryLithology: 'Laterite capped Khondalites & Charnockites',
    geologicalSetting: 'Peneplained plateau with lateritic bauxite capping over fractured basement',
    springsCount: 12,
    criticalSprings: 4,
    description: 'Key tribal agro-biodiversity heritage site where traditional water bodies (Chuan/Dharani) are drying out.'
  },
  {
    id: 'dindori',
    name: 'Dindori Baiga Chak',
    district: 'Dindori',
    state: 'Madhya Pradesh',
    tribalCommunities: ['Baiga (PVTG)', 'Gond'],
    center: [22.9512, 81.0825],
    zoom: 13,
    avgRainfallMm: 1240,
    elevationRange: '680m - 1050m',
    primaryLithology: 'Deccan Traps Basalt with Inter-trappean Beds',
    geologicalSetting: 'Multi-layered basaltic lava flows with vesicular and zeolitic horizons',
    springsCount: 11,
    criticalSprings: 3,
    description: 'Vulnerable Baiga habitat with seasonal perched aquifers causing acute pre-monsoon water scarcity.'
  },
  {
    id: 'namchi',
    name: 'Namchi Springshed',
    district: 'South Sikkim',
    state: 'Sikkim',
    tribalCommunities: ['Bhutia', 'Lepcha'],
    center: [27.1670, 88.3730],
    zoom: 13,
    avgRainfallMm: 2200,
    elevationRange: '1300m - 2000m',
    primaryLithology: 'Daling Group Phyllite and Quartzite',
    geologicalSetting: 'Highly fractured metamorphic rocks with steep structural dips',
    springsCount: 15,
    criticalSprings: 6,
    description: 'Critical Himalayan springshed facing diminished winter flow, affecting rural drinking water security.'
  },
  {
    id: 'wayanad',
    name: 'Wayanad Plateau Springshed',
    district: 'Wayanad',
    state: 'Kerala',
    tribalCommunities: ['Paniya', 'Kuruma'],
    center: [11.6854, 76.1320],
    zoom: 13,
    avgRainfallMm: 3000,
    elevationRange: '700m - 2100m',
    primaryLithology: 'Charnockite and Peninsular Gneiss',
    geologicalSetting: 'Deeply weathered crystalline rocks forming thick laterite caps',
    springsCount: 22,
    criticalSprings: 8,
    description: 'Western Ghats biodiversity hotspot where springs (cholas) sustain both tribal livelihoods and wildlife.'
  }
];

export const INITIAL_SPRINGS = [
  // Araku Valley Springs
  {
    id: 'SPR-AR-01',
    regionId: 'araku',
    name: 'Padmapuram Hill Spring (Ganga Dhara)',
    village: 'Padmapuram',
    latitude: 18.3345,
    longitude: 82.8830,
    elevation: 920,
    dischargeLpm: 14.5,
    historicDischargeLpm: 32.0,
    dischargeDeclinePct: 54.7,
    seasonalType: 'Seasonal (Drying in Feb-June)',
    waterQuality: { pH: 6.8, ec: 142, turbidityNtu: 1.2, fecalColiform: 'Negative' },
    aquiferType: 'Unconfined Fractured Khondalite',
    strikeDip: 'Strike N38°E / Dip 30° SE',
    priority: 'Critical',
    rechargeProbability: 0.86,
    confidenceInterval: '± 4.2%',
    catchmentAreaHa: 48.6,
    dependantHouseholds: 185,
    recommendedInterventions: [
      { type: 'Staggered Contour Trenching', qty: '1,200 meters', unitCost: 180000, slopeRange: '12°-22°' },
      { type: 'Loose Boulder Check Dams', qty: '8 structures', unitCost: 96000, location: 'Stream gullies' },
      { type: 'Spring-Box Chamber with Silt Trap', qty: '1 unit', unitCost: 45000, location: 'Spring eye' },
      { type: 'Native Broadleaf Afforestation (Banj/Ficus)', qty: '3.5 Hectares', unitCost: 125000, location: 'Upper recharge crest' }
    ],
    riskFlags: [
      { level: 'Moderate', type: 'Cattle trampling in upper recharge pasture', mitigation: 'Social fencing and community bio-hedging' }
    ],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-08-14',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 16.2 }, { month: 'Feb', discharge: 11.0 }, { month: 'Mar', discharge: 7.4 },
      { month: 'Apr', discharge: 4.8 }, { month: 'May', discharge: 3.2 }, { month: 'Jun', discharge: 8.5 },
      { month: 'Jul', discharge: 22.0 }, { month: 'Aug', discharge: 28.4 }, { month: 'Sep', discharge: 26.1 },
      { month: 'Oct', discharge: 21.8 }, { month: 'Nov', discharge: 18.5 }, { month: 'Dec', discharge: 17.1 }
    ]
  },
  {
    id: 'SPR-AR-02',
    regionId: 'araku',
    name: 'Dumbriguda Stream Head Spring',
    village: 'Dumbriguda',
    latitude: 18.3180,
    longitude: 82.8620,
    elevation: 890,
    dischargeLpm: 38.0,
    historicDischargeLpm: 44.0,
    dischargeDeclinePct: 13.6,
    seasonalType: 'Perennial',
    waterQuality: { pH: 7.2, ec: 180, turbidityNtu: 0.8, fecalColiform: 'Negative' },
    aquiferType: 'Semi-confined Charnockite Joint System',
    strikeDip: 'Strike N42°E / Dip 35° SE',
    priority: 'Moderate',
    rechargeProbability: 0.74,
    confidenceInterval: '± 5.8%',
    catchmentAreaHa: 62.4,
    dependantHouseholds: 240,
    recommendedInterventions: [
      { type: 'Percolation Pond in Upper Plateau', qty: '2 units', unitCost: 220000, slopeRange: '4°-8°' },
      { type: 'Vegetative Filter Strips', qty: '800 meters', unitCost: 35000, location: 'Buffer edge' }
    ],
    riskFlags: [],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-07-20',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 36.0 }, { month: 'Feb', discharge: 32.5 }, { month: 'Mar', discharge: 28.0 },
      { month: 'Apr', discharge: 24.2 }, { month: 'May', discharge: 22.0 }, { month: 'Jun', discharge: 31.0 },
      { month: 'Jul', discharge: 46.0 }, { month: 'Aug', discharge: 49.5 }, { month: 'Sep', discharge: 47.0 },
      { month: 'Oct', discharge: 42.0 }, { month: 'Nov', discharge: 39.0 }, { month: 'Dec', discharge: 37.0 }
    ]
  },
  {
    id: 'SPR-AR-03',
    regionId: 'araku',
    name: 'Ananthagiri Ridge Seepage',
    village: 'Ananthagiri',
    latitude: 18.3490,
    longitude: 82.8980,
    elevation: 1040,
    dischargeLpm: 6.2,
    historicDischargeLpm: 24.0,
    dischargeDeclinePct: 74.2,
    seasonalType: 'Seasonal (Dry 5 months)',
    waterQuality: { pH: 6.5, ec: 98, turbidityNtu: 2.4, fecalColiform: 'Trace' },
    aquiferType: 'Fractured Quartzite Ridge',
    strikeDip: 'Strike N45°E / Dip 28° SE',
    priority: 'Critical',
    rechargeProbability: 0.91,
    confidenceInterval: '± 3.4%',
    catchmentAreaHa: 34.0,
    dependantHouseholds: 110,
    recommendedInterventions: [
      { type: 'Continuous Contour Trenches (CCT)', qty: '950 meters', unitCost: 145000, slopeRange: '15°-25°' },
      { type: 'Sub-surface Dyking across Joint Trend', qty: '1 unit', unitCost: 160000, location: 'Valley throat' }
    ],
    riskFlags: [
      { level: 'High', type: 'Landslide Scarp Susceptibility', mitigation: 'Prohibit heavy earth-moving; use hand-dug trenches and vetiver roots only' }
    ],
    validationStatus: 'Needs Field Review',
    lastValidated: '2026-05-10',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 7.0 }, { month: 'Feb', discharge: 4.0 }, { month: 'Mar', discharge: 1.5 },
      { month: 'Apr', discharge: 0.4 }, { month: 'May', discharge: 0.0 }, { month: 'Jun', discharge: 3.8 },
      { month: 'Jul', discharge: 14.2 }, { month: 'Aug', discharge: 19.5 }, { month: 'Sep', discharge: 16.0 },
      { month: 'Oct', discharge: 11.2 }, { month: 'Nov', discharge: 8.5 }, { month: 'Dec', discharge: 7.5 }
    ]
  },
  {
    id: 'SPR-AR-04',
    regionId: 'araku',
    name: 'Bikuputtu Tribal Spring',
    village: 'Bikuputtu',
    latitude: 18.3090,
    longitude: 82.8710,
    elevation: 955,
    dischargeLpm: 19.0,
    historicDischargeLpm: 27.0,
    dischargeDeclinePct: 29.6,
    seasonalType: 'Perennial',
    waterQuality: { pH: 7.0, ec: 165, turbidityNtu: 0.9, fecalColiform: 'Negative' },
    aquiferType: 'Weathered Khondalite Colluvium',
    strikeDip: 'Strike N35°E / Dip 32° SE',
    priority: 'Reviving',
    rechargeProbability: 0.81,
    confidenceInterval: '± 4.9%',
    catchmentAreaHa: 52.1,
    dependantHouseholds: 160,
    recommendedInterventions: [
      { type: 'Gabion Check Dam', qty: '3 units', unitCost: 135000, location: 'Main drainage chute' },
      { type: 'Spring Head Sump Chamber', qty: '1 unit', unitCost: 55000, location: 'Collection intake' }
    ],
    riskFlags: [],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-09-02',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 20.0 }, { month: 'Feb', discharge: 17.5 }, { month: 'Mar', discharge: 14.0 },
      { month: 'Apr', discharge: 12.0 }, { month: 'May', discharge: 11.5 }, { month: 'Jun', discharge: 16.0 },
      { month: 'Jul', discharge: 28.0 }, { month: 'Aug', discharge: 31.0 }, { month: 'Sep', discharge: 29.0 },
      { month: 'Oct', discharge: 25.0 }, { month: 'Nov', discharge: 22.0 }, { month: 'Dec', discharge: 21.0 }
    ]
  },

  // Tehri Garhwal Springs
  {
    id: 'SPR-TH-01',
    regionId: 'tehri',
    name: 'Chamba Ridge Dhara',
    village: 'Chamba Block',
    latitude: 30.3840,
    longitude: 78.4920,
    elevation: 1620,
    dischargeLpm: 8.4,
    historicDischargeLpm: 28.0,
    dischargeDeclinePct: 70.0,
    seasonalType: 'Seasonal (Critical in May-June)',
    waterQuality: { pH: 7.4, ec: 210, turbidityNtu: 1.5, fecalColiform: 'Negative' },
    aquiferType: 'Jointed Blaini Formation Quartzite',
    strikeDip: 'Strike NW-SE / Dip 42° NE',
    priority: 'Critical',
    rechargeProbability: 0.89,
    confidenceInterval: '± 3.8%',
    catchmentAreaHa: 78.2,
    dependantHouseholds: 320,
    recommendedInterventions: [
      { type: 'Staggered Contour Trenches with Infiltration Pits', qty: '2,100 meters', unitCost: 315000, slopeRange: '15°-28°' },
      { type: 'Broadleaf Oak (Quercus leucotrichophora) Plantation', qty: '6 Hectares', unitCost: 210000, location: 'Ridge crown' },
      { type: 'Cattle-proof Bio-Fencing', qty: '1,500 meters', unitCost: 65000, location: 'Catchment boundary' }
    ],
    riskFlags: [
      { level: 'High', type: 'Active Debris Slide Potential on Escarpment', mitigation: 'Exclude SCT from zones steeper than 32°; install wire-mesh gabions only' }
    ],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-08-25',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 9.5 }, { month: 'Feb', discharge: 8.0 }, { month: 'Mar', discharge: 5.2 },
      { month: 'Apr', discharge: 3.1 }, { month: 'May', discharge: 1.8 }, { month: 'Jun', discharge: 4.5 },
      { month: 'Jul', discharge: 16.5 }, { month: 'Aug', discharge: 22.0 }, { month: 'Sep', discharge: 19.0 },
      { month: 'Oct', discharge: 14.0 }, { month: 'Nov', discharge: 11.2 }, { month: 'Dec', discharge: 10.0 }
    ]
  },
  {
    id: 'SPR-TH-02',
    regionId: 'tehri',
    name: 'Kandisaur Valley Spring',
    village: 'Kandisaur',
    latitude: 30.3650,
    longitude: 78.4680,
    elevation: 1340,
    dischargeLpm: 26.5,
    historicDischargeLpm: 35.0,
    dischargeDeclinePct: 24.3,
    seasonalType: 'Perennial',
    waterQuality: { pH: 7.1, ec: 195, turbidityNtu: 0.6, fecalColiform: 'Negative' },
    aquiferType: 'Fractured Phyllite with Colluvial Cover',
    strikeDip: 'Strike N50°W / Dip 38° NE',
    priority: 'Moderate',
    rechargeProbability: 0.77,
    confidenceInterval: '± 5.1%',
    catchmentAreaHa: 54.8,
    dependantHouseholds: 210,
    recommendedInterventions: [
      { type: 'Graded Bunding with Vetiver', qty: '1,100 meters', unitCost: 110000, slopeRange: '10°-18°' },
      { type: 'Check Dams in Feeder Gully', qty: '5 units', unitCost: 85000, location: 'Sub-catchment' }
    ],
    riskFlags: [],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-07-15',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 25.0 }, { month: 'Feb', discharge: 22.0 }, { month: 'Mar', discharge: 18.5 },
      { month: 'Apr', discharge: 16.0 }, { month: 'May', discharge: 15.0 }, { month: 'Jun', discharge: 22.0 },
      { month: 'Jul', discharge: 38.0 }, { month: 'Aug', discharge: 42.0 }, { month: 'Sep', discharge: 39.0 },
      { month: 'Oct', discharge: 32.0 }, { month: 'Nov', discharge: 28.0 }, { month: 'Dec', discharge: 26.0 }
    ]
  },

  // Koraput Highland Springs
  {
    id: 'SPR-KP-01',
    regionId: 'koraput',
    name: 'Deomali Foothill Chuan',
    village: 'Pottangi',
    latitude: 18.8250,
    longitude: 82.7210,
    elevation: 980,
    dischargeLpm: 11.2,
    historicDischargeLpm: 26.0,
    dischargeDeclinePct: 56.9,
    seasonalType: 'Seasonal',
    waterQuality: { pH: 6.6, ec: 110, turbidityNtu: 1.8, fecalColiform: 'Negative' },
    aquiferType: 'Laterite Capping on Khondalite',
    strikeDip: 'Horizontal lateritic plateau over N30°E fracture',
    priority: 'Critical',
    rechargeProbability: 0.88,
    confidenceInterval: '± 4.1%',
    catchmentAreaHa: 42.0,
    dependantHouseholds: 195,
    recommendedInterventions: [
      { type: 'Percolation Pits along Plateau Margin', qty: '45 pits', unitCost: 135000, slopeRange: '2°-6°' },
      { type: 'Subsurface Clay Barrier', qty: '1 unit', unitCost: 120000, location: 'Seepage breach' }
    ],
    riskFlags: [],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-08-11',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 13.0 }, { month: 'Feb', discharge: 9.5 }, { month: 'Mar', discharge: 5.5 },
      { month: 'Apr', discharge: 3.0 }, { month: 'May', discharge: 1.5 }, { month: 'Jun', discharge: 6.0 },
      { month: 'Jul', discharge: 18.0 }, { month: 'Aug', discharge: 24.0 }, { month: 'Sep', discharge: 22.0 },
      { month: 'Oct', discharge: 17.5 }, { month: 'Nov', discharge: 15.0 }, { month: 'Dec', discharge: 14.0 }
    ]
  },

  // Dindori Baiga Chak Springs
  {
    id: 'SPR-DN-01',
    regionId: 'dindori',
    name: 'Chada Baiga Forest Jhiria',
    village: 'Chada',
    latitude: 22.9620,
    longitude: 81.0910,
    elevation: 740,
    dischargeLpm: 9.8,
    historicDischargeLpm: 22.0,
    dischargeDeclinePct: 55.4,
    seasonalType: 'Seasonal',
    waterQuality: { pH: 7.3, ec: 220, turbidityNtu: 1.1, fecalColiform: 'Negative' },
    aquiferType: 'Vesicular Basalt Horizon (Flow 3)',
    strikeDip: 'Sub-horizontal Trap Sheet (Dip 2° NW)',
    priority: 'Critical',
    rechargeProbability: 0.84,
    confidenceInterval: '± 4.6%',
    catchmentAreaHa: 39.5,
    dependantHouseholds: 140,
    recommendedInterventions: [
      { type: 'Continuous Contour Trenching', qty: '800 meters', unitCost: 120000, slopeRange: '8°-16°' },
      { type: 'Mahua & Sal Agro-forestry Protection', qty: '4 Hectares', unitCost: 95000, location: 'Basalt rim' }
    ],
    riskFlags: [],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-09-12',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 11.0 }, { month: 'Feb', discharge: 8.0 }, { month: 'Mar', discharge: 4.8 },
      { month: 'Apr', discharge: 2.2 }, { month: 'May', discharge: 1.0 }, { month: 'Jun', discharge: 5.5 },
      { month: 'Jul', discharge: 16.0 }, { month: 'Aug', discharge: 21.0 }, { month: 'Sep', discharge: 19.5 },
      { month: 'Oct', discharge: 15.0 }, { month: 'Nov', discharge: 13.0 }, { month: 'Dec', discharge: 12.0 }
    ]
  },
  // Namchi Springs
  {
    id: 'SPR-NM-01',
    regionId: 'namchi',
    name: 'Tendong Forest Spring',
    village: 'Damthang',
    latitude: 27.1850,
    longitude: 88.3850,
    elevation: 1850,
    dischargeLpm: 18.5,
    historicDischargeLpm: 35.0,
    dischargeDeclinePct: 47.1,
    seasonalType: 'Perennial',
    waterQuality: { pH: 7.0, ec: 120, turbidityNtu: 2.1, fecalColiform: 'Negative' },
    aquiferType: 'Fractured Quartzite',
    strikeDip: 'Strike NW-SE / Dip 45° NE',
    priority: 'High',
    rechargeProbability: 0.82,
    confidenceInterval: '± 4.5%',
    catchmentAreaHa: 45.2,
    dependantHouseholds: 210,
    recommendedInterventions: [
      { type: 'Staggered Contour Trenches', qty: '1,500 meters', unitCost: 210000, slopeRange: '20°-35°' },
      { type: 'Broadleaf Afforestation', qty: '5 Hectares', unitCost: 175000, location: 'Recharge Area' }
    ],
    riskFlags: [
      { level: 'Moderate', type: 'Forest fire risk during dry season', mitigation: 'Community fire lines' }
    ],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-06-15',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 15.0 }, { month: 'Feb', discharge: 12.0 }, { month: 'Mar', discharge: 9.5 },
      { month: 'Apr', discharge: 8.0 }, { month: 'May', discharge: 18.0 }, { month: 'Jun', discharge: 28.5 },
      { month: 'Jul', discharge: 35.0 }, { month: 'Aug', discharge: 32.0 }, { month: 'Sep', discharge: 29.5 },
      { month: 'Oct', discharge: 24.0 }, { month: 'Nov', discharge: 19.0 }, { month: 'Dec', discharge: 17.0 }
    ]
  },
  // Wayanad Springs
  {
    id: 'SPR-WY-01',
    regionId: 'wayanad',
    name: 'Thirunelli Temple Chola',
    village: 'Thirunelli',
    latitude: 11.8540,
    longitude: 75.9940,
    elevation: 900,
    dischargeLpm: 45.0,
    historicDischargeLpm: 60.0,
    dischargeDeclinePct: 25.0,
    seasonalType: 'Perennial',
    waterQuality: { pH: 6.5, ec: 85, turbidityNtu: 1.0, fecalColiform: 'Negative' },
    aquiferType: 'Laterite overlying Gneiss',
    strikeDip: 'Sub-horizontal laterite profile',
    priority: 'Moderate',
    rechargeProbability: 0.88,
    confidenceInterval: '± 3.2%',
    catchmentAreaHa: 120.5,
    dependantHouseholds: 450,
    recommendedInterventions: [
      { type: 'Earthen Bunds', qty: '10 units', unitCost: 80000, location: 'Slopes' },
      { type: 'Wetland Protection (Vayal)', qty: '10 Hectares', unitCost: 50000, location: 'Valley floor' }
    ],
    riskFlags: [],
    validationStatus: 'Validated by Field Geologist',
    lastValidated: '2026-08-20',
    monthlyDischargeHistory: [
      { month: 'Jan', discharge: 40.0 }, { month: 'Feb', discharge: 35.0 }, { month: 'Mar', discharge: 28.0 },
      { month: 'Apr', discharge: 25.0 }, { month: 'May', discharge: 35.0 }, { month: 'Jun', discharge: 55.0 },
      { month: 'Jul', discharge: 65.0 }, { month: 'Aug', discharge: 60.0 }, { month: 'Sep', discharge: 50.0 },
      { month: 'Oct', discharge: 48.0 }, { month: 'Nov', discharge: 45.0 }, { month: 'Dec', discharge: 42.0 }
    ]
  }
];

// Rich Springshed polygon geojson data for the pilot regions
export const REGION_GEOJSON = {
  araku: {
    type: 'FeatureCollection',
    features: [
      // Delineated Springshed Catchment Boundary
      {
        type: 'Feature',
        properties: {
          layer: 'springshed',
          name: 'Padmapuram-Dumbriguda Springshed Delineation',
          rechargeZoneAreaSqKm: 4.85,
          suitabilityScore: 88,
          confidence: 'High (89.2%)',
          flowDirection: 'South-East (Conforming to fracture dip 30° SE)'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [82.8550, 18.2900], [82.8620, 18.2925], [82.8750, 18.2960], [82.8900, 18.2995], [82.9050, 18.3020], [82.9150, 18.3050],
            [82.9200, 18.3150], [82.9250, 18.3280], [82.9280, 18.3390], [82.9300, 18.3450], [82.9220, 18.3550], [82.9100, 18.3620],
            [82.8950, 18.3680], [82.8800, 18.3700], [82.8650, 18.3650], [82.8520, 18.3580], [82.8450, 18.3500], [82.8420, 18.3350],
            [82.8400, 18.3200], [82.8420, 18.3100], [82.8480, 18.3000], [82.8550, 18.2900]
          ]]
        }
      },
      // High Suitability Recharge Zone (Core Intake)
      {
        type: 'Feature',
        properties: {
          layer: 'recharge_high',
          name: 'Primary Infiltration Zone (Quartzite/Weathered Khondalite Crest)',
          infiltrability: 'High (45-65 mm/hr)',
          slopeCategory: 'Gentle to Moderate (10°-18°)',
          geology: 'Deeply weathered saprolite zone'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [82.875, 18.348], [82.880, 18.349], [82.888, 18.347], [82.895, 18.345], 
            [82.899, 18.338], [82.902, 18.330], [82.896, 18.326], [82.885, 18.325], 
            [82.878, 18.329], [82.872, 18.335], [82.871, 18.342], [82.875, 18.348]
          ]]
        }
      },
      // Landslide Geological Risk Hazard Zone
      {
        type: 'Feature',
        properties: {
          layer: 'risk_hazard',
          name: 'Steep Escarpment Landslide Risk Zone',
          riskLevel: 'Severe',
          slopeAngle: '38° - 46°',
          hazardNotice: 'High instability. Excavation / trenching strictly forbidden to prevent slope activation.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [82.898, 18.345], [82.904, 18.347], [82.912, 18.340], [82.914, 18.335], 
            [82.910, 18.328], [82.905, 18.329], [82.900, 18.332], [82.897, 18.339], [82.898, 18.345]
          ]]
        }
      },
      // Geological Fault & Fracture Lineaments
      {
        type: 'Feature',
        properties: {
          layer: 'fractures',
          name: 'Major Eastern Ghats Shear Zone Lineament (N40°E)',
          transmissivity: 'High Secondary Permeability',
          rechargeConduit: true
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [82.855, 18.305], [82.860, 18.312], [82.866, 18.318], [82.872, 18.322],
            [82.879, 18.331], [82.885, 18.338], [82.893, 18.348], [82.905, 18.360]
          ]
        }
      },
      {
        type: 'Feature',
        properties: {
          layer: 'fractures',
          name: 'Cross Fault Lineament (NW-SE)',
          transmissivity: 'Moderate',
          rechargeConduit: true
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [82.862, 18.345], [82.868, 18.340], [82.875, 18.335], [82.880, 18.332],
            [82.889, 18.325], [82.898, 18.318], [82.906, 18.313], [82.915, 18.308]
          ]
        }
      },
      // DEM Elevation Contours
      {
        type: 'Feature',
        properties: { layer: 'contour', elevation: 1200, label: '1200m ASL' },
        geometry: {
          type: 'LineString',
          coordinates: [
            [82.870, 18.355], [82.876, 18.356], [82.885, 18.352], [82.895, 18.350], [82.905, 18.345], [82.909, 18.338], [82.912, 18.330]
          ]
        }
      },
      {
        type: 'Feature',
        properties: { layer: 'contour', elevation: 1000, label: '1000m ASL' },
        geometry: {
          type: 'LineString',
          coordinates: [
            [82.865, 18.338], [82.871, 18.336], [82.880, 18.330], [82.888, 18.326], [82.895, 18.320], [82.902, 18.317], [82.908, 18.312]
          ]
        }
      },
      {
        type: 'Feature',
        properties: { layer: 'contour', elevation: 850, label: '850m ASL (Valley Floor)' },
        geometry: {
          type: 'LineString',
          coordinates: [
            [82.860, 18.320], [82.866, 18.316], [82.872, 18.312], [82.878, 18.310], [82.885, 18.308], [82.890, 18.305], [82.895, 18.302]
          ]
        }
      },
      // Proposed Intervention Points
      {
        type: 'Feature',
        properties: {
          layer: 'interventions',
          name: 'Intervention Site INT-01 (Continuous Contour Trench System)',
          type: 'Contour Trenching',
          elevation: 1140,
          expectedInfiltrationBoost: '+3.8 million Liters/year',
          priority: 'High'
        },
        geometry: {
          type: 'Point',
          coordinates: [82.881, 18.339]
        }
      },
      {
        type: 'Feature',
        properties: {
          layer: 'interventions',
          name: 'Intervention Site INT-02 (Loose Boulder Check Dam Series)',
          type: 'Check Dam',
          elevation: 1010,
          expectedInfiltrationBoost: '+2.2 million Liters/year',
          priority: 'High'
        },
        geometry: {
          type: 'Point',
          coordinates: [82.876, 18.328]
        }
      },
      {
        type: 'Feature',
        properties: {
          layer: 'interventions',
          name: 'Intervention Site INT-03 (Percolation Pond in Plateau Depression)',
          type: 'Percolation Pond',
          elevation: 1190,
          expectedInfiltrationBoost: '+5.5 million Liters/year',
          priority: 'Medium'
        },
        geometry: {
          type: 'Point',
          coordinates: [82.892, 18.338]
        }
      }
    ]
  },
  tehri: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          layer: 'springshed',
          name: 'Chamba Ridge Springshed Delineation',
          rechargeZoneAreaSqKm: 6.2,
          suitabilityScore: 84,
          confidence: 'High (87.6%)',
          flowDirection: 'North-East (Dip 42° NE)'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [78.460, 18.390],
            [78.485, 18.405],
            [78.508, 18.392],
            [78.515, 18.368],
            [78.490, 18.355],
            [78.465, 18.362],
            [78.460, 18.390]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: {
          layer: 'risk_hazard',
          name: 'Tehri Thrust Shear Landslide Prone Slope',
          riskLevel: 'Severe',
          slopeAngle: '44°',
          hazardNotice: 'High danger of slope failure during monsoon. Mechanical intervention strictly restricted.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [78.495, 18.385],
            [78.510, 18.380],
            [78.505, 18.370],
            [78.492, 18.374],
            [78.495, 18.385]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: {
          layer: 'fractures',
          name: 'Krol Thrust Associated Joint Set',
          transmissivity: 'High Conduit',
          rechargeConduit: true
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [78.465, 18.360],
            [78.482, 18.380],
            [78.502, 18.400]
          ]
        }
      }
    ]
  },
  koraput: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          layer: 'springshed',
          name: 'Pottangi Lateritic Plateau Catchment',
          rechargeZoneAreaSqKm: 5.1,
          suitabilityScore: 86,
          confidence: 'High (88.1%)'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [82.695, 18.810],
            [82.725, 18.835],
            [82.740, 18.825],
            [82.730, 18.800],
            [82.705, 18.802],
            [82.695, 18.810]
          ]]
        }
      }
    ]
  },
  dindori: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          layer: 'springshed',
          name: 'Baiga Chak Basalt Trap Watershed',
          rechargeZoneAreaSqKm: 4.2,
          suitabilityScore: 82,
          confidence: 'Moderate (83.5%)'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [81.065, 22.945],
            [81.095, 22.970],
            [81.110, 22.955],
            [81.095, 22.935],
            [81.070, 22.938],
            [81.065, 22.945]
          ]]
        }
      }
    ]
  },
  namchi: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          layer: 'springshed',
          name: 'Namchi Catchment Area',
          rechargeZoneAreaSqKm: 6.5,
          suitabilityScore: 85,
          confidence: 'High (86.4%)'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [88.355, 27.150],
            [88.390, 27.185],
            [88.405, 27.170],
            [88.380, 27.140],
            [88.360, 27.145],
            [88.355, 27.150]
          ]]
        }
      }
    ]
  },
  wayanad: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          layer: 'springshed',
          name: 'Wayanad Plateau Catchment',
          rechargeZoneAreaSqKm: 8.2,
          suitabilityScore: 89,
          confidence: 'High (91.2%)'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [76.100, 11.660],
            [76.150, 11.700],
            [76.170, 11.680],
            [76.130, 11.650],
            [76.110, 11.655],
            [76.100, 11.660]
          ]]
        }
      }
    ]
  }
};
