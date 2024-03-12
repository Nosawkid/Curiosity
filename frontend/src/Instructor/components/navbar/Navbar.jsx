import React, { useEffect, useState } from 'react'
import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
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
         
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />

          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
              <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlinedIcon className="icon" />
              <div className="counter">2</div>
          </div>
          <div className="item">
            <ReorderOutlinedIcon className="icon" />

          </div>
          <div className="item">
            <img src={ins && ins.instructorPhoto} alt="" className='avatar' />

          </div>
        </div>
      </div>
    </Card>
  )
}

export default Navbar