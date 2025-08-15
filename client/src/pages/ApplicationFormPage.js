import React, { useEffect } from 'react';
import AccessForm from '../components/AccessForm';
import { useFormContext } from '../context/FormContext';

function ApplicationFormPage() {
  const { updateFormData } = useFormContext();

  // Set form type to 'application' when component mounts
  useEffect(() => {
    updateFormData({ 
      type: 'application',
      // Reset server-specific field
      serverName: '' 
    });
  }, [updateFormData]);

  return (
    <div className="application-form-page">
      <AccessForm />
    </div>
  );
}

export default ApplicationFormPage;