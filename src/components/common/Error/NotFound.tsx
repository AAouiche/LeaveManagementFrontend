import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#121212',  
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '6rem' }}>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        It might have been removed, or the URL might be incorrect.
      </Typography>
      <Link to="/leaverequests" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ px: 4, py: 2 }}>
          Go to Homepage
        </Button>
      </Link>
    </Box>
  );
}