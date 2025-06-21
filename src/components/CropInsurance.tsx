
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Shield, Check, ArrowRight } from 'lucide-react';
import CropInsuranceForm from '@/components/CropInsuranceForm';

interface InsuranceScheme {
  id: string;
  name: string;
  provider: string;
  icon: string;
  color: string;
  coverage: string[];
  benefits: string[];
  features: string[];
}

const CropInsurance = () => {
  const [selectedScheme, setSelectedScheme] = useState<InsuranceScheme | null>(null);
  const [showForm, setShowForm] = useState(false);

  const insuranceSchemes: InsuranceScheme[] = [
    {
      id: 'icici-lombard',
      name: 'ICICI Lombard Agri Plan',
      provider: 'ICICI Lombard',
      icon: '🏛️',
      color: 'bg-orange-500',
      coverage: ['Crop yield loss', 'Weather damage', 'Fire & lightning', 'Pest & disease'],
      benefits: ['Up to ₹2 lakh coverage', 'Quick claim settlement', '24/7 support'],
      features: ['Monsoon protection', 'Drought coverage', 'Hail storm protection']
    },
    {
      id: 'hdfc-ergo',
      name: 'HDFC ERGO Farm Protect',
      provider: 'HDFC ERGO',
      icon: '🏢',
      color: 'bg-blue-600',
      coverage: ['Natural calamities', 'Prevented sowing', 'Post-harvest losses', 'Wild animal attack'],
      benefits: ['Up to ₹3 lakh coverage', '30-day claim processing', 'Premium discounts'],
      features: ['Satellite monitoring', 'Digital claim process', 'Multi-crop coverage']
    },
    {
      id: 'iffco-tokio',
      name: 'IFFCO Tokio Crop Shield',
      provider: 'IFFCO Tokio',
      icon: '🛡️',
      color: 'bg-green-600',
      coverage: ['Cyclone damage', 'Flood protection', 'Unseasonal rainfall', 'Landslide damage'],
      benefits: ['Up to ₹5 lakh coverage', 'Farmer-friendly terms', 'Regional expertise'],
      features: ['Village-level assessment', 'Quick surveys', 'Local language support']
    },
    {
      id: 'bajaj-allianz',
      name: 'Bajaj Allianz Krishi Cover',
      provider: 'Bajaj Allianz',
      icon: '⚡',
      color: 'bg-red-500',
      coverage: ['Fire & lightning', 'Storm & tempest', 'Flood & inundation', 'Drought'],
      benefits: ['Up to ₹4 lakh coverage', 'Flexible premium', 'Easy documentation'],
      features: ['Mobile app claims', 'GPS tracking', 'Weather alerts']
    },
    {
      id: 'reliance-general',
      name: 'Reliance General Farm Guard',
      provider: 'Reliance General',
      icon: '🔒',
      color: 'bg-purple-600',
      coverage: ['Yield losses', 'Quality deterioration', 'Price volatility', 'Input cost protection'],
      benefits: ['Up to ₹6 lakh coverage', 'Comprehensive protection', 'Expert guidance'],
      features: ['Technology-driven', 'Real-time monitoring', 'Customizable plans']
    }
  ];

  const handleApplyNow = (scheme: InsuranceScheme) => {
    setSelectedScheme(scheme);
    setShowForm(true);
  };

  const handleBackToSchemes = () => {
    setShowForm(false);
    setSelectedScheme(null);
  };

  if (showForm && selectedScheme) {
    return (
      <CropInsuranceForm 
        selectedScheme={selectedScheme} 
        onBack={handleBackToSchemes}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Apply for Crop Insurance
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Protect your crops with comprehensive insurance coverage from trusted private providers. 
          Choose the plan that best suits your farming needs.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Check className="w-5 h-5 text-green-600 mr-2" />
          Why Choose Private Crop Insurance?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Quick Claims</h4>
              <p className="text-sm text-gray-600">Faster claim settlement compared to government schemes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Comprehensive Coverage</h4>
              <p className="text-sm text-gray-600">Protection against multiple risks and perils</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Expert Support</h4>
              <p className="text-sm text-gray-600">Dedicated customer service and technical assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insuranceSchemes.map((scheme) => (
          <Card 
            key={scheme.id} 
            className="hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-teal-300"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-12 h-12 ${scheme.color} rounded-full flex items-center justify-center text-2xl`}>
                  {scheme.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 leading-tight">
                    {scheme.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{scheme.provider}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-teal-700 border-teal-300 w-fit">
                Private Insurance
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Coverage */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Coverage Includes:</h4>
                <div className="space-y-1">
                  {scheme.coverage.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                  {scheme.coverage.length > 3 && (
                    <p className="text-xs text-gray-500 ml-5">
                      +{scheme.coverage.length - 3} more coverages
                    </p>
                  )}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                <div className="space-y-1">
                  {scheme.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <ArrowRight className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <Button 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => handleApplyNow(scheme)}
              >
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Support Information */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help Choosing?</h3>
        <p className="text-gray-600 mb-4">
          Our insurance experts are available to help you select the best crop insurance plan for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="border-teal-300 text-teal-600">
            📞 Call Expert: 1800-XXX-XXXX
          </Button>
          <Button variant="outline" className="border-teal-300 text-teal-600">
            💬 WhatsApp Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CropInsurance;
