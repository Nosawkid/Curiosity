import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Section = () => {
 const navigate = useNavigate()
  const {courseId} = useParams()
  const [sectionName,setSectionName] = useState("")
  const [sectionNumber,setSectionNumber] = useState("")

  const createSection = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:5000/Section",{courseId,sectionName,sectionNumber}).then((res)=>{
      console.log(res.data)
      navigate(`/instructor/courses/${res.data.courseId}`)
    })
  }

  return (
    <div className='instructorCourseSection'>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
          <Card onSubmit={createSection}  component="form" sx={{minWidth:"750px"}}>
            <CardContent>
                <AddCircleOutlineIcon sx={{margin:"0 auto",display:"block",fontSize:"50px"}}/>
                <Typography sx={{textAlign:"center",mt:2,fontSize:"20px"}}>Add New Section</Typography>
                <Stack spacing={2} direction="column" sx={{mt:5}}>
                <TextField onChange={(e)=> setSectionNumber(e.target.value)} id="filled-basic" label="Section Number" variant="outlined" sx={{maxWidth:"200px"}} />
                <TextField onChange={(e)=> setSectionName(e.target.value)} id="filled-basic" label="Section Title" variant="standard" sx={{maxWidth:"75%"}} />
                </Stack>
                <Button type='submit' variant='contained' sx={{width:"100%",mt:5}}>Submit</Button>
            </CardContent>
          </Card>
      </Box>
    </div>
  )
}

export default Section