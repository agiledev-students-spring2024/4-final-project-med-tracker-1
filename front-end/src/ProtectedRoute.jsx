import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const [status, setStatus] = useState('loading'); // 'loading', 'authenticated', 'unauthenticated'

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus('unauthenticated');
        return;
      }

      try {
        // Adjust the URL to your backend verification endpoint
        const response = await fetch('/api/verify-token', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        setStatus('authenticated');
      } catch (error) {
        console.error('Error during token verification:', error);
        setStatus('unauthenticated');
      }
    };

    verifyToken();
  }, [location]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return status === 'authenticated' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
