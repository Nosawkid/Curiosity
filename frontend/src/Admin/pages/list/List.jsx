import React, { useEffect, useState } from 'react'
import './list.scss'
import Modal from '@mui/material/Modal';
import Holder from '../../../assets/Courseholder.png'
import axios from 'axios'
import { Server } from '../../../Server.js'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};



const List = () => {

  const [open, setOpen] = React.useState(false);
  const [instructors, setInstructors] = useState([])
  const [instructorPhoto,setInstructorPhoto] = useState("")
  const handleOpen = (image) => {
    setInstructorPhoto(image)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);


  const fetchInstructors = () => {
    axios.get(`${Server}/Instructors/verify`).then((res) => {
      setInstructors(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }


  const acceptIns = (id)=>{
    axios.put(`${Server}/Instructor/${id}/accept`).then((res)=>{
      fetchInstructors()
      alert("User Accepted")
    })
  }
  const rejectIns = (id)=>{
    axios.put(`${Server}/Instructor/${id}/reject`).then((res)=>{
      fetchInstructors()
      alert("User Accepted")
    })
  }

  useEffect(() => {
    fetchInstructors()
  }, [])

  return (

    <div className="adminUsersList">
      <Box>
        <Typography sx={{ textAlign: "center", fontSize: "30px", mt: 3, fontWeight: "bold", fontFamily: "sans-serif" }}>Verify Instructors</Typography>
        <Stack sx={{ mt: 2 ,p:2}}>
          {
            instructors &&
            instructors.map((row, key) => (
              <Card>
                <CardContent>
                  <Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between", p: 4 }} spacing={1}>
                    <Typography sx={{ fontWeight: "bold" }}>Instructor Name : <span style={{ fontWeight: "normal" }}>{row.instructorName}</span></Typography>
                    <Typography>Instructor Contact: <span style={{ fontWeight: "bold" }}>+91 {row.instructorContact}</span></Typography>
                    <Typography>Instructor Email: <span style={{ fontWeight: "bold" }}>{row.instructorEmail}</span></Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Avatar src={row.instructorPhoto} onClick={()=>handleOpen(row.instructorProof)}></Avatar>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <img src={instructorPhoto} style={{ width: "100%" }} alt="ok" />
                        </Box>
                      </Modal>
                    </Box>
                    <Stack direction={"row"} spacing={2}>
                      <Button onClick={()=>acceptIns(row._id)} sx={{ backgroundColor: "green" }} variant='contained'>Accept</Button>
                      <Button onClick={()=>rejectIns(row._id)} sx={{ backgroundColor: "red" }} variant='contained'>Reject</Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))
          }
        </Stack>
      </Box>
    </div>

  )
}

export default List