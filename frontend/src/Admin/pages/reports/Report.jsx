import { Alert, Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Report = () => {
    const navigate = useNavigate()
    const [reports, setReports] = useState([])

    const fetchReports = () => {
        axios.get("http://localhost:5000/Report").then((res) => {
            setReports(res.data)
            
        })
    }

    const viewCourse = (id,reportId)=>{
        navigate("/admin/reportedcourse/"+id+"/"+reportId)
    }

    useEffect(() => {
        fetchReports()
    }, [])
    return (
        <div className='adminReportView'>
            <Box sx={{ textAlign: "center", mt: 2, fontSize: "20px", fontWeight: "bold", p: 5 }}>Reports
                <TableContainer sx={{ mt: 4 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>SI No</TableCell>
                                <TableCell align="center">Issue Type</TableCell>
                                <TableCell align="center">Issue Desc</TableCell>
                                <TableCell align="center">Course Name</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                reports && reports.map((row, key) => (
                                    <TableRow
                                        key={key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {key + 1}
                                        </TableCell>
                                        <TableCell align="center">{row.issueType}</TableCell>
                                        <TableCell align="center">{row.issueDesc}</TableCell>
                                        <TableCell align="center">{row.courseId.courseTitle}</TableCell>
                                        <TableCell align="center">{row.__v === 1 ? <Alert severity='success'>Action Taken</Alert> : <Button onClick={()=>viewCourse(row.courseId._id,row._id)}> View Course</Button> }</TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

export default Report