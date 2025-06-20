
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, BookOpen, Users, Clock, Download, Volume2, ExternalLink } from 'lucide-react';

interface EducationContent {
  id: number;
  title: { telugu: string; english: string };
  description: { telugu: string; english: string };
  category: string;
  duration: string;
  type: string;
  instructor: string;
  rating: number;
  difficulty: string;
  hasAudio: boolean;
  youtubeUrl: string;
}

interface EducationCardProps {
  content: EducationContent;
  selectedLanguage: string;
  onWatchNow: (url: string) => void;
}

const EducationCard = ({ content, selectedLanguage, onWatchNow }: EducationCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const text = {
    watchNow: {
      english: 'Watch Now',
      telugu: 'ఇప్పుడు చూడండి'
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

  return (
    <Card className="border-green-200 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-green-700 border-green-300">
            <BookOpen className="w-3 h-3 mr-1" />
            {content.type === 'video' ? (selectedLanguage === 'telugu' ? 'వీడియో' : 'Video') : 
             content.type === 'playlist' ? (selectedLanguage === 'telugu' ? 'ప్లేలిస్ట్' : 'Playlist') :
             (selectedLanguage === 'telugu' ? 'వ్యాసం' : 'Article')}
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
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => onWatchNow(content.youtubeUrl)}
          >
            <Play className="w-4 h-4 mr-2" />
            {text.watchNow[selectedLanguage]}
            <ExternalLink className="w-4 h-4 ml-2" />
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
  );
};

export default EducationCard;
