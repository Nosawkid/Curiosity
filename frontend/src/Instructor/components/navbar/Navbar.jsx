import React, { useEffect, useState } from 'react'
import './navbar.scss'
import Placeholder from '../placeholder/Placeholder'

import { Card } from '@mui/material';
import axios from 'axios';

const Navbar = () => {
  const iid = sessionStorage.getItem("Iid")
  const [ins,setIns] = useState("")


  const fetchInstructor = ()=>{
    axios.get("http://localhost:5000/Instructor/"+iid).then((res)=>{
      setIns(res.data)
    })
  }

  useEffect(()=>{
    fetchInstructor()
  })
  return (
    <Card className='navbar'  sx={{m:2,borderRadius:5,py:1}}>
      <div className="wrapper">
        <div className="search">
       
        </div>

        <div className="items">
         
          {/* <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
        
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
              <div className="counter">1</div>
          </div> */}
         
          
          <div className="item">
           {
            ins && ins.instructorPhoto ?  <img src={ins && ins.instructorPhoto} alt="" className='avatar' /> :<Placeholder username={ins.instructorName} />
           }

          </div>
        </div>
      </div>
    </Card>
  )
}

export default Navbar