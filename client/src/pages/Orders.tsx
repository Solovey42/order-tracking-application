import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  Button, 
  Typography, 
  CircularProgress, 
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Container
} from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../store/slices/orderSlice';
import { getOrderStatusLabel, getStatusColor } from '../utils/orderHelpers';

const Orders = () => {
  const dispatch = useAppDispatch();
  const { ordersList, loading, error } = useAppSelector((state) => state.orders);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      dispatch(fetchOrders());
      isFirstRender.current = false;
    }
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error"> {error}</Alert>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Orders
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/orders/create"
            size="large"
          >
            Create New Order
          </Button>
        </Box>

        {ordersList.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No orders found
            </Typography>
          </Paper>
        ) : (
          <TableContainer 
            component={Paper} 
            elevation={2}
            sx={{
              '& .MuiTableCell-root': {
                whiteSpace: 'nowrap',
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }
            }}
          >
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Order Number</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Last Updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersList.map((order) => (
                  <TableRow 
                    key={order.id}
                    hover
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                    component={Link}
                    to={`/orders/${order.id}`}
                  >
                    <TableCell component="th" scope="row">
                      #{order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getOrderStatusLabel(order.status)} 
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 0 }}>
                      <Typography noWrap>
                        {order.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(order.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default Orders;