import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useProgress } from '../../../context/ProgressContext.jsx';

const withProgressGuard = (Component) => {
  const Guarded = (props) => {
    const location = useLocation();
    const { purchased } = useProgress();
    if (!purchased) {
      return <Navigate to="/purchase" replace state={{ from: location.pathname }} />;
    }
    return <Component {...props} />;
  };
  return Guarded;
};

export default withProgressGuard;


