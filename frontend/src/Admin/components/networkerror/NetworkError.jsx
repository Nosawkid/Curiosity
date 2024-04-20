import React from 'react';
import { Typography, Button } from '@mui/material';

const NetworkErrorPage = () => {

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 3,
        textAlign: 'center',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        fill="#f50057"
        viewBox="0 0 24 24"
        sx={{ marginBottom: 3 }}
      >
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Oops! Looks like you're offline.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Please check your internet connection and try again.
      </Typography>
      <Button variant="contained" color="primary" onClick={reloadPage}>
        Retry
      </Button>
    </div>
  );
};

export default NetworkErrorPage;
