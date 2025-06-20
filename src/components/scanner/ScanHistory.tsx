import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { History, Calendar, Trash2, Eye, TrendingUp, AlertTriangle } from 'lucide-react';

interface ScanRecord {
  id: string;
  image: string;
  disease: string;
  diseaseInTelugu: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  date: Date;
  location?: string;
  notes?: string;
  treatment?: string;
  followUp?: boolean;
}

interface ScanHistoryProps {
  selectedLanguage: string;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({ selectedLanguage }) => {
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([]);
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('scanHistory');
    if (saved) {
      const parsed = JSON.parse(saved);
      const withDates = parsed.map((scan: any) => ({
        ...scan,
        date: new Date(scan.date)
      }));
      setScanHistory(withDates);
    } else {
      // Mock data for demonstration
      const mockHistory: ScanRecord[] = [
        {
          id: '1',
          image: '/api/placeholder/200/150',
          disease: 'Leaf Blight',
          diseaseInTelugu: 'ఆకు దహనం',
          severity: 'high',
          confidence: 87,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          location: 'Field A-1',
          treatment: 'Applied copper fungicide',
          followUp: true
        },
        {
          id: '2',
          image: '/api/placeholder/200/150',
          disease: 'Aphid Infestation',
          diseaseInTelugu: 'ఆఫిడ్ దాడి',
          severity: 'medium',
          confidence: 92,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          location: 'Field B-2',
          treatment: 'Neem oil spray applied',
          followUp: false
        },
        {
          id: '3',
          image: '/api/placeholder/200/150',
          disease: 'Healthy Leaf',
          diseaseInTelugu: 'ఆరోగ్యకరమైన ఆకు',
          severity: 'low',
          confidence: 95,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          location: 'Field C-3',
          followUp: false
        }
      ];
      setScanHistory(mockHistory);
      localStorage.setItem('scanHistory', JSON.stringify(mockHistory));
    }
  }, []);

  // Save scan history to localStorage whenever it changes
  const saveScanHistory = (history: ScanRecord[]) => {
    setScanHistory(history);
    localStorage.setItem('scanHistory', JSON.stringify(history));
  };

  const addScanRecord = (record: Omit<ScanRecord, 'id' | 'date'>) => {
    const newRecord: ScanRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date()
    };
    const updatedHistory = [newRecord, ...scanHistory];
    saveScanHistory(updatedHistory);
  };

  const deleteScanRecord = (id: string) => {
    const updatedHistory = scanHistory.filter(scan => scan.id !== id);
    saveScanHistory(updatedHistory);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <TrendingUp className="w-4 h-4" />;
      case 'low': return <Eye className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(selectedLanguage === 'te' ? 'te-IN' : 'en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDiseaseName = (scan: ScanRecord) => {
    return selectedLanguage === 'te' ? scan.diseaseInTelugu : scan.disease;
  };

  const getDiseaseStats = () => {
    const total = scanHistory.length;
    const healthy = scanHistory.filter(s => s.severity === 'low').length;
    const diseased = total - healthy;
    const highSeverity = scanHistory.filter(s => s.severity === 'high').length;
    
    return { total, healthy, diseased, highSeverity };
  };

  const stats = getDiseaseStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <History className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">
          {selectedLanguage === 'te' ? 'స్కాన్ చరిత్ర' : 'Scan History'}
        </h3>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">
              {selectedLanguage === 'te' ? 'మొత్తం స్కాన్లు' : 'Total Scans'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.healthy}</div>
            <div className="text-sm text-gray-600">
              {selectedLanguage === 'te' ? 'ఆరోగ్యకరమైనవి' : 'Healthy'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.diseased}</div>
            <div className="text-sm text-gray-600">
              {selectedLanguage === 'te' ? 'వ్యాధిగ్రస్తవి' : 'Diseased'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.highSeverity}</div>
            <div className="text-sm text-gray-600">
              {selectedLanguage === 'te' ? 'తీవ్రమైనవి' : 'Severe'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scan History List */}
      <div className="space-y-4">
        {scanHistory.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {selectedLanguage === 'te' 
                  ? 'ఇంకా స్కాన్లు లేవు. మీ మొదటి స్కాన్ ప్రారంభించండి!' 
                  : 'No scans yet. Start your first scan!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          scanHistory.map((scan) => (
            <Card key={scan.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img 
                      src={scan.image} 
                      alt="Scanned leaf" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold truncate">{getDiseaseName(scan)}</h4>
                        <Badge className={getSeverityColor(scan.severity)}>
                          {getSeverityIcon(scan.severity)}
                          <span className="ml-1 capitalize">{scan.severity}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(scan.date)}
                          </span>
                          <span>Confidence: {scan.confidence}%</span>
                        </div>
                        {scan.location && (
                          <div>Location: {scan.location}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedScan(scan);
                        setShowDetails(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteScanRecord(scan.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Detailed View Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedScan && (
            <>
              <DialogHeader>
                <DialogTitle>{getDiseaseName(selectedScan)}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img 
                  src={selectedScan.image} 
                  alt="Scanned leaf" 
                  className="w-full max-h-64 object-contain rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Severity:</span>
                    <Badge className={`ml-2 ${getSeverityColor(selectedScan.severity)}`}>
                      {selectedScan.severity}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Confidence:</span>
                    <span className="ml-2">{selectedScan.confidence}%</span>
                  </div>
                  <div>
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">{formatDate(selectedScan.date)}</span>
                  </div>
                  {selectedScan.location && (
                    <div>
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{selectedScan.location}</span>
                    </div>
                  )}
                </div>
                {selectedScan.treatment && (
                  <div>
                    <span className="font-medium">Treatment Applied:</span>
                    <p className="mt-1 text-gray-700">{selectedScan.treatment}</p>
                  </div>
                )}
                {selectedScan.notes && (
                  <div>
                    <span className="font-medium">Notes:</span>
                    <p className="mt-1 text-gray-700">{selectedScan.notes}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
