import React from 'react'
import './sidebar.scss'
import AddLinkIcon from '@mui/icons-material/AddLink';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import { Card } from '@mui/material';


const Sidebar = () => {





  return (
    <Card className='sidebar' sx={{m:2,borderRadius:5,height:'85vh',py:4}}>
      <div className="top">
        <Link to="/instructor" style={{ textDecoration: "none" }}>
          <span className="logo">INSTRUCTOR</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/instructor/myprofile" style={{ textDecoration: "none" }}>
            <li> <AccountCircleIcon className='icon' /> <span>My Profile</span></li>
          </Link>
          <Link to="/instructor/settings" style={{ textDecoration: "none" }}>
            <li> <SettingsIcon className='icon' /> <span>Account Settings</span></li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/instructor/Courses" style={{ textDecoration: "none" }}>
            <li> <FaChalkboardTeacher className='icon' /> <span>Courses</span></li>
          </Link>
          <Link to="/instructor/Cart" style={{ textDecoration: "none" }}>
            <li><ShoppingCartIcon className='icon' /> <span>Cart</span></li>
          </Link>
          <Link to="/instructor/Wishlist" style={{ textDecoration: "none" }}>
            <li><FaClipboardList className='icon' /> <span>Wishlist</span></li>
          </Link>
          <Link to="/instructor/Complaints" style={{ textDecoration: "none" }} >
            <li><RemoveFromQueueIcon className='icon' /><span>Complaints</span></li>
          </Link>
          <p className="title">SERVICE</p>
          <li><MonitorHeartIcon className='icon' /> <span>System Health</span></li>
          <li><AddLinkIcon className='icon' /> <span>Logs</span></li>
          <li><SettingsIcon className='icon' /> <span>Settings</span></li>
          <p className="title">User</p>
          <li><LogoutIcon className='icon' /><span> Logout</span></li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })} ></div>
      </div> */}
    </Card>
  )
}

export default Sidebar