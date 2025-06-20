
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, AlertTriangle, Bug, Droplets } from 'lucide-react';

interface Disease {
  id: string;
  name: string;
  nameInTelugu: string;
  nameInHindi: string;
  cause: 'fungus' | 'virus' | 'pest' | 'nutrition';
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  symptomsInTelugu: string[];
  symptomsInHindi: string[];
  treatments: string[];
  treatmentsInTelugu: string[];
  treatmentsInHindi: string[];
  prevention: string[];
  preventionInTelugu: string[];
  preventionInHindi: string[];
  image: string;
  affectedCrops: string[];
}

const diseaseDatabase: Disease[] = [
  {
    id: '1',
    name: 'Leaf Blight',
    nameInTelugu: 'ఆకు దహనం',
    nameInHindi: 'पत्ती झुलसा',
    cause: 'fungus',
    severity: 'high',
    symptoms: ['Brown spots on leaves', 'Yellowing edges', 'Wilting'],
    symptomsInTelugu: ['ఆకులపై గోధుమ రంగు మచ్చలు', 'పసుపు అంచులు', 'వాడిపోవడం'],
    symptomsInHindi: ['पत्तियों पर भूरे धब्बे', 'पीले किनारे', 'मुरझाना'],
    treatments: ['Apply copper-based fungicide', 'Remove affected leaves', 'Improve air circulation'],
    treatmentsInTelugu: ['రాగి ఆధారిత శిలీంద్ర నాశిని వాడండి', 'బాధిత ఆకులను తొలగించండి', 'గాలి ప్రసరణ మెరుగుపరచండి'],
    treatmentsInHindi: ['तांबा आधारित कवकनाशी का उपयोग करें', 'प्रभावित पत्तियों को हटाएं', 'हवा का संचार बेहतर बनाएं'],
    prevention: ['Avoid overhead watering', 'Plant resistant varieties', 'Rotate crops'],
    preventionInTelugu: ['తలపై నీరు పోయకండి', 'నిరోధక రకాలను నాటండి', 'పంటలను మార్చుకోండి'],
    preventionInHindi: ['ऊपर से पानी देने से बचें', 'प्रतिरोधी किस्मों को लगाएं', 'फसल चक्र अपनाएं'],
    image: '/api/placeholder/300/200',
    affectedCrops: ['Tomato', 'Potato', 'Chili']
  },
  {
    id: '2',
    name: 'Aphid Infestation',
    nameInTelugu: 'ఆఫిడ్ దాడి',
    nameInHindi: 'माहू का संक्रमण',
    cause: 'pest',
    severity: 'medium',
    symptoms: ['Small green insects on leaves', 'Curled leaves', 'Sticky honeydew'],
    symptomsInTelugu: ['ఆకులపై చిన్న పచ్చని కీటకాలు', 'వంకర ఆకులు', 'అంటుకునే తేనె'],
    symptomsInHindi: ['पत्तियों पर छोटे हरे कीड़े', 'मुड़ी हुई पत्तियां', 'चिपचिपा शहद'],
    treatments: ['Use neem oil spray', 'Release ladybugs', 'Wash with soapy water'],
    treatmentsInTelugu: ['వేప నూనె స్ప్రే వాడండి', 'లేడీబగ్లను వదిలేయండి', 'సబ్బు నీటితో కడుక్కోండి'],
    treatmentsInHindi: ['नीम तेल का छिड़काव करें', 'लेडीबग छोड़ें', 'साबुन के पानी से धोएं'],
    prevention: ['Plant companion crops', 'Regular inspection', 'Maintain plant health'],
    preventionInTelugu: ['సహాయక పంటలను నాటండి', 'క్రమం తప్పకుండా తనిఖీ చేయండి', 'మొక్క ఆరోగ్యాన్ని కాపాడుకోండి'],
    preventionInHindi: ['सहयोगी फसलें लगाएं', 'नियमित निरीक्षण करें', 'पौधे का स्वास्थ्य बनाए रखें'],
    image: '/api/placeholder/300/200',
    affectedCrops: ['Cotton', 'Okra', 'Cabbage']
  },
  {
    id: '3',
    name: 'Nitrogen Deficiency',
    nameInTelugu: 'నత్రజని లోపం',
    nameInHindi: 'नाइट्रोजन की कमी',
    cause: 'nutrition',
    severity: 'medium',
    symptoms: ['Yellowing of older leaves', 'Stunted growth', 'Poor fruit development'],
    symptomsInTelugu: ['పాత ఆకులు పసుపు రంగులోకి మారడం', 'వృద్ధి తగ్గడం', 'పేలవమైన ఫల అభివృద్ధి'],
    symptomsInHindi: ['पुरानी पत्तियों का पीला होना', 'बौनी वृद्धि', 'खराब फल विकास'],
    treatments: ['Apply nitrogen fertilizer', 'Use organic compost', 'Foliar feeding'],
    treatmentsInTelugu: ['నత్రజని ఎరువు వేయండి', 'సేంద్రీయ కంపోస్ట్ వాడండి', 'ఆకుల ద్వారా పోషణ'],
    treatmentsInHindi: ['नाइट्रोजन उर्वरक डालें', 'जैविक खाद का उपयोग करें', 'पत्तियों पर छिड़काव करें'],
    prevention: ['Regular soil testing', 'Proper fertilization schedule', 'Use green manure'],
    preventionInTelugu: ['క్రమం తప్పకుండా మట్టి పరీక్ష', 'సరైన ఎరువు షెడ్యూల్', 'పచ్చి ఎరువు వాడండి'],
    preventionInHindi: ['नियमित मिट्टी परीक्षण', 'उचित उर्वरक कार्यक्रम', 'हरी खाद का उपयोग करें'],
    image: '/api/placeholder/300/200',
    affectedCrops: ['Rice', 'Wheat', 'Corn']
  }
];

