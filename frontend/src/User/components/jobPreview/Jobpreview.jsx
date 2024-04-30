import React from 'react'
import './jobpreview.scss'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work';
import {Link} from 'react-router-dom'

const Jobpreview = ({photo,vacancyTitle,vacancyRequirement,minSalary,maxSalary,desc,companyName,vacancyTime,link}) => {
  return (
    <div className='jobPreview' >
      <Card sx={{cursor:"pointer"}}>
        <CardContent> 
          <Stack direction={"row"} spacing={1} sx={{alignItems:"center",width:"80%"}}>
              <img style={{width:"300px",objectFit:"cover"}} src={photo} alt="company logo" />
              <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",textAlign:"left"}}>
                  <Typography sx={{fontSize:"18px",color:"gray"}}>{companyName}</Typography>
                  <Typography sx={{fontSize:"25px",fontWeight:"bold"}}>{vacancyTitle}</Typography>
                  <Typography variant="body2">{desc}</Typography>
                  <Stack sx={{mt:5,alignItems:"center"}} direction={"row"} spacing={2}>
                    <Typography color={"gray "} variant='span'>Salary Range: ₹{minSalary} - ₹{maxSalary}</Typography>
                    <Typography color={"gray "} sx={{display:"flex",alignItems:"center",gap:"5px"}}><WorkIcon/> {vacancyTime}</Typography>
                    <Typography color={"gray "} variant='span'>Requirement: {vacancyRequirement}</Typography>
                  </Stack>
                  <Link to={"/user/resume/"+link}>
                  <Button sx={{mt:3}} variant='contained'>Send Application</Button>
                  </Link>
              </Box>
          </Stack>
        </CardContent>
      </Card>
    </div>
  )
}

export default Jobpreview