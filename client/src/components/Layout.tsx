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
        width: '100vw',
        margin: 0,
        padding: 0,
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
          padding: 0,
          margin: 0
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            py: 4,
            px: 2,
            margin: 0,
            width: '100%',
            maxWidth: '100% !important',
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
              boxShadow: 3,
              borderRadius: 2,
              p: 3,
              margin: 0
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout;