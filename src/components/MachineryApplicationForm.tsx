
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, User, Phone, MapPin, Tractor } from 'lucide-react';

interface Machinery {
  id: string;
  name: string;
  type: string;
  originalPrice: number;
  subsidizedPrice: number;
  subsidyPercentage: string;
}

interface ApplicationFormProps {
  selectedMachine: Machinery;
  onApplicationSubmit: (applicationData: any) => void;
}

const MachineryApplicationForm: React.FC<ApplicationFormProps> = ({
  selectedMachine,
  onApplicationSubmit
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    landOwnership: null as File | null,
    bankPassbook: null as File | null,
    farmerPhoto: null as File | null,
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      aadhaarNumber: '',
      mobileNumber: '',
      farmerCategory: '',
      landSize: '',
      district: '',
      mandal: '',
      village: '',
      address: '',
      agreeToTerms: false,
    }
  });

  const handleFileUpload = (fileType: keyof typeof uploadedFiles, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const onSubmit = async (data: any) => {
    if (!data.agreeToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (!uploadedFiles.landOwnership || !uploadedFiles.bankPassbook || !uploadedFiles.farmerPhoto) {
      toast({
        title: "Documents Required",
        description: "Please upload all required documents.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const applicationData = {
        ...data,
        machinery: selectedMachine,
        applicationId: `APP${Date.now()}`,
        submittedOn: new Date().toISOString(),
        status: 'pending',
        uploadedFiles: {
          landOwnership: uploadedFiles.landOwnership?.name,
          bankPassbook: uploadedFiles.bankPassbook?.name,
          farmerPhoto: uploadedFiles.farmerPhoto?.name,
        }
      };

      onApplicationSubmit(applicationData);
      
      toast({
        title: "Application Submitted Successfully!",
        description: "Your subsidy application has been submitted. Status will be updated soon.",
      });

      form.reset();
      setUploadedFiles({
        landOwnership: null,
        bankPassbook: null,
        farmerPhoto: null,
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tractor className="w-6 h-6 text-orange-600" />
          Apply for Agricultural Machinery Subsidy
        </CardTitle>
        <div className="bg-orange-50 p-3 rounded-lg">
          <p className="text-sm font-medium">Selected Machine: {selectedMachine.name}</p>
          <p className="text-xs text-gray-600">
            Original Price: ₹{selectedMachine.originalPrice.toLocaleString()} → 
            Subsidized: ₹{selectedMachine.subsidizedPrice.toLocaleString()} 
            ({selectedMachine.subsidyPercentage} off)
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Farmer Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Farmer Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aadhaarNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhaar Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="XXXX-XXXX-XXXX" maxLength={12} {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 XXXXX XXXXX" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="farmerCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmer Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sc">SC</SelectItem>
                          <SelectItem value="st">ST</SelectItem>
                          <SelectItem value="women">Women Farmer</SelectItem>
                          <SelectItem value="small">Small Farmer</SelectItem>
                          <SelectItem value="marginal">Marginal Farmer</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="landSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Size (in acres) *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2.5" type="number" step="0.1" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter district" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mandal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mandal *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter mandal" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="village"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Village *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter village" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complete Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter complete address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Document Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Document Upload
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: 'landOwnership', label: 'Land Ownership Document' },
                  { key: 'bankPassbook', label: 'Bank Passbook' },
                  { key: 'farmerPhoto', label: 'Farmer Photo' },
                ].map((doc) => (
                  <div key={doc.key} className="space-y-2">
                    <Label>{doc.label} *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(doc.key as keyof typeof uploadedFiles, e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        id={`file-${doc.key}`}
                      />
                      <label htmlFor={`file-${doc.key}`} className="cursor-pointer">
                        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          {uploadedFiles[doc.key as keyof typeof uploadedFiles]?.name || 'Click to upload'}
                        </p>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Conditions */}
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the terms and conditions and declare that all information provided is accurate.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MachineryApplicationForm;
