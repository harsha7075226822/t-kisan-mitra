
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, MapPin, Package, IndianRupee, Camera } from 'lucide-react';

interface CropListingFormProps {
  selectedLanguage: string;
  onSubmit: (listing: any) => void;
}

const CropListingForm: React.FC<CropListingFormProps> = ({ selectedLanguage, onSubmit }) => {
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    unit: 'quintals',
    expectedPrice: '',
    location: '',
    description: '',
    contactNumber: '',
    image: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listing = {
      ...formData,
      id: Date.now().toString(),
      datePosted: new Date().toISOString(),
      status: 'available',
      sellerId: 'current-user-id' // This would come from auth
    };
    onSubmit(listing);
    setFormData({
      cropName: '',
      quantity: '',
      unit: 'quintals',
      expectedPrice: '',
      location: '',
      description: '',
      contactNumber: '',
      image: null
    });
  };

  return (
    <Card className="border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center text-green-800">
          <Package className="w-5 h-5 mr-2" />
          {selectedLanguage === 'telugu' ? 'పంట అమ్మకానికి పోస్ట్ చేయండి' : 'Post Crop for Sale'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {selectedLanguage === 'telugu' ? 'పంట పేరు' : 'Crop Name'}
              </label>
              <Input
                value={formData.cropName}
                onChange={(e) => handleInputChange('cropName', e.target.value)}
                placeholder={selectedLanguage === 'telugu' ? 'ఉదా: వరి, పత్తి' : 'e.g., Paddy, Cotton'}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {selectedLanguage === 'telugu' ? 'పరిమాణం' : 'Quantity'}
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="100"
                  required
                />
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  <option value="quintals">Quintals</option>
                  <option value="kgs">Kgs</option>
                  <option value="tons">Tons</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <IndianRupee className="w-4 h-4 inline mr-1" />
                {selectedLanguage === 'telugu' ? 'అంచనా ధర' : 'Expected Price per Quintal'}
              </label>
              <Input
                type="number"
                value={formData.expectedPrice}
                onChange={(e) => handleInputChange('expectedPrice', e.target.value)}
                placeholder="2850"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                {selectedLanguage === 'telugu' ? 'స్థానం' : 'Location'}
              </label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder={selectedLanguage === 'telugu' ? 'గ్రామం, జిల్లా' : 'Village, District'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {selectedLanguage === 'telugu' ? 'మొబైల్ నంబర్' : 'Contact Number'}
            </label>
            <Input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              placeholder="+91 98765-43210"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {selectedLanguage === 'telugu' ? 'వివరణ' : 'Description (Optional)'}
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={selectedLanguage === 'telugu' ? 'పంట గుణమేన్ గురించి వివరణ' : 'Quality details, harvest date, etc.'}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              <Camera className="w-4 h-4 inline mr-1" />
              {selectedLanguage === 'telugu' ? 'పంట చిత్రం' : 'Crop Image (Optional)'}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="crop-image"
              />
              <label
                htmlFor="crop-image"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.image ? formData.image.name : (selectedLanguage === 'telugu' ? 'చిత్రం అప్‌లోడ్ చేయండి' : 'Click to upload image')}
                </span>
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            <Package className="w-4 h-4 mr-2" />
            {selectedLanguage === 'telugu' ? 'పంట పోస్ట్ చేయండి' : 'Post Crop for Sale'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CropListingForm;
