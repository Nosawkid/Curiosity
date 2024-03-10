import { Avatar, Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import {Server} from '../../../Server.js'
import axios from 'axios'
import moment from 'moment'


const Applications = () => {
    const [application,setApplication] = useState([])

    const { jobId } = useParams()
    const navigate = useNavigate()

    const fetchApplications = ()=>{
        axios.get(`${Server}/Application/${jobId}`).then((res)=>{
            setApplication(res.data)
        })
    }


    const viewApplication = (id)=>{
        navigate("/HiringPortal/Application/"+id)
    }



    useEffect(()=>{
        fetchApplications()
    },[])


    return (
        <div className='hirerApplications'>
            
            <Box sx={{ m: 3 }}>
                <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "25px" }}>JOB APPLICATIONS</Typography>
                <Box sx={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
                   {
                    application && application.map((row,key)=>(
                        <Card key={key} sx={{ mt: 3, width: "300px" }}>
                        <CardContent>
                            <img style={{width:"150px",height:"150px",objectFit:"cover",borderRadius:"50%",display:"block",margin:"0 auto"}} src={row.userId.userPhoto} alt={row.userId.userName} />
                            <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 2, textAlign: "center" }}>{row.userId.userName}</Typography>
                            <Typography sx={{ mt: 2, textAlign: "center" }}>{row.userId.userHeadLine}</Typography>
                            <Typography sx={{ mt: 2, textAlign: "center", fontSize: "14px" }}>Applied On: {moment(row.applicationDate).format('DD-MM-YYYY')}</Typography>
                            <Button onClick={()=>viewApplication(row._id)} fullWidth>View Application</Button>
                        </CardContent>
                    </Card>
                    ))
                   }
                </Box>
            </Box>
        </div>
    )
}

export default Applications