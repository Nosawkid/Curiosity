import React, { useEffect, useState } from 'react'
import './home.scss'

import Widget from '../../components/widgets/Widget'
import Featured from '../../components/featured/Featured'
import Chart from '../../components/chart/Chart'
import Tables from '../../components/table/Table'
import axios from 'axios'
import NetworkErrorPage from '../../components/networkerror/NetworkError'


const Home = () => {

  const [userCount,setUserCount] = useState(0)
  const [insCount,setInsCount] = useState(0)
  const [hireCount,setHireCount] = useState(0)
  const [revenue,setrevenue] = useState(0)
  const [profit,setProfit] = useState(0)
  const [profitPercent,setProfitPercent] = useState(0)
  const [revenueGraph,setRevenueGraph] = useState([]);
  const [networkError, setNetworkError] = useState(false);

  const fetchUsers = ()=>{
    axios.get("http://localhost:5000/User").then((res)=>{
      setUserCount(res.data.length)
    }).catch((err)=>{
      setNetworkError(true)
    })
  }
  const fetchIns = ()=>{
    axios.get("http://localhost:5000/Instructor").then((res)=>{
      setInsCount(res.data.length)
      
    }).catch((err)=>{
      setNetworkError(true)
    })
  }
  const fetchHirer = ()=>{
    axios.get("http://localhost:5000/Jobportal").then((res)=>{
      setHireCount(res.data.length)
      
    }).catch((err)=>{
      setNetworkError(true)
    })
  }

  const fetchTotal = () => {
    axios.get("http://localhost:5000/Totalbooking").then((res) => {
      setrevenue(res.data.total);
      if (res.data.total) {
        const newProfit = ((20 / 100) * res.data.total).toFixed(2);
        const newProfitPercent = (newProfit / res.data.total) * 100;
        setProfit(newProfit);
        setProfitPercent(newProfitPercent);
      }
    }).catch((err)=>{
      setNetworkError(true)
    })
  };
  
  const fetchGraphData = ()=>{
    axios.get("http://localhost:5000/graphdata").then((res) =>{
      setRevenueGraph(res.data)
      console.log(res.data)
    }).catch((err)=>{
      setNetworkError(true)
    })
  }


  useEffect(()=>{
    fetchUsers()
    fetchIns()
    fetchHirer()
    fetchTotal()
    fetchGraphData()
  },[profit,profitPercent])


  if (networkError) {
    return <NetworkErrorPage />;
  }

  return (
    <div className='adminHome' >
      <div className="widgets">
        <Widget userCount = {userCount} type="user" />
        <Widget userCount = {insCount} type="instructor" />
        <Widget userCount={hireCount} type="hirer" />
        
      </div>
      <div className="charts">
        <Featured revenue={revenue} profit={profit} profitPercent={profitPercent} />
        <Chart aspect={2 / 1} title={"Revenue Chart"} />
      </div>
      
    </div>
  )
}

export default Home