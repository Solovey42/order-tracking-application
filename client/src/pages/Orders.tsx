import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Button, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store/slices/orderSlice';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, } = useAppSelector((state) => ({
    orders: state.orders.orders,
    loading: state.orders.loading,
  }));

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Button variant="contained" component={Link} to="/orders/create" sx={{ mb: 2 }}>
        Create New Order
      </Button>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id} component={Link} to={`/orders/${order.id}`}>
            <ListItemText
              primary={`Order #${order.orderNumber}`}
              secondary={`Status: ${order.status} | Created: ${new Date(order.createdAt).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Orders;