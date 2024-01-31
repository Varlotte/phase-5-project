//this will display on logout
import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: use firebase to log out
    fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(() => {
      navigate('/');
    });
  }, []);

  return (
    <div>
      <p>Logging you out!</p>
    </div>
  );
}
