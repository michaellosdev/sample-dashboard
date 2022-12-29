import React, { useState } from 'react'
import {Container, Box, Typography, TextField, Button, LinearProgress} from '@mui/material'
import Logo from '../../../assets/onboardittech_logo.png'
import { TextColor_100 } from '../../../styles/_variables'
import {useDispatch} from 'react-redux'
import { loginEmployee } from '../../../redux/store/features/employee'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function AdminLogin() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useNavigate()
  const [err, setErr] = useState([])
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
      .post('http://localhost:6001/employees/login', 
      {
        email: inputs.email,
        password: inputs.password
      }, {
        withCredentials: true
      })
      .catch((err)=> setErr(err))
      const data = await res.data
    
      return data
  } 

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    sendRequest()
    .then((data) => {
      if (data.result.role === 'admin' ||data.result.role === 'superuser' ) {
        history("/employee-dashboard/admin/home")
      } else if (data.result.role === 'tech') {
        history("/employee-dashboard/tech/home")
      }

      dispatch(loginEmployee({firstName: data.result.firstName, lastName: data.result.lastName, role: data.result.role}))
      localStorage.setItem('employee', JSON.stringify({firstName: data.result?.firstName, lastName: data.result?.lastName, role: data.result?.role}))
    })
    
    .then(setLoading(false))
    
    }
    

  return (
    <Container>
      
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <img src={Logo} style={{width:'300px'}}/>
            <Typography variant='h3' sx={{marginBottom:'40px'}}>Employee Login {err.length ? '401' : null}</Typography>
            <form style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100%'}} onSubmit={handleSubmit}>
              <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'40%', height:'50%'}}>
            {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}/> : null}
                  <TextField required fullWidth id='username' label='Username' sx={{marginBottom:'20px'}} onChange={handleChange} value={inputs.email} name='email'/>
                  <TextField required type='password' fullWidth id='password' label='Password' sx={{marginBottom:'20px'}} onChange={handleChange} value={inputs.password} name='password'/>
                  <Button variant='contained' fullWidth type='submit'>Login</Button>
              </Box>
            </form>
        </Box>
    </Container>
  )
}

export default AdminLogin