import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cparker_admin_auth_v1';
const DEFAULT_PASSWORD = 'admin123'; // TODO: replace with env/secure backend in production

const AdminAuthContext = createContext({
  isAdmin: false,
  login: async (_password) => false,
  logout: () => {},
});

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw)?.isAdmin === true : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAdmin }));
    } catch {
      // ignore
    }
  }, [isAdmin]);

  const login = async (password) => {
    // demo-only check
    const ok = password === DEFAULT_PASSWORD;
    if (ok) setIsAdmin(true);
    return ok;
  };

  const logout = () => setIsAdmin(false);

  const value = useMemo(() => ({ isAdmin, login, logout }), [isAdmin]);

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => useContext(AdminAuthContext);




