import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



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

const Material = () => {

  const { sid: sectionId } = useParams()
  const [materialTitle, setMaterialTitle] = useState('')
  const [materialDesc, setMaterialDesc] = useState('')
  const [materialFile, setMaterialFile] = useState('')
  const [showMaterial, setShowMaterial] = useState([])
  const [open, setOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [message,setMessage] = useState("")
  const [severity,setSeverity] = useState("")
  
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };
  const handleOpen = (index) => setOpenModalIndex(index);
  const handleClose = () => setOpenModalIndex(null);

  // const createMaterial = (e)=>{
  //     e.preventDefault()
  //     axios.post("http://localhost:5000/Material",{materialTitle,materialDesc,materialFile,sectionId}).then((res)=>{
  //         console.log(res.data)
  //         fetchMaterials(sectionId)
  //     }).catch((e)=>{
  //         console.log(e.message)
  //     })
  // }

  const createMaterial = () => {
    const frm = new FormData()
    frm.append("materialTitle", materialTitle)
    frm.append("materialFile", materialFile)
    frm.append("materialDesc", materialDesc)
    frm.append("sectionId", sectionId)

    if(!materialTitle || !materialDesc)
    {
      setAlertOpen(true)
      setSeverity("error")
      return setMessage("Fill the emtpy fields")
    }
    if(!materialFile)
    {
      setAlertOpen(true)
      setSeverity("error")
      return setMessage("Material File is mandatory")
    }
    axios.post("http://localhost:5000/Material", frm).then((res) => {
      setAlertOpen(true)
      setSeverity("success")
       setMessage("New Material Added")
      fetchMaterials(sectionId)
    }).catch((err) => {
      if(err.response && err.response.data && err.response.data.message)
      {
        setAlertOpen(true)
        setSeverity("error")
        setMessage(err.response.data.message)
      }
    })
  }

  const fetchMaterials = () => {
    axios.get("http://localhost:5000/section/" + sectionId + "/material").then((res) => {
      setShowMaterial(res.data)
      console.log(showMaterial)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  const deleteMaterials = (id) => {
    axios.delete("http://localhost:5000/Material/" + id).then((res) => {
      setAlertOpen(true)
      setSeverity("success")
       setMessage("Material Deleted")
      fetchMaterials(sectionId)
    }).catch((err) => {
      console.log(err.message)
    })
  }

 


  useEffect(() => {
    fetchMaterials()
  }, [])



  return (
    <div className='instructorCourseMaterial'>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
        <Card component="form" sx={{ minWidth: "700px" }}>
          <CardContent>
            <Typography sx={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>New Material</Typography>
            <Stack spacing={3} direction="column" sx={{ mt: 5 }}>
              <TextField required value={materialTitle } onChange={(e) => setMaterialTitle(e.target.value)} label="Material Title" variant='outlined' />
              <TextField required value={materialDesc} onChange={(e) => setMaterialDesc(e.target.value)} label="Material Description" multiline minRows={5} variant='outlined' />
              <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput required onChange={(e) => setMaterialFile(e.target.files[0])} type="file" />
              </Button>
            </Stack>
          </CardContent>
          <Button onClick={createMaterial} variant='contained' sx={{ display: "block", margin: "10px auto" }} >Submit</Button>
        </Card>
      </Box>

      <Box sx={{ p: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>SI No</TableCell>
                <TableCell align="center">Material Title</TableCell>
                <TableCell align="center">Material Desc</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showMaterial.map((row, key) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align='center'>
                    {key + 1}
                  </TableCell>
                  <TableCell align="center">{row.materialTitle}</TableCell>
                  <TableCell align="center">{row.materialDesc}</TableCell>
                  <TableCell align="center">
                    <Button onClick={(e) => deleteMaterials(row._id)} variant='outlined'><DeleteIcon sx={{ color: "crimson" }} /></Button>
                    <Button onClick={() => {
                      handleOpen(key)
                    }} sx={{ mx: 1 }} variant='outlined'>Preview</Button>
                    <Modal
                       open={openModalIndex === key}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                       <video src={row.materialFile} autoPlay controls controlsList='nodownload' style={{width:"100%"}}></video>
                      </Box>
                    </Modal>
                    {/* <Button onClick={()=>editMaterial(row._id)} variant='contained'>Edit</Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert
          onClose={handleAlertClose}
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

export default Material
