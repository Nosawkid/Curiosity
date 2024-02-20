import React, { useEffect, useState } from 'react'
import './cart.scss'
import { Box, Button, Card, CardContent, Rating, Stack, Tooltip, Typography } from '@mui/material'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import axios from 'axios'

const Cart = () => {

    const [value,setValue] = useState(2)
    const [showCourses,setShowCourses] = useState([])

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

    

    useEffect(()=>{
      fetchCart()
    },[])

  return (
    <div className='userCart'>
      <Typography variant='h3' sx={{fontWeight:"bold",fontSize:"40px",textAlign:"center",mt:2}}>Shopping Cart</Typography>
      
      {showCourses.length === 0 ? (<Typography sx={{fontSize:"30px",fontWeight:"bold",color:"gray",textAlign:"center",mt:10}}>No Items in  cart </Typography>):
            (
              <Stack direction={"row"} sx={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                <Box sx={{width:"75%",display:"flex",alignItems:"center",justifyContent:"center",gap:"45px",flexWrap:"wrap",mt:2}}>
                {showCourses.map((row,key)=>(
                <Card className='courseCard' sx={{width:"300px",height:"350px"}}>
                  <CardContent sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                    <img style={{width:"100%",height:"200px",objectFit:"cover"}} src="https://t4.ftcdn.net/jpg/05/99/25/47/360_F_599254718_4hsBO7IvKD8KN9T4Cv8utU37903QzZjA.jpg" alt="Cover" />
                    <Typography sx={{fontSize:"18px",fontWeight:"bold"}} variant='h3'>{row.courseId.courseTitle}</Typography>
                    <Typography sx={{fontSize:"13px",color:"gray"}} component={"p"} variant='span'>{row.courseId.instructorId.instructorName}</Typography>
                    <Stack sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}} direction={"row"} spacing={1}>
                      <Typography sx={{fontWeight:"bold",fontSize:"15px"}} component={"span"} variant='span'>4.6</Typography>
                      <Rating sx={{fontSize:"20px"}} name="read-only" value={value} readOnly />
                    </Stack>
                    <Stack sx={{alignItems:"center",justifyContent:"space-between"}} direction={"row"}>
                    <Typography sx={{fontSize:"25px",fontWeight:"bold"}} component={"p"} variant='h3'>Rs 4200</Typography>
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
                <Typography variant='h3' sx={{fontWeight:"bold"}}>Rs 3450</Typography>
                <Button variant='contained'>Checkout</Button>
              </Box>
              </Stack>
            )
                }
        
     
   
    </div>
  )
}

export default Cart