import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Profile() {
  useEffect(() => {}, []);
  return (
    <Container
      sx={{
        display: 'flex',
      }}
      maxWidth="lg"
    >
      <div>My Profile</div>
    </Container>
  );
}
