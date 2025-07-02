
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatusPage from '../components/StatusPage';
import { toastSuccess, toastError } from '../components/CustomToast';

const Status = () => {
  // Simulate login status check on page load
  useEffect(() => {
    // This would typically come from your authentication system
    const checkLoginStatus = () => {
      const isLoggedIn = Math.random() > 0.5; // Random for demo
      
      if (isLoggedIn) {
        toastSuccess('Login Successful', 'Welcome back! You are now logged in.');
      } else {
        toastError('Login Failed', 'Unable to authenticate. Please try again.');
      }
    };

    // Simulate a delay for checking login status
    const timer = setTimeout(checkLoginStatus, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <Header />
      <main className="flex-1">
        <StatusPage />
      </main>
      <Footer />
    </div>
  );
};

export default Status;
