
import React from 'react';
import GovernmentAnalytics from '@/components/GovernmentAnalytics';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Government Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">State-wide agricultural insights for policy making and resource allocation</p>
        </div>
        <GovernmentAnalytics />
      </div>
    </div>
  );
};

export default Analytics;
