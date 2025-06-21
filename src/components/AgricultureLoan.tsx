
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
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoanApplication {
  id: string;
  fullName: string;
  aadhaarNumber: string;
  mobileNumber: string;
  loanPurpose: string;
  amountRequired: number;
  preferredBank: string;
  additionalComments: string;
  dateOfApplication: string;
  status: 'Under Review' | 'Approved' | 'Rejected';
}

const AgricultureLoan = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    aadhaarNumber: '',
    mobileNumber: '',
    loanPurpose: '',
    amountRequired: '',
    preferredBank: '',
    additionalComments: ''
  });

  const loanPurposes = [
    'Crop Loan',
    'Equipment Loan',
    'Land Purchase',
    'Irrigation Setup',
    'Livestock Purchase',
    'Farm Improvement',
    'Seed & Fertilizer Purchase'
  ];

  const banks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Punjab National Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Union Bank of India'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.aadhaarNumber || !formData.mobileNumber || 
        !formData.loanPurpose || !formData.amountRequired || !formData.preferredBank) {
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
      dateOfApplication: new Date().toLocaleDateString('en-IN'),
      status: 'Under Review'
    };

    setApplication(newApplication);
    setShowApplicationForm(false);
    setFormData({
      fullName: '',
      aadhaarNumber: '',
      mobileNumber: '',
      loanPurpose: '',
      amountRequired: '',
      preferredBank: '',
      additionalComments: ''
    });

    toast({
      title: "Application Submitted Successfully!",
      description: "Your loan application has been submitted for review.",
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
      {/* Agriculture Loan Service Card */}
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
          <div className="space-y-2">
            <Button 
              onClick={() => setShowApplicationForm(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Apply Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowDetails(true)}
              className="w-full border-green-300 text-green-700 hover:bg-green-50"
            >
              View Details
            </Button>
          </div>
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
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Date of Application:</span>
                  <span className="font-medium">{application.dateOfApplication}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Requested Amount:</span>
                  <span className="font-medium">₹{application.amountRequired.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(application.status)}
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Application ID:</span>
                  <span className="font-mono text-sm font-medium">{application.id}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Application Form Modal */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agriculture Loan Application</DialogTitle>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="preferredBank">Preferred Bank *</Label>
                <select
                  id="preferredBank"
                  value={formData.preferredBank}
                  onChange={(e) => handleInputChange('preferredBank', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select preferred bank</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
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

      {/* Loan Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agriculture Loan Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Types of Agriculture Loans</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loanPurposes.map((type) => (
                  <div key={type} className="border rounded-lg p-3">
                    <h4 className="font-medium">{type}</h4>
                    <p className="text-sm text-gray-600">Specialized financing for {type.toLowerCase()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Eligibility Criteria</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Must be a resident of India</li>
                <li>Age between 18-65 years</li>
                <li>Own or lease agricultural land</li>
                <li>Valid Aadhaar and PAN card</li>
                <li>Land ownership/lease documents</li>
                <li>Income proof from agriculture activities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Interest Rates & Terms</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Interest Rate:</strong><br />
                    7% - 12% per annum
                  </div>
                  <div>
                    <strong>Loan Amount:</strong><br />
                    ₹10,000 - ₹2,00,00,000
                  </div>
                  <div>
                    <strong>Repayment Period:</strong><br />
                    1 - 20 years
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Required Documents</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Aadhaar Card</li>
                <li>PAN Card</li>
                <li>Land ownership documents</li>
                <li>Income certificate</li>
                <li>Bank statements (last 6 months)</li>
                <li>Passport size photographs</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Supported Banks</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {banks.map((bank) => (
                  <div key={bank} className="bg-gray-50 p-2 rounded text-center">
                    {bank}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgricultureLoan;
