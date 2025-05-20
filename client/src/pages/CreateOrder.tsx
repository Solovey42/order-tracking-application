import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createOrder } from '../store/slices/orderSlice';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateOrder = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.orders);
  const [orderNumber, setOrderNumber] = useState('');
  const [description, setDescription] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleCreate = async () => {
    await dispatch(createOrder({ orderNumber, description })).unwrap();
      navigate('/orders');
  };

  const handleOrderNumberChange = (value: string) => {
    setOrderNumber(value);
    setIsInvalid(!value.trim());
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/orders')}
          sx={{ mb: 2 }}
          disabled={loading}
        >
          Back to list
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create New Order
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Order Number"
            value={orderNumber}
            onChange={(e) => handleOrderNumberChange(e.target.value)}
            error={isInvalid}
            fullWidth
            required
            disabled={loading}
            placeholder="Enter order number..."
          />

          <TextField
            label="Order Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            disabled={loading}
            placeholder="Enter order description..."
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/orders')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreate}
              disabled={isInvalid || loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {loading ? 'Creating...' : 'Create Order'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateOrder;