import React, { useEffect, useState } from 'react'
import './job.scss'
import Jobpreview from '../../components/jobPreview/Jobpreview'
import axios from 'axios'
import { Server } from '../../../Server.js'
import { Alert, Box, Button, Card, CardContent, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia'
import Jobholder from '../../../assets/Jobholder.png'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const Job = () => {
  const [jobs, setJobs] = useState("")
  const [value, setValue] = React.useState(0);
  const [applied, setApplied] = useState([])
  const uid = sessionStorage.getItem("Uid")


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const fetchJobs = () => {
    axios.get(`${Server}/Vacancy`).then((res) => {
      setJobs(res.data)
    })
  }

  const fetchAPpliedJobs = () => {
    axios.get(`${Server}/Applied/${uid}`).then((res) => {
      setApplied(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }


  useEffect(() => {
    fetchJobs()
    fetchAPpliedJobs()
  }, [])

  return (
    <div className='userJobPage'>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Available Jobs" {...a11yProps(0)} />
        <Tab label="Applied Jobs " {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Box>

          <div className="jobContainer">
            {jobs && jobs.map((row, key) => (
              <Jobpreview link={row._id} companyName={row.jobPortalId.jobPortalName} vacancyTitle={row.vacancyTitle} vacancyRequirement={row.vacancyRequirement} minSalary={row.minSalary} maxSalary={row.maxSalary} category={row.categoryId && row.categoryId.categoryName} vacancyTime={row.vacancyTime} />
            ))}
          </div>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box>

          <div className="appliedContainer" style={{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"}}>
            {applied && applied.map((row, key) => (
              <Box key={key}>
                <Card sx={{ width:"350px",height:"500px" }}>
                  <CardMedia
                    sx={{ objectFit:"cover",height:"200px" }}
                    image={Jobholder}
                    title="green iguana"
                    
                  />
                  <CardContent sx={{height:"200px"}}>
                    <Typography gutterBottom variant="h5" component="div">
                      {row.jobVacancyId.jobPortalId.jobPortalCompanyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {
                        row.jobVacancyId.vacancyDesc
                      }
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {row.__v === 1 ? <Alert severity='success'>You have been shortlisted</Alert> : row.__v === 2 ?<Alert severity='error'>Your Application has been rejected </Alert> : <Alert severity='info'>Decision Pending</Alert>}
                   
                  </CardActions>
                </Card>
              </Box>
            ))}
          </div>
        </Box>
      </CustomTabPanel>


    </div>
  )
}

export default Job