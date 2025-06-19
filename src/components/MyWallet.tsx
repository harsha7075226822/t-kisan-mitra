
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Wallet, TrendingUp, TrendingDown, Download, IndianRupee, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  orderId?: string;
}

interface WithdrawalForm {
  amount: string;
  method: 'upi' | 'bank';
  upiId?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountHolder?: string;
}

interface MyWalletProps {
  balance: number;
  transactions: Transaction[];
  pendingPayments: number;
  onWithdraw: (data: WithdrawalForm) => void;
}

const MyWallet: React.FC<MyWalletProps> = ({
  balance,
  transactions,
  pendingPayments,
  onWithdraw
}) => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'bank'>('upi');
  const { toast } = useToast();

  const form = useForm<WithdrawalForm>({
    defaultValues: {
      amount: '',
      method: 'upi',
      upiId: '',
      accountNumber: '',
      ifscCode: '',
      accountHolder: ''
    }
  });

  const handleWithdraw = (data: WithdrawalForm) => {
    if (Number(data.amount) > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive"
      });
      return;
    }

    if (Number(data.amount) < 100) {
      toast({
        title: "Minimum Amount",
        description: "Minimum withdrawal amount is ₹100",
        variant: "destructive"
      });
      return;
    }

    onWithdraw(data);
    
    if (data.method === 'upi') {
      toast({
        title: "Withdrawal Initiated",
        description: `₹${data.amount} has been sent to your UPI: ${data.upiId}`,
      });
    } else {
      toast({
        title: "Withdrawal Initiated",
        description: `₹${data.amount} will be transferred to your bank account within 2-3 business days`,
      });
    }

    setIsWithdrawOpen(false);
    form.reset();
  };

  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'pending') return <Clock className="w-4 h-4 text-yellow-600" />;
    if (status === 'failed') return <AlertCircle className="w-4 h-4 text-red-600" />;
    if (type === 'credit') return <TrendingUp className="w-4 h-4 text-green-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Wallet className="w-6 h-6 mr-2 text-green-600" />
        <h2 className="text-xl font-bold text-gray-900">My Wallet</h2>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <IndianRupee className="w-5 h-5 mr-2" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{balance.toLocaleString('en-IN')}</div>
            <p className="text-green-100 text-sm mt-1">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{pendingPayments.toLocaleString('en-IN')}</div>
            <p className="text-blue-100 text-sm mt-1">Awaiting delivery confirmation</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center text-gray-900">
              <Download className="w-5 h-5 mr-2 text-green-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsWithdrawOpen(true)}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={balance < 100}
            >
              <Download className="w-4 h-4 mr-2" />
              Withdraw Money
            </Button>
            {balance < 100 && (
              <p className="text-xs text-gray-500 mt-2">Minimum ₹100 required</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
              <p className="text-gray-600">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.type, transaction.status)}
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString('en-IN')}
                        </p>
                        {transaction.orderId && (
                          <Badge variant="outline" className="text-xs">
                            Order: {transaction.orderId}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Withdrawal Dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleWithdraw)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Withdrawal Amount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter amount (Min ₹100)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedMethod(value as 'upi' | 'bank');
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="upi">UPI (Instant)</SelectItem>
                        <SelectItem value="bank">Bank Transfer (2-3 days)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedMethod === 'upi' && (
                <FormField
                  control={form.control}
                  name="upiId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPI ID</FormLabel>
                      <FormControl>
                        <Input placeholder="your-upi@paytm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {selectedMethod === 'bank' && (
                <>
                  <FormField
                    control={form.control}
                    name="accountHolder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="As per bank records" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Bank account number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ifscCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IFSC Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Bank IFSC code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Available Balance:</span>
                  <span className="font-bold">₹{balance.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Processing Fee:</span>
                  <span>₹0 (Free)</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsWithdrawOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyWallet;
