import React from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AddLinkIcon from '@mui/icons-material/AddLink';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import SubjectIcon from '@mui/icons-material/Subject';
import TopicIcon from '@mui/icons-material/Topic';
import ReportIcon from '@mui/icons-material/Report';

const Sidebar = () => {

 

  return (
    <div className='adminSidebar'>
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li> <DashboardIcon className='icon' /> <span>Dashboard</span></li>
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li> <PersonIcon className='icon' /> <span>Users</span></li>
          </Link>
          <Link to="/admin/reports" style={{ textDecoration: "none" }}>
            <li><ReportIcon className='icon' /> <span>Reports</span></li>
          </Link>
         
          <Link to="/admin/categories" style={{ textDecoration: "none" }}>
            <li><CategoryIcon className='icon' /> <span>Categories</span></li>
          </Link>
          <Link to="/admin/Subcategories" style={{ textDecoration: "none" }}>
            <li><SubjectIcon className='icon' /> <span>Sub-Category</span></li>
          </Link>
          <Link to="/admin/Topics" style={{ textDecoration: "none" }} >
          <li><TopicIcon className='icon' /><span>Topics</span></li>
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