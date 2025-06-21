
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Bell, 
  CloudSun, 
  Building2, 
  Package, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  X,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

interface Notification {
  id: string;
  type: 'weather' | 'scheme' | 'order' | 'market';
  titleKey: string;
  messageKey: string;
  time: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  dynamicData?: Record<string, string>;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Demo notifications with translation keys
    const demoNotifications: Notification[] = [
      {
        id: '1',
        type: 'weather',
        titleKey: 'notifications.weather.alert.title',
        messageKey: 'notifications.weather.alert.message',
        time: '2 hours ago',
        isRead: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'order',
        titleKey: 'notifications.order.delivered.title',
        messageKey: 'notifications.order.delivered.message',
        time: '4 hours ago',
        isRead: false,
        priority: 'medium',
        dynamicData: { orderId: 'KM123456', product: 'Paddy Seeds 1010' }
      },
      {
        id: '3',
        type: 'scheme',
        titleKey: 'notifications.scheme.subsidy.title',
        messageKey: 'notifications.scheme.subsidy.message',
        time: '1 day ago',
        isRead: true,
        priority: 'medium',
        dynamicData: { amount: '₹2,000' }
      },
      {
        id: '4',
        type: 'market',
        titleKey: 'notifications.market.priceUpdate.title',
        messageKey: 'notifications.market.priceUpdate.message',
        time: '1 day ago',
        isRead: false,
        priority: 'low',
        dynamicData: { crop: 'Paddy', increase: '8%', location: 'Hyderabad', price: '₹2,850' }
      },
      {
        id: '5',
        type: 'order',
        titleKey: 'notifications.order.shipped.title',
        messageKey: 'notifications.order.shipped.message',
        time: '2 days ago',
        isRead: true,
        priority: 'medium',
        dynamicData: { orderId: 'KM789012', product: 'Cotton Seeds' }
      },
      {
        id: '6',
        type: 'weather',
        titleKey: 'notifications.weather.soilMoisture.title',
        messageKey: 'notifications.weather.soilMoisture.message',
        time: '3 days ago',
        isRead: true,
        priority: 'low'
      },
      {
        id: '7',
        type: 'scheme',
        titleKey: 'notifications.scheme.approved.title',
        messageKey: 'notifications.scheme.approved.message',
        time: '1 week ago',
        isRead: true,
        priority: 'high',
        dynamicData: { amount: '₹15,000' }
      },
      {
        id: '8',
        type: 'market',
        titleKey: 'notifications.market.trend.title',
        messageKey: 'notifications.market.trend.message',
        time: '1 week ago',
        isRead: false,
        priority: 'low'
      }
    ];
    
    setNotifications(demoNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getTranslatedContent = (notification: Notification) => {
    let title = t(notification.titleKey);
    let message = t(notification.messageKey);

    // Replace dynamic data if available
    if (notification.dynamicData) {
      Object.entries(notification.dynamicData).forEach(([key, value]) => {
        title = title.replace(`{${key}}`, value);
        message = message.replace(`{${key}}`, value);
      });
    }

    return { title, message };
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'weather': return <CloudSun className="w-5 h-5 text-blue-600" />;
      case 'scheme': return <Building2 className="w-5 h-5 text-purple-600" />;
      case 'order': return <Package className="w-5 h-5 text-green-600" />;
      case 'market': return <TrendingUp className="w-5 h-5 text-orange-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'weather':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-green-600" />
              {t('notifications.title')}
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <LanguageSelector showLabel={false} />
              {notifications.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllNotifications}
                  className="text-xs text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  {t('notifications.clearAll')}
                </Button>
              )}
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  {t('notifications.markAllRead')}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">{t('notifications.empty.title')}</p>
              <p className="text-sm text-gray-400 mt-2">{t('notifications.empty.description')}</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const { title, message } = getTranslatedContent(notification);
              
              return (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                    !notification.isRead ? 'bg-blue-50 border-l-blue-500' : 'border-l-gray-300'
                  } ${getPriorityColor(notification.priority)}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {title}
                          </h4>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(notification.type)}
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                        
                        <p className={`text-sm ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
                          {message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={`text-xs capitalize ${
                              notification.type === 'weather' ? 'border-blue-300 text-blue-700' :
                              notification.type === 'scheme' ? 'border-purple-300 text-purple-700' :
                              notification.type === 'order' ? 'border-green-300 text-green-700' :
                              'border-orange-300 text-orange-700'
                            }`}
                          >
                            {t(`notifications.types.${notification.type}`)}
                          </Badge>
                          
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {notifications.length > 0 && (
          <div className="border-t pt-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="text-sm">
                <div className="text-blue-600 font-bold">{notifications.filter(n => n.type === 'weather').length}</div>
                <div className="text-xs text-gray-600">{t('notifications.types.weather')}</div>
              </div>
              <div className="text-sm">
                <div className="text-purple-600 font-bold">{notifications.filter(n => n.type === 'scheme').length}</div>
                <div className="text-xs text-gray-600">{t('notifications.types.scheme')}</div>
              </div>
              <div className="text-sm">
                <div className="text-green-600 font-bold">{notifications.filter(n => n.type === 'order').length}</div>
                <div className="text-xs text-gray-600">{t('notifications.types.order')}</div>
              </div>
              <div className="text-sm">
                <div className="text-orange-600 font-bold">{notifications.filter(n => n.type === 'market').length}</div>
                <div className="text-xs text-gray-600">{t('notifications.types.market')}</div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPanel;
