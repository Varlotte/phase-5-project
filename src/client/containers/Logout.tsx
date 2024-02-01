//this will display on logout
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../AuthProvider';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout().then(() => {
      navigate('/');
    });
  }, []);

  return (
    <div>
      <p>Logging you out!</p>
    </div>
  );
}
