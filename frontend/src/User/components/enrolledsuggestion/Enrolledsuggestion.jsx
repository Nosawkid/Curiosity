import React from 'react'
import './enrolledsuggestion.scss'
import Enrolledcards from '../../subcomponents/enrolledcards/Enrolledcards'
import { Box, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';


const Enrolledsuggestion = () => {

    return (
        <div className='enrolledSuggestion'>
            <h2>Let's start learning, User</h2>
            <div className="suggestionContainer">
                <Enrolledcards course="JavaScript Tutorial" lecture="12.Variables" type="Lecture" time="11m" image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIy-kwbzT4OphMEeb2z4kx63jULskLiaUrRV9e5yRj-w-J5bR_12DGxJ08ooPAHwFAZRc&usqp=CAU" />
                <Enrolledcards course="German Language" lecture="1.Guten Morgen" type="Lecture" time="5m" image="https://miro.medium.com/v2/resize:fit:710/1*1Kx85lbw4EP0-A0bXV5n5g.jpeg" />
                <Enrolledcards course="Advance Battle Tactics" lecture="5.Artillery" type="Lecture" time="15m" image="https://www.axn-asia.com/sites/axn-asia.com/files/styles/image_1170x658/public/ct_movie_f_primary_image/battle_los_angeles_showpage_keyart.jpg?itok=_jzQK-ko" />
            </div>

            <div className="suggestionTwo">
                <h2>What to learn next</h2>
                <h3>Out top pick for you</h3>
                <Box className="next">
                    <Stack sx={{ display: "flex" }} spacing={2} direction="row">
                        <img src="https://m.media-amazon.com/images/M/MV5BN2I2ZDBjZTctOTJlZS00ZmE3LWI0NWItNjZlN2ZjMmQwZGRjXkEyXkFqcGdeQXVyOTUwMTc2MTE@._V1_FMjpg_UX1000_.jpg" alt="" />
                        <div className="details">
                            <div className="top">
                                <div className="title">How to start World War 3</div>
                                <div className="desc">This advanced course teaches everything you need to start a world war</div>
                                <div className="teacher">Yaseen Sidhik</div>
                                <div className="updation">Last updated on 14 January 2024</div>
                                <div className="rating">
                                    <span className="ratingCount">4.9</span>
                                    <div className="ratingStar">
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                    </div>
                                </div>
                            </div>
                            <div className="suggestionTwoBottom">
                                <div className="enrolledPrice">&#8377;2900</div>
                            </div>
                        </div>
                    </Stack>
                </Box>
            </div>
        </div>
    )
}

export default Enrolledsuggestion