
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, CreditCard, Edit, Trash2, Eye } from 'lucide-react';

interface Application {
  id: string;
  schemeId: number;
  schemeName: string;
  applicationId: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: string;
  applicantName: string;
}

const ApplicationTracker: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading applications from localStorage or API
    const loadApplications = () => {
      const storedApplications = localStorage.getItem('farmerApplications');
      if (storedApplications) {
        setApplications(JSON.parse(storedApplications));
      } else {
        // Mock data for demonstration
        const mockApplications: Application[] = [
          {
            id: '1',
            schemeId: 1,
            schemeName: 'Rythu Bharosa (AP)',
            applicationId: 'RB2024001',
            submissionDate: '2024-01-15',
            status: 'approved',
            amount: '₹13,500',
            applicantName: 'Ravi Kumar'
          },
          {
            id: '2',
            schemeId: 2,
            schemeName: 'Rythu Bandhu',
            applicationId: 'RB2024002',
            submissionDate: '2024-01-20',
            status: 'pending',
            amount: '₹10,000',
            applicantName: 'Ravi Kumar'
          }
        ];
        setApplications(mockApplications);
        localStorage.setItem('farmerApplications', JSON.stringify(mockApplications));
      }
      setIsLoading(false);
    };

    loadApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const handleWithdraw = (applicationId: string) => {
    const updatedApplications = applications.filter(app => app.id !== applicationId);
    setApplications(updatedApplications);
    localStorage.setItem('farmerApplications', JSON.stringify(updatedApplications));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Applications Yet</h3>
        <p className="text-gray-500 mb-4">
          You haven't applied for any schemes yet. Start by exploring available schemes.
        </p>
        <Button className="bg-green-600 hover:bg-green-700">
          Browse Schemes
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
        <Badge variant="outline" className="text-blue-700 border-blue-300">
          {applications.length} Applications
        </Badge>
      </div>

      <div className="grid gap-4">
        {applications.map((application) => (
          <Card key={application.id} className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-green-800 mb-1">
                    {application.schemeName}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      ID: {application.applicationId}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(application.submissionDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(application.status)}>
                  {getStatusText(application.status)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-700">{application.amount}</span>
                  <span className="text-sm text-gray-500">per year</span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                  
                  {application.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs text-red-600 hover:text-red-700"
                        onClick={() => handleWithdraw(application.id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Withdraw
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {application.status === 'approved' && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    🎉 Congratulations! Your application has been approved. 
                    Payment will be processed within 7-10 working days.
                  </p>
                </div>
              )}
              
              {application.status === 'rejected' && (
                <div className="mt-3 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-700">
                    ❌ Application rejected. Please contact the helpline for more information.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTracker;
