import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import SignaturePad from './SignaturePad';
import '../pages/ServerFormPage.css';
import './HRControls.css';
import amolIcon from '../assets/icons/Colorfull.png';
import jiraIcon from '../assets/icons/HS1.png';
import confluenceIcon from '../assets/icons/Triangle1.png';
import rapportIcon from '../assets/icons/C1.png';

const APP_ICONS = {
  Amol: amolIcon,
  Jira: jiraIcon,
  Confluence: confluenceIcon,
  rapport: rapportIcon,
};

const AGENCIES = [
  'Finance','Human Resources','IT','Operations','Security',
  'Legal','Procurement','Compliance','Engineering','Marketing',
];

const AGENCY_APPS = {
  Finance: ['Ledger','PayPro','TaxSuite'],
  'Human Resources': ['OnboardX','TimeTrack','Benefits360'],
  IT: ['Amol','Jira','Confluence','GitHub','ServiceDesk'],
  Operations: ['FleetOps','InventoryOne','Scheduler'],
  Security: ['GuardEye','Vault','IDS'],
  Legal: ['CaseBox','ContractPro'],
  Procurement: ['BuyRight','VendorHub'],
  Compliance: ['PolicyTrack','RiskWatch'],
  Engineering: ['CADPro','BuildPipe','SpecSheet'],
  Marketing: ['MailBlast','AdManager','SocialBee'],
};

// YYYY-MM-DD -> "Month YYYY"
const toMonthYYYY = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d)) return '';
  return d.toLocaleString('default', { month: 'long', year: 'numeric' });
};

