import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';


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

    const {sid:sectionId} = useParams()
    const [materialTitle,setMaterialTitle] = useState('')
    const [materialDesc,setMaterialDesc] = useState('')
    const [materialFile,setMaterialFile] = useState('')
    const [showMaterial,setShowMaterial] = useState([])

    const createMaterial = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/Material",{materialTitle,materialDesc,materialFile,sectionId}).then((res)=>{
            console.log(res.data)
        }).catch((e)=>{
            console.log(e.message)
        })
    }

    const fetchMaterials = (id)=>{
        axios.get("http://localhost:5000/section/"+id+"/material").then((res)=>{
            setShowMaterial(res.data)
            console.log(showMaterial)
        }).catch((err)=>{
            console.log(err.message)
        })
    }


    useEffect(()=>{
        fetchMaterials(sectionId)
    },[])

    

    return (
        <div className='instructorCourseMaterial'>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <Card onSubmit={createMaterial}  component="form" sx={{ minWidth: "700px" }}>
                    <CardContent>
                        <Typography sx={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>New Material</Typography>
                        <Stack spacing={3} direction="column" sx={{ mt: 5 }}>
                            <TextField onChange={(e)=>setMaterialTitle(e.target.value)} label="Material Title" variant='outlined' />
                            <TextField onChange={(e)=>setMaterialDesc(e.target.value)} label="Material Description" multiline minRows={5} variant='outlined' />
                            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput onChange={(e)=>setMaterialFile(e.target.value)} type="file" />
                            </Button>
                        </Stack>
                    </CardContent>
                    <Button type='submit' variant='contained' sx={{display:"block",margin:"10px auto"}} >Submit</Button>
                </Card>
            </Box>
            {showMaterial.materialTitle}
            
        </div>
    )
}

export default Material
