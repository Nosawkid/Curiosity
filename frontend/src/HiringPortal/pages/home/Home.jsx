import React, { useEffect, useState } from 'react';
import './home.scss';
import { Avatar, Box, Typography } from '@mui/material';
import axios from 'axios';
import Placeholder from '../../components/placeholder/Placeholder';

const Home = () => {
  const Jid = sessionStorage.getItem("Jid");
  const [hirer, setHirer] = useState("");

  const fetchDetails = () => {
    axios.get("http://localhost:5000/jobportal/" + Jid).then((res) => {
      setHirer(res.data);
    });
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="hiringPortalHome" style={{ background: 'linear-gradient(to bottom, #003f88, #003366)' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '0 20px',
          backgroundColor: 'transparent',
        }}
      >
        {hirer.jobPortalPhoto ? (
          <Avatar alt="logo" src={hirer.jobPortalPhoto} sx={{ width: 150, height: 150, marginBottom: 4 }} />
        ) : (
          <Placeholder username={hirer.jobPortalName} className="ok" />
        )}

        <Typography variant="h3" sx={{ color: '#fff', marginBottom: 4 }}>
          Welcome to our Hiring Portal
        </Typography>
        <Box sx={{ textAlign: 'center', color: '#fff' }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {hirer.jobPortalCompanyName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {hirer.jobPortalDetails}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Contact: {hirer.jobPortalContact} | {hirer.jobPortalCompanyName}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
