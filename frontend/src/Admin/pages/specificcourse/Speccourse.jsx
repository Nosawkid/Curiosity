import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const Speccourse = () => {
  const [course, setCourse] = useState("");
  const [sections, setSections] = useState([]);
  const { courseId } = useParams();
  const [materialsMap, setMaterialsMap] = useState({}); // Updated state for materials

  const navigate = useNavigate()

  const fetchCourse = () => {
    axios.get(`http://localhost:5000/Course/${courseId}`).then((res) => {
      setCourse(res.data);
    });
  };

  const fetchSections = () => {
    axios
      .get(`http://localhost:5000/Course/${courseId}/section`)
      .then((res) => {
        setSections(res.data);
      });
  };

  const fetchMaterials = (sectionId) => {
    axios
      .get(`http://localhost:5000/section/${sectionId}/material`)
      .then((res) => {
        setMaterialsMap((prevMaterialsMap) => ({
          ...prevMaterialsMap,
          [sectionId]: res.data, // Store materials for this section
        }));
      });
  };

  const deleteCourse = ()=>{
    axios.delete("http://localhost:5000/Course/"+courseId).then((res)=>{
        alert("Course Deleted")
        navigate("/iadmin")
    }).catch((err)=>{
        console.log(err.message)
    })
  }

  useEffect(() => {
    fetchCourse();
    fetchSections();
  }, []);

  return (
    <div>
      <Box sx={{ p: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h3" sx={{ fontSize: "30px" }}>
              Course Name: {course.courseTitle}
              <Button onClick={deleteCourse} sx={{color:"red"}} variant="filled">Delete Course</Button>
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontSize: "20px", mt: 2, textAlign: "justify" }}
            >
              Course Description:{" "}
              <span style={{ fontSize: "15px" }}>{course.courseDesc}</span>
            </Typography>
          </CardContent>
        </Card>
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mt: 3,
            fontSize: "20px",
          }}
        >
          Materials
        </Typography>
        <Card>
          <CardContent>
            {sections.map((section, index) => (
              <Accordion
                key={index}
                onClick={() => fetchMaterials(section._id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {section.sectionName}
                </AccordionSummary>
                <AccordionDetails>
                  {materialsMap[section._id]?.map(
                    (
                      material,
                      idx // Access materials for this section
                    ) => (
                      <div key={idx}>
                        <Typography>{material.materialTitle}</Typography>
                        <video
                          controls
                          src={material.materialFile}
                          style={{ width: "50%" }}
                        />
                      </div>
                    )
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Speccourse;
