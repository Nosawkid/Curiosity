import React, { useEffect, useState } from 'react'
import './single.scss'

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








const Single = () => {
const {id} = useParams()
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [showSection,setShowSection] = useState([])
  const [showFullDesc,setShowFullDesc] = useState(false)


const fetchCourse = async (id)=>{
 try
 {
  const response = await axios.get("http://localhost:5000/Course/"+id)
  setCourse(response.data)
 }
 catch(err)
 {
    setError(err.message)
 }
 finally
 {
  setLoading(false)
 }
}

const fetchSections = (id)=>{
  axios.get(`http://localhost:5000/Course/${id}/section`).then((res)=>{
    setShowSection(res.data)
  }).catch((err)=>{
    console.log(err)
  })
}

const deleteSection = (sid)=>{
  axios.delete("http://localhost:5000/Section/"+sid).then((res)=>{
    alert("Section Deleted")
    fetchSections(id)
  })
}

const fullDesc = ()=>{
  setShowFullDesc(!showFullDesc)
}

useEffect(()=>{
  fetchCourse(id)
  fetchSections(id)
},[])


if(loading)
{
  return(
    <div>Loading</div>
  )
}

if(error)
{
  return(
    <div>{error}</div>
  )
}

  return (
    <div className='single'>
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img  src={course.instructorId.instructorPhoto ? course.instructorId.instructorPhoto : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{course.courseTitle}</h1>
                <div className="itemDetail">
                  <span className="itemKey">Desc: </span>
                  <span  style={{cursor:"pointer"}} className="itemValue desc" onClick={fullDesc}>{showFullDesc ? course.courseDesc: course.courseDesc.length>100 ? course.courseDesc.slice(0,100)+"..." : course.courseDesc}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Instructor: </span>
                  <span className="itemValue">{course.instructorId.instructorName}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Topic: </span>
                  <span className="itemValue">{course.topicId.topicName}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Category: </span>
                  <span className="itemValue">{course.topicId.subCategoryId.categoryId.categoryName}</span>
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
          <Link to ={`/instructor/courses/${course._id}/section`}>
            <Button sx={{mx:2}} variant='outlined'>Add New Section</Button>
          </Link>
           </div>
           <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>SI No</TableCell>
            <TableCell align="center">Section Name</TableCell>
            <TableCell align="center">Course Name</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showSection.map((row,key) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component="th" scope="row">
                {key + 1}
              </TableCell>
              <TableCell align="center">{row.sectionName}</TableCell>
              <TableCell align="center">{row.courseId.courseTitle}</TableCell>
              <TableCell align="center">
               <Button onClick={()=>{
                deleteSection(row._id)
               }} sx={{mx:2}} variant='outlined'> <DeleteIcon sx={{color:"crimson"}}/></Button>
               <Link to={`/instructor/section/${row._id}/material`}>
                <Button variant='outlined'>View Materials</Button>
               </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default Single