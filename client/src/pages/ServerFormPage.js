import React, { useEffect } from 'react';
import { useFormContext } from '../context/FormContext';
import ServerForm from '../components/ServerForm';
import './ServerFormPage.css';

function ServerFormPage() {
  const { resetForm } = useFormContext();

  useEffect(() => {
    // Reset form when component mounts
    resetForm();
    
    return () => {
      // Cleanup if needed
    };
  }, [resetForm]);

  return (
    <div className="server-form-page">
      <ServerForm />
    </div>
  );
}

export default ServerFormPage;