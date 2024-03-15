import React, { useEffect, useState } from 'react'
import "./complaint.scss"
import axios from 'axios'
import { Box, CircularProgress, Button, Typography } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'



const Complaint = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const Iid = sessionStorage.getItem("Iid")


  const fetchCourses = () => {
    axios.get("http://localhost:5000/Course/" + Iid + "/published").then((res) => {

      setCourses(res.data)
    }).catch((err) => {
      console.log(err.message)
    }).finally(() => setLoading(false))
  }

  const viewReviews = (id)=>{
    navigate("/instructor/reviews/"+id)
  }


  useEffect(() => {
    fetchCourses()
  },[])

  if (loading) {
    return <Box sx={{ position: "relative" }}>
      <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
    </Box>
  }

  return (
    <div className='complaint' style={{display:"flex",alignItems:"center",gap:"5px",flexWrap:"wrap",p:2,justifyContent:"center"}}>
      {
        courses && courses.map((row, key) => (
          <Box
          key={key}
            sx={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '20px',
              width: '400px',
              margin: 'auto',
              textAlign: 'center',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(135deg, #003f88 0%, #0077cc 50%, #4da6ff 100%)',
              color: '#fff',
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>{row.courseTitle} </Typography>
            <Typography variant="body1" sx={{ marginBottom: '30px', opacity: 0.8 }}>Date Created:{moment(row.courseDateTime).format("DD-MM-YYYY")}</Typography>
            <Button onClick={()=>viewReviews(row._id)} variant="outlined" color="inherit">Show Reviews</Button>
          </Box>
        ))
      }
    </div>
  )
}

export default Complaint