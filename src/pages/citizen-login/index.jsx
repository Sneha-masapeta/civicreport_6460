import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';

const CitizenLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/citizen-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Main Card */}
          <div className="bg-card border border-border rounded-xl civic-shadow-lg p-6 sm:p-8">
            <WelcomeHeader />
            <LoginForm />
          </div>
          
          {/* Trust Signals */}
          <TrustSignals />
        </div>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} City of Cityname. All rights reserved. | 
          <a href="#" className="hover:text-primary ml-1">Privacy Policy</a> | 
          <a href="#" className="hover:text-primary ml-1">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default CitizenLogin;