function ServerForm() {
  const { formData, updateFormData } = useFormContext();

  const [signatureData, setSignatureData] = useState({
    requestedBy: null,
    approvedBy: null,
    itAdmin: null,
  });

  const accessLevel = Array.isArray(formData.accessLevel)
    ? formData.accessLevel
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleAccessChange = (type) => {
    let next = [...accessLevel];
    if (next.includes(type)) next = next.filter((t) => t !== type);
    else {
      if (type === 'Disable-Account') next = ['Disable-Account'];
      else {
        next = next.filter((t) => t !== 'Disable-Account');
        next.push(type);
      }
    }
    updateFormData({ accessLevel: next });
  };

  const handleSignatureSave = (sig, who) => {
    setSignatureData((p) => ({ ...p, [who]: sig }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = { ...formData, signatures: signatureData };
    console.log('Form submitted:', submission);
    alert('Form submitted! Check console for data.');
  };

  // Searchable combos
  const [agencyQuery, setAgencyQuery] = useState(formData.agency || '');
  const [agencyOpen, setAgencyOpen] = useState(false);
  const filteredAgencies =
    agencyQuery.trim() === ''
      ? AGENCIES
      : AGENCIES.filter((a) =>
          a.toLowerCase().includes(agencyQuery.toLowerCase())
        );

  const handleAgencyInput = (e) => {
    setAgencyQuery(e.target.value);
    setAgencyOpen(true);
  };

  const handleAgencySelect = (value) => {
    setAgencyQuery(value);
    setAgencyOpen(false);
    updateFormData({ agency: value, application: '' });
    setApplicationQuery('');
  };

  const [applicationQuery, setApplicationQuery] = useState(
    formData.application || ''
  );
  const [applicationOpen, setApplicationOpen] = useState(false);

  const appsForAgency =
    formData.agency && AGENCY_APPS[formData.agency]
      ? AGENCY_APPS[formData.agency]
      : [];

  const filteredApps =
    applicationQuery.trim() === ''
      ? appsForAgency
      : appsForAgency.filter((a) =>
          a.toLowerCase().includes(applicationQuery.toLowerCase())
        );

  useEffect(() => {
    if (!formData.agency) {
      setApplicationQuery('');
      setApplicationOpen(false);
    }
  }, [formData.agency]);

  const handleApplicationInput = (e) => {
    setApplicationQuery(e.target.value);
    setApplicationOpen(true);
  };

  const handleApplicationSelect = (value) => {
    setApplicationQuery(value);
    setApplicationOpen(false);
    updateFormData({ application: value });
  };

  const appDisabled = !formData.agency;
  const iconSrc = formData.application && APP_ICONS[formData.application];

  // HR toggles (mutually exclusive; click again to uncheck)
  const handleHrToggle = (action) => {
    if (formData.hrAction === action) {
      updateFormData({ hrAction: '', hrDate: '', hrActivation: '' });
      return;
    }
    if (!formData.hrAction) {
      updateFormData({ hrAction: action });
    }
  };

  // Update hidden hrActivation from date (kept for compatibility)
  const onHrDateChange = (e) => {
    const value = e.target.value;
    updateFormData({ hrDate: value, hrActivation: toMonthYYYY(value) });
  };

  return (
    <div className="server-form-container">
      <div className="page-title">
        {iconSrc && (
          <img
            src={iconSrc}
            alt={`${formData.application} icon`}
            className="app-icon"
          />
        )}
        <h1 className="form-title">
          {formData.application ? `${formData.application} ` : ''}
          Production Server Windows Administrator Access Form
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="server-form">

        {/* ------- Agency ------- */}
        
        <div className="agency-bar">
          <label className="agency-label">Agency</label>
          <div
            className="combobox"
            onBlur={() => setTimeout(() => setAgencyOpen(false), 150)}
          >
            <input
              type="text"
              className="combo-input"
              value={agencyQuery}
              onChange={handleAgencyInput}
              onFocus={() => setAgencyOpen(true)}
              placeholder="Start typing to search..."
              autoComplete="off"
            />
            <button
              type="button"
              className="combo-toggle"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setAgencyOpen((o) => !o)}
              aria-label="Toggle agency list"
            >
            </button>
            {agencyOpen && (
              <ul className="combo-list">
                {filteredAgencies.length === 0 ? (
                  <li className="combo-empty">No matches</li>
                ) : (
                  filteredAgencies.map((a) => (
                    <li
                      key={a}
                      className="combo-item"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleAgencySelect(a)}
                    >
                      {a}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>

        {/* ------- Application ------- */}
        <div className="agency-bar">
          <label className="agency-label">Application</label>
          <div
            className="combobox"
            onBlur={() => setTimeout(() => setApplicationOpen(false), 150)}
          >
            <input
              type="text"
              className="combo-input"
              value={applicationQuery}
              onChange={handleApplicationInput}
              onFocus={() => !appDisabled && setApplicationOpen(true)}
              placeholder={
                appDisabled
                  ? 'Select an agency first'
                  : 'Type to search applications...'
              }
              autoComplete="off"
              disabled={appDisabled}
            />
            <button
              type="button"
              className="combo-toggle"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => !appDisabled && setApplicationOpen((o) => !o)}
              aria-label="Toggle application list"
              disabled={appDisabled}
            >
              ▾
            </button>
            {!appDisabled && applicationOpen && (
              <ul className="combo-list">
                {filteredApps.length === 0 ? (
                  <li className="combo-empty">No matches</li>
                ) : (
                  filteredApps.map((a) => (
                    <li
                      key={a}
                      className="combo-item"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleApplicationSelect(a)}
                    >
                      {a}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>

        {/* ------- Main Form Section ------- */}
        <div className="form-section">
          {/* Access Controls */}
          <div className="access-header">
            <span className="access-title">Access:</span>
            <div className="access-controls">
              <label className="access-checkbox">
                <input
                  type="checkbox"
                  checked={accessLevel.includes('Add')}
                  onChange={() => handleAccessChange('Add')}
                  disabled={accessLevel.includes('Disable-Account')}
                />
                Add
              </label>
              <label className="access-checkbox">
                <input
                  type="checkbox"
                  checked={accessLevel.includes('Edit')}
                  onChange={() => handleAccessChange('Edit')}
                  disabled={accessLevel.includes('Disable-Account')}
                />
                Edit
              </label>
              <label className="access-checkbox">
                <input
                  type="checkbox"
                  checked={accessLevel.includes('Disable-Account')}
                  onChange={() => handleAccessChange('Disable-Account')}
                  disabled={accessLevel.includes('Add') || accessLevel.includes('Edit')}
                />
                Disable Account
              </label>
            </div>
          </div>

          <div className="section-divider"></div>

          {/* Two columns */}
          <div className="form-table">
            <div className="table-row">
              <div className="table-cell">
                <label>Server Name</label>
                <input
                  type="text"
                  name="serverName"
                  value={formData.serverName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="table-cell">
                <label>IP</label>
                <input
                  type="text"
                  name="ipAddress"
                  value={formData.ipAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="table-row">
              <div className="table-cell">
                <label>IPGAP Login name</label>
                <input
                  type="text"
                  name="ipgapLogin"
                  value={formData.ipgapLogin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="table-cell hr-section">

{/* test code */}
<div className="table-row">
  <div className="table-cell">
    <label>IPGAP Login name</label>
    <input
      type="text"
      name="ipgapLogin"
      value={formData.ipgapLogin}
      onChange={handleChange}
      required
    />
  </div>
  
{/* NEW: Notification Email row */}
<div className="table-row">
  <div className="table-cell">
    <label>Notification Email (test recipient)</label>
    <input
      type="email"
      name="notifyEmail"
      value={formData.notifyEmail || ''}
      onChange={handleChange}
      placeholder="test@example.com"
      required
    />
    <div style={{ marginTop: '0.6rem' }}>
      <button
        type="button"
        className="submit-btn"
        onClick={async () => {
          try {
            const res = await fetch('http://localhost:4000/api/send-test-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                to: formData.notifyEmail,
                name: formData.name || formData.userName || 'User',
                application: formData.application || formData.appName || 'Application',
                serverName: formData.serverName || 'N/A'
              })
            });
            const data = await res.json().catch(() => ({}));
            alert(res.ok ? 'Test email sent ✅' : `Failed ❌: ${data?.error || 'unknown error'}`);
          } catch (e) {
            alert('Failed ❌: ' + (e?.message || 'network error'));
          }
        }}
      >
        Send Test Email
      </button>
    </div>
  </div>
  <div className="table-cell">{/* empty to keep grid aligned */}</div>
</div>
</div>

                {/* One-line HR controls with spacing */}
                <div className="hr-inline-row">
                  <span className="hr-text">HR</span>

                  <label className="hr-inline-option">
                    <input
                      type="checkbox"
                      checked={formData.hrAction === 'Activation'}
                      onChange={() => handleHrToggle('Activation')}
                      disabled={formData.hrAction === 'De-activation'}
                    />
                    Activation
                  </label>

                  <span className="hr-sep">/</span>

                  <label className="hr-inline-option">
                    <input
                      type="checkbox"
                      checked={formData.hrAction === 'De-activation'}
                      onChange={() => handleHrToggle('De-activation')}
                      disabled={formData.hrAction === 'Activation'}
                    />
                    De-activation
                  </label>
                </div>

                {/* Date only — Month text field hidden; value still updated internally */}
                <div className="hr-dates">
                  <input
                    type="date"
                    name="hrDate"
                    value={formData.hrDate || ''}
                    onChange={onHrDateChange}
                    disabled={!formData.hrAction}
                    className="hr-date-input"
                    title={
                      formData.hrAction
                        ? `${formData.hrAction} date`
                        : 'Select Activation or De-activation first'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------- Approved By ------- */}
        <div className="form-section">
          <h2 className="section-title">Approved By</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="approvedByName"
                value={formData.approvedByName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="approvedByTitle"
                value={formData.approvedByTitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Signature</label>
            <SignaturePad onSave={(sig) => handleSignatureSave(sig, 'approvedBy')} />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="approvedByDate" onChange={handleChange} required />
          </div>
        </div>

        {/* ------- IT (Server Administrator) ------- */}
        <div className="form-section">
          <h2 className="section-title">IT (Server Administrator)</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="itRole"
                value={formData.itRole}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="itName"
                value={formData.itName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Remarks</label>
            <textarea name="remarks" value={formData.remarks} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Signature</label>
            <SignaturePad onSave={(sig) => handleSignatureSave(sig, 'itAdmin')} />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="itAdminDate" onChange={handleChange} required />
          </div>
        </div>

        {/* ------- Submit ------- */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServerForm;
