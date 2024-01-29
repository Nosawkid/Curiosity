import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import React from 'react'


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
    return (
        <div className='instructorCourseMaterial'>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                <Card component="form" sx={{ minWidth: "700px" }}>
                    <CardContent>
                        <Typography sx={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>New Material</Typography>
                        <Stack spacing={3} direction="column" sx={{ mt: 5 }}>
                            <TextField label="Material Title" variant='outlined' />
                            <TextField label="Material Description" multiline minRows={5} variant='outlined' />
                            <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Stack>
                    </CardContent>
                    <Button variant='contained' sx={{display:"block",margin:"10px auto"}} >Submit</Button>
                </Card>
            </Box>
        </div>
    )
}

export default Material
