import React from 'react'
import './profile.scss'
import { Avatar, Box, Card, CardContent, Stack, Typography } from '@mui/material'

const Profile = () => {
    return (
        <div className='hiringProfile'>
            <Box>
                <Card sx={{ width: "40%", mt: 3, ml: 3 }}>
                    <CardContent style={{position:"relative"}}>
                        <Stack spacing={4} direction="row" sx={{display:"flex",alignItems:"center"}}>
                            <Avatar alt="Remy Sharp" sx={{width:"150px",height:"150px"}}
                             src="https://assets.vogue.in/photos/5f23c04f1d33754d11eaf778/2:3/w_2560%2Cc_limit/harry-potter-philosophers-stone-portrait-8.jpg" />
                             <Box>
                                 <Typography variant="h5" sx={{fontWeight:"bold"}}>Harry J Potter</Typography>   
                                  <span  style={{color:"gray", fontSize:"17px",display:"block"}}>Head Auror</span>
                                  <span style={{fontWeight:"bold",fontSize:"13px"}}>Ministry of Magic, England</span>
                             </Box>
                        </Stack>
                        <span style={{cursor:"pointer",position:"absolute",top:0,right:0,backgroundColor:"#09a6f3",padding:"5px",color:"white"}}>Edit</span>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default Profile