import React, { useEffect, useState } from 'react'
import './profile.scss'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, CardMedia, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import axios from 'axios'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const Profile = () => {
    const [value, setValue] = React.useState(0);
    const [jobPortalName, setjobPortalName] = useState("")
    const [jobPortalEmail, setjobPortalEmail] = useState("");
    const [jobPortalContact, setjobPortalContact] = useState("");
    const [jobPortalDetails, setjobPortalDetails] = useState("");
    const [jobPortalCompanyName, setjobPortalCompanyName] = useState("");
    const [facebookLink, setfacebookLink] = useState("");
    const [twitterLink, settwitterLink] = useState("");
    const [instagramLink, setinstagramLink] = useState("");
    const [linkedInLink, setlinkedInLink] = useState("");
    const [isEditing, setIsEditing] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    const [currentPassword, setcurrentPassword] = useState("");
    const [jobPortalPassword, setjobPortalPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [imgUrl, setimgUrl] = useState("");
    const [jobPortalPhoto, setjobPortalPhoto] = useState();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const Jid = sessionStorage.getItem("Jid")

    const fetchDetails = () => {
        axios.get("http://localhost:5000/JobPortal/" + Jid).then((res) => {
            console.log(res.data)
            setjobPortalName(res.data.jobPortalName)
            setjobPortalEmail(res.data.jobPortalEmail)
            setjobPortalCompanyName(res.data.jobPortalCompanyName)
            setjobPortalContact(res.data.jobPortalContact)
            setjobPortalDetails(res.data.jobPortalDetails)
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }


    const editDetails = (e) => {
        e.preventDefault()
        axios.put("http://localhost:5000/Jobportal/" + Jid + "/edit", { jobPortalName, jobPortalEmail, jobPortalContact, jobPortalDetails, jobPortalCompanyName, facebookLink, instagramLink, twitterLink, linkedInLink }).then((res) => {
            setIsEditing(false)
            fetchDetails()
        })
    }

    const editPassword = () => {
        if (newPassword === jobPortalPassword) {
            axios.put("http://localhost:5000/Jobportal/" + Jid + "/passchange", { jobPortalPassword, currentPassword }).then((res) => {
                alert(res.data.message)
            })
        }
        else {
            alert("Password Mismatch")
        }
    }

    const fetchLinks = () => {
        axios.get("http://localhost:5000/LinkPortal/" + Jid).then((res) => {
            setfacebookLink(res.data.facebookLink)
            setinstagramLink(res.data.instagramLink)
            settwitterLink(res.data.twitterLink)
            setlinkedInLink(res.data.linkedInLink)
        })
    }

    const handleFileChange = (e)=>{
        setjobPortalPhoto(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0])
        setimgUrl(url)
    }


    const updateProfile = ()=>{
        if(!jobPortalPhoto)
        {
            return alert("Please Upload a file")
        }
        
        const frm = new FormData()
        frm.append("jobPortalPhoto",jobPortalPhoto)
        axios.put("http://localhost:5000/Jobportal/"+Jid+"/addPhoto",frm).then((res)=>{
            alert("Profile Picture Updated")
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    useEffect(() => {
        fetchDetails()
        fetchLinks()
    }, []);
    return (
        <div className='hiringProfile'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Profile" {...a11yProps(0)} />
                        <Tab label="Change Password" {...a11yProps(1)} />
                        <Tab label="Company Logo" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Typography sx={{ fontSize: "25px", textAlign: "center", mb: 3 }}>Profile</Typography>
                    <Grid component={"form"} container spacing={2}>
                        <Grid item xs={6}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Full Name</Typography>
                                <TextField disabled={!isEditing} value={jobPortalName} onChange={(e) => setjobPortalName(e.target.value)} variant='outlined' fullWidth />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontWeight: "bold" }}>Email </Typography>
                                <TextField disabled={!isEditing} value={jobPortalEmail} onChange={(e) => setjobPortalEmail(e.target.value)} variant='outlined' fullWidth />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontWeight: "bold" }}>Contact </Typography>
                                <TextField disabled={!isEditing} value={jobPortalContact} onChange={(e) => setjobPortalContact(e.target.value)} variant='outlined' fullWidth />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontWeight: "bold" }}>Details </Typography>
                                <TextField disabled={!isEditing} value={jobPortalDetails} onChange={(e) => setjobPortalDetails(e.target.value)} multiline minRows={5} variant='outlined' fullWidth />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Company Name </Typography>
                                <TextField disabled={!isEditing} value={jobPortalCompanyName} onChange={(e) => setjobPortalCompanyName(e.target.value)} variant='outlined' fullWidth />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontWeight: "bold" }}>Facebook Link </Typography>
                                <TextField value={facebookLink} onChange={(e) => setfacebookLink(e.target.value)} disabled={!isEditing} variant='outlined' fullWidth />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontWeight: "bold" }}>Instagram Link </Typography>
                                <TextField value={twitterLink} onChange={(e) => settwitterLink(e.target.value)} disabled={!isEditing} variant='outlined' fullWidth />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontWeight: "bold" }}>Twitter Link </Typography>
                                <TextField value={instagramLink} onChange={(e) => setinstagramLink(e.target.value)} disabled={!isEditing} variant='outlined' fullWidth />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Typography sx={{ fontWeight: "bold" }}>LinkedIn Link </Typography>
                                <TextField value={linkedInLink} onChange={(e) => e.target.value} disabled={!isEditing} variant='outlined' fullWidth />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Button sx={{ mx: 2, width: "45%" }} variant='outlined' onClick={toggleEdit}>
                                {!isEditing ? "Edit" : "Cancel"}
                            </Button>
                            {isEditing && <Button onClick={editDetails} sx={{ width: "45%" }} type='submit' variant='contained'>Submit</Button>}
                        </Grid>
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Grid container>
                        <Grid item xs={6}>
                            <FormControl sx={{ m: 1, width: "60%" }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                                <OutlinedInput
                                    onChange={(e) => setcurrentPassword(e.target.value)}
                                    fullWidth
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Current Password"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: "60%" }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                <OutlinedInput
                                    onChange={(e) => setjobPortalPassword(e.target.value)}
                                    fullWidth
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="New Password"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: "60%" }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                                <OutlinedInput
                                    onChange={(e) => setnewPassword(e.target.value)}
                                    fullWidth
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm New Password"
                                />
                            </FormControl>
                            <Button onClick={editPassword} sx={{ display: "block" }} variant='contained'>Submit</Button>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography fontWeight={"bold"}>Image Preview</Typography>
                            <Card>
                                <CardContent>
                                    <CardMedia
                                     style={{ width: "400px", height: "200px", objectFit: "cover" }} 
                                     component={"img"}
                                     image={imgUrl}
                                     >

                                    </CardMedia>
                                </CardContent>
                            </Card>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{mt:2}}
                            >
                                Upload file
                                <VisuallyHiddenInput onChange={handleFileChange} type="file" />
                            </Button>
                            <Button onClick={updateProfile} sx={{mt:2}} variant='contained' fullWidth>Submit</Button>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
            </Box>
        </div>
    )
}

export default Profile