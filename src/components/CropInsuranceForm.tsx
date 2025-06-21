
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, FileText, Check, Download, Printer } from 'lucide-react';
import CropInsuranceConfirmation from '@/components/CropInsuranceConfirmation';

interface InsuranceScheme {
  id: string;
  name: string;
  provider: string;
  icon: string;
  color: string;
  coverage: string[];
  benefits: string[];
  features: string[];
}

interface CropInsuranceFormProps {
  selectedScheme: InsuranceScheme;
  onBack: () => void;
}

interface FormData {
  fullName: string;
  aadhaarNumber: string;
  mobileNumber: string;
  state: string;
  district: string;
  villageName: string;
  landholdingSize: string;
  landOwnershipType: string;
  cropName: string;
  season: string;
  bankName: string;
  bankAccountNumber: string;
  ifscCode: string;
  aadhaarFile: FileList | null;
  landProofFile: FileList | null;
  bankPassbookFile: FileList | null;
  fieldPhotoFile: FileList | null;
}

const CropInsuranceForm: React.FC<CropInsuranceFormProps> = ({ selectedScheme, onBack }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [applicationId, setApplicationId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

  const telanganaDistricts = [
    'Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri', 'Sangareddy', 'Vikarabad',
    'Nizamabad', 'Kamareddy', 'Karimnagar', 'Peddapalli', 'Jagitial',
    'Rajanna Sircilla', 'Warangal Urban', 'Warangal Rural', 'Hanumakonda',
    'Jangaon', 'Jayashankar Bhupalpally', 'Mulugu', 'Bhadradri Kothagudem',
    'Khammam', 'Suryapet', 'Yadadri Bhuvanagiri', 'Nalgonda', 'Mahbubnagar',
    'Nagarkurnool', 'Wanaparthy', 'Gadwal', 'Jogulamba Gadwal'
  ];

  const banks = [
    'State Bank of India (SBI)',
    'ICICI Bank',
    'HDFC Bank',
    'Telangana Grameena Bank',
    'Andhra Bank',
    'Bank of Baroda',
    'Canara Bank',
    'Punjab National Bank',
    'Union Bank of India',
    'Indian Overseas Bank'
  ];

  const crops = [
    'Paddy/Rice', 'Cotton', 'Maize', 'Turmeric', 'Chilli', 'Sugarcane',
    'Wheat', 'Jowar', 'Bajra', 'Redgram', 'Bengal gram', 'Groundnut',
    'Sunflower', 'Castor', 'Soybean', 'Sesamum', 'Safflower'
  ];

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate application ID
    const appId = `CI${selectedScheme.provider.substring(0, 3).toUpperCase()}${Date.now().toString().slice(-6)}`;
    setApplicationId(appId);
    
    // Store application data in localStorage
    const applicationData = {
      applicationId: appId,
      scheme: selectedScheme,
      formData: data,
      submittedAt: new Date().toISOString(),
      status: 'Submitted'
    };
    
    const existingApplications = JSON.parse(localStorage.getItem('cropInsuranceApplications') || '[]');
    existingApplications.push(applicationData);
    localStorage.setItem('cropInsuranceApplications', JSON.stringify(existingApplications));
    
    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <CropInsuranceConfirmation 
        applicationId={applicationId}
        selectedScheme={selectedScheme}
        onNewApplication={() => {
          setShowConfirmation(false);
          onBack();
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Schemes
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Insurance Application Form</h1>
          <div className="flex items-center space-x-2 mt-1">
            <Badge className={`${selectedScheme.color} text-white`}>
              {selectedScheme.name}
            </Badge>
            <span className="text-sm text-gray-600">by {selectedScheme.provider}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...register('fullName', { required: 'Full name is required' })}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-600 mt-1">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                <Input
                  id="aadhaarNumber"
                  {...register('aadhaarNumber', { 
                    required: 'Aadhaar number is required',
                    pattern: {
                      value: /^\d{12}$/,
                      message: 'Aadhaar number must be 12 digits'
                    }
                  })}
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength={12}
                />
                {errors.aadhaarNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors.aadhaarNumber.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <Input
                id="mobileNumber"
                {...register('mobileNumber', { 
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Mobile number must be 10 digits'
                  }
                })}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
              {errors.mobileNumber && (
                <p className="text-sm text-red-600 mt-1">{errors.mobileNumber.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Location Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="state">State *</Label>
                <Select onValueChange={(value) => setValue('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telangana">Telangana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">District *</Label>
                <Select onValueChange={(value) => setValue('district', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {telanganaDistricts.map((district) => (
                      <SelectItem key={district} value={district.toLowerCase()}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="villageName">Village Name *</Label>
                <Input
                  id="villageName"
                  {...register('villageName', { required: 'Village name is required' })}
                  placeholder="Enter village name"
                />
                {errors.villageName && (
                  <p className="text-sm text-red-600 mt-1">{errors.villageName.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Land & Crop Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Land & Crop Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="landholdingSize">Landholding Size (in acres) *</Label>
                <Input
                  id="landholdingSize"
                  type="number"
                  step="0.01"
                  {...register('landholdingSize', { required: 'Landholding size is required' })}
                  placeholder="Enter land size in acres"
                />
                {errors.landholdingSize && (
                  <p className="text-sm text-red-600 mt-1">{errors.landholdingSize.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="landOwnershipType">Land Ownership Type *</Label>
                <Select onValueChange={(value) => setValue('landOwnershipType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ownership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="sharecropper">Sharecropper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cropName">Crop Name *</Label>
                <Select onValueChange={(value) => setValue('cropName', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop.toLowerCase()}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="season">Season *</Label>
                <Select onValueChange={(value) => setValue('season', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kharif">Kharif (June-October)</SelectItem>
                    <SelectItem value="rabi">Rabi (November-April)</SelectItem>
                    <SelectItem value="zaid">Zaid (April-June)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bank Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Select onValueChange={(value) => setValue('bankName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank.toLowerCase()}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankAccountNumber">Bank Account Number *</Label>
                <Input
                  id="bankAccountNumber"
                  {...register('bankAccountNumber', { required: 'Bank account number is required' })}
                  placeholder="Enter account number"
                />
                {errors.bankAccountNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors.bankAccountNumber.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="ifscCode">IFSC Code *</Label>
                <Input
                  id="ifscCode"
                  {...register('ifscCode', { 
                    required: 'IFSC code is required',
                    pattern: {
                      value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                      message: 'Invalid IFSC code format'
                    }
                  })}
                  placeholder="Enter IFSC code"
                  style={{ textTransform: 'uppercase' }}
                />
                {errors.ifscCode && (
                  <p className="text-sm text-red-600 mt-1">{errors.ifscCode.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Upload</CardTitle>
            <p className="text-sm text-gray-600">Upload clear images or PDF files (Max 5MB each)</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="aadhaarFile">Aadhaar Card *</Label>
                <div className="mt-1">
                  <Input
                    id="aadhaarFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register('aadhaarFile', { required: 'Aadhaar card is required' })}
                  />
                  {errors.aadhaarFile && (
                    <p className="text-sm text-red-600 mt-1">{errors.aadhaarFile.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="landProofFile">Land Ownership Proof *</Label>
                <div className="mt-1">
                  <Input
                    id="landProofFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register('landProofFile', { required: 'Land proof is required' })}
                  />
                  {errors.landProofFile && (
                    <p className="text-sm text-red-600 mt-1">{errors.landProofFile.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankPassbookFile">Bank Passbook Copy *</Label>
                <div className="mt-1">
                  <Input
                    id="bankPassbookFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    {...register('bankPassbookFile', { required: 'Bank passbook copy is required' })}
                  />
                  {errors.bankPassbookFile && (
                    <p className="text-sm text-red-600 mt-1">{errors.bankPassbookFile.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="fieldPhotoFile">Geo-tagged Field Photo (Optional)</Label>
                <div className="mt-1">
                  <Input
                    id="fieldPhotoFile"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    {...register('fieldPhotoFile')}
                  />
                  <p className="text-xs text-gray-500 mt-1">For faster claim processing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <FileText className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CropInsuranceForm;
