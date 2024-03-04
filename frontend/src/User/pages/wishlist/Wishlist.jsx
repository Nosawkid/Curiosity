import { Box, Card, CardContent, Rating, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axios from 'axios';
import './wishlist.scss'
import Courseholder from '../../../assets/Courseholder.png'

const Wishlist = () => {

    const [value,setValue] = useState(2)
    const [showCourses,setShowCourses] = useState([])


    const uid = sessionStorage.getItem("Uid")

   


    const fetchWishlist = ()=>{
        axios.get("http://localhost:5000/wishlist/"+uid).then((res)=>{
            setShowCourses(res.data)
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    const removeFromFavs = (id)=>{
        axios.delete("http://localhost:5000/wishlist/"+id).then((res)=>{
            fetchWishlist()
        })
    }

    

    useEffect(()=>{
        fetchWishlist()
    },[])

  return (
    <div className='userWishList'>
        <Typography variant='h2' sx={{textAlign:"center",fontSize:"40px",fontWeight:"bold"}}>Wishlist</Typography>
        {
            showCourses.length === 0 ? (<Typography sx={{fontSize:"30px",fontWeight:"bold",color:"gray",textAlign:"center",mt:10}}>No Items in the wishlist</Typography>):
            (
                <Box sx={{maxWidth:"100vw",display:"flex",alignItems:"center",justifyContent:"center",gap:"45px",flexWrap:"wrap",mt:2}}>
                {showCourses.map((row,key)=>(
                <Card className='courseCard' sx={{width:"300px",height:"350px"}}>
                  <CardContent sx={{display:"flex",flexDirection:"column",gap:"10px"}}>
                    <img style={{width:"100%",height:"200px",objectFit:"cover"}} src={row.courseId.courseImage || Courseholder} alt="Cover" />
                    <Typography sx={{fontSize:"18px",fontWeight:"bold"}} variant='h3'>{row.courseId.courseTitle}</Typography>
                    <Typography sx={{fontSize:"13px",color:"gray"}} component={"p"} variant='span'>{row.courseId.instructorId.instructorName}</Typography>
                    <Stack sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}} direction={"row"} spacing={1}>
                      <Typography sx={{fontWeight:"bold",fontSize:"15px"}} component={"span"} variant='span'>4.6</Typography>
                      <Rating sx={{fontSize:"20px"}} name="read-only" value={value} readOnly />
                    </Stack>
                    <Stack sx={{alignItems:"center",justifyContent:"space-between"}} direction={"row"}>
                    <Typography sx={{fontSize:"25px",fontWeight:"bold"}} component={"p"} variant='h3'>₹ {row.courseId.price}</Typography>
                      <Box sx={{display:"flex",alignItems:"center",gap:"10px"}} className="iconContainer">
                    <Tooltip title="Add to cart">
                    <AddShoppingCartIcon className='cartIcon'/>
                    </Tooltip>
                    <Tooltip title="Remove wishlist">
                    <RemoveCircleIcon className='favrtIcon' onClick={()=>removeFromFavs(row._id)} />
                    </Tooltip>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
                ))}
              </Box>
            )
        }
    </div>
  )
}

export default Wishlist