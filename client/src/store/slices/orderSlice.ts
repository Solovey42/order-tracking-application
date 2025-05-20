import { createSlice, type PayloadAction, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { apiClient } from '../../api/api';

interface Order {
  id: string;
  orderNumber: string;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  ordersList: Order[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  ordersList: [],
  selectedOrder: null,
  loading: false,
  error: null
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await apiClient.get('/orders');
  return response.data;
});

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string) => {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const response = await apiClient.post('/orders', {
      ...orderData,
    });
    return response.data;
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }: { orderId: string; status: number }) => {
    await apiClient.patch(`/orders/${orderId}`, { status: status });
    return { orderId, status }; 
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.ordersList = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.ordersList.push(action.payload);
        state.loading = false;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;
        const orderIndex = state.ordersList.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
          state.ordersList[orderIndex]!.status = status;
        }
        if (state.selectedOrder && state.selectedOrder.id === orderId) {
          state.selectedOrder.status = status;
        }
        state.loading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchOrders.pending,
          fetchOrderById.pending,
          createOrder.pending,
          updateOrderStatusThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.selectedOrder = null;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchOrders.rejected,
          fetchOrderById.rejected,
          createOrder.rejected,
          updateOrderStatusThunk.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || 'Operation failed';
        }
      );
  }
});

export const { setSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;