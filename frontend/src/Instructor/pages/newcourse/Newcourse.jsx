import React from 'react'
import './newcourse.scss'
import { Box, Button, Card, CardContent, FormControl, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
const Newcourse = () => {
    return (
        <div className='newcourse'>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <Card component="form" sx={{ minWidth: "700px" }}>
                    <CardContent>
                        <Typography sx={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Add New Course</Typography>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="title">Course title:</InputLabel>
                            <TextField id='title'></TextField>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <InputLabel htmlFor="description">Course decription:</InputLabel>
                            <TextField id='description' multiline minRows={3} ></TextField>
                        </Stack>
                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    
                                        label="Category"
                                        
                                    >
                                        <MenuItem value={"IT"}>IT</MenuItem>
                                        <MenuItem value={"Film"}>Film</MenuItem>
                                        <MenuItem value={"Language"}>Language</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    
                                        label="SubCategory"
                                        
                                    >
                                        <MenuItem value={"Development"}>Development</MenuItem>
                                        <MenuItem value={"Programming"}>Programming</MenuItem>
                                        <MenuItem value={"Database"}>Database</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    
                                        label="Topic"
                                        
                                    >
                                        <MenuItem value={"C++"}>C++</MenuItem>
                                        <MenuItem value={"Java"}>Java</MenuItem>
                                        <MenuItem value={"Python"}>Python</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Button style={{marginTop:'20px'}} variant='contained'>Submit</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </div>
    )
}

export default Newcourse