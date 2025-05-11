import React from 'react';
import { Monitor } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <Monitor className="w-16 h-16 text-red-600 animate-spin mx-auto mb-4" />
        <div className="relative h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-red-600 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};