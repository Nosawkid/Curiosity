import React from 'react'
import './home.scss'

import Widget from '../../components/widgets/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import Tables from '../../components/table/Table'


const Home = () => {
  return (
    <div >
      <div className="widgets">
        <Widget type="course" />
        <Widget type="order" />
        <Widget type="earning" />
       
      </div>
      <div className="charts">
        <Featured />
        <Chart aspect={2 / 1} title={"Last Week Revenue"} />
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <Tables />
      </div>
    </div>
  )
}

export default Home