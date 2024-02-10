import React, { useEffect, useState } from 'react'
import './course.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom'
import Single from '../single/Single';



const Course = () => {

 const [course,setCourse] = useState([])

 const fetchCourse = ()=>{
  axios.get("http://localhost:5000/Course").then((res)=>{
    setCourse(res.data)
  })
 }


 const deleteCourse = (id)=>{
  axios.delete("http://localhost:5000/Course/"+id).then((res)=>{
    alert(`Course deleted`)
    fetchCourse()
  })
 }


 useEffect(()=>{
  fetchCourse()
 },[])

  return (

    <Box sx={{px:4,mt:3}}>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SI No</TableCell>
            <TableCell align="center">Course Title</TableCell>
            <TableCell align="center">Course Description</TableCell>
            <TableCell align="center">Topic Name</TableCell>
            <TableCell align="center">Sub-Category</TableCell>
            <TableCell align='center'>Category</TableCell>
            <TableCell align='center'>Instructor</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {course.map((row,key) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key + 1}
              </TableCell>
              <TableCell align="center">{row.courseTitle}</TableCell>
              <TableCell align="center">{row.courseDesc}</TableCell>
              <TableCell align="center">{row.topicId.topicName}</TableCell>
              <TableCell align="center">{row.topicId.subCategoryId.subCategoryName}</TableCell>
              <TableCell align='center'>{row.topicId.subCategoryId.categoryId.categoryName}</TableCell>
              <TableCell align='center'>{row.instructorId.instructorName}</TableCell>
              <TableCell align='center' ><Button variant='outlined' onClick={()=>{
                deleteCourse(row._id)
              }} sx={{color:"red",margin:2}}><DeleteIcon/></Button>
              <Link to={`/instructor/courses/${row._id}`} component={<Single/>}><Button  sx={{color:"coralblue"}} variant='outlined'>View Details</Button></Link>
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

  )
}

export default Course