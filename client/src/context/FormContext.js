import React, { createContext, useState, useContext } from 'react';

// Create context for form data
const FormContext = createContext();

// Create provider component
export function FormProvider({ children }) {
  // Initialize state with both existing and new fields
  const [formData, setFormData] = useState({
    // Existing fields for both forms
    type: '', // 'server' or 'application'
    name: '',
    email: '',
    department: '',
    justification: '',
    
    // Existing specific fields
    serverName: '', // Used by both forms but more important for server
    appName: '',    // Used by application form
    
    // New fields for server form
    jobTitle: '',
    ipAddress: '',
    accessLevel: '',
    ipgapLogin: '',
    hrActivation: '',
    requestedByName: '',
    requestedByTitle: '',
    requestedByDate: '',
    approvedByName: '',
    approvedByTitle: '',
    approvedByDate: '',
    itRole: '',
    itName: '',
    itDate: '',
    remarks: '',
    
    // Signature fields
    requestedBySignature: null,
    approvedBySignature: null,
    itAdminSignature: null
  });

  // Function to update form data
  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      type: '',
      name: '',
      email: '',
      department: '',
      justification: '',
      serverName: '',
      appName: '',
      jobTitle: '',
      ipAddress: '',
      accessLevel: '',
      ipgapLogin: '',
      hrActivation: '',
      requestedByName: '',
      requestedByTitle: '',
      requestedByDate: '',
      approvedByName: '',
      approvedByTitle: '',
      approvedByDate: '',
      itRole: '',
      itName: '',
      itDate: '',
      remarks: '',
      requestedBySignature: null,
      approvedBySignature: null,
      itAdminSignature: null
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

// Custom hook to use form context
export const useFormContext = () => useContext(FormContext);

export default FormContext;