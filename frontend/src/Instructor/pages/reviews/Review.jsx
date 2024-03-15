import { Avatar, Box, Card, CardContent, Grid, Paper, Rating, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Placeholder from '../../components/placeholder/Placeholder'

const Review = () => {
    const { courseId } = useParams()
    const [fiveStarRatings, setFiveStarRatings] = useState([])
    const [fourStarRatings, setfourStarRatings] = useState([])
    const [threeStarRatings, setThreeStarRatings] = useState([])
    const [twoStarRatings, setTwoStarRatings] = useState([])
    const [oneStarRatings, setOneStarRatings] = useState([])
    const [avgRating,setAvgRating] = useState(0)
   


    const fetchReviews = () => {
        axios.get("http://localhost:5000/Coursereview/" + courseId).then((res) => {
            if (res.data.length > 0) {
                setFiveStarRatings(res.data.filter((review) => review.reviewRating === 5))
                setfourStarRatings(res.data.filter((review) => review.reviewRating === 4))
                setThreeStarRatings(res.data.filter((review) => review.reviewRating === 3))
                setTwoStarRatings(res.data.filter((review) => review.reviewRating === 2))
                setOneStarRatings(res.data.filter((review) => review.reviewRating === 1))
                

            }
        })
    }

    const fetchCourse = ()=>{
        axios.get("http://localhost:5000/Course/"+courseId).then((res)=>{
            setAvgRating(res.data.courseAvg)
        })
    }

    useEffect(() => {
        fetchReviews()
        fetchCourse()
    }, [])
    return (

        <div className='instructorReviews'>
            <Grid container spacing={1} alignItems={"center"}>
                <Grid xs={12}>
                    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{mb:4}}>
                    <Typography sx={{color:"#ff9800"}}>Course Rating</Typography>
                    <Typography color={"#ff9800"} sx={{fontWeight:"bold",fontSize:"70px"}}>{avgRating.toFixed(1)} </Typography>
                    <Rating value={avgRating}></Rating>
                    </Stack>
                </Grid>
                <Grid  item xs={4}>
                    <Typography sx={{ display: "flex", alignItems: "center", gap: "10px" }}><Rating readOnly value={5}></Rating></Typography>
                    <Paper elevation={3} sx={{p:5, mt: 2, height: "40vh", overflowY: "scroll", "&::-webkit-scrollbar": { width: "0" } }}>
                        {
                            fiveStarRatings && fiveStarRatings.map((row, key) => (
                                <Card  key={key} sx={{ width: '100%',my:1 }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                           {
                                            row.userId.userPhoto ?  <Avatar src={row.userId.userPhoto} alt="User Avatar" sx={{ mr: 2 }} /> : <Box sx={{mr:1}}><Placeholder username={row.userId.userName} /></Box>
                                           }
                                            <Typography variant="subtitle1">{row.userId.userName} </Typography>
                                        </Box>
                                        
                                        <Typography variant='body2' sx={{fontWeight:"bold"}}>{row.reviewTitle}</Typography>
                                        <Typography mt={2} variant="body1">
                                           {row.reviewContent}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </Paper>
                </Grid>
                <Grid   item xs={4}>
                    <Rating readOnly value={4}></Rating>
                    <Paper elevation={3} sx={{p:5, mt: 2, height: "40vh", overflowY: "scroll", "&::-webkit-scrollbar": { width: "0" } }}>
                        {
                            fourStarRatings && fourStarRatings.map((row, key) => (
                                <Card  key={key} sx={{ width: '100%',my:1 }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                        {
                                            row.userId.userPhoto ?  <Avatar src={row.userId.userPhoto} alt="User Avatar" sx={{ mr: 2 }} /> : <Box sx={{mr:1}}><Placeholder username={row.userId.userName} /></Box>
                                           }
                                            <Typography variant="subtitle1">{row.userId.userName} </Typography>
                                        </Box>
                                        
                                        <Typography variant='body2' sx={{fontWeight:"bold"}}>{row.reviewTitle}</Typography>
                                        <Typography mt={2} variant="body1">
                                           {row.reviewContent}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </Paper>
                </Grid>
                <Grid   item xs={4}>
                    <Rating readOnly value={3}></Rating>
                    <Paper elevation={3} sx={{p:5, mt: 2, height: "40vh", overflowY: "scroll", "&::-webkit-scrollbar": { width: "0" } }}>
                        {
                            threeStarRatings && threeStarRatings.map((row, key) => (
                                <Card  key={key} sx={{ width: '100%',my:1 }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                        {
                                            row.userId.userPhoto ?  <Avatar src={row.userId.userPhoto} alt="User Avatar" sx={{ mr: 2 }} /> : <Box sx={{mr:1}}><Placeholder username={row.userId.userName} /></Box>
                                           }
                                            <Typography variant="subtitle1">{row.userId.userName} </Typography>
                                        </Box>
                                        
                                        <Typography variant='body2' sx={{fontWeight:"bold"}}>{row.reviewTitle}</Typography>
                                        <Typography mt={2} variant="body1">
                                           {row.reviewContent}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </Paper>
                </Grid>
                <Grid  sx={{mt:5}} item xs={4}>
                    <Rating readOnly value={2}></Rating>
                    <Paper elevation={3} sx={{p:5, mt: 2, height: "40vh", overflowY: "scroll", "&::-webkit-scrollbar": { width: "0" } }}>
                        {
                            twoStarRatings && twoStarRatings.map((row, key) => (
                                <Card  key={key} sx={{ width: '100%',my:1 }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                        {
                                            row.userId.userPhoto ?  <Avatar src={row.userId.userPhoto} alt="User Avatar" sx={{ mr: 2 }} /> : <Box sx={{mr:1}}><Placeholder username={row.userId.userName} /></Box>
                                           }
                                            <Typography variant="subtitle1">{row.userId.userName} </Typography>
                                        </Box>
                                        
                                        <Typography variant='body2' sx={{fontWeight:"bold"}}>{row.reviewTitle}</Typography>
                                        <Typography mt={2} variant="body1">
                                           {row.reviewContent}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </Paper>
                </Grid>
                <Grid sx={{mt:5}} item xs={4}>
                    <Rating readOnly value={1}></Rating>
                    <Paper elevation={3} sx={{p:5, mt: 2, height: "40vh", overflowY: "scroll", "&::-webkit-scrollbar": { width: "0" } }}>
                        {
                            oneStarRatings && oneStarRatings.map((row, key) => (
                                <Card  key={key} sx={{ width: '100%',my:1 }}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                        {
                                            row.userId.userPhoto ?  <Avatar src={row.userId.userPhoto} alt="User Avatar" sx={{ mr: 2 }} /> : <Box sx={{mr:1}}><Placeholder username={row.userId.userName} /></Box>
                                           }
                                            <Typography variant="subtitle1">{row.userId.userName} </Typography>
                                        </Box>
                                        
                                        <Typography variant='body2' sx={{fontWeight:"bold"}}>{row.reviewTitle}</Typography>
                                        <Typography mt={2} variant="body1">
                                           {row.reviewContent}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Review