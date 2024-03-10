import { Alert, Box, Button, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Server } from '../../../Server.js'
import axios from 'axios'
import moment from 'moment'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';


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




const Applications = () => {
    const [application, setApplication] = useState([])
    const [shortlist,setShortList] = useState([])
    const [rejected,setRejected]= useState([])
    const [value, setValue] = React.useState(0);



    const { jobId } = useParams()
    const navigate = useNavigate()

    const fetchApplications = () => {
        axios.get(`${Server}/Application/${jobId}`).then((res) => {
            setApplication(res.data)
        })
    }


    const viewApplication = (id) => {
        navigate("/HiringPortal/Application/" + id)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchShortlist = ()=>{
        axios.get(`${Server}/Shortlisted/${jobId}`).then((res)=>{
            setShortList(res.data)
            console.log(res.data)
        })
    }
    const fetchRejected = ()=>{
        axios.get(`${Server}/Rejected/${jobId}`).then((res)=>{
            setRejected(res.data)
            console.log(res.data)
        })
    }



    useEffect(() => {
        fetchApplications()
        fetchShortlist()
        fetchRejected()
    }, [])


    return (
        <div className='hirerApplications'>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Applications" {...a11yProps(0)} />
                    <Tab label="Shortlist" {...a11yProps(1)} />
                    <Tab label="Rejected" {...a11yProps(2)} />
                    
                </Tabs>
                <Divider/>
                <CustomTabPanel value={value} index={0}>
                    <Box sx={{ m: 3 }}>
                        <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "25px" }}>JOB APPLICATIONS</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                            {
                                application && application.map((row, key) => (
                                    <Card key={key} sx={{ mt: 3, width: "300px" }}>
                                        <CardContent>
                                            <img style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%", display: "block", margin: "0 auto" }} src={row.userId.userPhoto} alt={row.userId.userName} />
                                            <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2, textAlign: "center" }}>{row.userId.userName}</Typography>
                                            <Typography sx={{ mt: 2, textAlign: "center" }}>{row.userId.userHeadLine}</Typography>
                                            <Typography sx={{ mt: 2, textAlign: "center", fontSize: "14px" }}>Applied On: {moment(row.applicationDate).format('DD-MM-YYYY')}</Typography>
                                            <Button onClick={() => viewApplication(row._id)} fullWidth>View Application</Button>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </Box>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box sx={{ m: 3 }}>
                        <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "25px" }}>SHORTLIST</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                            {
                                shortlist && shortlist.map((row, key) => (
                                    <Card key={key} sx={{ mt: 3, width: "300px" }}>
                                        <CardContent>
                                            <img style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%", display: "block", margin: "0 auto" }} src={row.userId.userPhoto} alt={row.userId.userName} />
                                            <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2, textAlign: "center" }}>{row.userId.userName}</Typography>
                                            <Typography sx={{ mt: 2, textAlign: "center" }}>{row.userId.userHeadLine}</Typography>
                                            <Typography sx={{ mt: 2, textAlign: "center", fontSize: "14px" }}>Applied On: {moment(row.applicationDate).format('DD-MM-YYYY')}</Typography>
                                            <Alert severity='success' style={{ textAlign: 'center' }}>Shortlisted Candidate</Alert>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </Box>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Box sx={{ m: 3 }}>
                        <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "25px" }}>SHORTLIST</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                            {
                                rejected && rejected.map((row, key) => (
                                    <Card key={key} sx={{ mt: 3, width: "300px" }}>
                                        <CardContent>
                                            <img style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%", display: "block", margin: "0 auto" }} src={row.userId.userPhoto} alt={row.userId.userName} />
                                            <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2, textAlign: "center" }}>{row.userId.userName}</Typography>
                                            <Typography sx={{ mt: 2, textAlign: "center" }}>{row.userId.userHeadLine}</Typography>
                                            <Typography sx={{ mt: 2, textAlign: "center", fontSize: "14px" }}>Applied On: {moment(row.applicationDate).format('DD-MM-YYYY')}</Typography>
                                            <Alert severity='error' style={{ textAlign: 'center' }}>Rejected Candidate</Alert>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </Box>
                    </Box>
                </CustomTabPanel>

            </Box>
        </div>
    )
}

export default Applications