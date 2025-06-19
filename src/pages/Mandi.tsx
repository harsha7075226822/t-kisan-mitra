
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Phone, MapPin, User, Package, Plus, ArrowLeft } from 'lucide-react';

const Mandi = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buyers');

  const buyers = [
    {
      id: 1,
      name: 'Ramesh Traders',
      crop: 'Paddy',
      quantity: '100 Quintals',
      price: '₹2,800-2,900',
      location: 'Hyderabad',
      mobile: '+91 98765-43210',
      verified: true
    },
    {
      id: 2,
      name: 'Krishna Commercial',
      crop: 'Cotton',
      quantity: '50 Quintals',
      price: '₹6,100-6,200',
      location: 'Warangal',
      mobile: '+91 98765-43211',
      verified: true
    },
    {
      id: 3,
      name: 'Lakshmi Agro',
      crop: 'Turmeric',
      quantity: '25 Quintals',
      price: '₹14,400-14,600',
      location: 'Nizamabad',
      mobile: '+91 98765-43212',
      verified: false
    }
  ];

  const sellers = [
    {
      id: 1,
      name: 'Venkat Reddy',
      crop: 'Paddy',
      quantity: '80 Quintals',
      price: '₹2,850',
      location: 'Karimnagar',
      mobile: '+91 98765-54321',
      quality: 'A Grade'
    },
    {
      id: 2,
      name: 'Anil Kumar',
      crop: 'Maize',
      quantity: '60 Quintals',
      price: '₹2,200',
      location: 'Mahabubnagar',
      mobile: '+91 98765-54322',
      quality: 'B Grade'
    }
  ];

  const handleCall = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Online Mandi
          </h1>
          <p className="text-green-600">
            Connecting buyers and sellers directly
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'buyers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('buyers')}
            className={activeTab === 'buyers' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-300'}
          >
            <User className="w-4 h-4 mr-2" />
            Buyers
          </Button>
          <Button
            variant={activeTab === 'sellers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sellers')}
            className={activeTab === 'sellers' ? 'bg-green-600 hover:bg-green-700' : 'border-green-300'}
          >
            <Package className="w-4 h-4 mr-2" />
            Sellers
          </Button>
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'buyers' 
              ? 'Add Buying Requirement'
              : 'Post Crop for Sale'
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
                      Buyer
                    </Badge>
                    {buyer.verified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{buyer.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Crop:</span>
                    <span className="font-medium">{buyer.crop}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="font-medium">{buyer.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
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
                    Call Now
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
                      Seller
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {seller.quality}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{seller.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Crop:</span>
                    <span className="font-medium">{seller.crop}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="font-medium">{seller.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
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
                    Call Now
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
