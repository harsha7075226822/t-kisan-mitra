
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Banknote, ExternalLink } from 'lucide-react';

const Schemes = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('telugu');

  const schemes = [
    {
      id: 1,
      name: { telugu: 'రైతు బరోసా', english: 'Rythu Bharosa' },
      state: 'Andhra Pradesh',
      amount: '₹13,500',
      period: { telugu: 'సంవత్సరానికి', english: 'per year' },
      eligibility: {
        telugu: ['రైతు కార్డ్ కలిగిన వారు', '2.5 ఎకరాల వరకు', 'ఆంధ్రప్రదేశ్ నివాసులు'],
        english: ['Farmers with Rythu Card', 'Up to 2.5 acres', 'Andhra Pradesh residents']
      },
      benefits: {
        telugu: ['వ్యవసాయ సహాయం', 'ఉచిత విత్తనాలు', 'కృషి రుణ మాఫీ'],
        english: ['Agricultural support', 'Free seeds', 'Crop loan waiver']
      },
      status: 'active'
    },
    {
      id: 2,
      name: { telugu: 'రైతు బంధు', english: 'Rythu Bandhu' },
      state: 'Telangana',
      amount: '₹10,000',
      period: { telugu: 'సంవత్సరానికి', english: 'per year' },
      eligibility: {
        telugu: ['తెలంగాణ రైతులు', 'భూ యాజమాన్యం', 'పాట్టా కలిగిన వారు'],
        english: ['Telangana farmers', 'Land ownership', 'Patta holders']
      },
      benefits: {
        telugu: ['పంట బీమా', 'వ్యవసాయ సబ్సిడీ', 'ఉచిత కరెంట్'],
        english: ['Crop insurance', 'Agricultural subsidy', 'Free electricity']
      },
      status: 'active'
    },
    {
      id: 3,
      name: { telugu: 'PM కిసాన్', english: 'PM-KISAN' },
      state: 'Central Scheme',
      amount: '₹6,000',
      period: { telugu: 'సంవత్సరానికి', english: 'per year' },
      eligibility: {
        telugu: ['2 హెక్టేరుల వరకు', 'రైతు కుటుంబాలు', 'ఆధార్ కార్డ్ తప్పనిసరి'],
        english: ['Up to 2 hectares', 'Farmer families', 'Aadhaar mandatory']
      },
      benefits: {
        telugu: ['3 వందల వాయిదాలు', 'DBT ద్వారా చెల్లింపు', 'పంట సాగు సహాయం'],
        english: ['3 installments', 'DBT payments', 'Crop cultivation support']
      },
      status: 'active'
    },
    {
      id: 4,
      name: { telugu: 'PM ఫసల్ బీమా', english: 'PM Fasal Bima' },
      state: 'Central Scheme',
      amount: { telugu: 'వేరియబుల్', english: 'Variable' },
      period: { telugu: 'సీజన్‌కు', english: 'per season' },
      eligibility: {
        telugu: ['అన్ని రైతులు', 'రుణ రైతులు తప్పనిసరి', 'నామినేషన్ అవసరం'],
        english: ['All farmers', 'Mandatory for loan farmers', 'Nomination required']
      },
      benefits: {
        telugu: ['పంట నష్టం భర్తీ', 'సహజ విపత్తుల కవరేజ్', 'తక్కువ ప్రీమియం'],
        english: ['Crop loss compensation', 'Natural disaster coverage', 'Low premium']
      },
      status: 'active'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cream-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {selectedLanguage === 'telugu' ? 'ప్రభుత్వ పథకాలు' : 'Government Schemes'}
          </h1>
          <p className="text-green-600">
            {selectedLanguage === 'telugu' 
              ? 'రైతులకు అందుబాటులో ఉన్న ప్రభుత్వ సహాయ పథకాలు'
              : 'Government assistance schemes available for farmers'
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

        {/* Schemes Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-blue-700 border-blue-300">
                    <Building2 className="w-3 h-3 mr-1" />
                    {scheme.state}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    {selectedLanguage === 'telugu' ? 'సక్రియం' : 'Active'}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-green-800">
                  {scheme.name[selectedLanguage]}
                </CardTitle>
                <div className="flex items-center space-x-2 text-lg font-bold text-green-600">
                  <Banknote className="w-5 h-5" />
                  <span>{scheme.amount}</span>
                  <span className="text-sm text-gray-600">{scheme.period[selectedLanguage]}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Eligibility */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {selectedLanguage === 'telugu' ? 'అర్హత:' : 'Eligibility:'}
                  </h4>
                  <ul className="space-y-1">
                    {scheme.eligibility[selectedLanguage].map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {selectedLanguage === 'telugu' ? 'ప్రయోజనాలు:' : 'Benefits:'}
                  </h4>
                  <ul className="space-y-1">
                    {scheme.benefits[selectedLanguage].map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {selectedLanguage === 'telugu' ? 'దరఖాస్తు చేయండి' : 'Apply Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                {selectedLanguage === 'telugu' ? 'సహాయం అవసరమా?' : 'Need Help?'}
              </h3>
              <p className="text-blue-600 mb-4">
                {selectedLanguage === 'telugu' 
                  ? 'పథక వివరాలు మరియు దరఖాస్తు ప్రక్రియ గురించి మరింత తెలుసుకోండి'
                  : 'Learn more about scheme details and application process'
                }
              </p>
              <Button variant="outline" className="border-blue-300 text-blue-700">
                <Users className="w-4 h-4 mr-2" />
                {selectedLanguage === 'telugu' ? 'హెల్ప్‌లైన్: 1800-XXX-XXXX' : 'Helpline: 1800-XXX-XXXX'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schemes;
