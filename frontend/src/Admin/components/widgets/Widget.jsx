import React from 'react'
import './widget.scss'
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const Widget = ({type}) => {
  let data;

  // Temporary data to fill in percentage and amount
  const amt = 1250;
  const percentage = 30

  switch(type)
  {
    case 'user':
      data = {
        title:"USERS",
        isMoney:false,
        link:"See all users",
        icon: <Person2OutlinedIcon className='icon' style={{
          color:"crimson",
          backgroundColor:'rgba(255,0,0,0.2)'
        }} />
      }
      break;
    case 'order':
      data = {
        title:"ORDERS",
        isMoney:false,
        link:"See all orders",
        icon: <LocalShippingOutlinedIcon className='icon' style={{
          color:"goldenrod",
          backgroundColor:'rgba(218,135,62,0.2)'
        }} />
      }
      break;
    case 'earning':
      data = {
        title:"EARNINGS",
        isMoney:true,
        link:"View Income",
        icon: <AttachMoneyOutlinedIcon className='icon' style={{
          color:"green",
          backgroundColor:'rgba(0,128,0,0.2)'
        }} />
      }
      break;
    case 'balance':
      data = {
        title:"BALANCE",
        isMoney:true,
        link:"View Balance",
        icon: <MonetizationOnIcon className='icon' style={{
          color:"purple",
          backgroundColor:'rgba(128,0,128,0.2)'
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
          <span className="counter">{data.isMoney && '$'} {amt}</span>
          <span className="link">{data.link}</span>
        </div>
        <div className="right">
          <div className="percentage positive">
          <ArrowDropUpOutlinedIcon/>
            {percentage}%</div>
          {data.icon}
        </div>
    </div>
  )
}

export default Widget