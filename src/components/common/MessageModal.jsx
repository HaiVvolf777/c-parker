import React from 'react';

const MessageModal = ({ isOpen, onClose, type = 'success', message = '' }) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-[#141429] bg-white dark:bg-[#0B0B1A] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isSuccess ? 'Success' : isError ? 'Error' : 'Message'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition text-2xl leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {isSuccess && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-emerald-500 dark:text-emerald-400">
                {message || 'Operation completed successfully!'}
              </p>
            </div>
          )}

          {isError && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-red-500 dark:text-red-400">
                {message || 'An error occurred. Please try again.'}
              </p>
            </div>
          )}

          {!isSuccess && !isError && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {message || 'Message'}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isSuccess
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : isError
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-[#6F23D5] hover:bg-[#5a1fb8] text-white'
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;

