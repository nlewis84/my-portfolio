import React, { memo } from 'react';

const LoadingSpinner = memo(() => {
  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      role="status"
      aria-label="Loading content"
    >
      <div 
        className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"
        aria-hidden="true"
      />
      <span className="sr-only">Loading content...</span>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner; 