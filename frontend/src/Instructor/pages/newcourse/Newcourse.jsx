import React, { useEffect, useState } from 'react'
import './newcourse.scss'
import { Box, Button, Card, CardContent, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Newcourse = () => {
    const navigate = useNavigate()
    const [courseTitle,setCourseTitle] = useState('')
    const [courseDesc,setCourseDesc] = useState('')
    const [showCategory,setShowCategory] = useState([])
    const [category,setCategory] = useState('')
    const [showSubCategory,setShowSubCategory] = useState([])
    const [subCategory,setSubCategory] = useState('')
    const [showTopic,setShowTopic] = useState([])
    const [topicId,setTopicId] = useState('')

    const instructorId = sessionStorage.getItem("Iid")

    const createCourse = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/Course/",{courseTitle,courseDesc,topicId,instructorId}).then((res)=>{
            console.log(res.data)
            navigate('/instructor/courses')
        })

    }

    const fetchCategory = () =>{
        axios.get("http://localhost:5000/Category/").then((res)=>{
            setShowCategory(res.data)
        })
    }

    const fetchSubCategory = (id) =>{
        axios.get("http://localhost:5000/Subcategory/"+id).then((res)=>{
            setShowSubCategory(res.data)
        })
    }

    const fetchTopic = (id) =>{
        axios.get("http://localhost:5000/Topic/"+id).then((res)=>{
            setShowTopic(res.data)
        })
    }
    

    useEffect(()=>{
        fetchCategory()
    },[])
    return (
        <div className='newcourse'>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <Card component="form" onSubmit={createCourse} sx={{ minWidth: "700px" }}>
                    <CardContent>
                        <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Add New Course</Typography>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="title">Course Title:</InputLabel>
                            <TextField id='title' value={courseTitle} onChange={(e)=> setCourseTitle(e.target.value)} ></TextField>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="description">Course Decription:</InputLabel>
                            <TextField onChange={(e)=>setCourseDesc(e.target.value)} id='description' multiline minRows={3} ></TextField>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    
                                        label="Category"
                                        onChange={(e)=>{
                                            setCategory(e.target.value)
                                            fetchSubCategory(e.target.value)
                                        }
                                        }
                                        value={category}

                                      
                                        
                                    >
                                        {showCategory.map((row)=>(
                                            <MenuItem value={row._id}>{row.categoryName}</MenuItem>
                                        ))}
                                        
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    
                                        label="SubCategory"
                                        onChange={(e)=>{
                                            setSubCategory(e.target.value)
                                            fetchTopic(e.target.value)
                                        }}
                                        value={subCategory}
                                        
                                    >
                                       {showSubCategory.map((row)=>(
                                        <MenuItem value={row._id}>{row.subCategoryName}</MenuItem>
                                       ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    
                                        label="Topic"
                                        onChange={(e)=>{
                                            setTopicId(e.target.value)
                                        }}
                                        value={topicId}
                                        
                                    >
                                       {showTopic.map((row)=>(
                                        <MenuItem value={row._id}>{row.topicName}</MenuItem>
                                       ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Button type='submit' style={{marginTop:'20px'}} variant='contained'>Submit</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default Newcourse