import React from 'react';
import { createPortal } from 'react-dom';

const UserNotFoundModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl border border-gray-200 dark:border-[#141429] bg-white dark:bg-[#0B0B1A] p-8 shadow-2xl flex flex-col items-center gap-6 z-10">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">User Not Found</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-gray-300 dark:border-[#141429] px-6 py-2.5 text-sm font-semibold text-gray-700 dark:text-white transition hover:bg-gray-100 dark:hover:bg-[#1a1a2e]"
        >
          Close
        </button>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default UserNotFoundModal;

