import React from 'react'
import './footer.scss'
import LanguageIcon from '@mui/icons-material/Language';

const Footer = () => {
  return (
    <div className='userFooter'>
        <div className="footerTop">
                <h2>Explore More with <span className="logo">Curiosity</span></h2>
            
        </div>
        <div className="bottom">
           <div className="linkAndLang">
            <div className="linkContainer">
            <ul>
                <li>Business</li>
                <li>Teach</li>
                <li>Get the App</li>
                <li>About us</li>
                <li>Contact Us</li>
            </ul>
            <ul>
                <li>Business</li>
                <li>Teach</li>
                <li>Get the App</li>
                <li>About us</li>
                <li>Contact Us</li>
            </ul>
            <ul>
                <li>Business</li>
                <li>Teach</li>
                <li>Get the App</li>
                <li>About us</li>
                <li>Contact Us</li>
            </ul>
            </div>
            

            <div className="lang">
            <LanguageIcon/> English
            </div>
           </div>

           <div className="logoAndDate">
           <div className="footerLogo">CURIOSITY</div>
           <div className="year">2024</div>
           </div>
        </div>
    </div>
  )
}

export default Footer