import React from 'react'
import './widget.scss'
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const Widget = ({type,userCount}) => {
  let data;

  // Temporary data to fill in percentage and amount
  const amt = 1250;
  const percentage = 30

  switch(type)
  {
    case 'user':
      data = {
        title:"USERS",
        count:userCount,
        isMoney:false,
        link:"Till today  ",
        icon: <Person2OutlinedIcon className='icon' style={{
          color:"crimson",
          backgroundColor:'rgba(255,0,0,0.2)'
        }} />
      }
      break;
    case 'instructor':
      data = {
        title:"INSTRUCTORS",
        isMoney:false,
        count:userCount,
        link:"Till today",
        icon: <Person2OutlinedIcon className='icon' style={{
          color:"crimson",
          backgroundColor:'rgba(255,0,0,0.2)'
        }} />
      }
      break;
    case 'hirer':
      data = {
        title:"HIRING PORTAL",
        isMoney:false,
        count:userCount,
        link:"Till today",
        icon: <Person2OutlinedIcon className='icon' style={{
          color:"crimson",
          backgroundColor:'rgba(255,0,0,0.2)'
        }} />
      }
      break;
 
      default:
        break;
  }


  return (
    <div className='adminWidget'>
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">{data.count}</span>
          <span className="link">{data.link}</span>
        </div>
        <div className="right">
        
          {data.icon}
        </div>
    </div>
  )
}

export default Widget