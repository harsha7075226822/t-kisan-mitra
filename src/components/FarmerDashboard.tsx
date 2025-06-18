
import React from 'react';
import { TrendingUp, AlertTriangle, Droplets, Bug, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FarmerDashboard = () => {
  const farmStats = {
    totalArea: 5.2,
    activeFields: 4,
    expectedYield: 85,
    monthlyRevenue: 45000
  };

  const alerts = [
    {
      type: 'pest',
      severity: 'high',
      message: 'Aphid infestation detected in tomato field',
      action: 'Apply neem-based pesticide immediately',
      field: 'Field A',
      icon: Bug,
      color: 'red'
    },
    {
      type: 'irrigation',
      severity: 'medium', 
      message: 'Soil moisture low in cotton field',
      action: 'Schedule irrigation for tonight',
      field: 'Field B',
      icon: Droplets,
      color: 'blue'
    },
    {
      type: 'weather',
      severity: 'low',
      message: 'Heavy rain expected in 2 days',
      action: 'Harvest ready crops before rain',
      field: 'All Fields',
      icon: AlertTriangle,
      color: 'yellow'
    }
  ];

  const cropProgress = [
    { crop: 'Tomato', field: 'Field A', stage: 'Flowering', progress: 65, daysToHarvest: 25 },
    { crop: 'Cotton', field: 'Field B', stage: 'Vegetative', progress: 40, daysToHarvest: 85 },
    { crop: 'Rice', field: 'Field C', stage: 'Maturity', progress: 90, daysToHarvest: 7 },
    { crop: 'Wheat', field: 'Field D', stage: 'Grain Fill', progress: 75, daysToHarvest: 15 }
  ];

  const recentActivities = [
    { activity: 'Applied fertilizer to Field A', time: '2 hours ago', icon: '🌱' },
    { activity: 'Irrigation completed in Field C', time: '6 hours ago', icon: '💧' },
    { activity: 'Pest monitoring in Field B', time: '1 day ago', icon: '🔍' },
    { activity: 'Soil testing results received', time: '2 days ago', icon: '📊' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Farm Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Area</p>
                <p className="text-2xl font-bold text-green-800">{farmStats.totalArea} acres</p>
              </div>
              <div className="text-3xl">🌾</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Fields</p>
                <p className="text-2xl font-bold text-blue-800">{farmStats.activeFields}</p>
              </div>
              <div className="text-3xl">🚜</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expected Yield</p>
                <p className="text-2xl font-bold text-yellow-800">{farmStats.expectedYield}%</p>
              </div>
              <div className="text-3xl">📈</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-800">₹{farmStats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Recommendations */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Urgent Alerts / అత్యవసర హెచ్చరికలు</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <alert.icon className="w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-sm mt-1">
                        <strong>Action:</strong> {alert.action}
                      </div>
                      <div className="text-xs mt-1 opacity-75">
                        Field: {alert.field}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Progress */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>Crop Progress / పంట పురోగతి</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cropProgress.map((crop, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="font-medium">{crop.crop}</div>
                      <div className="text-sm text-gray-600">{crop.field} • {crop.stage}</div>
                    </div>
                    <Badge variant="outline" className="text-green-700">
                      {crop.daysToHarvest} days to harvest
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Growth Progress</span>
                      <span>{crop.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${crop.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle>Recent Activities / ఇటీవలి కార్యకలాపాలు</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.activity}</div>
                    <div className="text-xs text-gray-600">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
