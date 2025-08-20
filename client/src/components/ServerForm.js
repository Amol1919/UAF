import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import SignaturePad from './SignaturePad';
import '../pages/ServerFormPage.css';

function ServerForm() {
  const { formData, updateFormData } = useFormContext();

  // Local state to keep saved signatures (images)
  const [signatureData, setSignatureData] = useState({
    requestedBy: null,
    approvedBy: null,
    itAdmin: null,
  });

  // Always treat accessLevel as an array
  const accessLevel = Array.isArray(formData.accessLevel)
    ? formData.accessLevel
    : [];

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // Handle checkbox rules for Access
  const handleAccessChange = (type) => {
    let next = [...accessLevel];

    if (next.includes(type)) {
      // If clicked again, turn OFF
      next = next.filter((t) => t !== type);
    } else {
      if (type === 'Disable-Account') {
        next = ['Disable-Account']; // exclusive
      } else {
        // Add/Edit ON → Disable OFF
        next = next.filter((t) => t !== 'Disable-Account');
        next.push(type);
      }
    }
    updateFormData({ accessLevel: next });
  };

  // Save signature image
  const handleSignatureSave = (signature, who) => {
    setSignatureData((prev) => ({ ...prev, [who]: signature }));
  };

  // When form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    const submission = { ...formData, signatures: signatureData };
    console.log('Form submitted:', submission);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="server-form-container">
      <h1 className="form-title">
        ROMS Production Server Windows Administrator Access Form
      </h1>
      <p className="form-subtitle">(SOX Control DIT-14: Production Access)</p>

      <form onSubmit={handleSubmit} className="server-form">
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
          {/* Centered row: Access + each checkbox */}
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

          {/* Blue underline separator */}
          <div
            style={{
              width: '100%',
              borderBottom: '2px solid #3498db',
              marginBottom: '1.2rem',
            }}
          ></div>

          {/* Two rows of inputs */}
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
          <button type="submit" className="submit-btn">Submit Request</button>
        </div>
      </form>
    </div>
  );
}

export default ServerForm;
