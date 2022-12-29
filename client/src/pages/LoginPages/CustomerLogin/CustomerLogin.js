import React, { useState } from 'react'
import {Container, Box, Typography, TextField, Button} from '@mui/material'
import Logo from '../../../assets/onboardittech_logo.png'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { loginCustomer } from '../../../redux/store/features/customer'

function CustomerLogin() {
  const dispatch = useDispatch()
  const history = useNavigate()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState()
  const [inputs, setInputs] = useState({
    email: '',
    password:'',
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs(prev => ({
      ...prev,
      [name]: value
      
    }))
   // console.log(inputs);
  }
  const sendRequest = async () => {
    const res = await axios
      .post('http://localhost:6001/customers/login', {
        email: inputs.email,
        password: inputs.password
      }, {withCredentials:true})
      .catch((err)=> console.log(err))
      const data = await res.data
      return data
  } 
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    sendRequest().catch(err => setErr(err))
    .then(data => {
      dispatch(loginCustomer({firstName: data.result.firstName, lastName: data.result.lastName}))
      localStorage.setItem('customer', JSON.stringify({firstName: data.result?.firstName, lastName: data.result?.lastName, email: data.result?.email}))
      history("/customer-dashboard/home")
    })
    .then(setLoading(false));
    
    }
    

  return (
    <Container>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <img src={Logo} style={{width:'300px'}}/>
            <Typography variant='h3' sx={{marginBottom:'40px'}}>Customer Login</Typography>
            <form style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}} onSubmit={handleSubmit}>
              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'40%', height:'50%'}}>
                  <TextField required fullWidth id='username' label='Username' sx={{marginBottom:'20px'}} onChange={handleChange} value={inputs.email} name='email'/>
                  <TextField required type='password' fullWidth id='password' label='Password' sx={{marginBottom:'20px'}} onChange={handleChange} value={inputs.password} name='password'/>
                  <Button variant='contained' fullWidth type='submit'>Login</Button>
              </Box>
            </form>
           
        </Box>
    </Container>
  )
}

export default CustomerLogin