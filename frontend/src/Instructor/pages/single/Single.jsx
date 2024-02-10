import React, { useEffect, useState } from 'react'
import './single.scss'

import Chart from '../../components/chart/Chart'
import Tables from '../../components/table/Table'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { Button } from '@mui/material'

const Single = () => {



const {id} = useParams()
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);


const fetchCourse = async (id)=>{
 try
 {
  const response = await axios.get("http://localhost:5000/Course/"+id)
  setCourse(response.data)
 }
 catch(err)
 {
    setError(error.message)
 }
 finally
 {
  setLoading(false)
 }
}

useEffect(()=>{
  fetchCourse(id)
})


if(loading)
{
  return(
    <div>Loading</div>
  )
}

if(error)
{
  return(
    <div>{error}</div>
  )
}

  return (
    <div className='single'>
      <div className="singleContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img  src={course.instructorId.instructorPhoto} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{course.courseTitle}</h1>
                <div className="itemDetail">
                  <span className="itemKey">Desc: </span>
                  <span className="itemValue">{course.courseDesc}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Instructor: </span>
                  <span className="itemValue">{course.instructorId.instructorName}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Topic: </span>
                  <span className="itemValue">{course.topicId.topicName}</span>
                </div>
                <div className="itemDetail">
                  <span className="itemKey">Category: </span>
                  <span className="itemValue">{course.topicId.subCategoryId.categoryId.categoryName}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title={"User Spending"}/>
          </div>
        </div>
        <div className="bottom">
          <div className="title">Sections <Button variant='outlined'>Add New Section</Button></div>
          <Tables/>
        </div>
      </div>
    </div>
  )
}

export default Single