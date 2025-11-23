import React, { createContext, useContext, useState, useCallback } from 'react';

const PreviewContext = createContext();

export const PreviewProvider = ({ children }) => {
  const [previewUserId, setPreviewUserId] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const setPreviewUser = useCallback((userId) => {
    if (userId && userId.trim()) {
      setPreviewUserId(userId.trim());
      setIsPreviewMode(true);
    }
  }, []);

  const clearPreview = useCallback(() => {
    setPreviewUserId(null);
    setIsPreviewMode(false);
  }, []);

  const value = {
    previewUserId,
    isPreviewMode,
    setPreviewUser,
    clearPreview,
  };

  return (
    <PreviewContext.Provider value={value}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
};

