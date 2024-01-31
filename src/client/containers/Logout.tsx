//this will display on logout
import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { clearCurrentUser, CurrentUserContext } from '../utils';

export default function Logout() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }).then(() => {
      setCurrentUser(null);
      clearCurrentUser();
      navigate('/');
    });
  }, []);

  return (
    <div>
      <p>Logging you out!</p>
    </div>
  );
}