interface DiseaseEncyclopediaProps {
  selectedLanguage: string;
}

export const DiseaseEncyclopedia: React.FC<DiseaseEncyclopediaProps> = ({ selectedLanguage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCause, setSelectedCause] = useState<string>('all');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

  const filteredDiseases = diseaseDatabase.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disease.nameInTelugu.includes(searchTerm) ||
      disease.nameInHindi.includes(searchTerm);
    const matchesCause = selectedCause === 'all' || disease.cause === selectedCause;
    return matchesSearch && matchesCause;
  });

  const getCauseIcon = (cause: string) => {
    switch (cause) {
      case 'fungus': return <AlertTriangle className="w-4 h-4" />;
      case 'pest': return <Bug className="w-4 h-4" />;
      case 'nutrition': return <Droplets className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getCauseColor = (cause: string) => {
    switch (cause) {
      case 'fungus': return 'bg-orange-100 text-orange-800';
      case 'pest': return 'bg-red-100 text-red-800';
      case 'nutrition': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisplayName = (disease: Disease) => {
    switch (selectedLanguage) {
      case 'te': return disease.nameInTelugu;
      case 'hi': return disease.nameInHindi;
      default: return disease.name;
    }
  };

  const getSymptoms = (disease: Disease) => {
    switch (selectedLanguage) {
      case 'te': return disease.symptomsInTelugu;
      case 'hi': return disease.symptomsInHindi;
      default: return disease.symptoms;
    }
  };

  const getTreatments = (disease: Disease) => {
    switch (selectedLanguage) {
      case 'te': return disease.treatmentsInTelugu;
      case 'hi': return disease.treatmentsInHindi;
      default: return disease.treatments;
    }
  };

  const getPrevention = (disease: Disease) => {
    switch (selectedLanguage) {
      case 'te': return disease.preventionInTelugu;
      case 'hi': return disease.preventionInHindi;
      default: return disease.prevention;
    }
  };

  if (selectedDisease) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => setSelectedDisease(null)}>
          ← Back to Encyclopedia
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{getDisplayName(selectedDisease)}</span>
              <div className="flex items-center space-x-2">
                <Badge className={getCauseColor(selectedDisease.cause)}>
                  {getCauseIcon(selectedDisease.cause)}
                  <span className="ml-1 capitalize">{selectedDisease.cause}</span>
                </Badge>
                <Badge variant={selectedDisease.severity === 'high' ? 'destructive' : selectedDisease.severity === 'medium' ? 'default' : 'secondary'}>
                  {selectedDisease.severity}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Symptoms / లక్షణాలు:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {getSymptoms(selectedDisease).map((symptom, index) => (
                  <li key={index} className="text-gray-700">{symptom}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Treatment / చికిత్స:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {getTreatments(selectedDisease).map((treatment, index) => (
                  <li key={index} className="text-green-700">{treatment}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Prevention / నివారణ:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {getPrevention(selectedDisease).map((prevention, index) => (
                  <li key={index} className="text-blue-700">{prevention}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Affected Crops:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDisease.affectedCrops.map((crop, index) => (
                  <Badge key={index} variant="outline">{crop}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Disease Encyclopedia</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search diseases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'fungus', 'pest', 'nutrition'].map((cause) => (
            <Button
              key={cause}
              variant={selectedCause === cause ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCause(cause)}
              className="capitalize"
            >
              {cause === 'all' ? 'All' : cause}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDiseases.map((disease) => (
          <Card key={disease.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent 
              className="p-4"
              onClick={() => setSelectedDisease(disease)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{getDisplayName(disease)}</h4>
                <Badge className={getCauseColor(disease.cause)}>
                  {getCauseIcon(disease.cause)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {getSymptoms(disease)[0]}...
              </p>
              <div className="flex justify-between items-center">
                <Badge variant={disease.severity === 'high' ? 'destructive' : disease.severity === 'medium' ? 'default' : 'secondary'}>
                  {disease.severity}
                </Badge>
                <span className="text-xs text-gray-500">
                  {disease.affectedCrops.length} crops affected
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
