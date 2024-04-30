import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Stack, TextField } from '@mui/material';
// import visa from '../../../assets/visa.webp'
// import master from '../../../assets/Mastercard-Logo.png'
// import ae from '../../../assets/americanExpress.png'
import './checkout.scss'
import InputMask from 'react-input-mask';
// import placeholderog from '../../../assets/placeholderog.png'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useNavigate } from 'react-router-dom';




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
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);
  // const [card, setCard] = useState("")
  const [orderId, setOrderId] = useState("")
  const [course, setCourse] = useState([])
  const [user, setUser] = useState([])
  const [booking, setBooking] = useState([])
  const [cardNumber,setCardNumber] = useState("")
  const [cardName,setCardName] = useState("")
  const [cardDate,setCardDate] = useState("")
  const [cardCvc,setCardCvc] = useState("")

  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    if(name === "number"){
      setCardNumber(e.target.value)
    }
    if(name === "name"){
      setCardName(e.target.value)
    }
    if(name === "expiry"){
      setCardDate(e.target.value)
    }
    if(name === "cvc"){
      setCardCvc(e.target.value)
    }
  };
  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };




  const generateOrderId = () => {
    const randmomNo = Math.floor(Math.random() * 900000) + 100000
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Zero-pad the month
    const day = String(currentDate.getDate()).padStart(2, '0'); // Zero-pad the day

    setOrderId(`CUR-${year}${month}${day}-${randmomNo}`)
  }

  const uid = sessionStorage.getItem("Uid")
  let { courseId, type } = useParams()
  let bookingId = ""

  if (type === "multiple") {
    bookingId = courseId
  }

  const buyOneCourse = (e) => {
    e.preventDefault()
    if(cardNumber.length !== 16 || Number(cardNumber) === NaN)
    {
      return alert("Please Enter a valid card number")
    }
    if(cardDate.length !== 4)
    {
      return alert("Enter a valid date")
    }
    if(Number(cardDate.slice(0,2)) < 4 ||Number(cardDate.slice(2)) < 24 ){
      return alert("Card Expired !!")
    }
    if(cardCvc.length !== 3 || Number(cardCvc) === NaN)
    {
      return alert("Invalid CVC")
    }
    axios.post("http://localhost:5000/Checkout", { userId: uid, courseId, orderId }).then((res) => {
      if (res.data.status) {
        console.log(res.data.message)
        navigate("/user/viewcourse/" + courseId)
      }
      else {
        alert("Course Already bought")
      }
    })
  }
  const buyFromCart = (e) => {
    e.preventDefault()
    if(cardNumber.length !== 16 || Number(cardNumber) === NaN)
    {
      return alert("Please Enter a valid card number")
    }
    if(cardDate.length !== 4)
    {
      return alert("Enter a valid date")
    }
    if(Number(cardDate.slice(0,2)) < 4 ||Number(cardDate.slice(2)) < 24 ){
      return alert("Card Expired !!")
    }
    if(cardCvc.length !== 3 || Number(cardCvc) === NaN)
    {
      return alert("Invalid CVC")
    }
    axios.post("http://localhost:5000/Cartcheckout", { bookingId }).then((res) => {
      console.log(res.data.message)
      navigate("/user")
    })
  }

  const getBooking = () => {
    axios.get("http://localhost:5000/Booking/" + uid).then((res) => {
      setBooking(res.data)
    })
  }

  const getCourse = () => {
    axios.get("http://localhost:5000/Course/" + courseId).then((res) => {
      setCourse(res.data)
    })
  }

  const getUser = () => {
    axios.get("http://localhost:5000/User/" + uid).then((res) => {
      setUser(res.data)
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const changeType = () => {
  //   const firstTwo = card.slice(0, 2)

  //   if (firstTwo[0] === "4") {
  //     return "visa"
  //   }
  //   else if (Number(firstTwo) > 50 && Number(firstTwo) < 56) {
  //     return "master"
  //   }
  //   else if (Number(firstTwo) === 34 || Number(firstTwo) === 37) {
  //     return "ae"
  //   }
  //   else {
  //     return false
  //   }


  // }

  useState(() => {
    generateOrderId()
    getCourse()
    getUser()
    getBooking()
  }, [])

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
          <Card sx={{ width: "900px", height: "700px" }}>
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
                <Typography sx={{ color: "#003f88" }}>USERNAME: <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>{user && user.userName}</span></Typography>
              </Stack>
              <Box>
                
                <Box sx={{ mt: 2, width: "100%" }}>
                  <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                  />
                  <div className="mt-3">
                    <form onSubmit={type === "multiple" ? buyFromCart : buyOneCourse} >

                      <TextField
                        sx={{ mt: 3 }}
                        type="string"
                        name="number"
                        className="form-control"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required
                        variant='outlined'
                        fullWidth
                       
                        inputProps={{ maxLength: 16 }} // Add maxLength attribute
                      />
                      


                      <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        required

                      ></TextField>


                      <Stack direction={"row"} spacing={3} mt={3} sx={{ justifyContent: "center" }}>
                        <TextField
                          type="number"
                          name="expiry"
                          className="form-control"
                          placeholder="Valid Thru"
                          pattern="\d\d/\d\d"
                          value={state.expiry}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          required

                        ></TextField>


                        <TextField
                          type="text"
                          name="cvc"
                          className="form-control"
                          placeholder="CVC"
                          pattern="\d{3,4}"
                          value={state.cvc}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          required


                        ></TextField>

                      </Stack>

                      <Button
                        type='submit'
                        variant='outlined' sx={{ margin: "0 auto", display: "block", mt: 3, px: 5, fontSize: "18px" }}>Pay Now</Button>
                    </form>
                  </div>
                </Box>

              </Box>
            </CardContent>
          </Card>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

export default Checkout