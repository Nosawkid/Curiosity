import React, { useEffect, useState } from 'react'
import './home.scss'

import Widget from '../../components/widgets/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import Tables from '../../components/table/Table'
import axios from 'axios'


const Home = () => {

  const [userCount,setUserCount] = useState(0)
  const [insCount,setInsCount] = useState(0)
  const [hireCount,setHireCount] = useState(0)
  const [revenue,setrevenue] = useState(0)
  const [profit,setProfit] = useState(0)
  const [profitPercent,setProfitPercent] = useState(0)

  const fetchUsers = ()=>{
    axios.get("http://localhost:5000/User").then((res)=>{
      setUserCount(res.data.length)
    })
  }
  const fetchIns = ()=>{
    axios.get("http://localhost:5000/Instructor").then((res)=>{
      setInsCount(res.data.length)
      
    })
  }
  const fetchHirer = ()=>{
    axios.get("http://localhost:5000/Jobportal").then((res)=>{
      setHireCount(res.data.length)
      
    })
  }
  const fetchTotal = ()=>{
    axios.get("http://localhost:5000/Totalbooking").then((res)=>{
      setrevenue(res.data.total)
      if(revenue)
      {
        setProfit(((20/100) * revenue).toFixed(2))
        setProfitPercent((profit/revenue) * 100)
      }
      
    })
  }


  useEffect(()=>{
    fetchUsers()
    fetchIns()
    fetchHirer()
    fetchTotal()
  },[])

  return (
    <div className='adminHome' >
      <div className="widgets">
        <Widget userCount = {userCount} type="user" />
        <Widget userCount = {insCount} type="instructor" />
        <Widget userCount={hireCount} type="hirer" />
        
      </div>
      <div className="charts">
        <Featured revenue={revenue} profit={profit} profitPercent={profitPercent} />
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