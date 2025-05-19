import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api/api';

interface Order {
  id: string;
  orderNumber: string;
  description: string;
  status: 'created' | 'sent' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  loading: false
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await apiClient.get('/Orders');
  return response.data;
});

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string) => {
    const response = await apiClient.get(`/Orders/${orderId}`);
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const response = await apiClient.post('/orders', {
      ...orderData,
      status: 'created',
    });
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (state, action: PayloadAction<{ orderId: string; status: Order['status'] }>) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработчики для fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;