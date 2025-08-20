import React, { useEffect } from 'react';
import { useFormContext } from '../context/FormContext';
import ServerForm from '../components/ServerForm';
import './ServerFormPage.css';

function ServerFormPage() {
  const { resetForm } = useFormContext();

 useEffect(() => {
  resetForm();            // run only once when the page mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className="server-form-page">
      <ServerForm />
    </div>
  );
}

export default ServerFormPage;