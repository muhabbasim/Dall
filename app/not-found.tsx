'use client'

import React, { useContext } from 'react'
import { Box, Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';


export default function NotFound() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  const handleRouting = () => {
    
    if (currentUser?.role === 'company') {
      router.push('/cooperation/dashboard')
    } else {
      router.push('/individual/dashboard')
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
    <Container maxWidth="md">
      <div className='flex items-center justify-center'>
        <img src='/assets/errorimg.svg' className='' alt="404" />
      </div>
      <Typography align="center" variant="h1" mb={4}>
        Opps!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        This page you are looking for could not be found.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        disableElevation
        onClick={handleRouting}
        >
        Go Back to Home
      </Button>
    </Container>
  </Box>
  )
}
