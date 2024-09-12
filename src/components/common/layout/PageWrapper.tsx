import React from 'react';
import { Container, Paper, Box } from '@mui/material';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box>
          {children}
        </Box>
      </Paper>
    </Container>
  );
};

export default PageWrapper;