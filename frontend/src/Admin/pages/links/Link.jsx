import React, { useEffect, useState } from 'react'
import './links.scss'
// import Datatable from '../../components/datatable/Datatable'
import { Box, Button, Card, CardContent, FormLabel, Stack, TextField, Typography } from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Sociallinks = () => {

    const [linkName,getLinkName] = useState('')
    const [showLink,getShowLink] = useState([])


    const createLink = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/Link/',{linkName}).then((res)=>{
            fetchLink()

        })
    }

    const fetchLink = ()=>{
        axios.get("http://localhost:5000/Link/").then((res)=>{
            getShowLink(res.data)
        })
    }
    useEffect(()=>{
        fetchLink()
    },[])

    return (
        <div className='adminSocialLinks'>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",width:"100%",minHeight:"50vh" }}>

                <Card onSubmit={createLink} component="form" sx={{minWidth:"500px"}}>
                    <CardContent sx={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                        <AddLinkIcon sx={{fontSize:"45px"}}/>
                        <Typography sx={{textAlign:"center"}}> Add New Social Media</Typography>
                         <Stack direction="row" spacing={2} sx={{mt:5}}>
                            <Typography>Add Icon</Typography>
                            <Box>
                                <FormLabel className='addLinkIcon' sx={{display:"flex",alignItems:"center",gap:"20px"}} htmlFor="linkIcon">
                                <FileUploadIcon />
                                </FormLabel>
                                <TextField  sx={{display:"none"}} type='file' id='linkIcon'></TextField>
                            </Box>
                            </Stack>  
                            <TextField onChange={(e) => getLinkName(e.target.value)} sx={{mt:5}} variant='standard' placeholder='Enter Social Media Name'/> 
                            
                    </CardContent>


                    <Button type='submit' variant='contained' sx={{display:"block",margin:" 10px auto"}}>Submit</Button>
                </Card>

            </Box>

            <Box sx={{px:3}}>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">SI No</TableCell>
            <TableCell align="center">Social Name</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showLink.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
                {i + 1}
              </TableCell>
              <TableCell align="center">{row.linkName}</TableCell>
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

export default Sociallinks