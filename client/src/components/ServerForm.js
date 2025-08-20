import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import SignaturePad from './SignaturePad';
import '../pages/ServerFormPage.css';
import amolIcon from '../assets/icons/Colorfull.png';
import jiraIcon from '../assets/icons/HS1.png';
import confluenceIcon from '../assets/icons/Triangle1.png';
import rapportIcon from '../assets/icons/C1.png';

// mapping applications to icons

const APP_ICONS = {
  Amol: amolIcon,          // will use C1.png
  Jira: jiraIcon,          // will use HS1.png
  Confluence: confluenceIcon, // Triangle1.png
  rapport: rapportIcon,
};


/* -------------------------
   Simple data lists
-------------------------- */
const AGENCIES = [
  'Finance',
  'Human Resources',
  'IT',
  'Operations',
  'Security',
  'Legal',
  'Procurement',
  'Compliance',
  'Engineering',
  'Marketing',
];

// Map each agency to its applications
const AGENCY_APPS = {
  Finance: ['Ledger', 'PayPro', 'TaxSuite'],
  'Human Resources': ['OnboardX', 'TimeTrack', 'Benefits360'],
  IT: ['Amol', 'Jira', 'Confluence', 'GitHub', 'ServiceDesk'],
  Operations: ['FleetOps', 'InventoryOne', 'Scheduler'],
  Security: ['GuardEye', 'Vault', 'IDS'],
  Legal: ['CaseBox', 'ContractPro'],
  Procurement: ['BuyRight', 'VendorHub'],
  Compliance: ['PolicyTrack', 'RiskWatch'],
  Engineering: ['CADPro', 'BuildPipe', 'SpecSheet'],
  Marketing: ['MailBlast', 'AdManager', 'SocialBee'],
};

function ServerForm() {
  const { formData, updateFormData } = useFormContext();

  /* -------------------------
     Title prefix (from app)
  -------------------------- */
  const titlePrefix = formData.application ? `${formData.application} ` : '';

  /* -------------------------
     Signatures (as before)
  -------------------------- */
  const [signatureData, setSignatureData] = useState({
    requestedBy: null,
    approvedBy: null,
    itAdmin: null,
  });

  /* -------------------------
     Access level (array)
  -------------------------- */
  const accessLevel = Array.isArray(formData.accessLevel)
    ? formData.accessLevel
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleAccessChange = (type) => {
    let next = [...accessLevel];
    if (next.includes(type)) {
      next = next.filter((t) => t !== type);
    } else {
      if (type === 'Disable-Account') next = ['Disable-Account'];
      else {
        next = next.filter((t) => t !== 'Disable-Account');
        next.push(type);
      }
    }
    updateFormData({ accessLevel: next });
  };

  const handleSignatureSave = (sig, who) => {
    setSignatureData((prev) => ({ ...prev, [who]: sig }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = { ...formData, signatures: signatureData };
    console.log('Form submitted:', submission);
    alert('Form submitted! Check console for data.');
  };

  /* -------------------------
     Searchable Agency combo
  -------------------------- */
  const [agencyQuery, setAgencyQuery] = useState(formData.agency || '');
  const [agencyOpen, setAgencyOpen] = useState(false);

  const filteredAgencies =
    agencyQuery.trim() === ''
      ? AGENCIES
      : AGENCIES.filter((a) =>
          a.toLowerCase().includes(agencyQuery.toLowerCase())
        );

  const handleAgencyInput = (e) => {
    const val = e.target.value;
    setAgencyQuery(val);
    setAgencyOpen(true); // show list while typing
    // we commit to context only when user selects
  };

  const handleAgencySelect = (value) => {
    setAgencyQuery(value);
    setAgencyOpen(false);
    // when agency changes, clear application too
    updateFormData({ agency: value, application: '' });
    setApplicationQuery(''); // clear app box
  };

  /* -----------------------------
     Searchable Application combo
     - depends on selected agency
  ------------------------------ */
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

  // If agency gets cleared, also clear application query
  useEffect(() => {
    if (!formData.agency) {
      setApplicationQuery('');
      setApplicationOpen(false);
    }
  }, [formData.agency]);

  const handleApplicationInput = (e) => {
    const val = e.target.value;
    setApplicationQuery(val);
    setApplicationOpen(true);
  };

  const handleApplicationSelect = (value) => {
    setApplicationQuery(value);
    setApplicationOpen(false);
    updateFormData({ application: value });
  };

  const appDisabled = !formData.agency; // disable app until agency selected

  // Add this line right here
  const iconSrc = formData.application && APP_ICONS[formData.application];

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
        {/* ===== Agency (standalone) ===== */}
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
              ▾
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

        {/* ===== Application (depends on Agency) ===== */}
        <div className="agency-bar">{/* reuse same style for simplicity */}
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

        {/* ================= General Information ================= */}
        <div className="form-section">
          <h2 className="section-title">General Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* ================= Access ================= */}
        <div className="form-section">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.2rem',
              flexWrap: 'wrap',
              marginBottom: '0.5rem',
            }}
          >
            <span style={{ color: '#3498db', fontWeight: 700, fontSize: '1.25rem' }}>
              Access:
            </span>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3498db', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={accessLevel.includes('Add')}
                onChange={() => handleAccessChange('Add')}
                disabled={accessLevel.includes('Disable-Account')}
              />
              Add
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3498db', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={accessLevel.includes('Edit')}
                onChange={() => handleAccessChange('Edit')}
                disabled={accessLevel.includes('Disable-Account')}
              />
              Edit
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3498db', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={accessLevel.includes('Disable-Account')}
                onChange={() => handleAccessChange('Disable-Account')}
                disabled={accessLevel.includes('Add') || accessLevel.includes('Edit')}
              />
              Disable Account
            </label>
          </div>

          <div
            style={{
              width: '100%',
              borderBottom: '2px solid #3498db',
              marginBottom: '1.2rem',
            }}
          ></div>

          <div className="form-row">
            <div className="form-group">
              <label>Server Name</label>
              <input
                type="text"
                name="serverName"
                value={formData.serverName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
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

          <div className="form-row">
            <div className="form-group">
              <label>IPGAP Login name</label>
              <input
                type="text"
                name="ipgapLogin"
                value={formData.ipgapLogin}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>HR Activation/De-activation</label>
              <input
                type="text"
                name="hrActivation"
                value={formData.hrActivation}
                onChange={handleChange}
                placeholder="Month YYYY"
                required
              />
            </div>
          </div>
        </div>

        {/* ================= Approved By ================= */}
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

        {/* ================= IT (Server Administrator) ================= */}
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

        {/* ================= Submit ================= */}
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
