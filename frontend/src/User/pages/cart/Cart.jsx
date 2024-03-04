import React, { useEffect, useState } from 'react'
import './cart.scss'
import { Box, Button, Card, CardContent, Rating, Stack, Tooltip, Typography } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Courseholder from '../../../assets/Courseholder.png'


const Cart = () => {
    const navigate = useNavigate()
    const [value,setValue] = useState(2)
    const [showCourses,setShowCourses] = useState([])
    const [booking,setBooking] = useState("")

    

    const uid = sessionStorage.getItem("Uid")
    
    const fetchCart = ()=>{
      axios.get("http://localhost:5000/Cart/"+uid).then((res)=>{
        setShowCourses(res.data)
      })
    }

    const removeFromCart = (id)=>{
        axios.delete("http://localhost:5000/DeleteCart/"+id).then((res)=>{
          fetchCart()
        })
    }

    const getBooking = ()=>{
      axios.get("http://localhost:5000/Booking/"+uid).then((res)=>{
        setBooking(res.data)
      })
    }

    const goToCheckout = (courseId)=>{
      navigate("/user/checkout/"+booking._id+"/multiple")
    }

    const viewCourse = (courseId)=>{
      navigate("/user/course/"+courseId)
    }


    

    useEffect(()=>{
      fetchCart()
      getBooking()
    },[]) 

  return (
    <div className='userCart'>
      <Typography variant='h3' sx={{fontWeight:"bold",fontSize:"40px",textAlign:"center",mt:2}}>Shopping Cart</Typography>
      
      {showCourses.length === 0 ? (<Typography sx={{fontSize:"30px",fontWeight:"bold",color:"gray",textAlign:"center",mt:10}}>No Items in  cart </Typography>):
            (
              <Stack direction={"row"} sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                <Box sx={{width:"75%",display:"flex",alignItems:"center",justifyContent:"center",gap:"45px",flexWrap:"wrap",mt:2}}>
                {showCourses.map((row,key)=>(
                <Card onClick={()=>viewCourse(row.courseId._id)} className='courseCard' sx={{width:"300px",height:"350px"}}>
                  <CardContent sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                    <img style={{width:"100%",height:"200px",objectFit:"cover"}} src={row.courseId.courseImage || Courseholder} alt="Cover" />
                    <Typography sx={{fontSize:"18px",fontWeight:"bold"}} variant='h3'>{row.courseId.courseTitle}</Typography>
                    <Typography sx={{fontSize:"13px",color:"gray"}} component={"p"} variant='span'>{row.courseId.instructorId.instructorName}</Typography>
                    <Stack sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}} direction={"row"} spacing={1}>
                      <Typography sx={{fontWeight:"bold",fontSize:"15px"}} component={"span"} variant='span'>4.6</Typography>
                      <Rating sx={{fontSize:"20px"}} name="read-only" value={value} readOnly />
                    </Stack>
                    <Stack sx={{alignItems:"center",justifyContent:"space-between"}} direction={"row"}>
                    <Typography sx={{fontSize:"25px",fontWeight:"bold"}} component={"p"} variant='h3'> ₹{row.courseId.price}</Typography>
                      <Box sx={{display:"flex",alignItems:"center",gap:"10px"}} className="iconContainer">
                    <Tooltip title="Remove from cart">
                    <RemoveShoppingCartIcon sx={{cursor:"pointer"}} onClick={()=>removeFromCart(row._id)} className='cartIcon'/>
                    </Tooltip>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
                ))}
              </Box>
              <Box sx={{alignSelf:"flex-start"}}>
                <Typography variant='p' sx={{fontWeight:"bold",fontSize:"20px",color:"gray",textAlign:"left"}}>Total:</Typography>
                <Typography variant='h3' sx={{fontWeight:"bold"}}> ₹{booking.price}</Typography>
                <Button onClick={goToCheckout} variant='contained'>Checkout</Button>
              </Box>
              </Stack>
            )
                }
        
     
   
    </div>
  )
}

export default Cart