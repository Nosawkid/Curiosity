import { Box, Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MyLogo from '../../../assets/LogoOg.png'
import VerifiedIcon from '@mui/icons-material/Verified';
import Sign from '../../../assets/SignC.png'
import { Server } from '../../../Server.js';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Certificate = () => {
    const { courseId, userId } = useParams()
    const [course, setCourse] = useState("")
    const [user, setUser] = useState("")

    const fetchCourse = () => {
        axios.get(`${Server}/Course/${courseId}`).then((res) => {
            setCourse(res.data)
        })
    }
    const fetchUser = () => {
        axios.get(`${Server}/User/${userId}`).then((res) => {
            setUser(res.data)
            console.log(res.data)
        })
    }

    const downloadCertificate = () => {
        const element = document.getElementById('certificate');

        html2canvas(element).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [900, 500]
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = 1000;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            if (pdfHeight > 500) {
                const scaleFactor = 500 / pdfHeight;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth * scaleFactor, 500);
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            }

            pdf.save('certificate.pdf');
        });
    };



    useEffect(() => {
        fetchCourse()
        fetchUser()
    }, [])

    return (
        <div className='userCertificate'>
            <Box sx={{ p: 10 }}>
                <Card sx={{ width: "1000px", margin: "0 auto",p:2 }} id="certificate">
                    <Box sx={{border:"thick double #003f88"}}>
                        <CardContent>
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                                <CardMedia
                                    component={"img"}
                                    image={MyLogo}
                                    sx={{ width: 150 }}
                                >

                                </CardMedia>
                                <VerifiedIcon sx={{ color: "#003f88", fontSize: "70px" }} />
                            </Stack>
                            <Box sx={{ margin: "10px auto", width: "300px" }}>
                                <Typography sx={{ fontSize: "50px", textAlign: "center", fontWeight: "bold", color: "#003f88" }}>CERTIFICATE</Typography>
                                <Typography sx={{ textAlign: "left", ml: 1, fontWeight: "bold" }}>OF COMPLETION </Typography>
                            </Box>
                            <Box sx={{ margin: "30px auto", width: "300px" }}>
                                <Typography sx={{ textAlign: "center", fontWeight: "bold", fontSize: "20px", textTransform: "uppercase" }}>{user && user.userName}  </Typography>
                            </Box>
                            <Box sx={{ marginTop: "60px", width: "300px", ml: 2 }}>
                                <Typography sx={{ textAlign: "left", fontWeight: "bold", fontSize: "14px", color: "gray" }}>SUCCESSFULLY COMPLETED </Typography>
                                <Typography sx={{ textAlign: "left", fontWeight: "bold", fontSize: "20px", textTransform: "uppercase" }}>{course && course.courseTitle}  </Typography>
                            </Box>
                            <Stack sx={{ mt: 5 }} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                <Box>
                                    <Typography sx={{ fontWeight: "bold" }}> 11/10/24</Typography>
                                    <Typography sx={{ fontWeight: "bold" }}>DATE</Typography>
                                </Box>
                                <Box sx={{ mb: 1 }}>
                                    <CardMedia
                                        component={"img"}
                                        image={Sign}
                                        sx={{ width: 120 }}
                                    >

                                    </CardMedia>
                                    <Typography sx={{ fontWeight: "bold" }}>SIGNATURE</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Box>
                </Card>
                <Button sx={{ display: "block", margin: "auto" }} onClick={downloadCertificate}>Download PDF</Button>
            </Box>
        </div>
    )
}

export default Certificate