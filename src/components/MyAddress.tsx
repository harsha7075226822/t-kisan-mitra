
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Plus, Edit2, Trash2, Home, Phone } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  village: string;
  mandal: string;
  district: string;
  pincode: string;
  landmark?: string;
  mobile: string;
  isDefault: boolean;
}

interface AddressForm {
  name: string;
  village: string;
  mandal: string;
  district: string;
  pincode: string;
  landmark: string;
  mobile: string;
}

interface MyAddressProps {
  addresses: Address[];
  onAddAddress: (address: Omit<Address, 'id'>) => void;
  onEditAddress: (id: string, address: Omit<Address, 'id'>) => void;
  onDeleteAddress: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const MyAddress: React.FC<MyAddressProps> = ({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefault
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const { toast } = useToast();

  const form = useForm<AddressForm>({
    defaultValues: {
      name: '',
      village: '',
      mandal: '',
      district: '',
      pincode: '',
      landmark: '',
      mobile: ''
    }
  });

  const handleSubmit = (data: AddressForm) => {
    const addressData = {
      ...data,
      isDefault: addresses.length === 0
    };

    if (editingAddress) {
      onEditAddress(editingAddress.id, addressData);
      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully",
      });
    } else {
      onAddAddress(addressData);
      toast({
        title: "Address Added",
        description: "New address has been saved successfully",
      });
    }

    setIsDialogOpen(false);
    setEditingAddress(null);
    form.reset();
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    form.reset({
      name: address.name,
      village: address.village,
      mandal: address.mandal,
      district: address.district,
      pincode: address.pincode,
      landmark: address.landmark || '',
      mobile: address.mobile
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    onDeleteAddress(id);
    toast({
      title: "Address Deleted",
      description: "Address has been removed from your saved addresses",
    });
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Home className="w-6 h-6 mr-2 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
          <Badge variant="outline" className="ml-2">
            {addresses.length} Saved
          </Badge>
        </div>
        <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Addresses Saved</h3>
            <p className="text-gray-600 mb-4">Add your delivery addresses for faster checkout</p>
            <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg">{address.name}</CardTitle>
                  </div>
                  {address.isDefault && (
                    <Badge className="bg-green-100 text-green-800">Default</Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{address.village}, {address.mandal}</p>
                  <p>{address.district} - {address.pincode}</p>
                  {address.landmark && (
                    <p className="text-gray-500">Near: {address.landmark}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{address.mobile}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  {!address.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSetDefault(address.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(address)}
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Address Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="village"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Village</FormLabel>
                      <FormControl>
                        <Input placeholder="Village" {...field} />
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
                      <FormLabel>Mandal</FormLabel>
                      <FormControl>
                        <Input placeholder="Mandal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input placeholder="District" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PIN Code</FormLabel>
                      <FormControl>
                        <Input placeholder="PIN Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Landmark (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Near temple, school, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="10-digit mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  {editingAddress ? 'Update' : 'Save'} Address
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyAddress;
