
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, BookOpen, Users, Clock } from 'lucide-react';

const Education = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('telugu');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const educationContent = [
    {
      id: 1,
      title: { telugu: 'సేంద్రీయ వ్యవసాయం', english: 'Organic Farming' },
      description: { 
        telugu: 'రసాయనాలు లేకుండా పంట పెంచడం', 
        english: 'Growing crops without chemicals' 
      },
      category: 'organic',
      duration: '15 min',
      type: 'video',
      instructor: 'డాక్టర్ రాజేష్',
      rating: 4.8
    },
    {
      id: 2,
      title: { telugu: 'నేల పరీక్ష', english: 'Soil Testing' },
      description: { 
        telugu: 'మట్టిని ఎలా పరీక్షించాలి', 
        english: 'How to test your soil' 
      },
      category: 'soil',
      duration: '12 min',
      type: 'video',
      instructor: 'ప్రొఫెసర్ సుధా',
      rating: 4.9
    },
    {
      id: 3,
      title: { telugu: 'నీటి నిర్వహణ', english: 'Water Management' },
      description: { 
        telugu: 'డ్రిప్ ఇరిగేషన్ మరియు నీటి సేవింగ్', 
        english: 'Drip irrigation and water saving' 
      },
      category: 'water',
      duration: '20 min',
      type: 'video',
      instructor: 'ఇంజనీర్ రమేష్',
      rating: 4.7
    },
    {
      id: 4,
      title: { telugu: 'కీటక నిర్మూలన', english: 'Pest Control' },
      description: { 
        telugu: 'సహజ మార్గాలలో కీటకాలను నియంత్రించడం', 
        english: 'Natural ways to control pests' 
      },
      category: 'pest',
      duration: '18 min',
      type: 'video',
      instructor: 'డాక్టర్ అనిల్',
      rating: 4.6
    },
    {
      id: 5,
      title: { telugu: 'వరి సాగు', english: 'Paddy Cultivation' },
      description: { 
        telugu: 'వరి పంట సాగులో ఆధునిక పద్ధతులు', 
        english: 'Modern methods in paddy farming' 
      },
      category: 'crops',
      duration: '25 min',
      type: 'video',
      instructor: 'ప్రొఫెసర్ కృష్ణ',
      rating: 4.8
    }
  ];

  const categories = [
    { id: 'all', name: { telugu: 'అన్నీ', english: 'All' } },
    { id: 'organic', name: { telugu: 'సేంద్రీయ వ్యవసాయం', english: 'Organic Farming' } },
    { id: 'soil', name: { telugu: 'నేల పరీక్ష', english: 'Soil Testing' } },
    { id: 'water', name: { telugu: 'నీటి నిర్వహణ', english: 'Water Management' } },
    { id: 'pest', name: { telugu: 'కీటక నిర్మూలన', english: 'Pest Control' } },
    { id: 'crops', name: { telugu: 'పంట సాగు', english: 'Crop Cultivation' } }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? educationContent 
    : educationContent.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {selectedLanguage === 'telugu' ? 'వ్యవసాయ విద్య' : 'Agricultural Education'}
          </h1>
          <p className="text-green-600">
            {selectedLanguage === 'telugu' 
              ? 'ఆధునిక వ్యవసాయ పద్ధతులను నేర్చుకోండి'
              : 'Learn modern farming techniques'
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

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 'bg-green-600 hover:bg-green-700' : 'border-green-300'}
            >
              {category.name[selectedLanguage]}
            </Button>
          ))}
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((content) => (
            <Card key={content.id} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {content.type === 'video' ? (selectedLanguage === 'telugu' ? 'వీడియో' : 'Video') : 'Article'}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    {content.duration}
                  </div>
                </div>
                <CardTitle className="text-lg">
                  {content.title[selectedLanguage]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {content.description[selectedLanguage]}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {content.instructor}
                  </div>
                  <div className="text-sm text-yellow-600">
                    ⭐ {content.rating}
                  </div>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-2" />
                  {selectedLanguage === 'telugu' ? 'చూడండి' : 'Watch Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
