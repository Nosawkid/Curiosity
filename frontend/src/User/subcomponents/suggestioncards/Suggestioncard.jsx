import React from 'react'
import './suggestioncard.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';




const Suggestioncard = ({image,title,teacher,rating,price}) => {
  return (
    <div className='suggestioncard'>
        <Card className='card' sx={{ maxWidth:"250px"  }}>
      <CardContent>
        <img style={{width:"100%"}} src={image} alt=''/>
        <Typography sx={{fontSize:"20px",fontWeight:"bold",mt:1}} variant="h5" component="div">
           {title}
        </Typography>
        <Typography sx={{ mb: 1.5,fontSize:"13px", mt:0.7 }} color="text.secondary">
          {teacher}
        </Typography>
        <Typography sx={{display:"flex",alignItems:"center",fontSize:"20px",fontWeight:"bold"}} variant="body2">
           {rating}
           <StarIcon sx={{color:"gold"}} />
           <StarIcon  sx={{color:"gold"}} />
           <StarIcon sx={{color:"gold"}}/>
           <StarIcon sx={{color:"gold"}}/>
        </Typography>
      </CardContent>
      <CardActions>
        <Typography sx={{fontWeight:"bold",fontSize:"25px"}}>&#8377;{price}</Typography>
      </CardActions>
    </Card>
    </div>
  )
}

export default Suggestioncard