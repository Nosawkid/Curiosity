import React, { useEffect, useState } from 'react'
import './newcourse.scss'
import { Box, Button, Card, CardContent, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import axios from "axios"
import { Server } from '../../../Server.js'
import Alert from '@mui/material/Alert';




const Newcourse = () => {
    const jid = sessionStorage.getItem("Jid")
    const [vacancyTitle, setVacancyTitle] = useState("");
    const [vacancyDesc, setVacancyDesc] = useState("");
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [vacancyRequirement, setVacancyRequirement] = useState("");
    const [vacancyTime,setVacancyTime] = useState("")
    const [showCategory, setShowCategory] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")


    const fetchCategory = () => {
        axios.get(`${Server}/Category`).then((res) => {
            setShowCategory(res.data)
        }).catch((err) => {
            console.log(err.message);
        })
    }

    const addVacancy = (e) => {
        e.preventDefault()
        axios.post(`${Server}/Vacancy`, { jobPortalId: jid, vacancyTitle, vacancyDesc, minSalary, maxSalary, categoryId, vacancyRequirement,vacancyTime }).then((res) => {
            if(res.data.status)
            {
                sendAlert("success",res.data.message)
            }
            else
            {
                sendAlert("error","Something went wrong")
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }


    const sendAlert = (severity, message) => {
        setSeverity(severity)
        setMessage(message)
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }



    useEffect(() => {
        fetchCategory()
    }, [])









    return (
        <div className='HiringNew'>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh",position:"relative" }}>
                <Card onSubmit={addVacancy} component="form" sx={{ minWidth: "700px" }}>
                    <CardContent>
                        <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Add New Vacancy</Typography>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="title">Job title:</InputLabel>
                            <TextField onChange={(e) => setVacancyTitle(e.target.value)} id='title'></TextField>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="description">Job decription:</InputLabel>
                            <TextField onChange={(e) => setVacancyDesc(e.target.value)} id='description' multiline minRows={3} ></TextField>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"20px"}}>
                            <Box>
                                <InputLabel htmlFor="title">Min Salary:</InputLabel>
                                <TextField onChange={(e) => setMinSalary(e.target.value)} fullWidth type='number' id='minsal'></TextField>
                            </Box>
                            <Box>
                                <InputLabel htmlFor="title">Max Salary:</InputLabel>
                                <TextField onChange={(e) => setMaxSalary(e.target.value)} fullWidth type='number' id='maxsal'></TextField>
                            </Box>
                            <FormControl sx={{mt:3,width:"200px"}}>
                            <InputLabel id="demo-simple-select-label-time">Employment Classification</InputLabel>
                            <Select
                                onChange={(e) => setVacancyTime(e.target.value)}
                                labelId='demo-simple-select-label-time'
                                id='demo-simple-select-time'
                                label="Employment Classification"
                            >
                                <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
                                <MenuItem value={"Part-Time"}>Part-Time</MenuItem>
                            </Select>
                        </FormControl>
                            
                        </Stack>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="demo-simple-select-label-requirement">Required Experience</InputLabel>
                            <Select
                                onChange={(e) => setVacancyRequirement(e.target.value)}
                                labelId='demo-simple-select-label-requirement'
                                id='demo-simple-select-requirement'
                                label="Required Experience"
                            >
                                <MenuItem value={"Novice"}>Novice(0- 1 year)</MenuItem>
                                <MenuItem value={"Apprentice"}>Apprentices(1-3 years)</MenuItem>
                                <MenuItem value={"Practitioner"}>Practitioner(3-5 years)</MenuItem>
                                <MenuItem value={"Professional"}>Professional(5-10 years)</MenuItem>
                                <MenuItem value={"Expert"}>Expert(10+ years)</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        label="Category"

                                    >
                                        {
                                            showCategory && showCategory.map((row, key) => (
                                                <MenuItem value={row._id}>{row.categoryName}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>
                            </Stack>
                            <Button type='submit' style={{ marginTop: '20px' }} variant='contained'>Submit</Button>
                        </Stack>

                    </CardContent>
                </Card>

            </Box>
            {
                showAlert && <Alert sx={{position:"absolute",top:"30px",left:"700px"}} icon={false} severity={severity}>
                {message}
            </Alert>
            }
        </div>
    )
}

export default Newcourse