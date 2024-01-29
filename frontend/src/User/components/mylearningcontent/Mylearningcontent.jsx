import React from 'react'
import './mylearningcontent.scss'
import Suggestion from '../suggestion/Suggestion'


const Mylearningcontent = ({title}) => {
  return (
    <div className='mylearningcontent'>
        <div className="container">
            <div className="top">
            <h1>{title}</h1>
            <div className="linkcontainer">
                <ul>
                    <li>All Courses</li>
                    <li>My List</li>
                    <li>Wishlist</li>
                    <li>Archived</li>
                    <li>Learning Tools</li>
                </ul>
            </div>
            </div>
            <div className="mylearningMiddle">
                <Suggestion/>
            </div>
        </div>
       
    </div>
  )
}

export default Mylearningcontent