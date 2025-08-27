// src/pages/ApplicationFormPage.js
import React, { useEffect } from 'react';
import { useFormContext } from '../context/FormContext';
import ApplicationForm from '../components/ApplicationForm';
import './ServerFormPage.css'; // reuse the same styles

function ApplicationFormPage() {
  const { resetForm, updateFormData } = useFormContext();

  useEffect(() => {
    resetForm();
    updateFormData({ type: 'application' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="server-form-page">
      <ApplicationForm />
    </div>
  );
}

export default ApplicationFormPage;
