import React, { useEffect, useState } from 'react'
import './topsuggestion.scss'
import {  Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Server } from '../../../Server.js'

const Topsuggestion = () => {
  const [category,setCategory] = useState([])
  const navigate = useNavigate()
  const destination = "/user/coursefromcategory"

  const viewFromCategory = (id)=>{
    navigate(`${destination}/${id}`)
  }

  const fetchCategories = ()=>{
    axios.get(`${Server}/Category`).then((res)=>{
      setCategory(res.data)
    })
  }

  useEffect(()=>{
    fetchCategories()
  },[])
  return (
    <Stack className='userTopsuggestion' sx={{padding:"20px 0", display:"flex",alignItems:"center", justifyContent:"center"}} spacing={3} direction="row">
       {
        category && category.map((row,key)=>(
          <div onClick={()=>viewFromCategory(row._id)} className='topSuggestionItem'>{row.categoryName}</div>
        ))
       }
       
    </Stack>
  )
}

export default Topsuggestion