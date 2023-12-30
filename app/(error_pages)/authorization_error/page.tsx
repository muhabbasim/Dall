'use client'

import React, { useContext } from 'react'
import { Box, Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';


export default function NotAuthorized() {
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
      <Typography align="center" variant="h2" mb={4}>
        Authorization Issue!!!
      </Typography>
      <Typography align="center" variant="h4" mb={4}>
        You are not authorized to have access to this page.
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
