import React from 'react'
import './jobpreview.scss'

const Jobpreview = ({vacancyTitle,vacancyDesc,minSalary,maxSalary,category}) => {
  return (
    <div className='jobPreview' >
        <div className="jobPreviewLeft">
            <img src="https://blog.hubspot.com/hs-fs/hubfs/image8-2.jpg?width=600&name=image8-2.jpg" alt="google" />
            <div className='leftContainer'>
                <h3>{vacancyTitle}</h3>
                <p>
                  {vacancyDesc}
                </p>
                <p className='salaryRange'>{minSalary} - {maxSalary}</p>
                <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                <p className='jobPreviewCategory'>{category}</p>
                <p id='timePreview' className='jobPreviewCategory'>{category}</p>
                <p className='jobPreviewCategory'>{category}</p>
                </div>
                <button className='jobApplyBtn'>Apply</button>
            </div>
        </div>
    </div>
  )
}

export default Jobpreview