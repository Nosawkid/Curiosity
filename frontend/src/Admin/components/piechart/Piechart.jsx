import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell,Tooltip} from "recharts";



const COLORS = ["#318CE7", "#FF69B4", "#FEBE10"];



const Piechart = ({male,females,other}) => {


    

const data = [
    { name: "Male", value: male },
    { name: "Female", value: females },
    { name: "Other", value:  other },
  ];

useEffect(()=>{
    
})

  return (
    <div>
   <PieChart width={400} height={400}>
  <Pie
    data={data}
    cx={200}
    cy={200}
    labelLine={false}
    outerRadius={175}
    
    fill="#8884d8"
    dataKey="value"
    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
      const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
      
      return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
          {`${data[index].name} ${(percent * 100).toFixed(2)}%`}
        </text>
      );
    }}
  >
    {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip/>
</PieChart>
    </div>
  );
};

export default Piechart;
