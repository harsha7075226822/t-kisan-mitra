
import React from 'react';
import { Phone } from 'lucide-react';

const FooterSection: React.FC = () => {
  return (
    <div className="mt-8 sm:mt-12 text-center border-t border-gray-200 pt-6 sm:pt-8">
      <div className="text-sm text-gray-600 space-y-2">
        <p className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          Help Helpline: 1800-XXX-XXXX (Toll Free)
        </p>
        <p className="flex items-center justify-center gap-2">
          <span>🌐</span>
          Support: support@kisanmitra.telangana.gov.in
        </p>
        <p className="text-xs text-gray-500 px-4">
          An initiative by Government of Telangana
        </p>
      </div>
    </div>
  );
};

export default FooterSection;
