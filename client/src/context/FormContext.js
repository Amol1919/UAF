// src/context/FormContext.js
import React, { createContext, useState, useContext } from 'react';

// ---- Centralized initial state so resetForm can reuse it ----
const initialState = {
  // Flow
  type: '', // 'server' | 'application'

  // Common user info (support both 'name' and 'userName' for compatibility)
  name: '',
  userName: '',
  jobTitle: '',
  email: '',
  department: '',

  // Selection (ServerForm uses 'application'; AccessForm uses 'appName')
  agency: '',
  application: '',   // used by Server/Application pages & icons
  appName: '',       // kept for AccessForm.js compatibility

  // Server-only fields
  serverName: '',
  ipAddress: '',
  ipgapLogin: '',
  hrActivation: '',
  hrAction: '',         // '', 'Activation', or 'De-activation'
  hrDate: '',           // 'YYYY-MM-DD' from <input type="date"> 

  // Application-only fields (new, optional)
  appUserName: '',
  appRole: '',
  appModule: '',
  appEnv: '',

  // Shared
  justification: '',
  accessLevel: [],   // IMPORTANT: array, not string
  remarks: '',

  // Approvals / Admin
  approvedByName: '',
  approvedByTitle: '',
  approvedByDate: '',
  itRole: '',
  itName: '',
  itAdminDate: '',   // matches <input name="itAdminDate" ...> in ServerForm

  // Signatures
  requestedBySignature: null,
  approvedBySignature: null,
  itAdminSignature: null,
};

// Create context for form data
const FormContext = createContext();

// Provider
export function FormProvider({ children }) {
  const [formData, setFormData] = useState(initialState);

  // Shallow-merge updates
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Reset to initial state
  const resetForm = () => setFormData(initialState);

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

// Hook
export const useFormContext = () => useContext(FormContext);

export default FormContext;
