import { Box, Stack, Typography, Rating, Alert, Button, CardContent, CardMedia, Card, Divider, Paper, Avatar, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './course.scss'
import { useParams } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Showsection from '../showsection/Showsection'
import { useNavigate } from 'react-router-dom'
import Courseholder from '../../../assets/Courseholder.png'
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "fit-content",
  height: "60vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
  overflowX: "scroll"
};




const Course = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [value, setValue] = useState(2)
  const [showSection, setShowSection] = useState([])
  const [showFull, setShowFull] = useState(false)
  const [progress, setProgress] = React.useState(10);
  const [reviews, setReviews] = useState([])
  const [fiveReview, setfiveReview] = useState(0)
  const [fourReview, setfourReview] = useState(0)
  const [threeReview, setthreeReview] = useState(0)
  const [twoReview, settwoReview] = useState(0)
  const [oneReview, setoneReview] = useState(0)
  const [avgReviewRating, setavgReviewRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = React.useState(false);
  const [ratedReviews, setRatedReviews] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRatedReviews([])
  }


  const uid = sessionStorage.getItem("Uid")

  function LinearProgressWithLabel({ value, count, ...props }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={value} {...props} />
        </Box>
        <Box sx={{ width: "50px" }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            value
          )}%`}</Typography>
        </Box>
        <Typography onClick={() => {
          handleOpen()
          fetchReviewOnRating(count)
        }} sx={{
          '&:hover': {
            borderBottom: "1px dotted black", cursor: "pointer"
          }
        }}>
          <Rating value={count} readOnly></Rating>
        </Typography>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  const fetchCourse = () => {
    axios.get("http://localhost:5000/course/" + id).then((res) => {
      setCourse(res.data)
    }).catch((err) => {
      console.log(err.message)
    }).finally(() => setLoading(false))
  }

  const fetchReviewOnRating = (rating) => {
    const courseId = id
    axios.get("http://localhost:5000/Review/" + rating + "/" + courseId + "/review").then((res) => {
      setRatedReviews(res.data)
      console.log(res.data)
    })
  }

  const fetchReviews = () => {
    axios.get("http://localhost:5000/Review/" + id + "/course").then((res) => {
      setReviews(res.data)
      if (res.data.length > 0) {
        const fiveRatings = res.data.filter((ele) => ele.reviewRating === 5).length
        setfiveReview((fiveRatings / (res.data.length)) * 100)
        const fourRatings = res.data.filter((ele) => ele.reviewRating === 4).length
        setfourReview((fourRatings / (res.data.length)) * 100)
        const threeRatings = res.data.filter((ele) => ele.reviewRating === 3).length
        setthreeReview((threeRatings / (res.data.length)) * 100)
        const twoRatings = res.data.filter((ele) => ele.reviewRating === 2).length
        settwoReview((twoRatings / (res.data.length)) * 100)
        const oneRatings = res.data.filter((ele) => ele.reviewRating === 1).length
        setoneReview((oneRatings / (res.data.length)) * 100)
        const weightedAvg = ((5 * fiveRatings + 4 * fourRatings + 3 * threeRatings + 2 * twoRatings + 1 * oneRatings) / (fiveRatings + fourRatings + threeRatings + twoRatings + oneRatings))
        setavgReviewRating(weightedAvg.toFixed(1))
      }
    })
  }

  const fetchSections = () => {
    axios.get(`http://localhost:5000/Course/${id}/section`).then((res) => {
      setShowSection(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }


  const showFullText = () => {
    setShowFull(!showFull)
  }


  const addToFavs = (courseId) => {
    axios.post("http://localhost:5000/wishlist", { courseId, userId: uid }).then((res) => {
      if (res.data.status) {
        alert("Item Added to wishlist")
      }
      else {
        alert("Item aleady added to wishlist")
      }
    })
  }

  const addToCart = (courseId) => {
    axios.post("http://localhost:5000/Cart", { courseId, userId: uid }).then((res) => {
      alert("Item added to cart")
    })
  }

  const goToCheckout = (courseId) => {
    navigate("/user/checkout/" + courseId + "/single")
  }


  const viewInsDetails = (id) => {
    navigate("/user/instructor/" + id)
  }






  useEffect(() => {
    fetchCourse()
    fetchSections()
    fetchReviews()

  }, [])


  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    )
  }


  return (
    <div className='userCourseDetailedView'>
      <Box sx={{ backgroundColor: "#79A6DB", height: "400px", p: 5, position: "relative", display: "flex", gap: "30px" }} className="topContainer">
        <Box sx={{ px: 3, width: "65%" }}>
          <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={2}>
            <Typography sx={{ fontWeight: "bold", color: "#023e8a" }}>{course && course.topicId.topicName}</Typography>
            <span style={{ color: "black" }}>&gt;</span>
            <Typography sx={{ fontWeight: "bold", color: "#023e8a" }}>{course && course.topicId.subCategoryId.subCategoryName}</Typography>
            <span style={{ color: "black" }}>&gt;</span>
            <Typography sx={{ fontWeight: "bold", color: "#023e8a" }}>{course && course.topicId.subCategoryId.categoryId.categoryName}</Typography>
          </Stack>
          <Typography sx={{ mt: 3, fontWeight: "bold", fontSize: "35px" }}>{course && course.courseTitle}</Typography>
          <Typography onClick={() => showFullText()} sx={{ mt: 3, fontWeight: "bold", fontSize: "25px" }}>{!showFull && course ? course.courseDesc.slice(0, 150) + "..." : course && course.courseDesc}</Typography>
          <Stack sx={{ mt: 3 }} direction={"row"} spacing={2}>
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
              <Rating name="read-only" value={avgReviewRating} readOnly />
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}> {reviews.length} Ratings</Typography>
            </Stack>
            {/* <Typography>3630 students</Typography> */}
          </Stack>
          <Typography sx={{ mt: 3 }}>Created By <span style={{ fontWeight: "bold" }}>{course && course.instructorId.instructorName}</span></Typography>
        </Box>
        <Box className="courseCard" sx={{ backgroundColor: "white", width: "450px", height: "500px", position: "absolute", right: "10px", top: "50px", mt: 4 }}>
          <Stack direction={"column"} spacing={2}>
            <img className='coursePreviewImage' style={{ height: "200px", objectFit: "cover" }} src={course && course.courseImage || Courseholder} alt="course image" />
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", px: 2, justifyContent: "center" }} >
              <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
                {course && course.price === 0 ? "Free" : (course && course.price ? `₹${course.price}` : "₹4200")}
              </Typography>
              <Rating sx={{ fontSize: "20px" }} name="read-only" value={avgReviewRating} readOnly />
              {
                avgReviewRating && avgReviewRating > 3 ? <Alert severity='success'>User Recommended</Alert> : <Alert severity='error'>Low Rating </Alert>
              }
            </Box>
            <Stack direction={"row"} sx={{ alignItems: "center", gap: "20px", px: 2, }}>
              <Button onClick={() => goToCheckout(course._id)} sx={{ flex: 3 }} variant='contained'>Buy Now</Button>
              <Button sx={{ flex: 1 }} variant='outlined' onClick={() => addToFavs(course._id)}>
                <FavoriteIcon />
              </Button>
            </Stack>
            <Box sx={{ px: 2 }}>
              <Button fullWidth variant='outlined' onClick={() => addToCart(course._id)}>Add to cart</Button>
            </Box>
            <Box sx={{ px: 2 }}>
              <Typography sx={{ fontSize: "15px", color: "gray" }}>
                Join our vibrant community of learners and embark on a journey of continuous growth and learning. Expand your horizons, acquire new skills, and unleash your full potential with Curiosity.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box className="courseContainer" sx={{ width: "65%", p: 2 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>Course Contents</Typography>
        {showSection.map((row, sectionKey) => (
          <Showsection props={row} sessionKey={sectionKey} courseId={id} key={sectionKey} />

        ))}


      </Box>
      <Divider sx={{ m: 2 }} />
      <Box sx={{ mt: 2, px: 2 }}>
        <Typography variant='h3' sx={{ fontSize: "20px", fontWeight: "bold" }}>INSTRUCTOR</Typography>
        <Card sx={{ width: "65%", p: 3 }}>
          <Typography onClick={() => viewInsDetails(course.instructorId._id)} sx={{
            mx: 2, fontSize: "20px", fontWeight: "bold", color: "#003f88", cursor: "pointer", '&:hover': {
              textDecoration: "underline"
            }
          }}>{course && course.instructorId.instructorName}</Typography>
          <Typography sx={{ mx: 2, fontSize: "15px", fontWeight: "bold", color: "gray" }}>{course && course.instructorId.instructorHeadLine}</Typography>
          <Stack direction={"row"} sx={{ px: 5 }} alignItems={"center"}>
            <CardMedia
              component={"img"}
              image={course && course.instructorId.instructorPhoto}
              sx={{ width: "150px", height: "150px", borderRadius: "50%" }}
            ></CardMedia>
            <CardContent>
              <Typography sx={{ fontSize: "17px", color: "gray" }} component={"p"}>{course && course.instructorId.instructorBio}</Typography>
            </CardContent>
          </Stack>
        </Card>
      </Box>
      <Divider sx={{ m: 3, fontSize: "20px" }}>Student Feedback</Divider>
      <Box className="overall">
        <Stack direction={"row"} alignItems={"center"} spacing={1} sx={{ m: 2 }} justifyContent={"center"}>
          <Box sx={{ display: "flex", flexDirection: "column", color: "#ff9500", alignItems: "center" }}>
            <Typography variant='span' sx={{ fontSize: "100px", fontWeight: "bold", m: 0 }}>{avgReviewRating}</Typography>
            <Rating sx={{ mt: 0 }} value={avgReviewRating} readOnly></Rating>
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>Course Rating</Typography>
          </Box>
          <Box>
            <Box sx={{ width: '300px' }}>
              <LinearProgressWithLabel count={5} value={fiveReview} />
            </Box>
            <Box sx={{ width: '300px' }}>
              <LinearProgressWithLabel count={4} value={fourReview} />
            </Box>
            <Box sx={{ width: '300px' }}>
              <LinearProgressWithLabel count={3} value={threeReview} />
            </Box>
            <Box sx={{ width: '300px' }}>
              <LinearProgressWithLabel count={2} value={twoReview} />
            </Box>
            <Box sx={{ width: '300px' }}>
              <LinearProgressWithLabel count={1} value={oneReview} />
            </Box>
          </Box>
        </Stack>
      </Box>
      <Divider></Divider>
      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {
              reviews && reviews.map((row, key) => (
                <Paper sx={{ m: 3, p: 3, borderRadius: "5px", width: "350px", minHeight: "150px" }} key={key} elevation={3}>
                  <div>
                    <div style={{
                      display: 'flex',
                      marginBottom: 2,
                      alignItems: 'center',
                      gap:"20px"
                    }}>
                      
                    <Stack sx={{width:"150px"}} direction={"column"} alignItems={"center"}>
                    <Avatar alt={row.userId.userName} src={row.userId.userPhoto} sx={{ marginRight: 2 }} />
                      <Typography sx={{fontWeight:"bold"}} gutterBottom>{row.userId.userName}</Typography>
                    </Stack>
                      <div>
                        <Typography variant="h6" gutterBottom>{row.reviewTitle}</Typography>
                        <Rating value={row.reviewRating} readOnly sx={{ marginBottom: 1 }} />
                        <Typography variant="body1">
                          {row.reviewContent}
                        </Typography>
                      </div>
                    </div>

                  </div>
                </Paper>
              ))
            }
          </CardContent>
        </Card>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "scroll" }}
      >
        <Box sx={style}>
          {ratedReviews && ratedReviews.map((row, key) => (
            <Paper sx={{ m: 3, p: 3, borderRadius: "5px", width: "275px", minHeight: "50px" }} key={key} elevation={3}>
              <div>
                <div style={{
                  display: 'flex',
                  marginBottom: 2,
                  alignItems: 'center',
                }}>
                  <Avatar alt={row.userId.userName} src={row.userId.userPhoto} sx={{ marginRight: 2 }} />
                  <div>
                    <Typography sx={{fontWeight:"bold"}} gutterBottom>{row.userId.userName}</Typography>
                    <Typography variant="h6" gutterBottom>{row.reviewTitle}</Typography>
                    <Rating value={row.reviewRating} readOnly sx={{ marginBottom: 1 }} />
                    <Typography variant="body1">
                      {row.reviewContent}
                    </Typography>
                  </div>
                </div>
              </div>
            </Paper>
          ))}
        </Box>

      </Modal>
    </div>
  )
}

export default Course