import React from 'react';
import './AccessForm.css';
import { useFormContext } from '../context/FormContext';

function AccessForm() {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="form-container">
      <h2>{formData.type === 'server' ? 'Server' : 'Application'} Access Request</h2>
      
      <form onSubmit={handleSubmit} className="access-form">
        {/* Common fields */}
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
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

        <div className="form-group">
          <label>Justification</label>
          <textarea 
            name="justification" 
            value={formData.justification} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Server-specific field */}
        {formData.type === 'server' && (
          <div className="form-group">
            <label>Server Name/IP</label>
            <input 
              type="text" 
              name="serverName" 
              value={formData.serverName} 
              onChange={handleChange} 
              required 
            />
          </div>
        )}

        {/* Application-specific field */}
        {formData.type === 'application' && (
          <div className="form-group">
            <label>Application Name</label>
            <input 
              type="text" 
              name="appName" 
              value={formData.appName} 
              onChange={handleChange} 
              required 
            />
          </div>
        )}

        <button type="submit" className="submit-btn">Submit Request</button>
      </form>
    </div>
  );
}

export default AccessForm;