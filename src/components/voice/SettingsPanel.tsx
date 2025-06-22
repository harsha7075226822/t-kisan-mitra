
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

interface SettingsPanelProps {
  showSettings: boolean;
  apiKey: string;
  useLocalAI: boolean;
  language: string;
  onApiKeyChange: (key: string) => void;
  onUseLocalAIChange: (useLocal: boolean) => void;
  onSaveSettings: () => void;
  t: any;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  showSettings,
  apiKey,
  useLocalAI,
  language,
  onApiKeyChange,
  onUseLocalAIChange,
  onSaveSettings,
  t
}) => {
  if (!showSettings) return null;

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>{t.settings}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">{t.apiKeyLabel}</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="sk-..."
          />
          <p className="text-sm text-gray-600">
            {language === 'te' 
              ? 'ChatGPT ఉపయోగించడానికి OpenAI API కీ అవసరం'
              : 'OpenAI API key required to use ChatGPT'
            }
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant={useLocalAI ? "default" : "outline"}
            onClick={() => onUseLocalAIChange(true)}
          >
            {t.useLocalAI}
          </Button>
          <Button
            variant={!useLocalAI ? "default" : "outline"}
            onClick={() => onUseLocalAIChange(false)}
          >
            {t.useChatGPT}
          </Button>
        </div>
        <Button onClick={onSaveSettings} className="w-full">
          {t.saveSettings}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
