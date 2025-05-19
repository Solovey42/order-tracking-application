import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: (theme) => 
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container>
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Order Tracking System
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3
            }}
          >
            <MuiLink
              component={Link}
              to="/"
              color="text.secondary"
              variant="body2"
              underline="hover"
            >
              About
            </MuiLink>
            <MuiLink
              component={Link}
              to="/"
              color="text.secondary"
              variant="body2"
              underline="hover"
            >
              Contact
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;