import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

const withAdminGuard = (Component) => {
  const Guarded = (props) => {
    const location = useLocation();
    const { isAdmin } = useAdminAuth();
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
    }
    return <Component {...props} />;
  };
  return Guarded;
};

export default withAdminGuard;





