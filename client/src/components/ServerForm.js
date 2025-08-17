import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import SignaturePad from './SignaturePad';
import '../pages/ServerFormPage.css';

function ServerForm() {
  const { formData, updateFormData } = useFormContext();
  const [signatureData, setSignatureData] = useState({
    requestedBy: null,
    approvedBy: null,
    itAdmin: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSignatureSave = (signature, type) => {
    setSignatureData(prev => ({ ...prev, [type]: signature }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare form data with signatures
    const formSubmission = {
      ...formData,
      signatures: signatureData
    };
    
    console.log('Form submitted:', formSubmission);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="server-form-container">
      <h1 className="form-title">ROMS Production Server Windows Administrator Access Form</h1>
      <p className="form-subtitle">(SOX Control DIT-14: Production Access)</p>
      
      <form onSubmit={handleSubmit} className="server-form">
        {/* General Information */}
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
        
        {/* Access Section */}
        <div className="form-section">
          <h2 className="section-title">Access: ADD/Edit/Disable-Account</h2>
          
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
              <label>Access Level</label>
              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select Access Level</option>
                <option value="Full Administrative Access">Full Administrative Access</option>
                <option value="Read-Only Access">Read-Only Access</option>
                <option value="Limited Access">Limited Access</option>
              </select>
            </div>
            
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
        
        {/* Requested By Section */}
        <div className="form-section">
          <h2 className="section-title">Requested By:</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="requestedByName"
                value={formData.requestedByName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="requestedByTitle"
                value={formData.requestedByTitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Signature</label>
            <SignaturePad 
              onSave={(signature) => handleSignatureSave(signature, 'requestedBy')}
            />
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="requestedByDate"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        {/* Approved By Section */}
        <div className="form-section">
          <h2 className="section-title">Approved By:</h2>
          
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
            <SignaturePad 
              onSave={(signature) => handleSignatureSave(signature, 'approvedBy')}
            />
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="approvedByDate"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        {/* IT Section */}
        <div className="form-section">
          <h2 className="section-title">IT (Server Administrator):</h2>
          
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
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>Signature</label>
            <SignaturePad 
              onSave={(signature) => handleSignatureSave(signature, 'itAdmin')}
            />
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="itAdminDate"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Request</button>
        </div>
      </form>
    </div>
  );
}

export default ServerForm;