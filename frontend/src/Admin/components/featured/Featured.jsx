import React, { useEffect, useState } from 'react'
import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Featured = ({revenue}) => {
  const [profit,setProfit] = useState(0)
  const [profitPercent,setProfitPercent] = useState(0)

  const calcProfit = ()=>{
    setProfit(((20/100) * revenue).toFixed(2))

  }

  const calcProfitPercent = ()=>{
    setProfitPercent((profit/revenue) * 100)
  }

  useEffect(()=>{
    calcProfit()
    calcProfitPercent()
  },[])
  
  return (
    <div className='adminFeatured'>
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize='small'/>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={profitPercent} text={profitPercent+"%"} strokeWidth={3}/>
        </div>
        <p className="title">Total sales made till today:</p>
        <p className="amount">₹{revenue}</p>
        <p className="desc">Late night data will be updated soon</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">WEBSITE REVENUE</div>
            <div className="itemResult positive">
             <KeyboardArrowUpIcon fontSize='small'/>
             <div className="resultAmount">₹{profit}</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Featured