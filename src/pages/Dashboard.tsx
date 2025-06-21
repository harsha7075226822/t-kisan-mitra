
import React, { useEffect } from 'react';
import KisanDashboard from '@/components/KisanDashboard';
import { useNotificationTriggers } from '@/hooks/useNotificationTriggers';

const Dashboard = () => {
  // Initialize notification triggers
  useNotificationTriggers();

  return <KisanDashboard />;
};

export default Dashboard;
