import React, { useEffect, useState } from 'react'
import './myprofile.scss'

import Chart from '../../components/chart/Chart'
import axios from 'axios'
import { Card, CardContent, Stack, TextField } from '@mui/material'



const Myprofile = () => {

  const [instructorData,setInstructorData] = useState([])

  useEffect(()=>{
    const Id = sessionStorage.getItem("Iid")
    axios.get("http://localhost:5000/Instructor/"+Id).then((res)=>{
      setInstructorData(res.data)
    })
  },[])
  return (
    <div className='myProfileInstructor'>
        <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img  src={instructorData.instructorPhoto} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{instructorData.instructorName}</h1>
                <div className="itemDetail">
                  <span className="itemKey">Desc: </span>
                  <span className="itemValue">{instructorData.instructorHeadLine}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Qualification: </span>
                  <span className="itemValue">{instructorData.instructorQualification}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Field of Experience: </span>
                  <span className="itemValue">{instructorData.instructorField}</span>
                </div>
            
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title={"User Spending"}/>
          </div>
        </div>
        <div className="bottom">
          <div className="title">Complete Profile Profile
            <Card>
              <CardContent>
                <Stack direction={"column"} spacing={3}>
                    <TextField variant='outlined' multiline minRows={4}></TextField>
                </Stack>
              </CardContent>
            </Card>
          
           </div>    
    </div>
    </div>
    </div>
  )
}

export default Myprofile