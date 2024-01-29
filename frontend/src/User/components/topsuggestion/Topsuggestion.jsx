import React from 'react'
import './topsuggestion.scss'
import {  Stack } from '@mui/material'

const Topsuggestion = () => {
  return (
    <Stack className='userTopsuggestion' sx={{padding:"20px 0", display:"flex",alignItems:"center", justifyContent:"center"}} spacing={3} direction="row">
        <div className='topSuggestionItem'>Development</div>
        <div className='topSuggestionItem'>Business</div>
        <div className='topSuggestionItem'>Finance & Accounting</div>
        <div className='topSuggestionItem'>IT & Software</div>
        <div className='topSuggestionItem'>Office Productivity</div>
        <div className='topSuggestionItem'>Personal Development</div>
        <div className='topSuggestionItem'>Design</div>
        <div className='topSuggestionItem'>Marketing</div>
        <div className='topSuggestionItem'>Health & Fitness</div>
        <div className='topSuggestionItem'>Music</div>
    </Stack>
  )
}

export default Topsuggestion