import React, { useEffect, useState } from 'react'
import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Placeholder from '../placeholder/Placeholder';
import { Typography } from '@mui/material';


const Navbar = () => {
    const [user,setUser] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = (e) => {
        setAnchorEl(null)
    }

    const uid = sessionStorage.getItem("Uid")

    const fetchCourse = ()=>{
        axios.get("http://localhost:5000/User/"+uid).then((res)=>{
            setUser(res.data)
        })
    }


    // const logout = ()=>{
    //     axios.post("http://localhost:5000/logout").then((res)=>{
    //         console.log(res.data)
    //     })
    // }


    useEffect(()=>{
        fetchCourse()
    },[])
    

    return (
        <div className="userNavbar">
            <Link to="/user" style={{ textDecoration: "none", color: "black" }}>
                <h1 className="siteLogo">CURIOSITY</h1>
            </Link>
            <p className="userNavLink">Category</p>
            <div className="userNavSearch">
                <SearchIcon className='userNavIcon' />
                <input type="text" placeholder='Search for anything..' />
            </div>
            <div className="userNavLinkContainer">
                <Link to="/user/mylearning" style={{ textDecoration: "none", color: "black" }}>
                    <p className="userNavLink">Purchased Courses</p>
                </Link>
                <Link to="/user/jobs" style={{ textDecoration: "none", color: "black" }}>
                    <p className="userNavLink">Jobs</p>
                </Link>
                <Link to="/user/wishlist" style={{ textDecoration: "none", color: "black" }}>
                    <FavoriteIcon className='userNavIcon' />
                </Link>
                <div className="userNavCounterContainer">
                    <Link to="/user/cart" style={{ textDecoration: "none", color: "black" }}>
                        <ShoppingCartIcon className='userNavIcon' />
                    </Link>
                    <div className="userNavCounter">{5}</div>
                </div>
                <NotificationsIcon className='userNavIcon' />
                <div className='userNavCounterContainer'>
                    <Button
                        id='basic-button'
                        onClick={handleClick}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-expanded={open ? true : undefined}
                    >
                       {user && user.userPhoto ? <img style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} src={user.userPhoto} alt="profile" /> :
                 <Placeholder   username={user && user.userName}/> }
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
                            <Link  style={{ textDecoration: "none", color: "black" }} to={"/user/profile"}>My Profile</Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                            <Link style={{ textDecoration: "none", color: "black" }} to={"/user/settings"}>Account Settings</Link>
                        </MenuItem>
                        <MenuItem>
                            <Typography>Logout</Typography>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Navbar