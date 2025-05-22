import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setOrderStatus } from '../store/slices/orderSlice';
import { API_BASE_URL } from '../api/api';
import * as signalR from '@microsoft/signalr';

interface OrderStatusMessage {
    orderId: string;
    orderNumber: string;
    status: number;
    updatedAt: string;
}

export const useOrderStatusSubscription = (orderId: string | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!orderId) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/orderHub`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    connection
      .start()
      .then(() => 
        connection.on('ReceiveOrderStatus', (message: OrderStatusMessage) => {
          if (message.orderId === orderId) {
            dispatch(setOrderStatus({ orderId: message.orderId, status: message.status }));
          }
        })
      );

    return () => {
      connection.stop();
    };
  }, [orderId, dispatch]);
};
