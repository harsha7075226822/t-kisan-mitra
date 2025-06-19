
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, MapPin, Calendar, IndianRupee, Eye, Truck } from 'lucide-react';

interface Order {
  id: string;
  productName: string;
  quantity: number;
  orderDate: string;
  deliveryAddress: string;
  totalAmount: number;
  status: 'Pending' | 'Dispatched' | 'Delivered';
  productType: 'seeds' | 'crop' | 'product';
}

interface MyOrdersProps {
  orders: Order[];
  onViewDetails: (orderId: string) => void;
  onTrackOrder: (orderId: string) => void;
}

const MyOrders: React.FC<MyOrdersProps> = ({ orders, onViewDetails, onTrackOrder }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Dispatched':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductEmoji = (type: string) => {
    switch (type) {
      case 'seeds':
        return '🌱';
      case 'crop':
        return '🌾';
      case 'product':
        return '📦';
      default:
        return '📦';
    }
  };

  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Package className="w-6 h-6 mr-2 text-green-600" />
        <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
        <Badge variant="outline" className="ml-2">
          {orders.length} Orders
        </Badge>
      </div>

      {sortedOrders.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-600">Your orders will appear here once you make a purchase</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <Card key={order.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getProductEmoji(order.productType)}</span>
                    <div>
                      <CardTitle className="text-lg text-gray-900">{order.productName}</CardTitle>
                      <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="font-medium">{order.quantity} bags</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="font-bold text-green-600">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-600">Order Date:</span>
                    <p className="font-medium">{new Date(order.orderDate).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-600">Delivery Address:</span>
                    <p className="font-medium text-sm">{order.deliveryAddress}</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onViewDetails(order.id)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => onTrackOrder(order.id)}
                  >
                    <Truck className="w-4 h-4 mr-1" />
                    Track Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
