import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Order Tracking
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;