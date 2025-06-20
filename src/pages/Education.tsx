import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import EducationHeader from '@/components/education/EducationHeader';
import CategoryFilter from '@/components/education/CategoryFilter';
import EducationCard from '@/components/education/EducationCard';
import HelpSection from '@/components/education/HelpSection';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

const Education = () => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Convert language context format to the format expected by components
  const selectedLanguage = language === 'en' ? 'english' : language === 'te' ? 'telugu' : 'hindi';

  const educationContent = [
    {
      id: 1,
      title: { telugu: 'సేంద్రీయ వ్యవసాయం', english: 'Organic Farming Techniques', hindi: 'जैविक खेती तकनीक' },
      description: { 
        telugu: 'రసాయనాలు లేకుండా పంట పెంచడం', 
        english: 'Learn sustainable farming without harmful chemicals',
        hindi: 'हानिकारक रसायनों के बिना टिकाऊ खेती सीखें'
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
      title: { telugu: 'నేల పరీక్ష', english: 'Soil Testing Methods', hindi: 'मिट्टी परीक्षण विधियां' },
      description: { 
        telugu: 'మట్టిని ఎలా పరీక్షించాలి', 
        english: 'Complete guide to soil analysis and pH testing',
        hindi: 'मिट्टी विश्लेषण और पीएच परीक्षण की पूरी गाइड'
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
      title: { telugu: 'నీటి నిర్వహణ', english: 'Water Management & Irrigation', hindi: 'जल प्रबंधन और सिंचाई' },
      description: { 
        telugu: 'డ్రిప్ ఇరిగేషన్ మరియు నీటి సేవింగ్', 
        english: 'Drip irrigation setup and water conservation techniques',
        hindi: 'ड्रिप सिंचाई सेटअप और जल संरक्षण तकनीकें'
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
      title: { telugu: 'వరి సాగు', english: 'Modern Paddy Cultivation', hindi: 'आधुनिक धान की खेती' },
      description: { 
        telugu: 'వరి పంట సాగులో ఆధునిక పద్ధతులు', 
        english: 'Latest techniques in rice farming and yield optimization',
        hindi: 'चावल की खेती और उपज अनुकूलन में नवीनतम तकनीकें'
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
      title: { telugu: 'ఎరువుల వాడకం', english: 'Fertilizer Usage Guide', hindi: 'उर्वरक उपयोग गाइड' },
      description: { 
        telugu: 'సరైన ఎరువుల వాడకం మరియు మోతాదు', 
        english: 'Proper fertilizer application and dosage recommendations',
        hindi: 'उर्वरक अनुप्रयोग और खुराक सिफारिशें'
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
      title: { telugu: 'పప్పు పంటలు', english: 'Pulses Cultivation', hindi: 'दलहन की खेती' },
      description: { 
        telugu: 'పప్పు పంటలను పెంచడం మరియు నిర్వహణ', 
        english: 'Guides for growing, managing, and harvesting pulses',
        hindi: 'दलहन उगाने, प्रबंधित करने और कटाई के लिए गाइड'
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
      title: { telugu: 'ఆహార పంటలు', english: 'Food Crops', hindi: 'खाद्य फसलें' },
      description: { 
        telugu: 'పోషకాహార పంటలు మరియు కాలానుసార విత్తనలు', 
        english: 'Nutritional staples and seasonal sowing practices',
        hindi: 'पौष्टिक स्टेपल और मौसमी बुवाई प्रथाएं'
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
      title: { telugu: 'కూరగాయలు', english: 'Vegetables', hindi: 'सब्जियां' },
      description: { 
        telugu: 'ఇంటిలో మరియు వాణిజ్య కూరగాయల సాగు', 
        english: 'Home and commercial vegetable cultivation practices',
        hindi: 'घरेलू और वाणिज्यिक सब्जी की खेती के तरीके'
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
      title: { telugu: 'పండ్లు', english: 'Fruits', hindi: 'फल' },
      description: { 
        telugu: 'మామిడి, అరటి మరియు నిమ్మకాయ తోటల మేనేజ్‌మెంట్', 
        english: 'Best practices for mango, banana, and citrus orchards',
        hindi: 'आम, केला और खट्टे बागों के लिए सर्वोत्तम प्रथाएं'
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
      title: { telugu: 'పశు పెంపకం', english: 'Animal Husbandry & Allied', hindi: 'पशुपालन और संबद्ध' },
      description: { 
        telugu: 'పశువులు, గొర్రెలు మరియు మేకల పెంపకం', 
        english: 'Cattle, sheep, and goat farming with dairy practices',
        hindi: 'डेयरी प्रथाओं के साथ मवेशी, भेड़ और बकरी पालन'
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
    { id: 'all', name: { telugu: 'అన్నీ', english: 'All Topics', hindi: 'सभी विषय' } },
    { id: 'organic', name: { telugu: 'సేంద్రీయ వ్యవసాయం', english: 'Organic Farming', hindi: 'जैविक खेती' } },
    { id: 'soil', name: { telugu: 'నేల పరీక్ష', english: 'Soil Testing', hindi: 'मिट्टी परीक्षण' } },
    { id: 'water', name: { telugu: 'నీటి నిర్వహణ', english: 'Water Management', hindi: 'जल प्रबंधन' } },
    { id: 'crops', name: { telugu: 'పంట సాగు', english: 'Crop Cultivation', hindi: 'फसल खेती' } },
    { id: 'fertilizer', name: { telugu: 'ఎరువుల వాడకం', english: 'Fertilizer Usage', hindi: 'उर्वरक उपयोग' } },
    { id: 'pulses', name: { telugu: 'పప్పు పంటలు', english: 'Pulses', hindi: 'दलहन' } },
    { id: 'food-crops', name: { telugu: 'ఆహార పంటలు', english: 'Food Crops', hindi: 'खाद्य फसलें' } },
    { id: 'vegetables', name: { telugu: 'కూరగాయలు', english: 'Vegetables', hindi: 'सब्जियां' } },
    { id: 'fruits', name: { telugu: 'పండ్లు', english: 'Fruits', hindi: 'फल' } },
    { id: 'livestock', name: { telugu: 'పశు పెంపకం', english: 'Animal Husbandry', hindi: 'पशुपालन' } }
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
            {t('common.backToDashboard')}
          </Button>
        </div>

        {/* Language Selector for Education */}
        <div className="flex justify-end mb-4">
          <LanguageSelector showLabel={true} />
        </div>

        <EducationHeader />

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
