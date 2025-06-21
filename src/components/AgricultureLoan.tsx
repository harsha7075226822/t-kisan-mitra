
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Banknote, 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  XCircle,
  User,
  Calendar,
  DollarSign,
  Building2,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoanProvider {
  id: string;
  name: string;
  logo: string;
  interestRate: string;
  maxAmount: string;
  processingTime: string;
  minCreditScore: string;
  features: string[];
  contactDetails: {
    phone: string;
    email: string;
    address: string;
  };
}

interface LoanApplication {
  id: string;
  fullName: string;
  aadhaarNumber: string;
  mobileNumber: string;
  loanPurpose: string;
  amountRequired: number;
  providerName: string;
  additionalComments: string;
  dateOfApplication: string;
  status: 'Under Review' | 'Approved' | 'Rejected';
}

const AgricultureLoan = () => {
  const [showProviders, setShowProviders] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showProviderDetails, setShowProviderDetails] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<LoanProvider | null>(null);
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    aadhaarNumber: '',
    mobileNumber: '',
    loanPurpose: '',
    amountRequired: '',
    additionalComments: ''
  });

  const loanProviders: LoanProvider[] = [
    {
      id: 'sbi',
      name: 'State Bank of India',
      logo: '🏛️',
      interestRate: '7.0% - 9.5%',
      maxAmount: '₹2,00,00,000',
      processingTime: '15-30 days',
      minCreditScore: '650+',
      features: ['No processing fees', 'Flexible repayment', 'Government backed', 'Quick approval'],
      contactDetails: {
        phone: '1800-11-2211',
        email: 'agriloan@sbi.co.in',
        address: 'SBI Agricultural Finance Branch, Hyderabad'
      }
    },
    {
      id: 'hdfc',
      name: 'HDFC Bank',
      logo: '🏦',
      interestRate: '8.5% - 11.0%',
      maxAmount: '₹1,50,00,000',
      processingTime: '7-21 days',
      minCreditScore: '700+',
      features: ['Digital application', 'Quick disbursement', 'Minimal documentation', 'Crop insurance'],
      contactDetails: {
        phone: '1800-266-4332',
        email: 'agri@hdfcbank.com',
        address: 'HDFC Bank Agricultural Division, Mumbai'
      }
    },
    {
      id: 'icici',
      name: 'ICICI Bank',
      logo: '🏢',
      interestRate: '8.0% - 10.5%',
      maxAmount: '₹1,75,00,000',
      processingTime: '10-25 days',
      minCreditScore: '680+',
      features: ['Online tracking', 'Competitive rates', 'Equipment financing', 'Seasonal loans'],
      contactDetails: {
        phone: '1800-103-3333',
        email: 'agriculture@icicibank.com',
        address: 'ICICI Bank Rural Banking Unit, Bangalore'
      }
    },
    {
      id: 'pnb',
      name: 'Punjab National Bank',
      logo: '🏪',
      interestRate: '7.5% - 9.0%',
      maxAmount: '₹1,25,00,000',
      processingTime: '20-35 days',
      minCreditScore: '600+',
      features: ['Low interest rates', 'Subsidy support', 'Rural focus', 'Easy eligibility'],
      contactDetails: {
        phone: '1800-180-2222',
        email: 'agrifinance@pnb.co.in',
        address: 'PNB Agricultural Credit Department, Delhi'
      }
    }
  ];

  const loanPurposes = [
    'Crop Loan',
    'Equipment Loan',
    'Land Purchase',
    'Irrigation Setup',
    'Livestock Purchase',
    'Farm Improvement',
    'Seed & Fertilizer Purchase'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = (provider: LoanProvider) => {
    setSelectedProvider(provider);
    setShowApplicationForm(true);
    setShowProviders(false);
  };

  const handleViewDetails = (provider: LoanProvider) => {
    setSelectedProvider(provider);
    setShowProviderDetails(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.aadhaarNumber || !formData.mobileNumber || 
        !formData.loanPurpose || !formData.amountRequired || !selectedProvider) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newApplication: LoanApplication = {
      id: `LOAN${Date.now()}`,
      ...formData,
      amountRequired: parseFloat(formData.amountRequired),
      providerName: selectedProvider.name,
      dateOfApplication: new Date().toLocaleDateString('en-IN'),
      status: 'Under Review'
    };

    setApplication(newApplication);
    setShowApplicationForm(false);
    setShowProviders(false);
    setFormData({
      fullName: '',
      aadhaarNumber: '',
      mobileNumber: '',
      loanPurpose: '',
      amountRequired: '',
      additionalComments: ''
    });

    toast({
      title: "Application Submitted Successfully!",
      description: `Your loan application has been submitted to ${selectedProvider.name}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Agriculture Loan Service Card */}
      <Card className="hover:shadow-lg transition-all duration-200 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Banknote className="w-8 h-8 text-white" />
          </div>
          <h4 className="font-bold text-gray-900 mb-2 text-lg">
            Agriculture Loan
          </h4>
          <p className="text-sm text-gray-500 mb-4">
            Loans and credit support for farmers
          </p>
          <Button 
            onClick={() => setShowProviders(true)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            View Loan Providers
          </Button>
        </CardContent>
      </Card>

      {/* Loan Application Status */}
      {application && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              🔔 Your Loan Application Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Applicant Name:</span>
                  <span className="font-medium">{application.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Loan Type:</span>
                  <span className="font-medium">{application.loanPurpose}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Bank/Provider:</span>
                  <span className="font-medium">{application.providerName}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Date Applied:</span>
                  <span className="font-medium">{application.dateOfApplication}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Amount:</span>
                  <span className="font-medium">₹{application.amountRequired.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(application.status)}
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loan Providers Modal */}
      <Dialog open={showProviders} onOpenChange={setShowProviders}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agriculture Loan Providers</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanProviders.map((provider) => (
              <Card key={provider.id} className="border border-gray-200 hover:shadow-lg transition-all">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{provider.logo}</div>
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-sm text-gray-600">Agricultural Finance</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Interest Rate:</span>
                      <p className="font-medium text-green-600">{provider.interestRate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Max Amount:</span>
                      <p className="font-medium">{provider.maxAmount}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Processing Time:</span>
                      <p className="font-medium">{provider.processingTime}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Min Credit Score:</span>
                      <p className="font-medium">{provider.minCreditScore}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600 block mb-2">Key Features:</span>
                    <div className="flex flex-wrap gap-1">
                      {provider.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => handleApply(provider)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      Apply Now
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewDetails(provider)}
                      className="flex-1"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Form Modal */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Agriculture Loan Application - {selectedProvider?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                <Input
                  id="aadhaarNumber"
                  type="number"
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  placeholder="Enter 12-digit Aadhaar number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobileNumber">Mobile Number *</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="amountRequired">Amount Required (₹) *</Label>
                <Input
                  id="amountRequired"
                  type="number"
                  value={formData.amountRequired}
                  onChange={(e) => handleInputChange('amountRequired', e.target.value)}
                  placeholder="Enter loan amount"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="loanPurpose">Loan Purpose *</Label>
              <select
                id="loanPurpose"
                value={formData.loanPurpose}
                onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select loan purpose</option>
                {loanPurposes.map((purpose) => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="landOwnership">Land Ownership Proof Upload</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>

            <div>
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                placeholder="Any additional information..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                📤 Submit Application
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowApplicationForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Provider Details Modal */}
      <Dialog open={showProviderDetails} onOpenChange={setShowProviderDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-2xl">{selectedProvider?.logo}</span>
              {selectedProvider?.name} - Loan Details
            </DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Loan Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-medium text-green-600">{selectedProvider.interestRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maximum Amount:</span>
                        <span className="font-medium">{selectedProvider.maxAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Time:</span>
                        <span className="font-medium">{selectedProvider.processingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min Credit Score:</span>
                        <span className="font-medium">{selectedProvider.minCreditScore}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <ul className="space-y-1 text-sm">
                      {selectedProvider.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-600" />
                      <span>{selectedProvider.contactDetails.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span>{selectedProvider.contactDetails.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                      <span>{selectedProvider.contactDetails.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Required Documents</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">📄 Aadhaar Card</div>
                  <div className="bg-gray-50 p-2 rounded">📄 PAN Card</div>
                  <div className="bg-gray-50 p-2 rounded">📄 Land Documents</div>
                  <div className="bg-gray-50 p-2 rounded">📄 Income Certificate</div>
                  <div className="bg-gray-50 p-2 rounded">📄 Bank Statements</div>
                  <div className="bg-gray-50 p-2 rounded">📷 Passport Photos</div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={() => {
                    setShowProviderDetails(false);
                    handleApply(selectedProvider);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Apply for Loan
                </Button>
                <Button variant="outline" onClick={() => setShowProviderDetails(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgricultureLoan;
