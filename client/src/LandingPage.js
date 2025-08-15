// src/LandingPage.js
import React from 'react';
import './LandingPage.css';
import serverIcon from './assets/icons/server.png';
import applicationIcon from './assets/icons/application.png';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="header">
        <h1>Agency Access Request Form</h1>
      </div>
      
      <div className="access-options">
        <div className="option-card">
          <img src={serverIcon} alt="Server" className="option-icon" />
          <h2>Server</h2>
          <p>Manage and request</p>
          <p className="subtext">server-level permissions</p>
          <button className="access-btn">Access Form</button>
        </div>
        
        <div className="option-card">
          <img src={applicationIcon} alt="Application" className="option-icon" />
          <h2>Application</h2>
          <p>Manage and request</p>
          <p className="subtext">app-level permissions</p>
          <button className="access-btn">Access Form</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;