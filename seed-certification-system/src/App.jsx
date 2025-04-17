// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Profile from './Components/Profile';
import ForgotPassword from './Components/Auth/ForgotPassword';
import Verification from './Components/VerificationForm';
import Agency from './Components/Agencydashboard';
import Inspector from './Components/Inspectordashboard';
import Certificate from './Components/Certificate';
import CertificationForm from './Components/Certificateform';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verification/:role" element={<Verification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/agency" element={<Agency onLogout={() => window.location.href = '/login'} />} />
        <Route path="/inspector" element={<Inspector />} />
        <Route path="/certificate/:certificateId" element={<Certificate />} />
        <Route path="/certification" element={<CertificationForm />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;