import { Box, Stack, Typography, Rating, Alert, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './course.scss'
import { useParams } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Showsection from '../showsection/Showsection'
import { useNavigate } from 'react-router-dom'

const Course = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [value, setValue] = useState(2)
  const [showSection, setShowSection] = useState([])
  const [showFull,setShowFull] = useState(false)


  const uid = sessionStorage.getItem("Uid")

  const fetchCourse = () => {
    axios.get("http://localhost:5000/course/" + id).then((res) => {
      setCourse(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const fetchSections = () => {
    axios.get(`http://localhost:5000/Course/${id}/section`).then((res) => {
      setShowSection(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }


  const showFullText = ()=>{
    setShowFull(!showFull)
  }


  const addToFavs = (courseId) => {
    axios.post("http://localhost:5000/wishlist", { courseId, userId: uid }).then((res) => {
      alert("Item Added to wishlist")
    })
  }

  const addToCart = (courseId) => {
    axios.post("http://localhost:5000/Cart", { courseId, userId: uid }).then((res) => {
      alert("Item added to cart")
    })
  }

  const goToCheckout = (courseId)=>{
    navigate("/user/checkout/"+courseId)
  }
  

 


  useEffect(() => {
    fetchCourse()
    fetchSections()
  }, [])

  return (
    <div className='userCourseDetailedView'>
      <Box sx={{ backgroundColor: "#90e0ef", height: "400px", p: 5, position: "relative", display: "flex", gap: "30px" }} className="topContainer">
        <Box sx={{ px: 3, width: "65%" }}>
          <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={2}>
            <Typography sx={{ fontWeight: "bold", color: "#023e8a" }}>{course && course.topicId.topicName}</Typography>
            <span style={{ color: "black" }}>&gt;</span>
            <Typography sx={{ fontWeight: "bold", color: "#023e8a" }}>{course && course.topicId.subCategoryId.subCategoryName}</Typography>
            <span style={{ color: "black" }}>&gt;</span>
            <Typography sx={{ fontWeight: "bold", color: "#023e8a" }}>{course && course.topicId.subCategoryId.categoryId.categoryName}</Typography>
          </Stack>
          <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: "35px" }}>{course && course.courseTitle}</Typography>
          <Typography onClick ={()=>showFullText()} sx={{ mt: 3, fontWeight: "bold", fontSize: "25px" }}>{!showFull && course ?  course.courseDesc.slice(0,150)+"...":course && course.courseDesc}</Typography>
          <Stack sx={{ mt: 3 }} direction={"row"} spacing={2}>
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <Rating name="read-only" value={value} readOnly />
              <Typography> 90 ratings</Typography>
            </Stack>
            <Typography>3630 students</Typography>
          </Stack>
          <Typography sx={{ mt: 3 }}>Created By <span style={{ fontWeight: "bold" }}>{course && course.instructorId.instructorName}</span></Typography>
        </Box>
        <Box className="courseCard" sx={{ backgroundColor: "white", width: "450px", height: "500px", position: "absolute", right: "10px", top: "50px", mt: 4 }}>
          <Stack direction={"column"} spacing={2}>
            <img className='coursePreviewImage' style={{ height: "200px", objectFit: "cover" }} src="https://thequill369.files.wordpress.com/2020/05/2-19-12-9-11-46-44m.jpg" alt="course image" />
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", px: 2, justifyContent: "center" }} >
              <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>Rs 2500</Typography>
              <Rating sx={{ fontSize: "20px" }} name="read-only" value={value} readOnly />
              <Alert severity="success" color="warning"> 
                BESTSELLER
              </Alert>
            </Box>
            <Stack direction={"row"} sx={{ alignItems: "center", gap: "20px", px: 2, }}>
              <Button onClick={()=>goToCheckout(course._id)}  sx={{ flex: 3 }} variant='contained'>Buy Now</Button>
              <Button sx={{ flex: 1 }} variant='outlined' onClick={()=>addToFavs(course._id)}>
                <FavoriteIcon />
              </Button>
            </Stack>
            <Box sx={{ px: 2 }}>
              <Button fullWidth variant='outlined' onClick={()=>addToCart(course._id)}>Add to cart</Button>
            </Box>
            <Box sx={{ px: 2 }}>
              <Typography sx={{ fontSize: "15px", color: "gray" }}>
                Join our vibrant community of learners and embark on a journey of continuous growth and learning. Expand your horizons, acquire new skills, and unleash your full potential with Curiosity.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box className="courseContainer" sx={{ width: "65%", p: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>Course Contents</Typography>
        {showSection.map((row, sectionKey) => (
          <Showsection  props={row} sessionKey = {sectionKey} courseId = {id} key={sectionKey}/>

        ))}


      </Box>
    </div>
  )
}

export default Course