import React, { useState } from 'react';

export default function FieldValidationModal({ isOpen, onClose, spring, onValidationSuccess }) {
  const [form, setForm] = useState({
    surveyorName: '', surveyorRole: 'MoTA Field Hydrogeologist',
    measuredDischargeLpm: '', seasonalBehavior: spring?.seasonalType || 'Seasonal (Drying in Feb-June)',
    phValue: '', turbidityNtu: '', lithologyMatch: true, fieldNotes: '',
    hp: '' // honeypot
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  if (!isOpen || !spring) return null;

  const validate = () => {
    const e = {};
    if (!form.surveyorName.trim()) e.surveyorName = 'Surveyor name is required.';
    const d = parseFloat(form.measuredDischargeLpm);
    if (isNaN(d) || d < 0 || d > 2000) e.discharge = 'Enter a valid discharge value (0 – 2000 LPM).';
    if (form.phValue) {
      const ph = parseFloat(form.phValue);
      if (isNaN(ph) || ph < 3 || ph > 11) e.ph = 'pH must be between 3.0 and 11.0.';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/validations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          springId: spring.id,
          surveyorName: form.surveyorName,
          surveyorRole: form.surveyorRole,
          measuredDischargeLpm: form.measuredDischargeLpm,
          seasonalBehavior: form.seasonalBehavior,
          phValue: form.phValue,
          turbidityNtu: form.turbidityNtu,
          lithologyMatch: form.lithologyMatch,
          fieldNotes: form.fieldNotes,
          honeyPotBotTrap: form.hp
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || (data.details || []).join(', '));
      setSuccess(data);
      if (onValidationSuccess) onValidationSuccess(data.updatedSpring, data.validationLog);
      setTimeout(() => { setSuccess(null); onClose(); }, 2500);
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" id="field-validation-modal-overlay">
      <div className="modal-box" id="field-validation-modal-dialog">
        <div className="modal-header">
          <div className="modal-icon" style={{ background: '#e8f5e9', color: '#2e7d32' }}>📋</div>
          <div style={{ flex: 1 }}>
            <div className="modal-title">Field Validation — Ground Truth Entry</div>
            <div className="modal-subtitle">{spring.name}</div>
          </div>
          <button id="close-validation-modal-btn" className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Honeypot anti-spam (hidden from real users) */}
          <div className="hp-field" aria-hidden="true">
            <input tabIndex="-1" autoComplete="off" id="honeyPotBotTrap"
              value={form.hp} onChange={e => setForm(p => ({ ...p, hp: e.target.value }))} />
          </div>

          {success ? (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <div className="success-title">Observation Submitted!</div>
              <div className="success-desc">
                Field data for <strong>{spring.name}</strong> has been ingested into the hydrogeological model.
                New model confidence: <strong>{success.validationLog?.modelConfidenceBoost}%</strong>.
              </div>
            </div>
          ) : (
            <form id="field-observation-form" onSubmit={handleSubmit}>
              {errors.form && (
                <div className="alert-banner danger" style={{ marginBottom: 8 }}>
                  <span>⚠️</span> <span>{errors.form}</span>
                </div>
              )}

              {/* Surveyor details */}
              <div className="form-section-title">Surveyor Information</div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="field-surveyor-name">Name / Surveyor ID *</label>
                  <input id="field-surveyor-name" className="form-input" type="text"
                    placeholder="e.g. Dr. R. Kumar (CGWB)"
                    value={form.surveyorName} onChange={e => setForm(p => ({ ...p, surveyorName: e.target.value }))} />
                  {errors.surveyorName && <div className="form-error">{errors.surveyorName}</div>}
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="field-surveyor-role">Agency / Role</label>
                  <select id="field-surveyor-role" className="form-select"
                    value={form.surveyorRole} onChange={e => setForm(p => ({ ...p, surveyorRole: e.target.value }))}>
                    <option>MoTA Field Hydrogeologist</option>
                    <option>District Water Mission Officer</option>
                    <option>Tribal Community Barefoot Hydrogeologist</option>
                    <option>State Groundwater Directorate</option>
                  </select>
                </div>
              </div>

              {/* Field Measurements */}
              <div className="form-section-title" style={{ marginTop: 12 }}>Hydrometric Measurements</div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="field-measured-discharge">Measured Discharge (LPM) *</label>
                  <input id="field-measured-discharge" className="form-input" type="number" step="0.1" min="0" max="2000"
                    placeholder="e.g. 18.5"
                    value={form.measuredDischargeLpm} onChange={e => setForm(p => ({ ...p, measuredDischargeLpm: e.target.value }))} />
                  {errors.discharge && <div className="form-error">{errors.discharge}</div>}
                  <div className="form-help">Measure using bucket test or V-notch weir</div>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="field-seasonal-behavior">Seasonal Observation</label>
                  <select id="field-seasonal-behavior" className="form-select"
                    value={form.seasonalBehavior} onChange={e => setForm(p => ({ ...p, seasonalBehavior: e.target.value }))}>
                    <option>Perennial (Flows all 12 months)</option>
                    <option>Seasonal (Drying in Feb-June)</option>
                    <option>Seasonal (Drying in Feb-June)</option>
                    <option>Ephemeral (Only Post-Monsoon)</option>
                    <option>Completely Dried Out</option>
                  </select>
                </div>
              </div>

              {/* Water Quality */}
              <div className="form-section-title" style={{ marginTop: 12 }}>Water Quality (Optional)</div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="field-ph-value">pH</label>
                  <input id="field-ph-value" className="form-input" type="number" step="0.1" min="3" max="11"
                    placeholder="e.g. 7.2"
                    value={form.phValue} onChange={e => setForm(p => ({ ...p, phValue: e.target.value }))} />
                  {errors.ph && <div className="form-error">{errors.ph}</div>}
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="field-turbidity">Turbidity (NTU)</label>
                  <input id="field-turbidity" className="form-input" type="number" step="0.1" min="0"
                    placeholder="e.g. 1.2"
                    value={form.turbidityNtu} onChange={e => setForm(p => ({ ...p, turbidityNtu: e.target.value }))} />
                </div>
              </div>

              <div className="form-field" style={{ marginTop: 10 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 12 }}>
                  <input id="field-lithology-match-checkbox" type="checkbox"
                    checked={form.lithologyMatch} onChange={e => setForm(p => ({ ...p, lithologyMatch: e.target.checked }))} />
                  <span>Ground observation confirms mapped aquifer formation ({spring.aquiferType})</span>
                </label>
              </div>

              <div className="form-field" style={{ marginTop: 10 }}>
                <label className="form-label" htmlFor="field-notes-textarea">Field Notes</label>
                <textarea id="field-notes-textarea" className="form-textarea" rows="2"
                  placeholder="Describe upstream conditions, deforestation, erosion, or any notable observations..."
                  value={form.fieldNotes} onChange={e => setForm(p => ({ ...p, fieldNotes: e.target.value }))} />
              </div>
            </form>
          )}
        </div>

        {!success && (
          <div className="modal-footer">
            <button id="cancel-validation-btn" className="btn-outline" onClick={onClose} style={{ flex: 'none', padding: '7px 16px' }}>Cancel</button>
            <button id="submit-validation-btn" className="btn-primary" onClick={handleSubmit} disabled={submitting} style={{ flex: 'none', padding: '7px 20px', minWidth: 160 }}>
              {submitting ? '⏳ Submitting...' : '✅ Submit Observation'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
