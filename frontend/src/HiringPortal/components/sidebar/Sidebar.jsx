import React from 'react'
import './sidebar.scss'
import AddLinkIcon from '@mui/icons-material/AddLink';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import RemoveFromQueueIcon from '@mui/icons-material/RemoveFromQueue';
import ChecklistIcon from '@mui/icons-material/Checklist';


const Sidebar = () => {

  

  return (
    <div className='hiringSidebar'>
      <div className="top">
        <Link to="/HiringPortal" style={{ textDecoration: "none" }}  >
          <span className="logo">HIRING PORTAL</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/HiringPortal/Profile" style={{ textDecoration: "none" }}>
          <li> <AccountCircleIcon className='icon' /> <span>Profile</span></li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/HiringPortal/Newvacancy" style={{ textDecoration: "none" }} >
            <li><IoAddCircle className='icon' /> <span>Add Vacancy </span></li>
          </Link>
          <Link to="/HiringPortal/myposts" style={{ textDecoration: "none" }}>
            <li> <ChecklistIcon className='icon' /> <span>My Posts</span></li>
          </Link>
          <Link to="/HiringPortal/Drafts" style={{ textDecoration: "none" }}>
            <li><FaRegEdit className='icon' /> <span>Drafts</span></li>
          </Link>
          
          <Link to="/HiringPortal/Cart" style={{ textDecoration: "none" }}>
            <li><ShoppingCartIcon className='icon' /> <span>Cart</span></li>
          </Link>
          <Link to="/HiringPortal/Wishlist" style={{ textDecoration: "none" }}>
            <li><ChecklistIcon className='icon' /> <span>Wishlist</span></li>
          </Link>
          <Link to="/HiringPortal/Complaints" style={{ textDecoration: "none" }} >
          <li><RemoveFromQueueIcon className='icon' /><span>Complaints</span></li>
          </Link>
          <p className="title">SERVICE</p>
          <li><MonitorHeartIcon className='icon' /> <span>System Health</span></li>
          <li><AddLinkIcon className='icon' /> <span>Logs</span></li>
          <li><SettingsIcon className='icon' /> <span>Settings</span></li>
          <p className="title">User</p>
          <li><AccountCircleIcon className='icon' /> <span>Profile</span></li>
          <li><LogoutIcon className='icon' /><span> Logout</span></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar