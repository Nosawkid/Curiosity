import React, { useEffect, useState } from 'react'
import './course.scss'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import axios from 'axios';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'





const Course = () => {

  const [course, setCourse] = useState([])
  const Id = sessionStorage.getItem("Iid")

  const fetchCourse = () => {
    axios.get("http://localhost:5000/CourseFromIns/" + Id).then((res) => {
      setCourse(res.data)
    })
  }


  const deleteCourse = (id) => {
    axios.delete("http://localhost:5000/Course/" + id).then((res) => {
      alert(`Course deleted`)
      fetchCourse()
    })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear() % 100
    const formattedDay = String(day).padStart(2, "0")
    const formattedMonth = String(month).padStart(2, "0")
    const formattedYear = String(year).padStart(2, "0")
    return `${formattedDay}/${formattedMonth}/${formattedYear}`
  }


  useEffect(() => {
    fetchCourse()
  }, [])

  return (

    <Box sx={{ px: 4, mt: 3 }}>
      <Stack direction={"row"} sx={{ mb: 3, display: "flex", alignItems: "center" }} spacing={10}>
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }} component="h1">Courses</Typography>
        <Link to={"/instructor/newCourse"}>
          <Button variant='outlined'>New Course</Button>
        </Link>
      </Stack>
      {/* <TableContainer component={Paper}>
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
              <Link to={`/instructor/courses/${row._id}`}><Button  sx={{color:"coralblue"}} variant='outlined'>View Details</Button></Link>
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
      {course.map((row, key) => (
        <Card>
          <CardContent sx={{ maxHeight: "400px" }}>
            <Stack direction={"row"} spacing={5} sx={{ display: "flex", alignItems: "center" }}>
              <img style={{ height: "100%", objectFit: "cover" }} src='https://s.udemycdn.com/course/200_H/placeholder.jpg' alt='placeholder' />
              <Stack direction={"column"} sx={{ py: 3, display: "flex", gap: "90px", width: "250px" }}>
                <Typography variant='h5'>{row.courseTitle}</Typography>
                <Stack>
                  <Typography variant='p'>Unpublished</Typography>

                  <Typography component={"p"} sx={{ fontSize: "15px", mt: 1 }} variant='p'>Creation Date:{formatDate(row.courseDateTime)}</Typography>
                </Stack>

              </Stack>
              <Link to={`/instructor/courses/${row._id}`}>
                <Button style={{ marginLeft: "150px", width: "55%", height: "50px" }} variant='outlined'>Edit/Manage Course</Button>
              </Link>
              <Button onClick={()=>deleteCourse(row._id)} variant='contained' sx={{margin:"0",backgroundColor:"red",height:"50px"}}>Delete</Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>

  )
}

export default Course