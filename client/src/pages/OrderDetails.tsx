import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchOrderById, updateOrderStatusThunk } from '../store/slices/orderSlice';
import { Box, Chip, CircularProgress, Typography, Alert, Button, Stack, Container, Paper, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getOrderStatusLabel, getStatusColor, OrderStatus } from '../utils/orderHelpers';
import { useOrderStatusSubscription } from '../hooks/useOrderStatusSubscription';

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedOrder: order, loading, error } = useAppSelector((state) => state.orders);

  useOrderStatusSubscription(orderId);

  const handleBackToList = () => {
    navigate('/orders');
  };

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    if (order) {
      dispatch(updateOrderStatusThunk({ orderId: order.id, status: newStatus }));
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return <Alert severity="warning">Order not found</Alert>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToList}
          sx={{ mb: 2 }}
        >
          Back to list
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Order #{order.orderNumber}
            </Typography>
            <Chip
              label={getOrderStatusLabel(order.status)}
              color={getStatusColor(order.status)}
              sx={{ mb: 2 }}
            />
          </Box>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center">
              {order.status !== OrderStatus.Delivered && order.status !== OrderStatus.Cancelled && (
                <>
                  {order.status === OrderStatus.Created && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleStatusUpdate(OrderStatus.Sent)}
                      disabled={loading}
                    >
                      Send
                    </Button>
                  )}
                  {order.status === OrderStatus.Sent && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleStatusUpdate(OrderStatus.Delivered)}
                      disabled={loading}
                    >
                      Delivered
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleStatusUpdate(OrderStatus.Cancelled)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  {loading && (
                    <CircularProgress size={24} sx={{ ml: 1 }} />
                  )}
                </>
              )}
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1">
              {order.description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Created
              </Typography>
              <Typography variant="body1">
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Updated
              </Typography>
              <Typography variant="body1">
                {new Date(order.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderDetails;