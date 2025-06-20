import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Banknote, ExternalLink, FileText, Phone, ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import SchemeApplicationForm from '@/components/SchemeApplicationForm';
import { useToast } from '@/hooks/use-toast';

const Schemes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [submittedApplications, setSubmittedApplications] = useState([]);

  // Load applications from localStorage on component mount
  useEffect(() => {
    const savedApplications = localStorage.getItem('schemeApplications');
    if (savedApplications) {
      setSubmittedApplications(JSON.parse(savedApplications));
    }
  }, []);

  // Save applications to localStorage whenever applications change
  useEffect(() => {
    localStorage.setItem('schemeApplications', JSON.stringify(submittedApplications));
  }, [submittedApplications]);

  const schemes = [
    {
      id: 1,
      name: 'Rythu Bharosa (AP)',
      state: 'Andhra Pradesh',
      amount: '₹13,500',
      period: 'per year',
      eligibility: [
        'Farmers with Rythu Card',
        'Up to 2.5 acres of land',
        'Andhra Pradesh residents',
        'Valid bank account required'
      ],
      benefits: [
        'Direct financial support',
        'Free quality seeds',
        'Crop loan waiver facility',
        'Agricultural insurance coverage'
      ],
      status: 'active',
      applicationProcess: 'Apply online at rytubharosa.ap.gov.in or visit nearest ward secretariat'
    },
    {
      id: 2,
      name: 'Rythu Bandhu',
      state: 'Telangana',
      amount: '₹10,000',
      period: 'per year',
      eligibility: [
        'Telangana farmers',
        'Land ownership',
        'Patta holders'
      ],
      benefits: [
        'Crop insurance',
        'Agricultural subsidy',
        'Free electricity'
      ],
      status: 'active',
      applicationProcess: 'Apply online at rytubandhu.telangana.gov.in or visit local agricultural officer'
    },
    {
      id: 3,
      name: 'PM-KISAN',
      state: 'Central Scheme',
      amount: '₹6,000',
      period: 'per year',
      eligibility: [
        'Up to 2 hectares',
        'Farmer families',
        'Aadhaar mandatory'
      ],
      benefits: [
        '3 installments',
        'DBT payments',
        'Crop cultivation support'
      ],
      status: 'active',
      applicationProcess: 'Apply online at pmkisan.gov.in or visit Common Service Center'
    },
    {
      id: 4,
      name: 'PM Fasal Bima',
      state: 'Central Scheme',
      amount: 'Variable',
      period: 'per season',
      eligibility: [
        'All farmers',
        'Mandatory for loan farmers',
        'Nomination required'
      ],
      benefits: [
        'Crop loss compensation',
        'Natural disaster coverage',
        'Low premium'
      ],
      status: 'active',
      applicationProcess: 'Apply through banks or insurance companies, visit pmfby.gov.in for details'
    }
  ];

  const handleApplyNow = (scheme) => {
    setSelectedScheme(scheme);
    setShowApplicationForm(true);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    setSelectedScheme(null);
  };

  const handleSubmitApplication = async (formData) => {
    console.log('Application submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new application record
    const newApplication = {
      id: Date.now(),
      schemeId: selectedScheme.id,
      schemeName: selectedScheme.name,
      applicantName: formData.fullName,
      submissionDate: new Date().toLocaleDateString(),
      status: 'pending', // pending, approved, rejected
      applicationNumber: `APP${Date.now().toString().slice(-6)}`
    };

    // Add to applications list
    setSubmittedApplications(prev => [...prev, newApplication]);
    
    toast({
      title: "Application Submitted Successfully!",
      description: `Your application for ${selectedScheme.name} has been submitted. Application Number: ${newApplication.applicationNumber}`,
    });
    
    handleCloseForm();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', text: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <Badge className={config.color}>
        {getStatusIcon(status)}
        <span className="ml-1">{config.text}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Government Schemes
          </h1>
          <p className="text-green-600">
            Government assistance schemes available for farmers
          </p>
        </div>

        {/* Schemes Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-blue-700 border-blue-300">
                    <Building2 className="w-3 h-3 mr-1" />
                    {scheme.state}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <CardTitle className="text-xl text-green-800">
                  {scheme.name}
                </CardTitle>
                <div className="flex items-center space-x-2 text-lg font-bold text-green-600">
                  <Banknote className="w-5 h-5" />
                  <span>{scheme.amount}</span>
                  <span className="text-sm text-gray-600">{scheme.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Eligibility */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Eligibility:
                  </h4>
                  <ul className="space-y-1">
                    {scheme.eligibility.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Benefits:
                  </h4>
                  <ul className="space-y-1">
                    {scheme.benefits.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application Process */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    How to Apply:
                  </h4>
                  <p className="text-xs text-gray-600">
                    {scheme.applicationProcess}
                  </p>
                </div>

                {/* Apply Button */}
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleApplyNow(scheme)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Application Status Section */}
        {submittedApplications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              My Applications
            </h2>
            <div className="space-y-4">
              {submittedApplications.map((application) => (
                <Card key={application.id} className="border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {application.schemeName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Applicant: {application.applicantName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Application Number: {application.applicationNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          Submitted: {application.submissionDate}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(application.status)}
                        {application.status === 'pending' && (
                          <p className="text-xs text-gray-500">
                            Processing time: 7-14 days
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 text-center">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Need Help?
              </h3>
              <p className="text-blue-600 mb-4">
                Learn more about scheme details and application process
              </p>
              <Button variant="outline" className="border-blue-300 text-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                Helpline: 1800-425-0691
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedScheme && (
        <SchemeApplicationForm
          scheme={selectedScheme}
          onClose={handleCloseForm}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
};

export default Schemes;
