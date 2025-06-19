
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Package, ArrowLeft } from 'lucide-react';
import { CartManager } from '@/utils/cartManager';

interface Seed {
  id: string;
  name: string;
  weight: number;
  price: number;
  description: string;
  image: string;
}

const Seeds = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const seedsData: Seed[] = [
    {
      id: '1',
      name: 'Paddy Seeds 1010',
      weight: 5,
      price: 450,
      description: 'High-yield paddy variety suitable for Telangana climate',
      image: '🌾'
    },
    {
      id: '2',
      name: 'Cotton Seeds RCH659',
      weight: 2,
      price: 700,
      description: 'Premium cotton seeds with excellent fiber quality',
      image: '🌸'
    },
    {
      id: '3',
      name: 'Bajra Hybrid Pearl Millet',
      weight: 3,
      price: 360,
      description: 'Drought-resistant millet variety',
      image: '🌾'
    },
    {
      id: '4',
      name: 'Red Gram (Toor Dal) Seeds',
      weight: 1,
      price: 120,
      description: 'High protein pulse variety',
      image: '🫘'
    },
    {
      id: '5',
      name: 'Groundnut Seeds TMV7',
      weight: 4,
      price: 520,
      description: 'Disease-resistant groundnut variety',
      image: '🥜'
    },
    {
      id: '6',
      name: 'Maize Hybrid Seeds',
      weight: 2,
      price: 380,
      description: 'High-yield corn variety for all seasons',
      image: '🌽'
    }
  ];

  const addToCart = (seed: Seed, quantity: number) => {
    if (quantity <= 0) return;
    
    CartManager.addToCart({
      id: `seed_${seed.id}`,
      type: 'seeds',
      name: seed.name,
      weight: `${seed.weight} kg`,
      price: seed.price,
      quantity: quantity,
      image: seed.image,
      description: seed.description
    });
    
    toast({
      title: "Added to Cart",
      description: `${quantity} bag(s) of ${seed.name} added successfully`,
    });
  };

  const SeedCard = ({ seed }: { seed: Seed }) => {
    const [quantity, setQuantity] = useState(1);

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">{seed.image}</div>
          <CardTitle className="text-lg">{seed.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">{seed.description}</p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Weight per bag:</span>
              <span className="font-medium">{seed.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Price per bag:</span>
              <span className="font-bold text-green-600">₹{seed.price}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="font-medium">{quantity} bags</span>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="mb-4 p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Total: </span>
            <span className="font-bold text-green-600">₹{seed.price * quantity}</span>
          </div>
          
          <Button 
            onClick={() => addToCart(seed, quantity)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="w-8 h-8 mr-3 text-green-600" />
            Seeds Services
          </h1>
          <p className="text-gray-600 mt-2">Purchase certified seeds with full details</p>
        </div>

        {/* Seeds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seedsData.map((seed) => (
            <SeedCard key={seed.id} seed={seed} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Seeds;
