
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Package, IndianRupee, MapPin, Clock, Truck, User } from 'lucide-react';

interface CropListing {
  id: string;
  cropName: string;
  quantity: string;
  unit: string;
  expectedPrice: string;
  location: string;
  contactNumber: string;
}

interface BuyerOrderFormProps {
  listing: CropListing | null;
  selectedLanguage: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirmOrder: (orderData: any) => void;
}

const BuyerOrderForm: React.FC<BuyerOrderFormProps> = ({ 
  listing, 
  selectedLanguage, 
  isOpen, 
  onClose, 
  onConfirmOrder 
}) => {
  const [orderData, setOrderData] = useState({
    buyerName: '',
    buyerContact: '',
    buyerLocation: '',
    intendedQuantity: '',
    pickupDate: '',
    pickupTime: '',
    transportArrangement: 'self',
    specialInstructions: '',
    agreedPrice: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listing) return;

    const finalOrderData = {
      ...orderData,
      listingId: listing.id,
      sellerId: 'seller-id', // This would come from the listing
      buyerId: 'current-buyer-id', // This would come from auth
      orderDate: new Date().toISOString(),
      status: 'confirmed',
      totalEstimatedAmount: (parseFloat(orderData.intendedQuantity) * parseFloat(orderData.agreedPrice || listing.expectedPrice)).toString()
    };

    onConfirmOrder(finalOrderData);
    onClose();
  };

  if (!listing) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-green-800">
            <Package className="w-5 h-5 mr-2" />
            {selectedLanguage === 'telugu' ? 'ఆర్డర్ కన్ఫర్మేషన్' : 'Confirm Your Order'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Crop Details Summary */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <Package className="w-4 h-4 mr-2" />
                {selectedLanguage === 'telugu' ? 'పంట వివరాలు' : 'Crop Details'}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>{selectedLanguage === 'telugu' ? 'పంట:' : 'Crop:'}</strong> {listing.cropName}</div>
                <div><strong>{selectedLanguage === 'telugu' ? 'అందుబాటు:' : 'Available:'}</strong> {listing.quantity} {listing.unit}</div>
                <div><strong>{selectedLanguage === 'telugu' ? 'ధర:' : 'Price:'}</strong> ₹{listing.expectedPrice}/{selectedLanguage === 'telugu' ? 'క్వింటల్' : 'quintal'}</div>
                <div><strong>{selectedLanguage === 'telugu' ? 'స్థానం:' : 'Location:'}</strong> {listing.location}</div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  {selectedLanguage === 'telugu' ? 'మీ పేరు' : 'Your Name'}
                </label>
                <Input
                  value={orderData.buyerName}
                  onChange={(e) => handleInputChange('buyerName', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {selectedLanguage === 'telugu' ? 'మొబైల్ నంబర్' : 'Contact Number'}
                </label>
                <Input
                  type="tel"
                  value={orderData.buyerContact}
                  onChange={(e) => handleInputChange('buyerContact', e.target.value)}
                  placeholder="+91 98765-43210"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                {selectedLanguage === 'telugu' ? 'మీ స్థానం' : 'Your Location'}
              </label>
              <Input
                value={orderData.buyerLocation}
                onChange={(e) => handleInputChange('buyerLocation', e.target.value)}
                placeholder={selectedLanguage === 'telugu' ? 'గ్రామం, జిల్లా' : 'Village, District'}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {selectedLanguage === 'telugu' ? 'అవసరమైన పరిమాణం' : 'Required Quantity'} ({listing.unit})
                </label>
                <Input
                  type="number"
                  value={orderData.intendedQuantity}
                  onChange={(e) => handleInputChange('intendedQuantity', e.target.value)}
                  max={listing.quantity}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <IndianRupee className="w-4 h-4 inline mr-1" />
                  {selectedLanguage === 'telugu' ? 'అంగీకరించిన ధర' : 'Agreed Price per Unit'}
                </label>
                <Input
                  type="number"
                  value={orderData.agreedPrice}
                  onChange={(e) => handleInputChange('agreedPrice', e.target.value)}
                  placeholder={listing.expectedPrice}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {selectedLanguage === 'telugu' ? 'ఖాళీగా ఉంచితే వెండర్ ధర వర్తిస్తుంది' : 'Leave empty to use seller\'s price'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {selectedLanguage === 'telugu' ? 'పికప్ తేదీ' : 'Pickup Date'}
                </label>
                <Input
                  type="date"
                  value={orderData.pickupDate}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  {selectedLanguage === 'telugu' ? 'పికప్ సమయం' : 'Pickup Time'}
                </label>
                <select
                  value={orderData.pickupTime}
                  onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  required
                >
                  <option value="">{selectedLanguage === 'telugu' ? 'సమయం ఎంచుకోండి' : 'Select Time'}</option>
                  <option value="morning">06:00 - 10:00 AM</option>
                  <option value="afternoon">10:00 AM - 02:00 PM</option>
                  <option value="evening">02:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Truck className="w-4 h-4 inline mr-1" />
                {selectedLanguage === 'telugu' ? 'రవాణా వ్యవస్థ' : 'Transport Arrangement'}
              </label>
              <select
                value={orderData.transportArrangement}
                onChange={(e) => handleInputChange('transportArrangement', e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-white"
              >
                <option value="self">{selectedLanguage === 'telugu' ? 'స్వంత వాహనం' : 'Own Vehicle'}</option>
                <option value="seller">{selectedLanguage === 'telugu' ? 'అమ్మకందారు అందిస్తారు' : 'Seller Provides'}</option>
                <option value="hired">{selectedLanguage === 'telugu' ? 'అద్దె వాహనం' : 'Hired Transport'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {selectedLanguage === 'telugu' ? 'ప్రత్యేక సూచనలు' : 'Special Instructions (Optional)'}
              </label>
              <Textarea
                value={orderData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder={selectedLanguage === 'telugu' ? 'అదనపు వివరాలు లేదా అవసరాలు' : 'Any additional requirements or notes'}
                rows={3}
              />
            </div>

            {/* Order Summary */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{selectedLanguage === 'telugu' ? 'ఆర్డర్ సారాంశం' : 'Order Summary'}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>{selectedLanguage === 'telugu' ? 'పరిమాణం:' : 'Quantity:'}</span>
                    <span>{orderData.intendedQuantity || '0'} {listing.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{selectedLanguage === 'telugu' ? 'ధర పర్ యూనిట్:' : 'Price per unit:'}</span>
                    <span>₹{orderData.agreedPrice || listing.expectedPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                    <span>{selectedLanguage === 'telugu' ? 'అంచనా మొత్తం:' : 'Estimated Total:'}</span>
                    <span>₹{(parseFloat(orderData.intendedQuantity || '0') * parseFloat(orderData.agreedPrice || listing.expectedPrice)).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                {selectedLanguage === 'telugu' ? 'రద్దు చేయండి' : 'Cancel'}
              </Button>
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                {selectedLanguage === 'telugu' ? 'ఆర్డర్ కన్ఫర్మ్ చేయండి' : 'Confirm Order'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyerOrderForm;
