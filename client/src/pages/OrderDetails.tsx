import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Box, Card, CardContent, Chip, CircularProgress, Typography } from '@mui/material';
import { fetchOrderById } from '../store/slices/orderSlice';

const OrderDetails = () => {

  const dispatch = useAppDispatch();
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useAppSelector((state) => state.orders);

  const order = orders.find((o) => o.id === orderId);

  useEffect(() => {
    if (orderId && !order) {
      dispatch(fetchOrderById(orderId));
    }
  }, [orderId, order, dispatch]);

  if (!order) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order #{order.orderNumber}
          </Typography>
          <Chip
            label={order.status}
            color={'default'}
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" gutterBottom>
            {order.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created: {new Date(order.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Updated: {new Date(order.updatedAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;