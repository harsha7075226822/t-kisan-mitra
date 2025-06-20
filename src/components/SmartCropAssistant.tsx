import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Plus, MapPin, Calendar, Sprout, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Crop {
  id: string;
  fieldName: string;
  cropType: string;
  area: string;
  location: string;
  plantingDate: string;
  expectedHarvestDate: string;
  currentStage: number;
  daysSincePlanting: number;
}

interface PesticidesSchedule {
  day: number;
  recommendation: string;
  status: 'completed' | 'pending' | 'upcoming';
}

const SmartCropAssistant = () => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAIGuidance, setShowAIGuidance] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [aiTip, setAiTip] = useState('');
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      fieldName: '',
      cropType: '',
      area: '',
      location: '',
      plantingDate: '',
      expectedHarvestDate: ''
    }
  });

  // Load crops from localStorage on component mount
  useEffect(() => {
    const savedCrops = localStorage.getItem('farmerCrops');
    if (savedCrops) {
      setCrops(JSON.parse(savedCrops));
    }
  }, []);

  // Save crops to localStorage whenever crops change
  useEffect(() => {
    localStorage.setItem('farmerCrops', JSON.stringify(crops));
  }, [crops]);

  const calculateDaysSincePlanting = (plantingDate: string) => {
    const planted = new Date(plantingDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - planted.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateCurrentStage = (daysSincePlanting: number) => {
    if (daysSincePlanting <= 7) return 1; // Germination
    if (daysSincePlanting <= 30) return 2; // Growth
    if (daysSincePlanting <= 60) return 3; // Flowering
    if (daysSincePlanting <= 90) return 4; // Fruiting
    return 5; // Harvest
  };

  const generateAITip = (crop: Crop) => {
    const tips = [
      `For your ${crop.cropType}, ensure adequate water drainage during the current growth phase.`,
      `Monitor your ${crop.cropType} for early signs of pest infestation. Regular inspection is key.`,
      `Apply organic fertilizer to boost your ${crop.cropType} growth at this stage.`,
      `Weather conditions are optimal for ${crop.cropType}. Continue with regular care routine.`,
      `Consider soil testing for your ${crop.fieldName} to optimize nutrient levels.`
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const getPesticidesSchedule = (daysSincePlanting: number): PesticidesSchedule[] => {
    const baseSchedule = [
      { day: 1, recommendation: 'Neem oil spray for pest prevention' },
      { day: 5, recommendation: 'Apply organic compost' },
      { day: 10, recommendation: 'Organic fungicide application' },
      { day: 15, recommendation: 'Urea fertilizer application' },
      { day: 20, recommendation: 'Pest control spray' },
      { day: 30, recommendation: 'Phosphorus fertilizer' },
      { day: 45, recommendation: 'Micronutrient foliar spray' },
      { day: 60, recommendation: 'Final pest control treatment' }
    ];

    return baseSchedule.map(item => ({
      ...item,
      status: daysSincePlanting > item.day ? 'completed' : 
              daysSincePlanting === item.day ? 'pending' : 'upcoming'
    }));
  };

  const getGrowthStages = (currentStage: number) => [
    { name: 'Germination', stage: 1, icon: '🌱', completed: currentStage >= 1 },
    { name: 'Growth', stage: 2, icon: '🌿', completed: currentStage >= 2 },
    { name: 'Flowering', stage: 3, icon: '🌸', completed: currentStage >= 3 },
    { name: 'Fruiting', stage: 4, icon: '🍇', completed: currentStage >= 4 },
    { name: 'Harvest', stage: 5, icon: '🌾', completed: currentStage >= 5 }
  ];

  const onSubmit = (data: any) => {
    const daysSincePlanting = calculateDaysSincePlanting(data.plantingDate);
    const currentStage = calculateCurrentStage(daysSincePlanting);
    
    const newCrop: Crop = {
      id: Date.now().toString(),
      fieldName: data.fieldName,
      cropType: data.cropType,
      area: data.area,
      location: data.location,
      plantingDate: data.plantingDate,
      expectedHarvestDate: data.expectedHarvestDate,
      currentStage,
      daysSincePlanting
    };

    setCrops(prev => [...prev, newCrop]);
    setShowAddForm(false);
    form.reset();
    
    toast({
      title: "Crop Added Successfully!",
      description: `${data.cropType} in ${data.fieldName} has been added to your dashboard.`,
    });
  };

  const handleAIGuidance = (crop: Crop) => {
    setSelectedCrop(crop);
    setAiTip(generateAITip(crop));
    setShowAIGuidance(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">✅ Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">🕗 Pending</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">🔜 Upcoming</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Smart Crop Assistant
        </h3>
        <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Crop
        </Button>
      </div>

      {crops.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-8 text-center">
            <Sprout className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Crops Added Yet</h4>
            <p className="text-gray-600 mb-4">Add your first crop to get AI-powered assistance and tracking</p>
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Crop
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {crops.map((crop) => (
            <Card key={crop.id} className="shadow-lg border-green-100">
              <CardHeader className="bg-green-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-800">{crop.fieldName} - {crop.cropType}</CardTitle>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    Day {crop.daysSincePlanting}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Field Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{crop.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Area: {crop.area} acres</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Planted: {new Date(crop.plantingDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* AI Tip of the Day */}
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-green-800 mb-2">💡 AI Tip of the Day</h5>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleAIGuidance(crop)}
                      className="text-green-700 border-green-300"
                    >
                      Get AI Guidance
                    </Button>
                  </div>
                  <p className="text-sm text-green-700">
                    {generateAITip(crop)}
                  </p>
                </div>

                {/* Growth Stages */}
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">🌱 Growth Stages</h5>
                  <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                    {getGrowthStages(crop.currentStage).map((stage, index) => (
                      <div key={stage.stage} className="flex flex-col items-center min-w-[80px]">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${
                          stage.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {stage.icon}
                        </div>
                        <span className={`text-xs text-center ${
                          stage.completed ? 'text-green-800 font-medium' : 'text-gray-600'
                        }`}>
                          {stage.name}
                        </span>
                        {stage.completed && (
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pesticides Schedule */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">🧪 Pesticide Schedule</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Day</th>
                          <th className="text-left py-2">Recommendation</th>
                          <th className="text-left py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPesticidesSchedule(crop.daysSincePlanting).slice(0, 5).map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 font-medium">Day {item.day}</td>
                            <td className="py-2">{item.recommendation}</td>
                            <td className="py-2">{getStatusBadge(item.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Crop Form Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Crop</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fieldName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Main Field, North Plot" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="tomato">Tomato</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="potato">Potato</SelectItem>
                        <SelectItem value="onion">Onion</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (in acres)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2.5" type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Hyderabad, Telangana" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plantingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planting Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expectedHarvestDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Harvest Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-2 pt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  Add Crop
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* AI Guidance Dialog */}
      <Dialog open={showAIGuidance} onOpenChange={setShowAIGuidance}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>AI Guidance for {selectedCrop?.cropType}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">🤖 AI Recommendation</h4>
              <p className="text-green-700">{aiTip}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">📊 Current Status</h4>
              <p className="text-blue-700">
                Your {selectedCrop?.cropType} is {selectedCrop?.daysSincePlanting} days old and in the{' '}
                {selectedCrop && getGrowthStages(selectedCrop.currentStage)[selectedCrop.currentStage - 1]?.name} stage.
              </p>
            </div>
            <Button onClick={() => setShowAIGuidance(false)} className="w-full">
              Got it, Thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SmartCropAssistant;
