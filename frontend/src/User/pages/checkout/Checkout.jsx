import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent, Stack, TextField } from '@mui/material';
import caedTypes from "../../../assets/Credit-Card-Icons-removebg.png"
import './checkout.scss'
import InputMask from 'react-input-mask';

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
  const [card,setCard] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="userCheckout" sx={{ width: '100%' }}>
      <Box>

      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Credit Card" {...a11yProps(0)} />
          <Tab label="Debit Card" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ width: "100%", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Card sx={{ width: "900px", height: "700px" }}>
            <CardContent>
              <Typography sx={{ color: "#003f88", fontWeight: "bold", fontSize: "30px", textAlign: "center", mt: 3 }} variant='h4'>CHECKOUT</Typography>
              <Typography sx={{ color: "gray", fontSize: "12px", textAlign: "center" }}>Secure Card Payments</Typography>
              <Stack sx={{ mx: 2, mt: 3, justifyContent: "center", border: "2px solid #d4d0cf", borderRadius: "20px", py: 1 }} direction={"row"} spacing={3}>
                <Typography sx={{ color: "#003f88" }}>ORDER ID: <span style={{ fontWeight: "bold" }}>#123456</span></Typography>
                <Typography sx={{ color: "#003f88" }}>AMOUNT: <span style={{ fontWeight: "bold" }}>Rs 1250</span></Typography>
                <Typography sx={{ color: "#003f88" }}>USERNAME: <span style={{ fontWeight: "bold" }}>Yaseen Sidhik</span></Typography>
              </Stack>
              <Box>
                <Stack direction={"row"} spacing={3} sx={{ justifyContent: "center", alignItems: "center", mt: 3 }}>
                  <Box className="debitCard" sx={{ width: "300px", height: "200px", borderRadius: "10px", p: 1 }}>
                    <Typography component={"p"} sx={{ color: "white", fontWeight: "bold", fontSize: "13px" }}>CREDIT CARD NO</Typography>
                    <Box sx={{ backgroundColor: "white", width: "95%", height: "30px", borderRadius: "5px",mt:"2px" }}>
                      <Stack sx={{ height: "100%" }} direction={"row"} spacing={3}>
                        <InputMask
                          mask="9999 9999 9999 9999"
                          maskChar=" "
                          type="tel"
                          pattern="[0-9]*"
                          style={{ border: "none", outline: "0", paddingLeft: "10px", borderRadius: "10px",letterSpacing:"5px",width:"100%" }}
                          placeholder="XXXX XXXX XXXX XXXX"
                          required
                          onChange={(e)=>setCard(e.target.value)}
                          value={card}
                        />

                      </Stack>
                    </Box>
                    <Typography component={"p"} sx={{ color: "white", fontWeight: "bold", fontSize: "13px",mt:1 }}>EXPIRATION DATE</Typography>
                    <Stack direction={"row"} spacing={1}>
                    <InputMask
                          mask="99 / 99"
                          maskChar=" "
                          type="tel"
                          pattern="[0-9]*"
                          style={{ border: "none", outline: "0",height:"30px", paddingLeft: "10px",width:"40%",borderRadius:"5px",letterSpacing:"3px"}}
                          placeholder="MM / YY"
                          required
                          
                        />
                         <InputMask
                          mask="9999"
                          maskChar=" "
                          type="tel"
                          pattern="[0-9]*"
                          style={{ border: "none", outline: "0", paddingLeft: "10px",height:"30px",width:"45%",borderRadius:"5px" }}
                          placeholder="YEAR"
                          required
                          
                        />
                    </Stack>
                    <Typography component={"p"} sx={{ color: "white", fontWeight: "bold", fontSize: "13px",mt:1 }}>NAME ON CARD</Typography>
                    <InputMask
                          maskChar=" "
                          type="teXT"
                          style={{ border: "none", outline: "0", paddingLeft: "10px",height:"30px",width:"95%",borderRadius:"5px" }}
                          placeholder="ENTER THE NAME ON YOUR CARD"
                          required
                          
                        />
                  </Box>
                  <Box className="debitCard" sx={{ width: "300px", height: "200px", borderRadius: "10px", p: 1 }}>

                  </Box>

                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}

export default Checkout