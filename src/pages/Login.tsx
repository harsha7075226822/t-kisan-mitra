
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Phone, User, CheckCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('details'); // 'details' or 'otp'
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    otp: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!formData.fullName || !formData.mobile) {
      alert('Please fill all fields');
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      alert(`OTP sent to ${formData.mobile}`);
    }, 2000);
  };

  const handleVerifyOTP = async () => {
    if (formData.otp.length !== 6) {
      alert('Please enter 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      // Store user data in localStorage for demo
      localStorage.setItem('kisanUser', JSON.stringify({
        name: formData.fullName,
        mobile: formData.mobile,
        aadhaar: '****-****-' + Math.floor(Math.random() * 9999).toString().padStart(4, '0')
      }));
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🌾</div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">Smart AgriConnect</h1>
          <p className="text-green-600">AI-Powered Farming Assistant - Telangana</p>
        </div>

        <Card className="shadow-lg border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-green-800">
              {step === 'details' ? 'Farmer Registration' : 'OTP Verification'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'details' ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    OTP sent to {formData.mobile}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Enter 6-digit OTP</label>
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={6} 
                      value={formData.otp}
                      onChange={(value) => setFormData({...formData, otp: value})}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleVerifyOTP}
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setStep('details')}
                    className="w-full"
                  >
                    Go Back
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Helpline: 1800-XXX-XXXX</p>
          <p>For support: support@smartagriconnect.telangana.gov.in</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
