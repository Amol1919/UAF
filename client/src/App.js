import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ServerFormPage from './pages/ServerFormPage';
import ApplicationFormPage from './pages/ApplicationFormPage';
import { FormProvider } from './context/FormContext';
import './App.css';

function App() {
  return (
    <FormProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/server-form" element={<ServerFormPage />} />
            <Route path="/application-form" element={<ApplicationFormPage />} />
          </Routes>
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;