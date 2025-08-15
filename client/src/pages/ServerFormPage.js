import React, { useEffect } from 'react';
import AccessForm from '../components/AccessForm';
import { useFormContext } from '../context/FormContext';

function ServerFormPage() {
  const { updateFormData } = useFormContext();

  // Set form type to 'server' when component mounts
  useEffect(() => {
    updateFormData({ 
      type: 'server',
      // Reset application-specific field
      appName: '' 
    });
  }, [updateFormData]);

  return (
    <div className="server-form-page">
      <AccessForm />
    </div>
  );
}

export default ServerFormPage;