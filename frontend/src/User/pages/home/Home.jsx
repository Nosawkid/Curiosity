import React, { useEffect, useState } from 'react'
import './home.scss'
import Topsuggestion from '../../components/topsuggestion/Topsuggestion'
import Hero from '../../components/hero/Hero'
import axios from 'axios'
import { Box, Card, CardContent, Rating, Stack, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom'
import Courseholder from '../../../assets/Courseholder.png'


const Home = () => {
  const [showCourses, setShowCourse] = useState([])
  const [value, setValue] = useState(3.5)

  const uid = sessionStorage.getItem("Uid") 


  const fetchCourses = () => {
    axios.get("http://localhost:5000/Course/" + uid + "/notPurchased").then((res) => {
      setShowCourse(res.data)
    })
  }


  const addToFavs = (courseId) => {
    axios.post("http://localhost:5000/wishlist", { courseId, userId: uid }).then((res) => {
      if (res.data.status) {
        alert("Item Added to wishlist")
      }
      else {
        alert("Item aleady added to wishlist")
      }
    })
  }

  const addToCart = (courseId) => {
    axios.post("http://localhost:5000/Cart", { courseId, userId: uid }).then((res) => {
      if (res.data) {
        alert("Item Added to Cart")
      }
      else {
        alert("Item already in the cart")
      }
    })
  }


  useEffect(() => {
    fetchCourses()
  }, [])



  return (
    <div className='userHome'>

      <Topsuggestion />
      <Hero />
      <Typography sx={{ textAlign: "center", mt: 2, fontWeight: "bold" }} variant='h4'>Popular Courses</Typography>
      <Box sx={{ maxWidth: "100vw", display: "flex", alignItems: "center", justifyContent: "center", gap: "45px", flexWrap: "wrap", mt: 2 }}>
        {showCourses.map((row, key) => (
          <Link style={{ textDecoration: "none" }} to={"/user/course/" + row._id} >
            <Card className='courseCard' sx={{ width: "300px", height: "350px" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <img style={{ width: "100%", height: "200px", objectFit: "cover" }} src={row.courseImage || Courseholder} alt="Cover" />
                <Typography sx={{ fontSize: "18px", fontWeight: "bold" }} variant='h3'>{row.courseTitle}</Typography>
                <Typography sx={{ fontSize: "13px", color: "gray" }} component={"p"} variant='span'>{row.instructorId.instructorName}</Typography>
                <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} direction={"row"} spacing={1}>
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px" }} component={"span"} variant='span'>4.6</Typography>
                  <Rating sx={{ fontSize: "20px" }} name="read-only" value={value} readOnly />
                </Stack>
                <Stack sx={{ alignItems: "center", justifyContent: "space-between" }} direction={"row"}>
                  <Typography sx={{ fontSize: "25px", fontWeight: "bold" }} component={"p"} variant='h3'>
                    {row.price === 0 ? "Free" : (row.price ? `₹${row.price}` : "₹4200")}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }} className="iconContainer">
                    <Tooltip title="Add to cart">
                      <AddShoppingCartIcon onClick={() => addToCart(row._id)} className='cartIcon' />
                    </Tooltip>
                    <Tooltip title="Add to wishlist">
                      <FavoriteBorderIcon className='favrtIcon' onClick={() => addToFavs(row._id)} />
                    </Tooltip>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>

    </div>
  )
}

export default Home