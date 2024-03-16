import React, { useEffect, useState } from 'react'
import './navbar.scss'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Placeholder from '../placeholder/Placeholder';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
    const [hirer,setHirer] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e) => {
        setAnchorEl(null)
    }

    const hid = sessionStorage.getItem("Jid")

    const fetchHirer = ()=>{
      axios.get("http://localhost:5000/JobPortal/"+hid).then((res)=>{
        setHirer(res.data)
      })
    }

    const logout = ()=>{
        sessionStorage.clear("Jid")
        navigate("/")
    }


   


    // const logout = ()=>{
    //     axios.post("http://localhost:5000/logout").then((res)=>{
    //         console.log(res.data)
    //     })
    // }


    useEffect(()=>{
       fetchHirer()
    },[])
    

    return (
        <div className="hirerNavbar">
            <Link to="/hiringportal" style={{ textDecoration: "none", color: "black" }}>
                <h1 className="siteLogo">CURIOSITY</h1>
            </Link>
            
          
            <div className="userNavLinkContainer">
                <Link to="/HiringPortal/NewVacancy" style={{ textDecoration: "none", color: "black" }}>
                    <p className="userNavLink">Add Vacancy </p>
                </Link>
                <Link to="/HiringPortal/myposts" style={{ textDecoration: "none", color: "black" }}>
                    <p className="userNavLink">My Posts</p>
                </Link>
                
               
                <NotificationsIcon className='userNavIcon' />
                <div className='userNavCounterContainer'>
                    <Button
                        id='basic-button'
                        onClick={handleClick}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-expanded={open ? true : undefined}
                    >
                       {hirer && hirer.jobPortalPhoto ? <img style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={hirer.jobPortalPhoto} alt="profile" /> :
                 <Placeholder   username={hirer && hirer.jobPortalName}/> }
                    </Button>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link  style={{ textDecoration: "none", color: "black" }} to={"/HiringPortal/profile"}>My Profile</Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                            
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <Typography>Logout</Typography>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Navbar