import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import EducationHeader from '@/components/education/EducationHeader';
import CategoryFilter from '@/components/education/CategoryFilter';
import EducationCard from '@/components/education/EducationCard';
import HelpSection from '@/components/education/HelpSection';

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
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=hNzBTubwLPg&list=PLsYNGjPcNZjiCml3kSS8i7tuugMWtp-zl'
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
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=wA5_fE5f4Fw&pp=ygUgIFNvaWwgVGVzdGluZyBNZXRob2RzIGFubmFkaGF0aGE%3D'
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
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=L3x_kN6inl4&pp=ygUpIFdhdGVyIE1hbmFnZW1lbnQgJiBJcnJpZ2F0aW9uIGFubmFkaGF0aGE%3D'
    },
    {
      id: 4,
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
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=208uKVwh2bM&pp=ygUlLiBNb2Rlcm4gUGFkZHkgQ3VsdGl2YXRpb24gYW5uYWRoYXRoYQ%3D%3D'
    },
    {
      id: 5,
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
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=0Ox9xHpB4ss&pp=ygUlKkZlcnRpbGl6ZXIgVXNhZ2UgR3VpZGUqIGluIGFubmFkYXRoYQ%3D%3D'
    },
    {
      id: 6,
      title: { telugu: 'పప్పు పంటలు', english: 'Pulses Cultivation' },
      description: { 
        telugu: 'పప్పు పంటలను పెంచడం మరియు నిర్వహణ', 
        english: 'Guides for growing, managing, and harvesting pulses' 
      },
      category: 'pulses',
      duration: '56 videos',
      type: 'playlist',
      instructor: 'Category: Pulses',
      rating: 4.6,
      difficulty: 'Beginner',
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=hDBI2qIPsYY&list=PLsYNGjPcNZjgFUIjiwby3Mu5wwKILtYHB'
    },
    {
      id: 7,
      title: { telugu: 'ఆహార పంటలు', english: 'Food Crops' },
      description: { 
        telugu: 'పోషకాహార పంటలు మరియు కాలానుసార విత్తనలు', 
        english: 'Nutritional staples and seasonal sowing practices' 
      },
      category: 'food-crops',
      duration: '226 videos',
      type: 'playlist',
      instructor: 'Category: Food Crops',
      rating: 4.7,
      difficulty: 'Intermediate',
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=Ian-dlzRvqQ&list=PLsYNGjPcNZjjH3VnuuWmvc4sRc902bhpz'
    },
    {
      id: 8,
      title: { telugu: 'కూరగాయలు', english: 'Vegetables' },
      description: { 
        telugu: 'ఇంటిలో మరియు వాణిజ్య కూరగాయల సాగు', 
        english: 'Home and commercial vegetable cultivation practices' 
      },
      category: 'vegetables',
      duration: '64 videos',
      type: 'playlist',
      instructor: 'Category: Vegetables',
      rating: 4.5,
      difficulty: 'Beginner',
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=Ian-dlzRvqQ&list=PLsYNGjPcNZjjH3VnuuWmvc4sRc902bhpz'
    },
    {
      id: 9,
      title: { telugu: 'పండ్లు', english: 'Fruits' },
      description: { 
        telugu: 'మామిడి, అరటి మరియు నిమ్మకాయ తోటల మేనేజ్‌మెంట్', 
        english: 'Best practices for mango, banana, and citrus orchards' 
      },
      category: 'fruits',
      duration: '136 videos',
      type: 'playlist',
      instructor: 'Category: Fruits',
      rating: 4.8,
      difficulty: 'Beginner',
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=QBXj9Jmy020&list=PLsYNGjPcNZjhXY3Dyrnp5UyuJyPoDxidR'
    },
    {
      id: 10,
      title: { telugu: 'పశు పెంపకం', english: 'Animal Husbandry & Allied' },
      description: { 
        telugu: 'పశువులు, గొర్రెలు మరియు మేకల పెంపకం', 
        english: 'Cattle, sheep, and goat farming with dairy practices' 
      },
      category: 'livestock',
      duration: '223 videos',
      type: 'playlist',
      instructor: 'Category: Animal Farming',
      rating: 4.9,
      difficulty: 'Advanced',
      hasAudio: true,
      youtubeUrl: 'https://www.youtube.com/watch?v=kuG_cT6VMZM&list=PLsYNGjPcNZjhCAcTrU4L2xRbNKes1N2yY'
    }
  ];

  const categories = [
    { id: 'all', name: { telugu: 'అన్నీ', english: 'All Topics' } },
    { id: 'organic', name: { telugu: 'సేంద్రీయ వ్యవసాయం', english: 'Organic Farming' } },
    { id: 'soil', name: { telugu: 'నేల పరీక్ష', english: 'Soil Testing' } },
    { id: 'water', name: { telugu: 'నీటి నిర్వహణ', english: 'Water Management' } },
    { id: 'crops', name: { telugu: 'పంట సాగు', english: 'Crop Cultivation' } },
    { id: 'fertilizer', name: { telugu: 'ఎరువుల వాడకం', english: 'Fertilizer Usage' } },
    { id: 'pulses', name: { telugu: 'పప్పు పంటలు', english: 'Pulses' } },
    { id: 'food-crops', name: { telugu: 'ఆహార పంటలు', english: 'Food Crops' } },
    { id: 'vegetables', name: { telugu: 'కూరగాయలు', english: 'Vegetables' } },
    { id: 'fruits', name: { telugu: 'పండ్లు', english: 'Fruits' } },
    { id: 'livestock', name: { telugu: 'పశు పెంపకం', english: 'Animal Husbandry' } }
  ];

  const filteredContent = selectedCategory === 'all' 
    ? educationContent 
    : educationContent.filter(item => item.category === selectedCategory);

  const handleWatchNow = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
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

        <EducationHeader selectedLanguage={selectedLanguage} />

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          selectedLanguage={selectedLanguage}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((content) => (
            <EducationCard
              key={content.id}
              content={content}
              selectedLanguage={selectedLanguage}
              onWatchNow={handleWatchNow}
            />
          ))}
        </div>

        <HelpSection selectedLanguage={selectedLanguage} />
      </div>
    </div>
  );
};

export default Education;
