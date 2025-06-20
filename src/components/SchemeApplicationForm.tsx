
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Upload, User, CreditCard, MapPin, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  aadhaarNumber: z.string().regex(/^\d{12}$/, 'Aadhaar must be 12 digits'),
  rationCard: z.string().min(5, 'Ration card number required'),
  mobileNumber: z.string().regex(/^\d{10}$/, 'Mobile must be 10 digits'),
  landAcres: z.string().min(1, 'Land acres required'),
  district: z.string().min(2, 'District required'),
  mandal: z.string().min(2, 'Mandal required'),
  accountNumber: z.string().min(9, 'Account number required'),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
  bankName: z.string().min(2, 'Bank name required'),
  termsAccepted: z.boolean().refine((val) => val === true, 'Please accept terms'),
});

type FormData = z.infer<typeof formSchema>;

interface SchemeApplicationFormProps {
  scheme: {
    id: number;
    name: string;
    amount: string;
    period: string;
  };
  onClose: () => void;
  onSubmit: (data: FormData & { schemeId: number }) => void;
}

const SchemeApplicationForm: React.FC<SchemeApplicationFormProps> = ({ scheme, onClose, onSubmit }) => {
  const { t } = useLanguage();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setUploadedFile(file);
    } else {
      alert('File size must be less than 5MB');
    }
  };

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({ ...data, schemeId: scheme.id });
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="text-xl text-green-800">
              Apply for {scheme.name}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
              {/* Scheme Info */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">{scheme.name}</h3>
                <p className="text-green-700 text-sm">
                  Amount: {scheme.amount} {scheme.period}
                </p>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Personal Information</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register('fullName')}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'border-red-500' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="mobileNumber">Mobile Number *</Label>
                    <Input
                      id="mobileNumber"
                      {...register('mobileNumber')}
                      placeholder="10-digit mobile number"
                      className={errors.mobileNumber ? 'border-red-500' : ''}
                    />
                    {errors.mobileNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                    <Input
                      id="aadhaarNumber"
                      {...register('aadhaarNumber')}
                      placeholder="12-digit Aadhaar number"
                      className={errors.aadhaarNumber ? 'border-red-500' : ''}
                    />
                    {errors.aadhaarNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.aadhaarNumber.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="rationCard">Ration Card Number *</Label>
                    <Input
                      id="rationCard"
                      {...register('rationCard')}
                      placeholder="Ration card number"
                      className={errors.rationCard ? 'border-red-500' : ''}
                    />
                    {errors.rationCard && (
                      <p className="text-red-500 text-sm mt-1">{errors.rationCard.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Land Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Land Details</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="landAcres">Land (Acres) *</Label>
                    <Input
                      id="landAcres"
                      {...register('landAcres')}
                      placeholder="Enter acres"
                      className={errors.landAcres ? 'border-red-500' : ''}
                    />
                    {errors.landAcres && (
                      <p className="text-red-500 text-sm mt-1">{errors.landAcres.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      {...register('district')}
                      placeholder="Enter district"
                      className={errors.district ? 'border-red-500' : ''}
                    />
                    {errors.district && (
                      <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="mandal">Mandal *</Label>
                    <Input
                      id="mandal"
                      {...register('mandal')}
                      placeholder="Enter mandal"
                      className={errors.mandal ? 'border-red-500' : ''}
                    />
                    {errors.mandal && (
                      <p className="text-red-500 text-sm mt-1">{errors.mandal.message}</p>
                    )}
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <Label htmlFor="pattaDocument">Patta Document *</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      id="pattaDocument"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="pattaDocument"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {uploadedFile ? uploadedFile.name : 'Click to upload Patta document'}
                      </span>
                      <span className="text-xs text-gray-500">PDF, JPEG, PNG (Max 5MB)</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Bank Details</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountNumber">Account Number *</Label>
                    <Input
                      id="accountNumber"
                      {...register('accountNumber')}
                      placeholder="Bank account number"
                      className={errors.accountNumber ? 'border-red-500' : ''}
                    />
                    {errors.accountNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.accountNumber.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="ifscCode">IFSC Code *</Label>
                    <Input
                      id="ifscCode"
                      {...register('ifscCode')}
                      placeholder="IFSC code"
                      className={errors.ifscCode ? 'border-red-500' : ''}
                    />
                    {errors.ifscCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.ifscCode.message}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Input
                      id="bankName"
                      {...register('bankName')}
                      placeholder="Bank name"
                      className={errors.bankName ? 'border-red-500' : ''}
                    />
                    {errors.bankName && (
                      <p className="text-red-500 text-sm mt-1">{errors.bankName.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  onCheckedChange={(checked) => setValue('termsAccepted', checked as boolean)}
                />
                <Label htmlFor="termsAccepted" className="text-sm text-gray-700 leading-relaxed">
                  I confirm that the provided details are accurate and I agree to the terms and conditions. 
                  I understand that providing false information may result in rejection of my application.
                </Label>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchemeApplicationForm;
