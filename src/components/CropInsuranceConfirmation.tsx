
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Download, Printer, MessageCircle, ArrowLeft } from 'lucide-react';

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

interface CropInsuranceConfirmationProps {
  applicationId: string;
  selectedScheme: InsuranceScheme;
  onNewApplication: () => void;
}

const CropInsuranceConfirmation: React.FC<CropInsuranceConfirmationProps> = ({
  applicationId,
  selectedScheme,
  onNewApplication
}) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDownloadReceipt = () => {
    // Create a simple receipt content
    const receiptContent = `
      CROP INSURANCE APPLICATION RECEIPT
      ===================================
      
      Application ID: ${applicationId}
      Scheme: ${selectedScheme.name}
      Provider: ${selectedScheme.provider}
      Submitted on: ${currentDate}
      Status: Application Submitted
      
      Next Steps:
      1. Document verification will be completed within 3 business days
      2. Premium payment instructions will be sent via SMS
      3. Policy documents will be shared after payment confirmation
      
      Contact Support:
      Email: claims@${selectedScheme.provider.toLowerCase().replace(' ', '')}.com
      Phone: 1800-XXX-XXXX
      
      Thank you for choosing ${selectedScheme.provider}!
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crop-insurance-receipt-${applicationId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintReceipt = () => {
    const printContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; border-bottom: 2px solid #0f766e; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #0f766e; margin: 0;">Crop Insurance Application</h1>
          <h2 style="color: #0f766e; margin: 10px 0;">Application Submitted Successfully</h2>
        </div>
        
        <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 20px; height: 20px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
              <span style="color: white; font-size: 12px;">✓</span>
            </div>
            <h3 style="margin: 0; color: #065f46;">Application ID: ${applicationId}</h3>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #374151; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Insurance Details</h3>
          <p><strong>Scheme:</strong> ${selectedScheme.name}</p>
          <p><strong>Provider:</strong> ${selectedScheme.provider}</p>
          <p><strong>Submitted on:</strong> ${currentDate}</p>
          <p><strong>Status:</strong> Application Submitted</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #374151; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Next Steps</h3>
          <ol style="color: #6b7280;">
            <li>Document verification will be completed within 3 business days</li>
            <li>Premium payment instructions will be sent via SMS</li>
            <li>Policy documents will be shared after payment confirmation</li>
          </ol>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; color: #6b7280;">
          <p><strong>Contact Support:</strong></p>
          <p>Email: claims@${selectedScheme.provider.toLowerCase().replace(' ', '')}.com</p>
          <p>Phone: 1800-XXX-XXXX</p>
        </div>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Crop Insurance Receipt - ${applicationId}</title>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Application Submitted Successfully!
        </h1>
        <p className="text-lg text-gray-600">
          Your crop insurance application has been received and is being processed.
        </p>
      </div>

      {/* Application Details */}
      <Card className="border-green-200">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-lg text-green-800 flex items-center">
            <Check className="w-5 h-5 mr-2" />
            Application Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Application ID</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                <span className="font-mono text-lg font-bold text-green-600">{applicationId}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Submitted On</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md border">
                <span className="text-gray-900">{currentDate}</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Selected Insurance Scheme</label>
            <div className="mt-1 p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-md border border-teal-200">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${selectedScheme.color} rounded-full flex items-center justify-center text-xl`}>
                  {selectedScheme.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedScheme.name}</h3>
                  <p className="text-sm text-gray-600">by {selectedScheme.provider}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Selected</Badge>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Application Status</label>
            <div className="mt-1 p-3 bg-blue-50 rounded-md border border-blue-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-800 font-medium">Application Submitted - Under Review</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Document Verification</h4>
                <p className="text-sm text-gray-600">Our team will verify your submitted documents within 3 business days.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-orange-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Premium Calculation & Payment</h4>
                <p className="text-sm text-gray-600">You'll receive SMS with premium amount and payment instructions.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Policy Activation</h4>
                <p className="text-sm text-gray-600">Your insurance policy will be activated after payment confirmation.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleDownloadReceipt}
            className="flex-1 bg-teal-600 hover:bg-teal-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button 
            onClick={handlePrintReceipt}
            variant="outline"
            className="flex-1 border-teal-300 text-teal-600"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Receipt
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onNewApplication}
            variant="outline"
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Apply for Another Scheme
          </Button>
          <Button 
            variant="outline"
            className="flex-1 border-blue-300 text-blue-600"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </div>

      {/* Important Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-yellow-600 text-sm">!</span>
            </div>
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Important Notice</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Keep your application ID safe for future reference</li>
                <li>• You will receive SMS updates on your registered mobile number</li>
                <li>• Ensure your mobile number is active to receive payment instructions</li>
                <li>• Contact support if you don't hear back within 5 business days</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropInsuranceConfirmation;
