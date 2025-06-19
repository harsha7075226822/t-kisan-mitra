import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Beaker, 
  Plus, 
  Minus, 
  Package,
  IndianRupee,
  Droplets,
  Box,
  Circle,
  ShoppingCart
} from 'lucide-react';
import { CartManager } from '@/utils/cartManager';
import { useToast } from '@/hooks/use-toast';

interface Pesticide {
  id: string;
  name: string;
  weight: string;
  packagingType: 'Liquid' | 'Powder' | 'Granule';
  price: number;
  stock: number;
  description: string;
  activeIngredient: string;
  targetPests: string[];
  image?: string;
}

const PesticidesContainer = () => {
  const [selectedPesticide, setSelectedPesticide] = useState<Pesticide | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const pesticides: Pesticide[] = [
    {
      id: '1',
      name: 'Bavistin DF',
      weight: '100g',
      packagingType: 'Powder',
      price: 245,
      stock: 50,
      description: 'Broad spectrum systemic fungicide for seed treatment and foliar spray',
      activeIngredient: 'Carbendazim 50% WP',
      targetPests: ['Blast', 'Blight', 'Rust', 'Smut']
    },
    {
      id: '2',
      name: 'Confidor 200 SL',
      weight: '100ml',
      packagingType: 'Liquid',
      price: 380,
      stock: 35,
      description: 'Systemic insecticide for sucking pest control',
      activeIngredient: 'Imidacloprid 20% SL',
      targetPests: ['Aphids', 'Jassids', 'Thrips', 'Whitefly']
    },
    {
      id: '3',
      name: 'Ridomil Gold',
      weight: '250g',
      packagingType: 'Powder',
      price: 650,
      stock: 25,
      description: 'Preventive and curative fungicide for downy mildew',
      activeIngredient: 'Metalaxyl-M 4% + Mancozeb 64%',
      targetPests: ['Downy Mildew', 'Late Blight', 'Damping Off']
    },
    {
      id: '4',
      name: 'Coragen',
      weight: '60ml',
      packagingType: 'Liquid',
      price: 1250,
      stock: 20,
      description: 'Novel insecticide for lepidopteran pest control',
      activeIngredient: 'Chlorantraniliprole 18.5% SC',
      targetPests: ['Bollworm', 'Stem Borer', 'Fruit Borer', 'DBM']
    },
    {
      id: '5',
      name: 'Regent',
      weight: '100g',
      packagingType: 'Granule',
      price: 425,
      stock: 40,
      description: 'Soil application insecticide for root pest control',
      activeIngredient: 'Fipronil 0.3% GR',
      targetPests: ['Termites', 'Root Grubs', 'Wireworms']
    },
    {
      id: '6',
      name: 'Karate Zeon',
      weight: '250ml',
      packagingType: 'Liquid',
      price: 890,
      stock: 30,
      description: 'Fast acting contact and stomach poison insecticide',
      activeIngredient: 'Lambda Cyhalothrin 5% CS',
      targetPests: ['Bollworm', 'Aphids', 'Thrips', 'Caterpillars']
    }
  ];

  const getPackagingIcon = (type: string) => {
    switch (type) {
      case 'Liquid': return <Droplets className="w-4 h-4" />;
      case 'Powder': return <Box className="w-4 h-4" />;
      case 'Granule': return <Circle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getPackagingColor = (type: string) => {
    switch (type) {
      case 'Liquid': return 'bg-blue-100 text-blue-700';
      case 'Powder': return 'bg-gray-100 text-gray-700';
      case 'Granule': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddToCart = (pesticide: Pesticide) => {
    setSelectedPesticide(pesticide);
    setQuantity(1);
  };

  const confirmAddToCart = () => {
    if (selectedPesticide) {
      CartManager.addToCart({
        id: `pesticide_${selectedPesticide.id}`,
        type: 'pesticides',
        name: selectedPesticide.name,
        weight: selectedPesticide.weight,
        price: selectedPesticide.price,
        quantity: quantity,
        image: '🧪',
        description: selectedPesticide.description,
        category: selectedPesticide.packagingType,
        brand: selectedPesticide.activeIngredient
      });
      
      setSelectedPesticide(null);
      setQuantity(1);
      
      toast({
        title: "Added to Cart",
        description: `${selectedPesticide.name} has been added to your cart`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center mr-4">
              <Beaker className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pesticides Store</h1>
              <p className="text-gray-600">Quality pesticides for crop protection</p>
            </div>
          </div>
        </div>

        {/* Pesticides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pesticides.map((pesticide) => (
            <Card key={pesticide.id} className="border-rose-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900 mb-2">
                      🧪 {pesticide.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-sm">
                        ⚖️ {pesticide.weight}
                      </Badge>
                      <Badge className={`text-xs ${getPackagingColor(pesticide.packagingType)}`}>
                        {getPackagingIcon(pesticide.packagingType)}
                        <span className="ml-1">{pesticide.packagingType}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Price */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price per unit:</span>
                    <div className="flex items-center font-bold text-rose-600">
                      <IndianRupee className="w-4 h-4" />
                      <span>{pesticide.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Active Ingredient */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Active Ingredient:</div>
                  <div className="text-sm text-gray-600">{pesticide.activeIngredient}</div>
                </div>

                {/* Target Pests */}
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Target Pests:</div>
                  <div className="flex flex-wrap gap-1">
                    {pesticide.targetPests.map((pest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {pest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stock */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Stock:</span>
                  <Badge variant={pesticide.stock > 10 ? "default" : "destructive"}>
                    {pesticide.stock} units
                  </Badge>
                </div>

                {/* Add to Cart Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-rose-600 hover:bg-rose-700"
                      onClick={() => handleAddToCart(pesticide)}
                      disabled={pesticide.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {pesticide.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add to Cart</DialogTitle>
                    </DialogHeader>
                    {selectedPesticide && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <h3 className="font-semibold text-lg">{selectedPesticide.name}</h3>
                          <p className="text-gray-600">{selectedPesticide.weight} - ₹{selectedPesticide.price}</p>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setQuantity(Math.min(selectedPesticide.stock, quantity + 1))}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-lg font-semibold">
                            Total: ₹{(selectedPesticide.price * quantity).toLocaleString()}
                          </p>
                        </div>
                        
                        <Button 
                          onClick={confirmAddToCart}
                          className="w-full bg-rose-600 hover:bg-rose-700"
                        >
                          Confirm Add to Cart
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PesticidesContainer;
