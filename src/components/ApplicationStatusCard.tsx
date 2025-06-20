
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText, 
  Download,
  User,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

interface ApplicationData {
  applicationId: string;
  fullName: string;
  mobileNumber: string;
  farmerCategory: string;
  landSize: string;
  district: string;
  mandal: string;
  village: string;
  machinery: {
    name: string;
    type: string;
    subsidizedPrice: number;
  };
  submittedOn: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  uploadedFiles: {
    landOwnership: string;
    bankPassbook: string;
    farmerPhoto: string;
  };
}

interface ApplicationStatusCardProps {
  applicationData: ApplicationData;
}

const ApplicationStatusCard: React.FC<ApplicationStatusCardProps> = ({ applicationData }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-700"><FileText className="w-3 h-3 mr-1" />Under Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getProgressSteps = (currentStatus: string) => {
    const steps = [
      { key: 'submitted', label: 'Submitted', completed: true },
      { key: 'under_review', label: 'Under Review', completed: ['under_review', 'approved', 'rejected'].includes(currentStatus) },
      { key: 'final', label: currentStatus === 'approved' ? 'Approved' : currentStatus === 'rejected' ? 'Rejected' : 'Final Decision', completed: ['approved', 'rejected'].includes(currentStatus) },
    ];

    return steps;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="max-w-4xl mx-auto border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-600" />
            Your Application Details & Status
          </span>
          {getStatusBadge(applicationData.status)}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Application ID and Date */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Application ID</p>
              <p className="text-lg font-bold text-orange-600">{applicationData.applicationId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Submitted On</p>
              <p className="text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(applicationData.submittedOn)}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="space-y-3">
          <h4 className="font-medium">Application Progress</h4>
          <div className="flex items-center space-x-4">
            {getProgressSteps(applicationData.status).map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm ${step.completed ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  {step.label}
                </span>
                {index < getProgressSteps(applicationData.status).length - 1 && (
                  <div className={`w-12 h-1 mx-4 ${step.completed ? 'bg-green-300' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Farmer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Farmer Information
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Name:</span> {applicationData.fullName}</p>
              <p><span className="font-medium">Category:</span> {applicationData.farmerCategory.toUpperCase()}</p>
              <p><span className="font-medium">Land Size:</span> {applicationData.landSize} acres</p>
              <p className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {applicationData.mobileNumber}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address Details
            </h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">District:</span> {applicationData.district}</p>
              <p><span className="font-medium">Mandal:</span> {applicationData.mandal}</p>
              <p><span className="font-medium">Village:</span> {applicationData.village}</p>
            </div>
          </div>
        </div>

        {/* Machinery Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Selected Machinery</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{applicationData.machinery.name}</p>
              <p className="text-sm text-gray-600">{applicationData.machinery.type}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-orange-600">
                ₹{applicationData.machinery.subsidizedPrice.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Subsidized Price</p>
            </div>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="space-y-3">
          <h4 className="font-medium">Uploaded Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(applicationData.uploadedFiles).map(([key, fileName]) => (
              <div key={key} className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{fileName}</span>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Download Application PDF
          </Button>
          {applicationData.status === 'pending' && (
            <Button variant="outline" className="flex-1">
              Update Information
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationStatusCard;
