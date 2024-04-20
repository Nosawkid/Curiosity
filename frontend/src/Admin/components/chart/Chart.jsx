import React, { useEffect, useState } from 'react'
import './chart.scss'
import { AreaChart, Area, XAxis,CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, YAxis, Bar } from 'recharts';
import axios from 'axios';
import moment from "moment"




const Chart = ({aspect,title}) => {
  const [data,setData] = useState([])

  const fetchGraphData = () => {
    axios.get("http://localhost:5000/graphdata")
      .then((res) => {
        // Map the received data to the format expected by the chart
        const formattedData = res.data.map(item => ({
          name: moment(item._id).format("DD/MM/YY"), // Assuming you want to display orderDate on the X-axis
          total: item.totalPrice // Assuming you want to display price on the Y-axis
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  };

  useEffect(()=>{
    fetchGraphData()
  },[])
  return (
    <div className='adminChart'>
    <div className="title">{title}</div>
    <ResponsiveContainer width="100%" aspect={aspect}>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#003f88" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  )
}

export default Chart