export type OrderStatusLabel = 'Created' | 'Sent' | 'Delivered' | 'Cancelled';

export enum OrderStatus {
  Created = 0,
  Sent = 1,
  Delivered = 2,
  Cancelled = 3,
}

export const getOrderStatusLabel = (status: number): OrderStatusLabel => {
  switch (status) {
    case 0:
      return 'Created';
    case 1:
      return 'Sent';
    case 2:
      return 'Delivered';
    case 3:
      return 'Cancelled';
    default:
      return 'Created';
  }
};

export const getStatusColor = (status: number) => {
  switch (status) {
    case 0:
      return 'info';
    case 1:
      return 'warning';
    case 2:
      return 'success';
    case 3:
      return 'error';
    default:
      return 'default';
  }
};