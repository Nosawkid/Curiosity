import React, { useEffect, useState } from 'react'
import './settings.scss'
import { Button, Card, CardContent, CardMedia, FormControl, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Footer from '../../components/footer/footer'



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

const Settings = () => {

  const uid = sessionStorage.getItem("Uid")

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


  const [value, setValue] = React.useState(0);
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [existingPassword, setExistingPassword] = useState('')
  const [userPassword, setUserPassowrd] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userHeadLine, setUserHeadLine] = useState("")
  const [userBiography, setUserBiography] = useState("")
  const [userContact, setUserContact] = useState("")
  const [facebookLink, setFacebookLink] = useState("")
  const [twitterLink, setTwitterLink] = useState("")
  const [instagramLink, setInstagramLink] = useState("")
  const [linkedInLink, setLinkedInLink] = useState("")
  const [userPhoto, setUserPhoto] = useState("")
  const [imageUrl, setImageUrl] = useState(null); // State to hold the URL of the uploaded image


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFileChange = (e) => {
    setUserPhoto(e.target.files[0]); // Set the selected file as userPhoto
    const url = URL.createObjectURL(e.target.files[0]); // Create a URL for the selected file
    setImageUrl(url); // Set the URL as imageUrl
  };



  const fetchUserDetails = () => {
    axios.get("http://localhost:5000/User/" + uid).then((res) => {
      setUserName(res.data.userName)
      setUserEmail(res.data.userEmail)
      setUserContact(res.data.userContact)
      setUserBiography(res.data.userBiography)
      setUserHeadLine(res.data.userHeadLine)
      setUserPhoto(res.data.userPhoto)
    })
  }

  const fetchLinks = () => {
    axios.get("http://localhost:5000/Link/" + uid).then((res) => {
      setFacebookLink(res.data.facebookLink)
      setTwitterLink(res.data.twitterLink)
      setInstagramLink(res.data.instagramLink)
      setLinkedInLink(res.data.linkedInLink)
    })
  }

 


  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const FileUpload = () => {
    console.log(imageUrl);
    console.log(userPhoto);
     const frm = new FormData()
     frm.append("userPhoto",userPhoto)

    axios.put("http://localhost:5000/User/" + uid + "/editPhoto",frm).then((res) => {
      console.log("Data Updated")
      // fetchUserDetails()
    })
  }


  const updateBasicDetails = async () => {


    const data = {
      userName,
      userEmail,
      userContact,
      userBiography,
      userHeadLine,
      facebookLink,
      twitterLink,
      instagramLink,
      linkedInLink
    }
   

    // const data = {userName,userEmail,userContact,userBiography,userHeadLine,facebookLink,instagramLink,twitterLink,linkedInLink}
    // console.log(data);
    await axios.put("http://localhost:5000/User/" + uid + "/edit", data).then((res) => {
      console.log("Data Updated")
      fetchUserDetails()
    })

  }

  // const changePassword = async (e) => {
  //   e.preventDefault()
  //   const passwordIntegrity = await axios.get(`http://localhost:5000/User/${uid}/checkPassword/${existingPassword}`)
  //   if (passwordIntegrity.data) {
  //     if (userPassword === confirmPassword) {
  //       axios.put("http://localhost:5000/User/changePassword/" + uid, { userPassword }).then((res) => {
  //         console.log(res.data)
  //       }).catch((err) => {
  //         console.log(err.message)
  //       })
  //     }
  //     else {
  //       alert("Password Mismatch")
  //     }
  //   }
  //   else {
  //     alert("Existing Password Mismatch")
  //   }

  // }

  const changePassword = (e) => {
    e.preventDefault()
    if (confirmPassword === userPassword) {
      axios.put("http://localhost:5000/User/changePassword/" + uid, { userPassword, existingPassword }).then((res) => {
        if (res.data) {
          alert("Password Updated")
        }

      }).catch((err) => {
        console.log(err.message)
        console.log("Password Updation Failed")
      })
    }
    else {
      alert("Password Mismatch")
    }


  }



  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchUserDetails()
    fetchLinks()
  }, [])


  return (
    <div className='userAccountSettings'>
      <Box className="container">
        <Typography variant='h3' sx={{ fontWeight: "bold", fontSize: "35px", color: "GrayText" }}>Account Settings</Typography>
        <Stack sx={{ mt: 1, borderBottom: "1px solid black" }} direction={'row'} spacing={3}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Account Settings" {...a11yProps(0)} />
            <Tab label="Change Password" {...a11yProps(1)} />
            <Tab label="Upload Profile Picture" {...a11yProps(2)} />
          </Tabs>
        </Stack>


        <CustomTabPanel value={value} index={0}>
          <Stack  className='inputContainer' sx={{ width: "100%" }} direction={'row'} spacing={10}>
            <Stack sx={{ width: "45%" }} direction={'column'} spacing={4}>

              <Box sx={{ mt: 1 }}>
                <Typography sx={{ fontWeight: "bold" }} component={"p"} variant='p'>Full Name</Typography>
                <input onChange={(e) => setUserName(e.target.value)} defaultValue={userName} disabled={!isEditing} type="text" className="updateInput" />
              </Box>

              <Box>
                <Typography sx={{ fontWeight: "bold" }} component={"p"} variant='p'>Email</Typography>
                <input onChange={(e) => setUserEmail(e.target.value)} defaultValue={userEmail} disabled={!isEditing} type="email" className="updateInput" />
              </Box>

              <Box>
                <Typography sx={{ fontWeight: "bold" }} component={"p"} variant='p'>Headline</Typography>
                <input onChange={(e) => setUserHeadLine(e.target.value)} defaultValue={userHeadLine} disabled={!isEditing} placeholder='Eg: Software Developer' type="text" className="updateInput" />
              </Box>

              <Box>
                <Typography sx={{ fontWeight: "bold" }} component={"p"} variant='p'>Biography</Typography>
                <textarea onChange={(e) => setUserBiography(e.target.value)} defaultValue={userBiography} disabled={!isEditing} className="updateInput txtArea" />
              </Box>

            </Stack>
            <Stack sx={{ width: "45%" }} direction={'column'} spacing={4}>
              <Box>
                <Typography sx={{ fontWeight: "bold" }} component={"p"} variant='p'>Contact</Typography>
                <input onChange={(e) => setUserContact(e.target.value)} type="text" defaultValue={userContact} disabled={!isEditing} className="updateInput" />
              </Box>


              <Box>
                <Stack sx={{ display: "flex", alignItems: "center" }} direction={'row'} spacing={0}>
                  <input type="text" placeholder={"FACEBOOK"} disabled className='updateInputDisabled' />
                  <input onChange={(e) => setFacebookLink(e.target.value)} defaultValue={facebookLink} disabled={!isEditing} type="text" className="updateInput link" />
                </Stack>
              </Box>
              <Box>
                <Stack sx={{ display: "flex", alignItems: "center" }} direction={'row'} spacing={0}>
                  <input type="text" placeholder={"INSTAGRAM"} disabled className='updateInputDisabled' />
                  <input onChange={(e) => setInstagramLink(e.target.value)} defaultValue={instagramLink} disabled={!isEditing} type="text" className="updateInput link" />
                </Stack>
              </Box>
              <Box>
                <Stack sx={{ display: "flex", alignItems: "center" }} direction={'row'} spacing={0}>
                  <input type="text" placeholder={"TWITTER"} disabled className='updateInputDisabled' />
                  <input onChange={(e) => setTwitterLink(e.target.value)} defaultValue={twitterLink} disabled={!isEditing} type="text" className="updateInput link" />
                </Stack>
              </Box>
              <Box>
                <Stack sx={{ display: "flex", alignItems: "center" }} direction={'row'} spacing={0}>
                  <input type="text" placeholder={"LINKEDIN"} disabled className='updateInputDisabled' />
                  <input onChange={(e) => setLinkedInLink(e.target.value)} defaultValue={linkedInLink} disabled={!isEditing} type="text" className="updateInput link" />
                </Stack>
              </Box>


              <Box>
                <Stack sx={{ display: "flex", alignItems: "center" }} direction={'row'} spacing={2}>
                  <Button variant='outlined' onClick={toggleEdit}>
                    {!isEditing ? "Edit" : "Cancel"}
                  </Button>
                  {isEditing && <Button  onClick={updateBasicDetails} variant='contained'>Submit</Button>}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </CustomTabPanel>


        <CustomTabPanel value={value} index={1}>
          <Stack  sx={{ width: "40%" }} direction={'column'} spacing={3}>
            <Box sx={{ width: "100%" }}>

              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Existing Password</InputLabel>
                <OutlinedInput
                  required
                  onChange={(e) => setExistingPassword(e.target.value)}
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
                  label="Existing Password"
                />
              </FormControl>

            </Box>
            <Box sx={{ width: "100%" }}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput
                  required
                  onChange={(e) => setUserPassowrd(e.target.value)}
                  id="outlined-adornment-password-new"
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
            </Box>

            <Box sx={{ width: "100%" }}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                <OutlinedInput
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="outlined-adornment-password-confirm-new"
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
            </Box>
            <Button onClick={changePassword} variant='contained' sx={{ width: "50%" }}>Submit</Button>

          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Stack sx={{ width: "100%" }} direction={'column'} spacing={3}>
            <Box sx={{ width: "50%" }}>
              <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>Image Preview</Typography>
              <Card sx={{ height: "250px", px: 2, py: 1 }}>
                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                  <CardMedia style={{ width: "400px", height: "200px", objectFit: "cover" }} image={imageUrl} alt='profile'/>
                </CardContent>
              </Card>
              <Button
                sx={{ mt: 3 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </Box>
            <Button onClick={FileUpload} variant='contained' sx={{ width: "50%" }}>Submit</Button>

          </Stack>
        </CustomTabPanel>
      </Box>
      <Footer />
    </div>
  )
}

export default Settings