import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Section = () => {
  return (
    <div className='instructorCourseSection'>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
          <Card  component="form" sx={{minWidth:"750px"}}>
            <CardContent>
                <AddCircleOutlineIcon sx={{margin:"0 auto",display:"block",fontSize:"50px"}}/>
                <Typography sx={{textAlign:"center",mt:2,fontSize:"20px"}}>Add New Section</Typography>
                <Stack spacing={2} direction="column" sx={{mt:5}}>
                <TextField id="filled-basic" label="Section Number" variant="outlined" sx={{maxWidth:"200px"}} />
                <TextField id="filled-basic" label="Section Title" variant="standard" sx={{maxWidth:"75%"}} />
                </Stack>
                <Button variant='contained' sx={{width:"100%",mt:5}}>Submit</Button>
            </CardContent>
          </Card>
      </Box>
    </div>
  )
}

export default Section