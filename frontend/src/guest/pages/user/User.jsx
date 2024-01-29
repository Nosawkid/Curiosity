import React from 'react'
import { Box, Button, Card, CardContent, FormLabel, Stack, TextField, Typography} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
const User = () => {
  return (
    <div className='user'>
        <Navbar/>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",minHeight:"100vh"}}>
            <Card sx={{minWidth:"500px"}}>
                <CardContent sx={{display:"flex" , flexDirection:"column",alignItems:"center",textAlign:"center"}}>
                    <AccountCircleIcon  sx={{fontSize:"75px"}}/>
                    <Typography sx={{fontSize:"20px",fontWeight:"bold",mt:2}}>
                        User Registration
                        <Stack component="form" direction="column" spacing={2} sx={{mt:3}}>
                            <Stack direction="row" spacing={3}>
                                <TextField id='firstName' label="First Name" variant='standard' />
                                <TextField id='lastName' label="Last Name" variant='standard' />
                            </Stack>
                            <TextField type='email' id='email' label="Email" variant='standard' />
                            <TextField type='password' id='password' label="Password" variant='standard' />
                            <Stack direction="column" spacing={1} sx={{pt:2,pb:2}} >
                                <FormLabel sx={{textAlign:"left",mt:5}}>Upload Image</FormLabel>
                            <TextField type='file' id='userPhoto'  variant='standard' />
                            </Stack>
                            <Button  variant='contained'>Submit</Button>
                        </Stack>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
        <Footer/>
    </div>
  )
}

export default User