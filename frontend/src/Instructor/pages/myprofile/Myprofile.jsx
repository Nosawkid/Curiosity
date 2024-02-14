import React, { useEffect, useState } from 'react'
import './myprofile.scss'

import Chart from '../../components/chart/Chart'
import {useParams,Link} from 'react-router-dom'
import axios from 'axios'
import { Button } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Datatable from '../../components/datatable/Datatable'

const Myprofile = () => {

  const [instructorData,setInstructorData] = useState([])

  useEffect(()=>{
    const Id = sessionStorage.getItem("Iid")
    axios.get("http://localhost:5000/Instructor/"+Id).then((res)=>{
      setInstructorData(res.data)
    })
  },[])
  return (
    <div className='myProfileInstructor'>
        <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img  src={instructorData.instructorPhoto} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{instructorData.instructorName}</h1>
                <div className="itemDetail">
                  <span className="itemKey">Desc: </span>
                  <span className="itemValue">{instructorData.instructorHeadLine}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Qualification: </span>
                  <span className="itemValue">{instructorData.instructorQualification}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Field of Experience: </span>
                  <span className="itemValue">{instructorData.instructorField}</span>
                </div>
            
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title={"User Spending"}/>
          </div>
        </div>
        <div className="bottom">
          <div className="title">Sections
          <Datatable/>
           </div>    
    </div>
    </div>
    </div>
  )
}

export default Myprofile