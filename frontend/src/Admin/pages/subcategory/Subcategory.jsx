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

const Subcategory = () => {



  const [showCategory, setShowCategory] = useState([])
  const [category, setCategory] = useState([])
  const [subCategoryName,setSubCategory] = useState('')
  const [showSubCategory,setshowSubCategory] = useState([])


  const createSubCategory = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:5000/Subcategory/",{subCategoryName,category}).then((res)=>{
      fetchSubCategory()
    })
  }

  const fetchSubCategory = ()=>{
    axios.get("http://localhost:5000/Subcategory").then((res)=>{
      setshowSubCategory(res.data)
    })
  }


  const deleteSubCategory = (id)=>{
    axios.delete("http://localhost:5000/Subcategory/"+id).then((res)=>{
      fetchCategory()
    })
  }



  const fetchCategory = () => {
    axios.get("http://localhost:5000/Category/").then((res) => {
      
      setShowCategory(res.data)
    })
  }
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

      <Box sx={{px:5}}>
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
          {showSubCategory.map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{i + 1}</TableCell>
              <TableCell align="center">{row.subCategoryName}</TableCell>
              <TableCell align="center">{row.categoryId.categoryName}</TableCell>
              <TableCell align="center">
                <IconButton onClick={()=>deleteSubCategory(row._id)} sx={{color:"red"}}>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </div>
  )
}

export default Subcategory