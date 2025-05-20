import { Box, Container, CssBaseline } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f5f5f5'
      }}
    >
      <CssBaseline />
      
      <Header />
      
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            flex: 1,
            py: 4,
            px: { xs: 2, sm: 3 },
            maxWidth: '100%'
          }}
        >
          {children}
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout;