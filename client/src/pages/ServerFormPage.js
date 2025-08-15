import React, { useEffect } from 'react';
import AccessForm from '../components/AccessForm';
import { useFormContext } from '../context/FormContext';

function ServerFormPage() {
  const { updateFormData } = useFormContext();

  // Remove updateFormData from dependencies
  useEffect(() => {
    updateFormData({ 
      type: 'server',
      appName: '' 
    });
    
    // Cleanup on unmount
    return () => {
      updateFormData({
        type: '',
        serverName: '',
        appName: ''
      });
    };
  }, []); // Empty dependency array = run only once

  return (
    <div className="server-form-page">
      <AccessForm />
    </div>
  );
}

export default ServerFormPage;