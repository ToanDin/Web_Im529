import { useState } from 'react';

export function useAuthModel() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);

  const login = async (username, password) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        setAdminToken(data.token);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Authentication credentials failed.' };
      }
    } catch (err) {
      return { success: false, error: 'Could not contact the administration authentication API.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
  };

  return {
    adminToken,
    login,
    logout
  };
}
