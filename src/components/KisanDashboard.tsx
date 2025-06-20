
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import HealYourCrop from '@/components/HealYourCrop';
import ManageFields from '@/components/ManageFields';
import MarketCards from '@/components/MarketCards';
import FloatingVoiceButton from '@/components/FloatingVoiceButton';
import WelcomeSection from '@/components/WelcomeSection';
import ServicesGrid from '@/components/ServicesGrid';
import FooterSection from '@/components/FooterSection';

const KisanDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeDashboard = async () => {
      try {
        // Get user data from localStorage
        const userData = localStorage.getItem('kisanUser');
        if (userData && mounted) {
          setUser(JSON.parse(userData));
        }
        
        if (mounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Dashboard initialization error:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  if (!user) {
    return <WelcomeSection user={user} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Welcome Section */}
        <WelcomeSection user={user} />

        {/* Heal Your Crop Section */}
        <HealYourCrop />

        {/* Manage Fields Section */}
        <ManageFields />

        {/* Services Section */}
        <ServicesGrid />

        {/* Agricultural Markets Section */}
        <div className="mb-6 sm:mb-8">
          <MarketCards />
        </div>

        {/* Footer */}
        <FooterSection />
      </div>

      {/* Floating Voice Assistant Button */}
      <FloatingVoiceButton />
    </div>
  );
};

export default KisanDashboard;
