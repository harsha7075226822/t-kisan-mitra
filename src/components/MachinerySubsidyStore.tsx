
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Wrench, 
  IndianRupee,
  CheckCircle,
  AlertCircle,
  FileText,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
      description: 'Versatile 35 HP tractor suitable for all farming operations',
      specifications: ['35 HP Engine', '8 Forward + 2 Reverse Gears', 'Power Steering']
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
      description: 'Efficient soil preparation equipment for better crop yield',
      specifications: ['6 Feet Width', '32 Blades', 'Adjustable Depth Control']
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
      description: 'Compact power tiller for small and medium farms',
      specifications: ['8 HP Engine', 'Multi-purpose Use', 'Easy Operation']
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
      description: 'Precision seeding equipment for optimal crop spacing',
      specifications: ['9 Rows', 'Pneumatic System', 'Fertilizer Box']
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
      description: 'Efficient harvesting solution for multiple crops',
      specifications: ['14 HP Engine', 'Multi-crop Compatible', 'Grain Tank 500kg']
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
      description: 'Automated rice seedling transplanting machine',
      specifications: ['6 Rows', 'Walking Type', 'Seedling Tray System']
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
    toast({
      title: "Application Initiated",
      description: `Subsidy application for ${machine.name} has been started. You will be redirected to the application portal.`,
    });
  };

  const handleViewDetails = (machine: Machinery) => {
    setSelectedMachine(machine);
    setShowDetailsDialog(true);
  };

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Machinery Subsidy Store</h2>
            <p className="text-gray-600">Explore government-subsidized farm machinery to boost productivity</p>
          </div>
        </div>
      </div>

      {/* Machinery Grid */}
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
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Machine Details</DialogTitle>
          </DialogHeader>
          
          {selectedMachine && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-2">{selectedMachine.image}</div>
                <h3 className="font-semibold text-lg">{selectedMachine.name}</h3>
                <p className="text-sm text-gray-600">{selectedMachine.type}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Description:</h4>
                <p className="text-sm text-gray-600">{selectedMachine.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Specifications:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedMachine.specifications.map((spec, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Subsidized Price</div>
                  <div className="text-xl font-bold text-orange-600">₹{selectedMachine.subsidizedPrice.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">
                    Original: ₹{selectedMachine.originalPrice.toLocaleString()} 
                    ({selectedMachine.subsidyPercentage} off)
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  handleApplySubsidy(selectedMachine);
                  setShowDetailsDialog(false);
                }}
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={selectedMachine.availability === 'Out of Stock'}
              >
                <FileText className="w-4 h-4 mr-2" />
                Apply for Subsidy
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MachinerySubsidyStore;
