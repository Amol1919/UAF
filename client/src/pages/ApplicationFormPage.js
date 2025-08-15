import React, { useEffect } from 'react';
import AccessForm from '../components/AccessForm';
import { useFormContext } from '../context/FormContext';

function ApplicationFormPage() {
  const { updateFormData } = useFormContext();

  // Remove updateFormData from dependencies
  useEffect(() => {
    updateFormData({ 
      type: 'application',
      serverName: '' 
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
    <div className="application-form-page">
      <AccessForm />
    </div>
  );
}

export default ApplicationFormPage;