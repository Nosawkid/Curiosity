import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Box, Button, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import myData from '../../../assets/Thor.mp4'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Showsection = ({ props, sessionKey, courseId }) => {
    const [material, setMaterial] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [course, setCourse] = useState(null)

    const fetchMaterial = () => {
        axios.get("http://localhost:5000/section/" + props._id + "/material").then((res) => {
            setMaterial(res.data)
            console.log(res.data);
        }).catch((err) => {
            console.log(err.message)
        })
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchCourse = () => {
        axios.get("http://localhost:5000/course/" + courseId).then((res) => {
            setCourse(res.data)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        fetchMaterial()
        fetchCourse()
    }, [])
    return (
        <div>
            {
                material && (
                    <Accordion sx={{ mt: 1 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {props.sectionName}
                        </AccordionSummary>
                        {
                            console.log(material)
                        }
                        {material.map((materialRow, key) => (
                            <AccordionDetails>
                                <Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                                    <LiveTvIcon />
                                    {sessionKey === 0 && key === 0 ? <Button onClick={handleClickOpen}>{materialRow.materialDesc} (Preview)</Button>
                                        : <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{materialRow.materialDesc}</Typography>}
                                    <div>
                                        <BootstrapDialog
                                            onClose={handleClose}
                                            aria-labelledby="customized-dialog-title"
                                            open={open}
                                        >
                                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                                {course && course.courseTitle}
                                            </DialogTitle>
                                            <IconButton
                                                aria-label="close"
                                                onClick={handleClose}
                                                sx={{
                                                    position: 'absolute',
                                                    right: 8,
                                                    top: 8,
                                                    color: (theme) => theme.palette.grey[500],
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <DialogContent dividers>
                                                <Box sx={{ width: "500px", height: "500px" }} >
                                                   {materialRow.materialFile ? <video controls src={materialRow.materialFile} style={{width:"100%"}}></video> : <Typography>{materialRow.materialFile}</Typography>}
                                                </Box>
                                            </DialogContent>
                                        </BootstrapDialog>
                                    </div>
                                    <Typography>5.56</Typography>
                                </Stack>
                            </AccordionDetails>
                        ))}
                    </Accordion>
                )
            }

        </div>
    )
}

export default Showsection