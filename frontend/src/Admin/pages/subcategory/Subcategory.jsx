import React, { useEffect, useState } from 'react'
import './subcategory.scss'
import { Box, Button, Card, CardContent, Stack, TextField, Typography, InputLabel, MenuItem, Select, FormControl, IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';

const Subcategory = () => {



  const [showCategory, setShowCategory] = useState([])
  const [category, setCategory] = useState([])
  const [subCategoryName,setSubCategory] = useState('')
  const [showSubCategory,setshowSubCategory] = useState([])
  const [open, setOpen] = React.useState(false);
  const [severity,setSeverity] = useState("")
  const [message,setMessage] = useState("")
  const [page, setPage] = useState(1);
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const createSubCategory = (e)=>{
    e.preventDefault()
    if(!subCategoryName)
    {
      setOpen(true)
      setSeverity("error")
      return setMessage("Please enter a Sub-Category")
    }
    axios.post("http://localhost:5000/Subcategory/",{subCategoryName,category}).then((res)=>{
      fetchSubCategory()
      setOpen(true)
      setSeverity("success")
      setMessage("Sub-category Added")
    }).catch((err)=>{
      if(err.response && err.response.data && err.response.data.message)
      {
        setOpen(true)
        setSeverity("error")
        setMessage(err.response.data.message)
      }
    })
  }

  const deleteSubCategory = (id)=>{
    axios.delete("http://localhost:5000/Subcategory/"+id).then((res)=>{
      fetchSubCategory()
    })
  }

  const fetchSubCategory = ()=>{
    axios.get("http://localhost:5000/Subcategory").then((res)=>{
      setshowSubCategory(res.data)
    })
  }


  



  const fetchCategory = () => {
    axios.get("http://localhost:5000/Category/").then((res) => {
      
      setShowCategory(res.data)
    })
  }


// Pagination
const rowsPerPage = 5;
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const startIndex = (page - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;






  useEffect(() => {
    fetchCategory()
    fetchSubCategory()

  }, [])




  return (
    <div className='adminSubcategory'>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", minHeight: "50vh" }}>

        <Card onSubmit={createSubCategory} component="form" sx={{ minWidth: "500px" }}>
          <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <AddCircleOutlineIcon sx={{ fontSize: "45px" }} />
            <Typography sx={{ textAlign: "center" }}> Add New Sub Category</Typography>
            <Stack direction="column" spacing={2} sx={{ margin: "40px auto" }}>
              <FormControl>
                <InputLabel id="categoryLabel">Category</InputLabel>
                <Select
                  labelId='categoryLabel'
                  id='category'
                  label="Category"
                  onChange={(event) => setCategory(event.target.value)}
                  value={category}


                >
                  {showCategory.map((row) => (
                    <MenuItem id={row._id} value={row._id}>{row.categoryName}</MenuItem>
                  ))}

                </Select>
              </FormControl>
              <TextField onChange={(e) => setSubCategory(e.target.value)} sx={{ mt: 5 }} label="Subcategory" variant='outlined' placeholder='Enter Subcategory' />
            </Stack>


          </CardContent>

          <Button type='submit' variant='contained' sx={{ display: "block", margin: " 10px auto" }}>Submit</Button>
        </Card>

      </Box>

      <Box sx={{ px: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">SI No</TableCell>
              <TableCell align="center">Sub-category</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showSubCategory.slice(startIndex, endIndex).map((row, i) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{startIndex + i + 1}</TableCell>
                <TableCell align="center">{row.subCategoryName}</TableCell>
                <TableCell align="center">{row.categoryId.categoryName}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => deleteSubCategory(row._id)} sx={{ color: "red" }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(showSubCategory.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2, alignSelf: 'center' }}
      />
    </Box>
      <Stack>
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
      </Stack>
    </div>
  )
}

export default Subcategory