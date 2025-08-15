import React, { createContext, useState, useContext } from 'react';

// Create context for form data
const FormContext = createContext();

// Create provider component
export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    type: '', // 'server' or 'application'
    name: '',
    email: '',
    department: '',
    justification: '',
    // Server-specific field
    serverName: '',
    // Application-specific field
    appName: ''
  });

  // Function to update form data
  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}

// Custom hook to use form context
export const useFormContext = () => useContext(FormContext);

export default FormContext;