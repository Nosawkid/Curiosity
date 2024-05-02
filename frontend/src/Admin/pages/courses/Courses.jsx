import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [originalCourses, setOriginalCourses] = useState([]);

  const navigate = useNavigate();

  const fetchCourses = () => {
    axios
      .get("http://localhost:5000/allcourses")
      .then((res) => {
        setCourses(res.data);
        setOriginalCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchCourse = () => {
    if (keyword) {
      const filteredCourses = courses.filter((course) =>
        course.courseTitle.toLowerCase().startsWith(keyword.toLocaleLowerCase())
      );
      setCourses(filteredCourses);
    } else {
      setCourses(originalCourses);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "60%",
          transform: "translate(50%,50%)",
        }}
      />
    );
  }
  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <TextField
            variant="filled"
            sx={{ width: "70%" }}
            placeholder="Search courses"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          ></TextField>
          <SearchIcon
            onClick={() => searchCourse()}
            sx={{ fontSize: "35px" }}
          />
        </Stack>

        <Box sx={{ mt: 3 }}>
          <Typography
            textAlign={"center"}
            fontSize={"25px"}
            fontWeight={"bold"}
            variant="h5"
          >
            Courses
          </Typography>
          <Stack
            direction={"row"}
            spacing={5}
            sx={{
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent:"center",
              gap:"20px",
              p:3
            }}
          >
            {courses &&
              courses.map((row, key) => (
                <Card key={key} sx={{ width: "300px", height: "550px" }}>
                  <CardMedia
                    component="img"
                    image={row.courseImage}
                    alt="Course Image"
                    sx={{ height: "200px" }}
                  />
                  <CardContent>
                    <Typography sx={{fontSize:"18px"}} gutterBottom variant="h5" component="div">
                      {row.courseTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{row.price.toLocaleString("en-IN")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      {row.courseDesc.slice(0, 100) + "..."}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2, color: row.courseAvg < 3 ? "red" : "green" }}
                    >
                      Avg Rating: {row.courseAvg.toFixed(1)}
                    </Typography>
                    <Button
                      onClick={() => navigate("/admin/speccourse/" + row._id)}
                      sx={{ mt: 2 }}
                      variant="contained"
                    >
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default Courses;
