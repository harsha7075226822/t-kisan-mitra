
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, BookOpen, Users, Clock, Download, Volume2, ArrowLeft } from 'lucide-react';

const Education = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Listen for global language changes
  useEffect(() => {
    const handleLanguageChange = (event) => {
      setSelectedLanguage(event.detail);
    };
    
    const savedLanguage = localStorage.getItem('appLanguage') || 'english';
    setSelectedLanguage(savedLanguage);
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const educationContent = [
    {
      id: 1,
      title: { telugu: 'సేంద్రీయ వ్యవసాయం', english: 'Organic Farming Techniques' },
      description: { 
        telugu: 'రసాయనాలు లేకుండా పంట పెంచడం', 
        english: 'Learn sustainable farming without harmful chemicals' 
      },
      category: 'organic',
      duration: '15 min',
      type: 'video',
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.8,
      difficulty: 'Beginner',
      hasAudio: true
    },
    {
      id: 2,
      title: { telugu: 'నేల పరీక్ష', english: 'Soil Testing Methods' },
      description: { 
        telugu: 'మట్టిని ఎలా పరీక్షించాలి', 
        english: 'Complete guide to soil analysis and pH testing' 
      },
      category: 'soil',
      duration: '12 min',
      type: 'video',
      instructor: 'Prof. Sudha Rani',
      rating: 4.9,
      difficulty: 'Intermediate',
      hasAudio: true
    },
    {
      id: 3,
      title: { telugu: 'నీటి నిర్వహణ', english: 'Water Management & Irrigation' },
      description: { 
        telugu: 'డ్రిప్ ఇరిగేషన్ మరియు నీటి సేవింగ్', 
        english: 'Drip irrigation setup and water conservation techniques' 
      },
      category: 'water',
      duration: '20 min',
      type: 'video',
      instructor: 'Engineer Ramesh',
      rating: 4.7,
      difficulty: 'Advanced',
      hasAudio: true
    },
    {
      id: 4,
      title: { telugu: 'కీటక నిర్మూలన', english: 'Natural Pest Control' },
      description: { 
        telugu: 'సహజ మార్గాలలో కీటకాలను నియంత్రించడం', 
        english: 'Eco-friendly methods to control crop pests' 
      },
      category: 'pest',
      duration: '18 min',
      type: 'article',
      instructor: 'Dr. Anil Sharma',
      rating: 4.6,
      difficulty: 'Beginner',
      hasAudio: false
    },
    {
      id: 5,
      title: { telugu: 'వరి సాగు', english: 'Modern Paddy Cultivation' },
      description: { 
        telugu: 'వరి పంట సాగులో ఆధునిక పద్ధతులు', 
        english: 'Latest techniques in rice farming and yield optimization' 
      },
      category: 'crops',
      duration: '25 min',
      type: 'video',
      instructor: 'Prof. Krishna Reddy',
      rating: 4.8,
      difficulty: 'Intermediate',
      hasAudio: true
    },
    {
      id: 6,
      title: { telugu: 'ఎరువుల వాడకం', english: 'Fertilizer Usage Guide' },
      description: { 
        telugu: 'సరైన ఎరువుల వాడకం మరియు మోతాదు', 
        english: 'Proper fertilizer application and dosage recommendations' 
      },
      category: 'fertilizer',
      duration: '14 min',
      type: 'video',
      instructor: 'Dr. Priya Sharma',
      rating: 4.5,
      difficulty: 'Beginner',
      hasAudio: true
    }
  ];

  const categories = [
    { id: 'all', name: { telugu: 'అన్నీ', english: 'All Topics' } },
    { id: 'organic', name: { telugu: 'సేంద్రీయ వ్యవసాయం', english: 'Organic Farming' } },
    { id: 'soil', name: { telugu: 'నేల పరీక్ష', english: 'Soil Testing' } },
    { id: 'water', name: { telugu: 'నీటి నిర్వహణ', english: 'Water Management' } },
    { id: 'pest', name: { telugu: 'కీటక నిర్మూలన', english: 'Pest Control' } },
    { id: 'crops', name: { telugu: 'పంట సాగు', english: 'Crop Cultivation' } },
    { id: 'fertilizer', name: { telugu: 'ఎరువుల వాడకం', english: 'Fertilizer Usage' } }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? educationContent 
    : educationContent.filter(item => item.category === selectedCategory);

  const text = {
    title: {
      english: 'Agricultural Education',
      telugu: 'వ్యవసాయ విద్య'
    },
    subtitle: {
      english: 'Learn modern farming techniques and best practices',
      telugu: 'ఆధునిక వ్యవసాయ పద్ధతులను నేర్చుకోండి'
    },
    watchNow: {
      english: 'Watch Now',
      telugu: 'ఇప్పుడు చూడండి'
    },
    readNow: {
      english: 'Read Article',
      telugu: 'వ్యాసం చదవండి'
    },
    playAudio: {
      english: 'Play Audio',
      telugu: 'ఆడియో వినండి'
    },
    download: {
      english: 'Download',
      telugu: 'డౌన్‌లోడ్'
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            {text.title[selectedLanguage]}
          </h1>
          <p className="text-green-600">
            {text.subtitle[selectedLanguage]}
          </p>
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
                    {content.type === 'video' ? (selectedLanguage === 'telugu' ? 'వీడియో' : 'Video') : (selectedLanguage === 'telugu' ? 'వ్యాసం' : 'Article')}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    {content.duration}
                  </div>
                </div>
                <CardTitle className="text-lg">
                  {content.title[selectedLanguage]}
                </CardTitle>
                <Badge className={getDifficultyColor(content.difficulty)} variant="outline">
                  {content.difficulty}
                </Badge>
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
                
                <div className="space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    {content.type === 'video' ? text.watchNow[selectedLanguage] : text.readNow[selectedLanguage]}
                  </Button>
                  
                  <div className="flex space-x-2">
                    {content.hasAudio && (
                      <Button variant="outline" className="flex-1" size="sm">
                        <Volume2 className="w-4 h-4 mr-1" />
                        {text.playAudio[selectedLanguage]}
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      {text.download[selectedLanguage]}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                {selectedLanguage === 'english' ? 'Learning Resources' : 'అభ్యాస వనరులు'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 mb-2">
                    {selectedLanguage === 'english' 
                      ? '• All content available in audio format for easy learning'
                      : '• అన్ని కంటెంట్ సులభ అభ్యాసం కోసం ఆడియో ఫార్మాట్‌లో అందుబాటులో ఉంది'
                    }
                  </p>
                  <p className="text-blue-700">
                    {selectedLanguage === 'english' 
                      ? '• Download materials for offline access'
                      : '• ఆఫ్‌లైన్ యాక్సెస్ కోసం మెటీరియల్స్ డౌన్‌లోడ్ చేయండి'
                    }
                  </p>
                </div>
                <div>
                  <p className="text-blue-700 mb-2">
                    {selectedLanguage === 'english' 
                      ? '• Expert instructors from agricultural universities'
                      : '• వ్యవసాయ విశ్వవిద్యాలయాల నుండి నిపుణ బోధకులు'
                    }
                  </p>
                  <p className="text-blue-700">
                    {selectedLanguage === 'english' 
                      ? '• Interactive content with practical examples'
                      : '• ప్రాక్టికల్ ఉదాహరణలతో ఇంటరాక్టివ్ కంటెంట్'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Education;
