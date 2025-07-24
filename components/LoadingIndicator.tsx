import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
    </div>
  );
};

export default LoadingIndicator;
