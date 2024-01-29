import React from 'react'
import './jobpreview.scss'

const Jobpreview = () => {
  return (
    <div className='jobPreview'>
        <div className="jobPreviewLeft">
            <img src="https://blog.hubspot.com/hs-fs/hubfs/image8-2.jpg?width=600&name=image8-2.jpg" alt="google" />
            <div className='leftContainer'>
                <h3>HR Manager</h3>
                <p>We are looking for an experienced HR manager who is well capable of handling disputes among employees
                    and keep a well-organized and better atmosphere for our epmployees
                </p>
                <p className='salaryRange'>$2500 - $4500</p>
                <p className='jobPreviewCategory'>Humanities</p>
                <button className='jobApplyBtn'>Apply</button>
            </div>
        </div>
    </div>
  )
}

export default Jobpreview