import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  IndianRupee,
  CheckCircle,
  AlertCircle,
  FileText,
  Star,
  Phone,
  Info,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MachineryApplicationForm from './MachineryApplicationForm';
import ApplicationStatusCard from './ApplicationStatusCard';

interface Machinery {
  id: string;
  name: string;
  type: string;
  image: string;
  originalPrice: number;
  subsidizedPrice: number;
  subsidyPercentage: string;
  eligibility: string[];
  availability: 'Available' | 'Out of Stock';
  description: string;
  specifications: string[];
}

const MachinerySubsidyStore = () => {
  const { toast } = useToast();
  const [selectedMachine, setSelectedMachine] = useState<Machinery | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [submittedApplications, setSubmittedApplications] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'store' | 'application' | 'status'>('store');

  const machinery: Machinery[] = [
    {
      id: '1',
      name: 'Mahindra 265 DI Tractor',
      type: 'Tractor (up to 40 HP)',
      image: '🚜',
      originalPrice: 650000,
      subsidizedPrice: 390000,
      subsidyPercentage: '40-60%',
      eligibility: ['Small Farmer', 'SC/ST', 'Women Farmer'],
      availability: 'Available',
      description: 'Versatile 35 HP tractor suitable for all farming operations including plowing, cultivating, and harvesting. Features reliable diesel engine with excellent fuel efficiency.',
      specifications: ['35 HP Engine', '8 Forward + 2 Reverse Gears', 'Power Steering', 'Hydraulic System', '540 RPM PTO']
    },
    {
      id: '2',
      name: 'Heavy Duty Rotavator',
      type: 'Rotavator',
      image: '⚙️',
      originalPrice: 85000,
      subsidizedPrice: 51000,
      subsidyPercentage: '40%',
      eligibility: ['All Farmers', 'Small Farmer'],
      availability: 'Available',
      description: 'Efficient soil preparation equipment for better crop yield. Ideal for breaking hard soil and mixing crop residues.',
      specifications: ['6 Feet Width', '32 Blades', 'Adjustable Depth Control', 'Side Drive System', 'Heavy Duty Gearbox']
    },
    {
      id: '3',
      name: 'Honda Power Tiller',
      type: 'Power Tiller',
      image: '🛠️',
      originalPrice: 120000,
      subsidizedPrice: 72000,
      subsidyPercentage: '40%',
      eligibility: ['Small Farmer', 'Marginal Farmer'],
      availability: 'Available',
      description: 'Compact power tiller for small and medium farms. Multi-purpose equipment for various farming operations.',
      specifications: ['8 HP Engine', 'Multi-purpose Use', 'Easy Operation', 'Reverse Gear', 'Adjustable Handle']
    },
    {
      id: '4',
      name: 'Pneumatic Seed Drill',
      type: 'Seed Drill',
      image: '🌾',
      originalPrice: 180000,
      subsidizedPrice: 108000,
      subsidyPercentage: '40%',
      eligibility: ['All Farmers', 'FPO Members'],
      availability: 'Available',
      description: 'Precision seeding equipment for optimal crop spacing and fertilizer placement. Ensures uniform seed distribution.',
      specifications: ['9 Rows', 'Pneumatic System', 'Fertilizer Box', 'Seed Rate Control', 'Furrow Openers']
    },
    {
      id: '5',
      name: 'Mini Combine Harvester',
      type: 'Combine Harvester',
      image: '🚛',
      originalPrice: 1500000,
      subsidizedPrice: 900000,
      subsidyPercentage: '40%',
      eligibility: ['Large Farmer', 'FPO', 'Custom Hiring'],
      availability: 'Available',
      description: 'Efficient harvesting solution for multiple crops including wheat, rice, and other cereals. Complete harvesting in one pass.',
      specifications: ['14 HP Engine', 'Multi-crop Compatible', 'Grain Tank 500kg', 'Threshing Unit', 'Cleaning System']
    },
    {
      id: '6',
      name: 'Rice Transplanter',
      type: 'Paddy Transplanter',
      image: '🌱',
      originalPrice: 320000,
      subsidizedPrice: 192000,
      subsidyPercentage: '40%',
      eligibility: ['Rice Farmers', 'Small Farmer', 'SC/ST'],
      availability: 'Out of Stock',
      description: 'Automated rice seedling transplanting machine for improved productivity and reduced labor cost.',
      specifications: ['6 Rows', 'Walking Type', 'Seedling Tray System', 'Planting Depth Control', 'Floating System']
    }
  ];

  const getTypeIcon = (type: string) => {
    if (type.includes('Tractor')) return '🚜';
    if (type.includes('Rotavator')) return '⚙️';
    if (type.includes('Power Tiller')) return '🛠️';
    if (type.includes('Seed Drill')) return '🌾';
    if (type.includes('Harvester')) return '🚛';
    if (type.includes('Transplanter')) return '🌱';
    return '🛠️';
  };

  const getEligibilityColor = (tag: string) => {
    switch (tag) {
      case 'SC/ST': return 'bg-purple-100 text-purple-700';
      case 'Small Farmer': return 'bg-green-100 text-green-700';
      case 'Women Farmer': return 'bg-pink-100 text-pink-700';
      case 'All Farmers': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleApplySubsidy = (machine: Machinery) => {
    setSelectedMachine(machine);
    setCurrentView('application');
  };

  const handleViewDetails = (machine: Machinery) => {
    setSelectedMachine(machine);
    setShowDetailsDialog(true);
  };

  const handleApplicationSubmit = (applicationData: any) => {
    setSubmittedApplications(prev => [...prev, applicationData]);
    setCurrentView('status');
    
    // Save to localStorage for persistence
    const existingApps = JSON.parse(localStorage.getItem('machineryApplications') || '[]');
    localStorage.setItem('machineryApplications', JSON.stringify([...existingApps, applicationData]));
  };

  const handleCallSupport = () => {
    toast({
      title: "Machinery Subsidy Helpline",
      description: "Calling 1800-XXX-FARM (3276) - Toll Free Support",
    });
  };

  const renderStoreView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {machinery.map((machine) => (
        <Card key={machine.id} className="border-orange-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-4xl mb-2 text-center">{machine.image}</div>
                <CardTitle className="text-lg text-gray-900 mb-2 text-center">
                  {machine.name}
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge variant="outline" className="text-sm">
                    {getTypeIcon(machine.type)} {machine.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-center space-y-1">
                <div className="text-sm text-gray-500 line-through">
                  Original: ₹{machine.originalPrice.toLocaleString()}
                </div>
                <div className="flex items-center justify-center font-bold text-orange-600 text-lg">
                  <IndianRupee className="w-4 h-4" />
                  <span>{machine.subsidizedPrice.toLocaleString()}</span>
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  {machine.subsidyPercentage} Subsidy
                </Badge>
              </div>
            </div>

            {/* Eligibility */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Eligibility:</div>
              <div className="flex flex-wrap gap-1">
                {machine.eligibility.map((tag, index) => (
                  <Badge key={index} className={`text-xs ${getEligibilityColor(tag)}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <div className="flex items-center gap-1">
                {machine.availability === 'Available' ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-medium">Available</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => handleApplySubsidy(machine)}
                disabled={machine.availability === 'Out of Stock'}
              >
                <FileText className="w-4 h-4 mr-2" />
                {machine.availability === 'Out of Stock' ? 'Currently Unavailable' : 'Apply for Subsidy'}
              </Button>
              
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => handleViewDetails(machine)}
              >
                <Info className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderApplicationView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setCurrentView('store')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>
        <Button variant="outline" onClick={handleCallSupport}>
          <Phone className="w-4 h-4 mr-2" />
          Need Help? Call Support
        </Button>
      </div>
      
      {selectedMachine && (
        <MachineryApplicationForm
          selectedMachine={selectedMachine}
          onApplicationSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );

  const renderStatusView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => setCurrentView('store')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Store
        </Button>
      </div>
      
      {submittedApplications.length > 0 && (
        <ApplicationStatusCard applicationData={submittedApplications[submittedApplications.length - 1]} />
      )}
    </div>
  );

  return (
    <div>
      {currentView === 'store' && renderStoreView()}
      {currentView === 'application' && renderApplicationView()}
      {currentView === 'status' && renderStatusView()}

      {/* Enhanced Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Machine Details</DialogTitle>
          </DialogHeader>
          
          {selectedMachine && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedMachine.image}</div>
                <h3 className="font-semibold text-xl">{selectedMachine.name}</h3>
                <p className="text-sm text-gray-600">{selectedMachine.type}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Description:</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedMachine.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Technical Specifications:</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  {selectedMachine.specifications.map((spec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Eligibility Criteria:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMachine.eligibility.map((tag, index) => (
                    <Badge key={index} className={`${getEligibilityColor(tag)}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Subsidized Price</div>
                  <div className="text-2xl font-bold text-orange-600">₹{selectedMachine.subsidizedPrice.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">
                    Original: ₹{selectedMachine.originalPrice.toLocaleString()} 
                    ({selectedMachine.subsidyPercentage} off)
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    handleApplySubsidy(selectedMachine);
                    setShowDetailsDialog(false);
                  }}
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  disabled={selectedMachine.availability === 'Out of Stock'}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Apply for Subsidy
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleCallSupport}
                  className="flex-1"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MachinerySubsidyStore;
