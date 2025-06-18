
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Phone, MapPin, User, Package, Plus } from 'lucide-react';

const Mandi = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('telugu');
  const [activeTab, setActiveTab] = useState('buyers');

  const buyers = [
    {
      id: 1,
      name: 'రామేష్ ట్రేడర్స్',
      crop: { telugu: 'వరి', english: 'Paddy' },
      quantity: '100 క్వింటల్స్',
      price: '₹2,800-2,900',
      location: 'హైదరాబాద్',
      mobile: '+91 98765-43210',
      verified: true
    },
    {
      id: 2,
      name: 'కృష్ణ కమర్షియల్',
      crop: { telugu: 'పత్తి', english: 'Cotton' },
      quantity: '50 క్వింటల్స్',
      price: '₹6,100-6,200',
      location: 'వరంగల్',
      mobile: '+91 98765-43211',
      verified: true
    },
    {
      id: 3,
      name: 'లక్ష్మీ ఎగ్రో',
      crop: { telugu: 'పసుపు', english: 'Turmeric' },
      quantity: '25 క్వింటల్స్',
      price: '₹14,400-14,600',
      location: 'నిజామాబాద్',
      mobile: '+91 98765-43212',
      verified: false
    }
  ];

  const sellers = [
    {
      id: 1,
      name: 'వెంకట్ రెడ్డి',
      crop: { telugu: 'వరి', english: 'Paddy' },
      quantity: '80 క్వింటల్స్',
      price: '₹2,850',
      location: 'కరీంనగర్',
      mobile: '+91 98765-54321',
      quality: 'A గ్రేడ్'
    },
    {
      id: 2,
      name: 'అనిల్ కుమార్',
      crop: { telugu: 'మొక్కజొన్న', english: 'Maize' },
      quantity: '60 క్వింటల్స్',
      price: '₹2,200',
      location: 'మహబూబ్‌నగర్',
      mobile: '+91 98765-54322',
      quality: 'B గ్రేడ్'
    }
  ];

  const handleCall = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {selectedLanguage === 'telugu' ? 'ఆన్‌లైన్ మండి' : 'Online Mandi'}
          </h1>
          <p className="text-green-600">
            {selectedLanguage === 'telugu' 
              ? 'కొనుగోలుదారులు మరియు అమ్మకందారులను కనెక్ట్ చేయడం'
              : 'Connecting buyers and sellers directly'
            }
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={selectedLanguage === 'telugu' ? 'default' : 'outline'}
            onClick={() => setSelectedLanguage('telugu')}
            className="bg-green-600 hover:bg-green-700"
          >
            తెలుగు
          </Button>
          <Button
            variant={selectedLanguage === 'english' ? 'default' : 'outline'}
            onClick={() => setSelectedLanguage('english')}
            className="bg-green-600 hover:bg-green-700"
          >
            English
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'buyers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('buyers')}
            className={activeTab === 'buyers' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-300'}
          >
            <User className="w-4 h-4 mr-2" />
            {selectedLanguage === 'telugu' ? 'కొనుగోలుదారులు' : 'Buyers'}
          </Button>
          <Button
            variant={activeTab === 'sellers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sellers')}
            className={activeTab === 'sellers' ? 'bg-green-600 hover:bg-green-700' : 'border-green-300'}
          >
            <Package className="w-4 h-4 mr-2" />
            {selectedLanguage === 'telugu' ? 'అమ్మకందారులు' : 'Sellers'}
          </Button>
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'buyers' 
              ? (selectedLanguage === 'telugu' ? 'కొత్త కొనుగోలు అవసరం' : 'Add Buying Requirement')
              : (selectedLanguage === 'telugu' ? 'పంట అమ్మకానికి పోస్ట్ చేయండి' : 'Post Crop for Sale')
            }
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'buyers' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyers.map((buyer) => (
              <Card key={buyer.id} className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      {selectedLanguage === 'telugu' ? 'కొనుగోలుదారుడు' : 'Buyer'}
                    </Badge>
                    {buyer.verified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        ✓ {selectedLanguage === 'telugu' ? 'వెరిఫైడ్' : 'Verified'}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{buyer.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedLanguage === 'telugu' ? 'పంట:' : 'Crop:'}
                    </span>
                    <span className="font-medium">{buyer.crop[selectedLanguage]}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedLanguage === 'telugu' ? 'పరిమాణం:' : 'Quantity:'}
                    </span>
                    <span className="font-medium">{buyer.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedLanguage === 'telugu' ? 'ధర:' : 'Price:'}
                    </span>
                    <span className="font-medium text-green-600">{buyer.price}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {buyer.location}
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleCall(buyer.mobile)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedLanguage === 'telugu' ? 'కాల్ చేయండి' : 'Call Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellers.map((seller) => (
              <Card key={seller.id} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {selectedLanguage === 'telugu' ? 'అమ్మకందారుడు' : 'Seller'}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {seller.quality}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{seller.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedLanguage === 'telugu' ? 'పంట:' : 'Crop:'}
                    </span>
                    <span className="font-medium">{seller.crop[selectedLanguage]}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedLanguage === 'telugu' ? 'పరిమాణం:' : 'Quantity:'}
                    </span>
                    <span className="font-medium">{seller.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {selectedLanguage === 'telugu' ? 'ధర:' : 'Price:'}
                    </span>
                    <span className="font-medium text-green-600">{seller.price}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {seller.location}
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleCall(seller.mobile)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedLanguage === 'telugu' ? 'కాల్ చేయండి' : 'Call Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mandi;
