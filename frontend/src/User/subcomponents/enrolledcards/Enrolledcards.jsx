import React from 'react'
import './enrolledcards.scss'

const Enrolledcards = ({course,lecture,type,time,image}) => {
  return (
    <div className='enrolledCards'>
        <div className="left">
            <img src={image} alt="" />
        </div>
        <div className="right">
            <div className="details">
                <span className="courseName">{course}</span>
                <h3 className="lectureName">{lecture}</h3>
            </div>
            <div className="type">
                <span>{type}</span>
                <span>.{time}</span>
            </div>
        </div>
    </div>
  )
}

export default Enrolledcards