
import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

export const useNotificationTriggers = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Listen for order events
    const handleOrderEvent = (event: CustomEvent) => {
      const { orderId, productName, action } = event.detail;
      
      if (action === 'placed') {
        addNotification({
          title: 'Order Placed Successfully',
          message: `Your order for ${productName} (Order #${orderId}) has been placed successfully.`,
          type: 'order'
        });
      } else if (action === 'completed') {
        addNotification({
          title: 'Order Delivered',
          message: `Your order #${orderId} has been delivered successfully.`,
          type: 'order'
        });
      }
    };

    // Listen for form submission events
    const handleFormSubmission = (event: CustomEvent) => {
      const { formType, details } = event.detail;
      
      switch (formType) {
        case 'insurance':
          addNotification({
            title: 'Insurance Application Submitted',
            message: 'Your crop insurance application has been submitted successfully. You will receive updates shortly.',
            type: 'form'
          });
          break;
        case 'loan':
          addNotification({
            title: 'Loan Application Submitted',
            message: 'Your agriculture loan application has been submitted. Processing will begin shortly.',
            type: 'form'
          });
          break;
        case 'machinery':
          addNotification({
            title: 'Machinery Subsidy Applied',
            message: `Your application for ${details?.machineryName || 'farm machinery'} subsidy has been submitted.`,
            type: 'form'
          });
          break;
        default:
          addNotification({
            title: 'Form Submitted',
            message: 'Your form has been submitted successfully.',
            type: 'form'
          });
      }
    };

    // Listen for weather updates
    const handleWeatherUpdate = (event: CustomEvent) => {
      const { city, weather } = event.detail;
      addNotification({
        title: 'Weather Updated',
        message: `Weather information updated for ${city}. Current conditions: ${weather}.`,
        type: 'weather'
      });
    };

    // Listen for admin updates
    const handleAdminUpdate = (event: CustomEvent) => {
      const { title, message } = event.detail;
      addNotification({
        title: title || 'System Update',
        message: message || 'New updates are available.',
        type: 'admin'
      });
    };

    // Add event listeners
    window.addEventListener('orderEvent', handleOrderEvent as EventListener);
    window.addEventListener('formSubmission', handleFormSubmission as EventListener);
    window.addEventListener('weatherUpdate', handleWeatherUpdate as EventListener);
    window.addEventListener('adminUpdate', handleAdminUpdate as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('orderEvent', handleOrderEvent as EventListener);
      window.removeEventListener('formSubmission', handleFormSubmission as EventListener);
      window.removeEventListener('weatherUpdate', handleWeatherUpdate as EventListener);
      window.removeEventListener('adminUpdate', handleAdminUpdate as EventListener);
    };
  }, [addNotification]);
};
