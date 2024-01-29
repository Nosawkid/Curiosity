import React from 'react'
import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';



const Navbar = () => {
    return (
        <div className="userNavbar">
               <Link to="/user" style={{textDecoration:"none", color:"black"}}>
            <h1 className="siteLogo">CURIOSITY</h1>
            </Link>
            <p className="userNavLink">Category</p>
            <div className="userNavSearch">
                <SearchIcon className='userNavIcon' />
                <input type="text" placeholder='Search for anything..' />
            </div>
            <div className="userNavLinkContainer">
                <Link to="/user/mylearning" style={{textDecoration:"none", color:"black"}}>
                <p className="userNavLink">Purchased Courses</p>
                </Link>
                <Link to="/user/jobs" style={{textDecoration:"none", color:"black"}}>
                <p className="userNavLink">Jobs</p>
                </Link>
                <Link to="/user/profile" style={{textDecoration:"none", color:"black"}}>
                <p className="userNavLink">Profile</p>
                </Link>
                <FavoriteIcon className='userNavIcon' />
                <div className="userNavCounterContainer">
                <Link to="/user/cart" style={{textDecoration:"none", color:"black"}}>
                    <ShoppingCartIcon className='userNavIcon' />
                    </Link>
                    <div className="userNavCounter">2</div>
                </div>
                <NotificationsIcon className='userNavIcon' />
                <div className='userNavCounterContainer'>
                    <img className='userNavProfile' src="https://cdn.openart.ai/stable_diffusion/006ac68fd78ccba67b48953a72d218d54a568238_2000x2000.webp" alt="profile" />
                    <div className="userNavCounter">5</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar