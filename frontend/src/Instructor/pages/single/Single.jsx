import React from 'react'
import './single.scss'

import Chart from '../../components/chart/Chart'
import Tables from '../../components/table/Table'

const Single = () => {
  return (
    <div className='single'>
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img  src="https://hips.hearstapps.com/hmg-prod/images/sadie-w-1528062024.jpg?resize=2048:*" alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">Sadie Sink</h1>
                <div className="itemDetail">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">sadiesink@gmail.com</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">+1 1234 56 78</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Address: </span>
                  <span className="itemValue">American Junction, Hollywood, USA</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Country: </span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title={"User Spending"}/>
          </div>
        </div>
        <div className="bottom">
          <div className="title">Last Transaction</div>
          <Tables/>
        </div>
      </div>
    </div>
  )
}

export default Single