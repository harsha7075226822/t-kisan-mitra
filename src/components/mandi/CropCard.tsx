
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MapPin, Package, IndianRupee, User, Calendar } from 'lucide-react';

interface CropListing {
  id: string;
  cropName: string;
  quantity: string;
  unit: string;
  expectedPrice: string;
  location: string;
  description: string;
  contactNumber: string;
  datePosted: string;
  status: string;
  sellerId: string;
}

interface CropCardProps {
  listing: CropListing;
  selectedLanguage: string;
  onBuy: (listing: CropListing) => void;
  onCall: (contactNumber: string) => void;
}

const CropCard: React.FC<CropCardProps> = ({ listing, selectedLanguage, onBuy, onCall }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    if (selectedLanguage === 'telugu') {
      switch (status) {
        case 'available': return 'అందుబాటులో';
        case 'sold': return 'అమ్ముడైంది';
        case 'pending': return 'వేచివున్న';
        default: return status;
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card className="border-green-200 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            {selectedLanguage === 'telugu' ? 'అమ్మకానికి' : 'For Sale'}
          </Badge>
          <Badge className={getStatusColor(listing.status)}>
            {getStatusText(listing.status)}
          </Badge>
        </div>
        <CardTitle className="text-lg flex items-center">
          <Package className="w-5 h-5 mr-2 text-green-600" />
          {listing.cropName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedLanguage === 'telugu' ? 'పరిమాణం:' : 'Quantity:'}
          </span>
          <span className="font-medium">{listing.quantity} {listing.unit}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 flex items-center">
            <IndianRupee className="w-4 h-4 mr-1" />
            {selectedLanguage === 'telugu' ? 'ధర:' : 'Price:'}
          </span>
          <span className="font-medium text-green-600">₹{listing.expectedPrice}/{selectedLanguage === 'telugu' ? 'క్వింటల్' : 'quintal'}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          {listing.location}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-1" />
          {selectedLanguage === 'telugu' ? 'పోస్ట్ తేదీ:' : 'Posted:'} {formatDate(listing.datePosted)}
        </div>

        {listing.description && (
          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
            {listing.description}
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onCall(listing.contactNumber)}
          >
            <Phone className="w-4 h-4 mr-1" />
            {selectedLanguage === 'telugu' ? 'కాల్' : 'Call'}
          </Button>
          
          {listing.status === 'available' && (
            <Button 
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onBuy(listing)}
            >
              <Package className="w-4 h-4 mr-1" />
              {selectedLanguage === 'telugu' ? 'కొనండి' : 'Buy Now'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CropCard;
