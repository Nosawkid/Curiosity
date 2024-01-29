import React, { useEffect, useState } from 'react'
import './topic.scss'
import { Box, Button, Card, CardContent,  Stack, TextField, Typography, InputLabel,MenuItem, Select,FormControl} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Topic = () => {

  const [showCategory,setShowCategory] = useState([])
  const [category,setCategory] = useState([])
  const [showSubCategory,setShowSubCategory] = useState([])
  const [subCategoryId,setSubCategory] = useState([])
  const [topicName,setTopicName] = useState('')
  const [showTopic,setShowTopic] = useState([])


  const fetchCategory = ()=>{
    axios.get("http://localhost:5000/Category/").then((res)=>{
      console.log(res.data)
      setShowCategory(res.data)
    })
  }

  const fetchSubCategory = (id)=>{
    axios.get("http://localhost:5000/Subcategory/"+id).then((res)=>{
      console.log(res.data)
      setShowSubCategory(res.data)
    })
  }
  const fetchTopic = ()=>{
    axios.get("http://localhost:5000/Topic/").then((res)=>{
      console.log(res.data)
      setShowTopic(res.data)
    })
  }
  useEffect(()=>{
    fetchCategory()
    fetchTopic()
  },[])



  const createTopic = (e) =>{
    e.preventDefault()
    axios.post("http://localhost:5000/Topic",{topicName,subCategoryId}).then((res)=>{
      console.log(res.data)
      fetchTopic()
    })
  }



 
    return (
        <div className='adminTopic'>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "50vh" }}>

                <Card onSubmit={createTopic} component="form" sx={{ minWidth: "500px" }}>
                    <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <AddCircleOutlineIcon sx={{ fontSize: "45px" }} />
                        <Typography sx={{ textAlign: "center" }}> Add New Sub Category</Typography>
                        <Stack direction="column" spacing={2} sx={{margin:"40px auto"}}>
                          <FormControl>
                            <InputLabel id="subCategoryLabel">Category</InputLabel>
                            <Select
                              labelId='subCategoryLabel'
                              id='subCategory'
                              label="Sub Category"
                              onChange={(e)=>
                                 {setCategory(e.target.value)
                                  fetchSubCategory(e.target.value)
                              
                              }}
                              value={category}
                              
                            >
                              {showCategory.map((row,key)=>(
                                <MenuItem  key={key}value={row._id}>{row.categoryName}</MenuItem>
                              ))}

                            </Select>
                          </FormControl>
                          <FormControl>
                            <InputLabel id="subCategoryLabel">Sub Category</InputLabel>
                            <Select
                              labelId='subCategoryLabel'
                              id='subCategory'
                              label="Sub Category"
                              onChange={(e)=>{
                                setSubCategory(e.target.value)
                              }}
                              value={subCategoryId}
                              
                              
                            >
                               {showSubCategory.map((row,key)=>(
                                <MenuItem key={key} value={row._id}>{row.subCategoryName}</MenuItem>
                              ))}

                            
                            </Select>
                          </FormControl>
                        <TextField onChange={(e)=> setTopicName(e.target.value)} sx={{ mt: 5 }} label="Topic" variant='outlined' placeholder='Enter Topic' />
                        </Stack>
                       
                    </CardContent>

                    <Button type='submit' variant='contained' sx={{ display: "block", margin: " 10px auto" }}>Submit</Button>
                </Card>

            </Box>


            <Box sx={{px:4,mt:2}}>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">SI No</TableCell>
            <TableCell align="center">Topic</TableCell>
            <TableCell align="center">Sub-category</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showTopic.map((row,key) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component="th" scope="row">
                {key + 1}
              </TableCell>
              <TableCell align="center">{row.topicName}</TableCell>
              <TableCell align="center">{row.subCategoryId.subCategoryName}</TableCell>
              <TableCell align="center">{row.subCategoryId.categoryId.categoryName}</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Box>
        </div>
    )
}

export default Topic