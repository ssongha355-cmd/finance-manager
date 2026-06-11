import React from 'react';

export const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-teal-400 rounded-full animate-spin"></div>
        <p className="mt-3 text-sm text-slate-400">កំពុងផ្ទុក...</p>
    </div>
);
