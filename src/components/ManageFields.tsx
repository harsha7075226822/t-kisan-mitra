
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Sprout, Plus, Loader2, Leaf, Droplets, Bug, Calendar } from 'lucide-react';

interface FieldData {
  id: string;
  name: string;
  crop: string;
  acres: number;
  status: 'healthy' | 'needs-water' | 'pest-alert' | 'fertilizer-needed';
  insight: string;
}

const ManageFields = () => {
  const [acres, setAcres] = useState('');
  const [crop, setCrop] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [guidance, setGuidance] = useState('');
  const [error, setError] = useState('');
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({ acres: '', crop: '' });

  // Mock field data for demonstration
  const [fields] = useState<FieldData[]>([
    {
      id: '1',
      name: 'Field 1: Rice',
      crop: 'Rice',
      acres: 2.5,
      status: 'healthy',
      insight: 'Perfect weather for growth - maintain current irrigation schedule'
    },
    {
      id: '2',
      name: 'Field 2: Cotton',
      crop: 'Cotton',
      acres: 3.0,
      status: 'needs-water',
      insight: 'Water tomorrow - weather conditions are favorable'
    },
    {
      id: '3',
      name: 'Field 3: Maize',
      crop: 'Maize',
      acres: 1.8,
      status: 'pest-alert',
      insight: 'Check for stem borer - apply organic neem spray if needed'
    }
  ]);

  const validateInputs = () => {
    const errors = { acres: '', crop: '' };
    let isValid = true;

    if (!acres || parseFloat(acres) <= 0) {
      errors.acres = 'Please enter valid number of acres (greater than 0)';
      isValid = false;
    }

    if (!crop.trim()) {
      errors.crop = 'Please enter the type of crop';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const getAIGuidance = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setError('');
    setGuidance('');

    try {
      const prompt = `You are an expert agricultural mentor providing comprehensive guidance for a farmer in Telangana, India. 

Farmer's Details:
- Crop: ${crop}
- Land Area: ${acres} acres
- Location: Telangana, India

Please provide a detailed, step-by-step farming guide that covers the ENTIRE growth cycle from day one to harvest. Your response should include:

1. **Growth Stages Timeline**: Key stages and approximate days for each phase
2. **Soil Preparation**: Specific recommendations for land preparation
3. **Seeding/Planting**: Best practices, spacing, and timing
4. **Irrigation Schedule**: Water requirements at different growth stages
5. **Fertilizer Plan**: NPK requirements, organic options, and application timing
6. **Pest & Disease Management**: Common issues for ${crop} and prevention/treatment
7. **Monitoring Tips**: What to watch for at each stage
8. **Harvesting Guidelines**: When and how to harvest for best yield
9. **Post-Harvest**: Storage and marketing tips

Make this a practical, actionable guide that a farmer can follow throughout the growing season. Include specific quantities, timing, and local considerations for Telangana's climate.`;

      // Simulate API call (replace with actual Gemini API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response for demonstration
      const mockResponse = `# Complete Farming Guide for ${crop} (${acres} acres)

## 🌱 Growth Stages Timeline (120-150 days total)
- **Days 1-15**: Soil preparation and sowing
- **Days 16-45**: Germination and early vegetative growth
- **Days 46-90**: Active vegetative growth and tillering
- **Days 91-120**: Reproductive phase and grain filling
- **Days 121-150**: Maturation and harvesting

## 🏞️ Soil Preparation
- Deep plowing 2-3 weeks before sowing
- Apply 5-7 tons of well-decomposed FYM per acre
- Ensure proper drainage and leveling
- Soil pH should be 6.0-7.0 for optimal growth

## 🌾 Seeding & Planting
- **Best time**: June-July (Kharif season) in Telangana
- **Seed rate**: 15-20 kg per acre for transplanting
- **Spacing**: 20cm x 15cm for optimal plant density
- **Depth**: 2-3 cm for direct seeding

## 💧 Irrigation Schedule
- **Week 1-2**: Light irrigation every 2 days
- **Week 3-6**: Irrigation every 4-5 days (vegetative stage)
- **Week 7-12**: Critical period - irrigation every 3 days
- **Week 13-16**: Reduce frequency, irrigation every 5-7 days
- **Total water requirement**: 1200-1500mm for entire crop

## 🧪 Fertilizer Plan
- **Basal dose**: 60kg N + 30kg P2O5 + 30kg K2O per acre
- **Top dressing**: 30kg N at tillering stage (30-35 days)
- **Second top dressing**: 30kg N at panicle initiation (50-55 days)
- **Organic option**: Vermicompost 2 tons/acre + neem cake 100kg/acre

## 🐛 Pest & Disease Management
- **Common pests**: Stem borer, brown planthopper, leaf folder
- **Prevention**: Use pheromone traps, maintain field hygiene
- **Organic treatment**: Neem oil spray (2ml/liter) weekly
- **Chemical treatment**: Consult local agricultural officer for recommendations

## 📊 Monitoring Tips
- Check for yellowing leaves (nitrogen deficiency)
- Monitor water levels in paddy fields
- Watch for pest damage on leaf tips
- Observe grain filling progress after flowering

## 🌾 Harvesting Guidelines
- **Timing**: When 80% of grains turn golden yellow
- **Method**: Cut 15-20cm above ground level
- **Drying**: Sun dry for 2-3 days to 14% moisture content
- **Expected yield**: 25-30 quintals per acre with good management

## 📦 Post-Harvest Tips
- Store in moisture-free containers
- Use proper gunny bags for storage
- Check local mandi prices before selling
- Consider value addition through processing

**Expected Investment**: ₹15,000-20,000 per acre
**Expected Returns**: ₹35,000-45,000 per acre (current market rates)

Remember to maintain detailed records of all activities for future reference and insurance claims.`;

      setGuidance(mockResponse);
    } catch (err) {
      setError('Failed to get AI guidance. Please try again later.');
      console.error('AI guidance error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <Leaf className="w-4 h-4 text-green-500" />;
      case 'needs-water': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'pest-alert': return <Bug className="w-4 h-4 text-red-500" />;
      case 'fertilizer-needed': return <Sprout className="w-4 h-4 text-yellow-500" />;
      default: return <Leaf className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'needs-water': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pest-alert': return 'bg-red-100 text-red-800 border-red-200';
      case 'fertilizer-needed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Sprout className="w-6 h-6 text-green-600" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Manage Your Fields
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Start Precision Farming Card */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Sprout className="w-5 h-5" />
              Start Precision Farming
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Add your field to unlock tailored insights and nutrient plans.
            </p>
            <Dialog open={showAddFieldModal} onOpenChange={setShowAddFieldModal}>
              <DialogTrigger asChild>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Field
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Field</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      This feature would typically lead to a detailed field registration form. 
                      For immediate assistance, please use the "Get AI-Powered Crop Guidance" section below.
                    </p>
                  </div>
                  <Button 
                    onClick={() => setShowAddFieldModal(false)}
                    className="w-full"
                  >
                    Got it
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* AI-Powered Crop Guidance */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Leaf className="w-5 h-5" />
              Get AI-Powered Crop Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="acres">Number of Acres</Label>
              <Input
                id="acres"
                type="number"
                step="0.1"
                placeholder="e.g., 5"
                value={acres}
                onChange={(e) => setAcres(e.target.value)}
                className={validationErrors.acres ? 'border-red-500' : ''}
              />
              {validationErrors.acres && (
                <p className="text-sm text-red-600">{validationErrors.acres}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="crop">Kind of Crop</Label>
              <Input
                id="crop"
                placeholder="e.g., Rice, Cotton, Maize"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className={validationErrors.crop ? 'border-red-500' : ''}
              />
              {validationErrors.crop && (
                <p className="text-sm text-red-600">{validationErrors.crop}</p>
              )}
            </div>

            <Button 
              onClick={getAIGuidance}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Getting Guidance...
                </>
              ) : (
                'Get Guidance'
              )}
            </Button>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Guidance Output */}
      {guidance && (
        <Card className="mt-6 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Calendar className="w-5 h-5" />
              Your Personalized Farming Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                {guidance}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Field Cards Section */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Fields</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field) => (
            <Card key={field.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-semibold text-gray-900">{field.name}</h5>
                    <p className="text-sm text-gray-600">{field.acres} acres</p>
                  </div>
                  <Badge className={`${getStatusColor(field.status)} border`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(field.status)}
                      <span className="capitalize text-xs">
                        {field.status.replace('-', ' ')}
                      </span>
                    </div>
                  </Badge>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-blue-800 font-medium mb-1">Today's Insight:</p>
                  <p className="text-sm text-blue-700">{field.insight}</p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3 text-green-700 border-green-300 hover:bg-green-50"
                >
                  View Detailed Guidance
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageFields;
