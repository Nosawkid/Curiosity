import React from 'react'
import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Featured = () => {
  return (
    <div className='hiringFeatured'>
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize='small'/>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={'70%'} strokeWidth={3}/>
        </div>
        <p className="title">Total sales made today:</p>
        <p className="amount">$230</p>
        <p className="desc">Late night data will be updated soon</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
             <KeyboardArrowUpIcon fontSize='small'/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last week</div>
            <div className="itemResult negative">
             <KeyboardArrowDownOutlined fontSize='small'/>
              <div className="resultAmount">$5.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
             <KeyboardArrowUpIcon fontSize='small'/>
              <div className="resultAmount">$17.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured