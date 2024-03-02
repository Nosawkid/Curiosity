import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
import visa from '../../../assets/visa.webp'
import master from '../../../assets/Mastercard-Logo.png'
import ae from '../../../assets/americanExpress.png'
import './checkout.scss'
import InputMask from 'react-input-mask';
import placeholderog from '../../../assets/placeholderog.png'
import {useParams} from 'react-router-dom'
import axios from 'axios';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Checkout = () => {
  const [value, setValue] = React.useState(0);
  const [card, setCard] = useState("")
  const [orderId, setOrderId] = useState("")
  const [course,setCourse] = useState([])
  const [user,setUser] = useState([])
  const [booking,setBooking] = useState([])

  const generateOrderId = () => {
    const randmomNo = Math.floor(Math.random() * 900000) + 100000
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Zero-pad the month
    const day = String(currentDate.getDate()).padStart(2, '0'); // Zero-pad the day

    setOrderId(`CUR-${year}${month}${day}-${randmomNo}`)
  }

  const uid = sessionStorage.getItem("Uid")
  let {courseId, type} = useParams()
  let bookingId = ""

  if(type === "multiple")
  {
    bookingId = courseId
  }

  const buyOneCourse = ()=>{
    axios.post("http://localhost:5000/Checkout",{userId:uid,courseId,orderId}).then((res)=>{
      console.log(res.data.message)
    })
  }
  const buyFromCart = ()=>{
    axios.post("http://localhost:5000/Cartcheckout",{bookingId}).then((res)=>{
      console.log(res.data.message)
    })
  }
  
  const getBooking = ()=>{
    axios.get("http://localhost:5000/Booking/"+uid).then((res)=>{
      setBooking(res.data)
    })
  }

  const getCourse = ()=>{
    axios.get("http://localhost:5000/Course/"+courseId).then((res)=>{
      setCourse(res.data)
    })
  }

  const getUser = ()=>{
    axios.get("http://localhost:5000/User/"+uid).then((res)=>{
      setUser(res.data)
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeType = () => {
    const firstTwo = card.slice(0, 2)

    if (firstTwo[0] === "4") {
      return "visa"
    }
    else if (Number(firstTwo) > 50 && Number(firstTwo) < 56) {
      return "master"
    }
    else if (Number(firstTwo) === 34 || Number(firstTwo) === 37) {
      return "ae"
    }
    else {
      return false
    }


  }

  useState(()=>{
    generateOrderId()
    getCourse()
    getUser()
    getBooking()
  },[])

  return (
    <Box className="userCheckout" sx={{ width: '100%' }}>
      <Box>

      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Credit/Debit Card" {...a11yProps(0)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ width: "100%", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Card sx={{ width: "900px", height: "550px" }}>
            <CardContent>
              <Typography sx={{ color: "#003f88", fontWeight: "bold", fontSize: "30px", textAlign: "center", mt: 3 }} variant='h4'>CHECKOUT</Typography>
              <Typography sx={{ color: "gray", fontSize: "12px", textAlign: "center" }}>Secure Card Payments</Typography>
              <Stack sx={{ mx: 2, mt: 3, justifyContent: "center", border: "2px solid #d4d0cf", borderRadius: "20px", py: 1 }} direction={"row"} spacing={3}>
                <Typography sx={{ color: "#003f88" }}>ORDER ID: <span style={{ fontWeight: "bold" }}>{
                  type === "multiple" ? booking.orderId : orderId
                }</span></Typography>
                <Typography sx={{ color: "#003f88" }}>AMOUNT: <span style={{ fontWeight: "bold" }}>
                {type === "multiple" ? booking && `₹${booking.price}` : course.price === 0 ? "Free" : (course.price ? `₹${course.price}` : "₹4200")}
                
                  </span></Typography>
                <Typography sx={{ color: "#003f88" }}>USERNAME: <span style={{ fontWeight: "bold",textTransform:"uppercase" }}>{user && user.userName}</span></Typography>
              </Stack>
              <Box>
                <Stack direction={"row"} spacing={3} sx={{ justifyContent: "center", alignItems: "center", mt: 5 }}>
                  <Box className="debitCard" sx={{ width: "300px", height: "200px", borderRadius: "10px", p: 1, position: "relative" }}>
                    <img style={{ position: "absolute", top: "15px", right: "10px" }} width={30} src={
                      changeType() === "visa" ? visa : changeType() === "master" ? master : changeType() === "ae" ? ae : placeholderog
                    } alt="card" />
                    <Typography component={"p"} sx={{ color: "white", fontWeight: "bold", fontSize: "13px", mt: 2 }}>CREDIT / DEBIT CARD NO</Typography>
                    <Box sx={{ backgroundColor: "white", width: "95%", height: "30px", borderRadius: "5px", mt: "2px" }}>
                      <Stack sx={{ height: "100%" }} direction={"row"} spacing={3}>
                        <InputMask
                          mask="9999 9999 9999 9999"
                          maskChar=" "
                          type="tel"
                          pattern="[0-9]*"
                          style={{ border: "none", outline: "0", paddingLeft: "10px", borderRadius: "10px", letterSpacing: "5px", width: "100%" }}
                          placeholder="XXXX XXXX XXXX XXXX"
                          required
                          onChange={(e) => {
                            setCard(e.target.value)
                            changeType()
                          }}
                          value={card}
                        />

                      </Stack>
                    </Box>
                    <Typography component={"p"} sx={{ color: "white", fontWeight: "bold", fontSize: "13px", mt: 1 }}>EXPIRATION DATE</Typography>
                    <Stack direction={"row"} spacing={1}>
                      <InputMask
                        mask="99 / 99"
                        maskChar=" "
                        type="tel"
                        pattern="[0-9]*"
                        style={{ border: "none", outline: "0", height: "30px", paddingLeft: "10px", width: "40%", borderRadius: "5px", letterSpacing: "3px" }}
                        placeholder="MM / YY"
                        required

                      />
                      <InputMask
                        mask="9999"
                        maskChar=" "
                        type="tel"
                        pattern="[0-9]*"
                        style={{ border: "none", outline: "0", paddingLeft: "10px", height: "30px", width: "45%", borderRadius: "5px" }}
                        placeholder="YEAR"
                        required

                      />
                    </Stack>
                    <Typography component={"p"} sx={{ color: "white", fontWeight: "bold", fontSize: "13px", mt: 1 }}>NAME ON CARD</Typography>
                    <InputMask
                      maskChar=" "
                      type="teXT"
                      style={{ border: "none", outline: "0", paddingLeft: "10px", height: "30px", width: "92%", borderRadius: "5px" }}
                      placeholder="ENTER THE NAME AS PER YOUR CARD"
                      required

                    />
                  </Box>
                  <Box className="debitCard" sx={{ width: "300px", height: "200px", borderRadius: "10px", py: 1 }}>
                    <Box sx={{ height: "40px", width: "100%", backgroundColor: "rgb(0,90,136)", mt: 2 }}></Box>
                    <Box sx={{ px: 1, mt: 2 }}>
                      <Typography sx={{ textAlign: "right", color: "white", fontWeight: "bold" }} component={"p"}>cvc/cvv</Typography>
                      <Stack sx={{ justifyContent: "flex-end" }} direction={"row"}>
                        <Box sx={{ width: "60%", backgroundColor: "#9badb5", height: "40px" }}></Box>
                        <Box sx={{ width: "30%", height: "40px" }}>
                          <InputMask
                            mask="999"
                            maskChar=" "
                            type='text'
                            style={{ width: "100%", height: "95%", border: "none", outline: "transparent" }}
                          />
                        </Box>
                      </Stack>
                    </Box>
                  </Box>

                </Stack>
                <Button
                  onClick={type === "multiple" ? buyFromCart:buyOneCourse}
                  variant='outlined' sx={{ margin: "0 auto", display: "block", mt: 3, px: 5, fontSize: "18px" }}>Pay Now</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

export default Checkout