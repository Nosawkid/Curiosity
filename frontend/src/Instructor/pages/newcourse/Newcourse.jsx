import React, { useEffect, useState } from 'react'
import './newcourse.scss'
import { Box, Button, Card, CardContent, CircularProgress, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Server } from '../../../Server.js'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const Newcourse = () => {
    const navigate = useNavigate()
    const [courseTitle, setCourseTitle] = useState('')
    const [courseDesc, setCourseDesc] = useState('')
    const [showCategory, setShowCategory] = useState([])
    const [category, setCategory] = useState('')
    const [showSubCategory, setShowSubCategory] = useState([])
    const [subCategory, setSubCategory] = useState('')
    const [showTopic, setShowTopic] = useState([])
    const [topicId, setTopicId] = useState('')
    const [price, setPrice] = useState(0)
    const [courseImage, setCourseImage] = useState("")
    const [courseRequirements, setCourseRequirements] = useState([])
    const [requirementValue, setRequirementValue] = useState("")
    const [open, setOpen] = React.useState(false);
    const [message,setMessage] = useState("")
    const [severity,setSeverity] = useState("")
    



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const instructorId = sessionStorage.getItem("Iid")

    // const createCourse = (e) => {
    //     e.preventDefault()
    //     axios.post("http://localhost:5000/Course/", { courseTitle, courseDesc, topicId, instructorId, price }).then((res) => {
    //         console.log(res.data)
    //         navigate('/instructor/courses')
    //     })

    // }


    const handleRequirementKeyPress = (e) => {
        if (e.key === "Enter" && requirementValue.trim !== "") {
            setCourseRequirements([...courseRequirements, requirementValue.trim()])
            setRequirementValue("")
        }
    }


    const handleRemoveRequirements = (index) => {
        const updatedItems = [...courseRequirements]
        updatedItems.splice(index, 1)
        setCourseRequirements(updatedItems)
    }

    const createCourse = (e) => {
        e.preventDefault()
        const frm = new FormData()
        frm.append("courseTitle", courseTitle)
        frm.append("courseDesc", courseDesc)
        frm.append("topicId", topicId)
        frm.append("instructorId", instructorId)
        frm.append("price", price)
        frm.append("courseImage", courseImage)
        frm.append("courseRequirements", courseRequirements)

        axios.post(`http://localhost:5000/Course`, frm).then((res) => {
          
                navigate('/instructor/courses')
            
        }).catch((err)=>{
            if(err.response && err.response.data && err.response.data.message)
            {
                setOpen(true)
                setSeverity("error")
                setMessage(err.response.data.message)
            }
        })
    }



    const fetchCategory = () => {
        axios.get("http://localhost:5000/Category/").then((res) => {
            setShowCategory(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const fetchSubCategory = (id) => {
        axios.get("http://localhost:5000/Subcategory/" + id).then((res) => {
            setShowSubCategory(res.data)
        })
    }

    const fetchTopic = (id) => {
        axios.get("http://localhost:5000/Topic/" + id).then((res) => {
            setShowTopic(res.data)
        })
    }

    const handleChange = (e) => {
        setPrice(e.target.value)
    }

   

    useEffect(() => {
        fetchCategory()
    }, [])

    
   

    return (
        <div className='newcourse'>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <Card component="form" onSubmit={createCourse} sx={{ minWidth: "700px" }}>
                    <CardContent>
                        <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Add New Course</Typography>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="title">Course Title:</InputLabel>
                            <TextField required id='title' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} ></TextField>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="description">Course Decription:</InputLabel>
                            <TextField required onChange={(e) => setCourseDesc(e.target.value)} id='description' multiline minRows={3} ></TextField>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="description">Course Requirements:</InputLabel>
                            <TextField
                                required
                                value={requirementValue}
                                onChange={(e) => setRequirementValue(e.target.value)}
                                onKeyDown={handleRequirementKeyPress}
                                id='description'
                                placeholder='Type and press Enter to add Requirements'
                                multiline
                                minRows={3} ></TextField>
                            <Stack>
                                {courseRequirements.map((row, key) => (
                                    <div key={key} className='item' style={{ display: "inline" }}>
                                        <span>{row}</span>
                                        <Button onClick={() => handleRemoveRequirements(key)}>Remove</Button>
                                    </div>
                                ))}
                            </Stack>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <Typography>Course Image:</Typography>
                            <Button
                                component="label"
                                role={undefined}
                                variant="outlined"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput onChange={(e) => setCourseImage(e.target.files[0])} type="file" />
                            </Button>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Price Tier</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={price}
                                    label="Price Tier"
                                    onChange={handleChange}
                                >

                                    <MenuItem value={799}>&#8377;799 (Tier 1)</MenuItem>
                                    <MenuItem value={999}>&#8377;999 (Tier 2)</MenuItem>
                                    <MenuItem value={1199}>&#8377;1,199 (Tier 3)</MenuItem>
                                    <MenuItem value={1299}>&#8377;1,299 (Tier 4)</MenuItem>
                                    <MenuItem value={1499}>&#8377;1,499 (Tier 5)</MenuItem>


                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"

                                        label="Category"
                                        onChange={(e) => {
                                            setCategory(e.target.value)
                                            fetchSubCategory(e.target.value)
                                        }
                                        }
                                        value={category}



                                    >
                                        {showCategory.map((row) => (
                                            <MenuItem value={row._id}>{row.categoryName}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"

                                        label="SubCategory"
                                        onChange={(e) => {
                                            setSubCategory(e.target.value)
                                            fetchTopic(e.target.value)
                                        }}
                                        value={subCategory}

                                    >
                                        {showSubCategory.map((row) => (
                                            <MenuItem value={row._id}>{row.subCategoryName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"

                                        label="Topic"
                                        onChange={(e) => {
                                            setTopicId(e.target.value)
                                        }}
                                        value={topicId}

                                    >
                                        {showTopic.map((row) => (
                                            <MenuItem value={row._id}>{row.topicName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Button type='submit' style={{ marginTop: '20px' }} variant='contained'>Submit</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                  {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Newcourse