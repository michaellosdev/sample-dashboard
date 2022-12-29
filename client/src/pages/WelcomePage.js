import { Button, Typography } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import React from 'react'
import logo from '../assets/onboardittech_logo.png'
import bg from '../assets/bg.png'
import { BlackColor_100, GreenColor_100, TextColor_100 } from '../styles/_variables'
import { Link } from 'react-router-dom'


function welcomePage() {
  return (
   <>
   {/* left side */}
<div style={{
    width:'100%',
    height:'100vh',
    display:'flex'
}}>   
    <div style={{
        width: '25%',
        height: '100vh',
        backgroundColor: BlackColor_100,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
        <img src={logo} style={{width:'90%'}} />
        <Button type='contained' endIcon={<ArrowForward />} component={Link} to='/login/customer' sx={{width:'90%', height:'70px', color:GreenColor_100}}><Typography>log in as a Customer</Typography></Button>
        <Button type='text' endIcon={<ArrowForward />} component={Link} to='/login/employee' sx={{width:'90%', height:'70px', color:TextColor_100}}><Typography>log in as employee</Typography></Button>
        
    </div>
    {/* right side */}
    <div style={{
        width: '75%',
        height: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundRepeat:'no-repeat',
        padding:'5%',
        display: 'flex',
        flexDirection:'column',
        alignItems:'flex-end'

    }}>
        <Typography variant='h2' sx={{color: TextColor_100}}>Welcome!</Typography>
        <Typography variant='subtitle1' sx={{color: TextColor_100}}>DASHBOARD</Typography>
        <h5 style={{color:TextColor_100}}>V1.0.0</h5>


    </div>
</div>
   </>
  )
}

export default welcomePage