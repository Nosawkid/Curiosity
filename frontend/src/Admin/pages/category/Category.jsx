import React, { useEffect, useState } from 'react'
import './category.scss'
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

const Category = () => {

    const [categoryName, setCategoryName] = useState('')
    const [showCategory, setShowCategory] = useState([])

    const createCategory = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/Category/', { categoryName }).then((response) => {
            // console.log(response.data);
            fetchCategory()
            
        })
        

    }

    const fetchCategory = () => {
        axios.get('http://localhost:5000/Category').then((response) => {
            // console.log(response.data);
            setShowCategory(response.data)
            
        })
    }
 


    const deleteCategory = (id) =>{
        axios.delete("http://localhost:5000/Category/"+id).then((res)=>{
            fetchCategory()
        })
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div className='adminCategory'>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "50vh" }}>

                <Card component="form" sx={{ minWidth: "500px" }} onSubmit={createCategory}>
                    <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <AddCircleOutlineIcon sx={{ fontSize: "45px" }} />
                        <Typography sx={{ textAlign: "center" }}> Add New Category</Typography>

                        <Stack direction="row" spacing={2} sx={{ margin: "40px auto" }}>
                            <TextField sx={{ mt: 5 }} variant='standard' placeholder='Enter Category' onChange={(e) => setCategoryName(e.target.value)} />
                        </Stack>

                    </CardContent>

                    <Button variant='contained' sx={{ display: "block", margin: " 10px auto" }} type='submit'>Submit</Button>

                </Card>

            </Box>
           <Box sx={{px:3}}>
           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SlNo</TableCell>
                            <TableCell align="center">Categories</TableCell>
                            <TableCell align='center'>Category Code</TableCell>
                            <TableCell align="center">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showCategory.map((row, key) => (
                            <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {key + 1}
                                </TableCell>
                                <TableCell align="center">{row.categoryName}</TableCell>
                                <TableCell align="center">{row.categoryName.slice(0,3).toUpperCase()}</TableCell>
                                <TableCell align="center"><Button className='deleteBtn' variant='text' onClick={() => deleteCategory(row._id)}><DeleteIcon/></Button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
           </Box>
        </div>
    )
}

export default Category