import React from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link ,useNavigate} from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import SubjectIcon from '@mui/icons-material/Subject';
import TopicIcon from '@mui/icons-material/Topic';
import ReportIcon from '@mui/icons-material/Report';

const Sidebar = () => {
  const navigate = useNavigate()

 const logout = ()=>{
  sessionStorage.clear("Aid")
  navigate("/")
 }

  return (
    <div  className='adminSidebar'>
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
          <li> <DashboardIcon className='icon' /> <span>Dashboard</span></li>
          </Link>
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
          
          <li onClick={logout}><LogoutIcon  className='icon' /><span> Logout</span></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar