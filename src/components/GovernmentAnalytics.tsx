
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, MapPin, AlertTriangle } from 'lucide-react';

const GovernmentAnalytics = () => {
  const districtData = [
    { district: 'Hyderabad', farmers: 12500, yield: 85, subsidy: 2500000 },
    { district: 'Warangal', farmers: 18200, yield: 78, subsidy: 3200000 },
    { district: 'Nizamabad', farmers: 15800, yield: 82, subsidy: 2800000 },
    { district: 'Karimnagar', farmers: 16500, yield: 80, subsidy: 2900000 },
    { district: 'Khammam', farmers: 14200, yield: 77, subsidy: 2400000 },
  ];

  const cropDistribution = [
    { name: 'Rice', value: 35, color: '#10B981' },
    { name: 'Cotton', value: 28, color: '#3B82F6' },
    { name: 'Maize', value: 18, color: '#F59E0B' },
    { name: 'Sugarcane', value: 12, color: '#EF4444' },
    { name: 'Others', value: 7, color: '#8B5CF6' },
  ];

  const monthlyTrends = [
    { month: 'Jan', yield: 65, subsidyDisbursed: 1200000, farmers: 8500 },
    { month: 'Feb', yield: 68, subsidyDisbursed: 1350000, farmers: 9200 },
    { month: 'Mar', yield: 72, subsidyDisbursed: 1800000, farmers: 11000 },
    { month: 'Apr', yield: 75, subsidyDisbursed: 2100000, farmers: 12500 },
    { month: 'May', yield: 78, subsidyDisbursed: 2400000, farmers: 13800 },
    { month: 'Jun', yield: 82, subsidyDisbursed: 2800000, farmers: 15200 },
  ];

  const alerts = [
    { type: 'Drought Risk', districts: ['Nizamabad', 'Karimnagar'], severity: 'High', farmers: 8500 },
    { type: 'Pest Outbreak', districts: ['Warangal'], severity: 'Medium', farmers: 3200 },
    { type: 'Market Price Drop', districts: ['Khammam', 'Hyderabad'], severity: 'Low', farmers: 5700 },
  ];

  const stateStats = {
    totalFarmers: 77200,
    totalArea: 125000,
    averageYield: 80.4,
    subsidyDisbursed: 14800000,
    activeIoTDevices: 1250,
    voiceInteractions: 25600
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* State Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Farmers</p>
                <p className="text-lg font-bold text-blue-800">{stateStats.totalFarmers.toLocaleString()}</p>
              </div>
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Area</p>
                <p className="text-lg font-bold text-green-800">{stateStats.totalArea.toLocaleString()} acres</p>
              </div>
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Avg Yield</p>
                <p className="text-lg font-bold text-yellow-800">{stateStats.averageYield}%</p>
              </div>
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Subsidy</p>
                <p className="text-lg font-bold text-purple-800">₹{(stateStats.subsidyDisbursed / 10000000).toFixed(1)}Cr</p>
              </div>
              <div className="text-xl">💰</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">IoT Devices</p>
                <p className="text-lg font-bold text-indigo-800">{stateStats.activeIoTDevices}</p>
              </div>
              <div className="text-xl">📡</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rose-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Voice Calls</p>
                <p className="text-lg font-bold text-rose-800">{stateStats.voiceInteractions.toLocaleString()}</p>
              </div>
              <div className="text-xl">🎤</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>State-wide Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <div>
                      <div className="font-medium">{alert.type}</div>
                      <div className="text-sm text-gray-600">
                        Districts: {alert.districts.join(', ')} • {alert.farmers.toLocaleString()} farmers affected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Performance */}
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle>District-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="yield" fill="#10B981" name="Yield %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crop Distribution */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle>Crop Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {cropDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="yield" stroke="#10B981" name="Average Yield %" />
              <Line type="monotone" dataKey="farmers" stroke="#3B82F6" name="Active Farmers" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* District Data Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>District Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">District</th>
                  <th className="text-right p-2">Farmers</th>
                  <th className="text-right p-2">Yield %</th>
                  <th className="text-right p-2">Subsidy Disbursed</th>
                </tr>
              </thead>
              <tbody>
                {districtData.map((district, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{district.district}</td>
                    <td className="p-2 text-right">{district.farmers.toLocaleString()}</td>
                    <td className="p-2 text-right">{district.yield}%</td>
                    <td className="p-2 text-right">₹{district.subsidy.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentAnalytics;
