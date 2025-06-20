
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Phone, 
  CreditCard, 
  MapPin, 
  Camera, 
  Edit3, 
  Save, 
  X,
  Eye,
  EyeOff
} from 'lucide-react';

interface UserData {
  name: string;
  mobile: string;
  aadhaar: string;
  state: string;
  district: string;
  mandal: string;
  village: string;
  address: string;
  profileImage: string;
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showFullAadhaar, setShowFullAadhaar] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const { toast } = useToast();

  const [userData, setUserData] = useState<UserData>({
    name: '',
    mobile: '',
    aadhaar: '',
    state: '',
    district: '',
    mandal: '',
    village: '',
    address: '',
    profileImage: ''
  });

  const [formData, setFormData] = useState<UserData>(userData);

  // Load user data on component mount
  useEffect(() => {
    const kisanUser = localStorage.getItem('kisanUser');
    const savedProfile = localStorage.getItem('userProfile');
    const savedImage = localStorage.getItem('userProfileImage');
    const lastUpdate = localStorage.getItem('profileLastUpdated');

    if (kisanUser) {
      const user = JSON.parse(kisanUser);
      const profileData = savedProfile ? JSON.parse(savedProfile) : {};
      
      const combinedData = {
        name: user.name || '',
        mobile: user.mobile || '',
        aadhaar: user.aadhaar || '',
        state: profileData.state || 'Telangana',
        district: profileData.district || '',
        mandal: profileData.mandal || '',
        village: profileData.village || '',
        address: profileData.address || '',
        profileImage: savedImage || ''
      };

      setUserData(combinedData);
      setFormData(combinedData);
      setProfileImage(savedImage || '');
      setLastUpdated(lastUpdate || new Date().toLocaleDateString());
    }
  }, []);

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          profileImage: imageUrl
        }));
        
        // Dispatch event to update navbar immediately
        window.dispatchEvent(new CustomEvent('profileImageUpdated', { 
          detail: { profileImage: imageUrl } 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.mobile.match(/^\d{10}$/)) errors.push("Phone number must be 10 digits");
    if (!formData.aadhaar.match(/^\d{12}$/)) errors.push("Aadhaar must be 12 digits");
    
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('userProfileImage', profileImage);
    localStorage.setItem('profileLastUpdated', new Date().toLocaleDateString());
    
    // Update kisanUser data
    const kisanUser = localStorage.getItem('kisanUser');
    if (kisanUser) {
      const user = JSON.parse(kisanUser);
      const updatedUser = {
        ...user,
        name: formData.name,
        mobile: formData.mobile,
        aadhaar: formData.aadhaar
      };
      localStorage.setItem('kisanUser', JSON.stringify(updatedUser));
    }

    setUserData(formData);
    setLastUpdated(new Date().toLocaleDateString());
    setIsEditing(false);
    
    // Dispatch event to update navbar
    window.dispatchEvent(new CustomEvent('profileUpdated', { 
      detail: { 
        name: formData.name, 
        profileImage: profileImage 
      } 
    }));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully",
    });
  };

  const handleCancel = () => {
    setFormData(userData);
    setProfileImage(userData.profileImage);
    setIsEditing(false);
  };

  const maskAadhaar = (aadhaar: string) => {
    if (!aadhaar || aadhaar.length !== 12) return aadhaar;
    return `**** **** ${aadhaar.slice(-4)}`;
  };

  const states = [
    'Telangana', 'Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Maharashtra'
  ];

  const districts = [
    'Hyderabad', 'Rangareddy', 'Medchal', 'Sangareddy', 'Nizamabad', 'Karimnagar'
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Image Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profileImage} />
                <AvatarFallback className="bg-green-100 text-green-800 text-4xl">
                  {formData.name.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white rounded-full p-2 cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{formData.name || 'User Name'}</h2>
              <Badge variant="outline" className="text-green-700 border-green-300">
                Verified Farmer
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  disabled={!isEditing}
                  placeholder="10-digit mobile number"
                  className="pl-10"
                  maxLength={10}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identity Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Identity Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="aadhaar">Aadhaar Number</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="aadhaar"
                value={showFullAadhaar ? formData.aadhaar : maskAadhaar(formData.aadhaar)}
                onChange={(e) => handleInputChange('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))}
                disabled={!isEditing}
                placeholder="12-digit Aadhaar number"
                className="pl-10 pr-10"
                maxLength={showFullAadhaar ? 12 : 14}
              />
              <button
                type="button"
                onClick={() => setShowFullAadhaar(!showFullAadhaar)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showFullAadhaar ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Location Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <select
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                disabled={!isEditing}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <select
                id="district"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                disabled={!isEditing}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select District</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mandal">Mandal</Label>
              <Input
                id="mandal"
                value={formData.mandal}
                onChange={(e) => handleInputChange('mandal', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter mandal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="village">Village</Label>
              <Input
                id="village"
                value={formData.village}
                onChange={(e) => handleInputChange('village', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter village"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your complete address"
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      {lastUpdated && (
        <div className="text-center text-sm text-gray-500">
          Last updated on {lastUpdated}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
