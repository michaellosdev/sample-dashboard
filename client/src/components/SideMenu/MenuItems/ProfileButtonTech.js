import React from 'react'
import { Paper, Avatar, Button,Typography  } from '@mui/material'
import {GreenColor_50, TextColor_100} from '../../../styles/_variables'
import {Settings} from '@mui/icons-material'
import { useSelector } from 'react-redux'


function ProfileButtonTech(props) {
  const user = useSelector((state)=> state.employee.value)
  const localStorageObj = JSON.parse(localStorage.getItem('employee'))
  return (
    <Paper elevation={10} sx={{width:235, height:100, backgroundColor: GreenColor_50, borderRadius: 5, display: 'flex', justifyContent:'space-between'}}> 
        <Button variant='text' sx={{width:'100%', borderRadius:5, color: TextColor_100, display:'flex', justifyContent:"space-between", p:2,textTransform: 'none'}}> 
        <div style={{textAlign:'left'}}>
        <Typography variant='h5'>
        {!localStorageObj ? user.firstName.charAt(0).toUpperCase()+user.firstName.slice(1) + ' ' + user.lastName.charAt(0).toUpperCase()+user.lastName.slice(1) : localStorageObj.firstName.charAt(0).toUpperCase()+localStorageObj.firstName.slice(1) + ' ' + localStorageObj.lastName.charAt(0).toUpperCase()+localStorageObj.lastName.slice(1) }
        </Typography>
        <Typography variant='subtitle1'>
          {!localStorage ? user?.role.toUpperCase() : localStorageObj?.role.toUpperCase()}
        </Typography>
        </div>
        <Settings />
        </Button> 
        
    </Paper>
  )
}

export default ProfileButtonTech