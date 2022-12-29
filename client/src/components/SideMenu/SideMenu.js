import React from 'react'
import {Drawer,List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography, Toolbar, AppBar, Divider, Box, Avatar, Grid, Button, ListItemSecondaryAction, ButtonBase} from '@mui/material'
import { Logout } from '@mui/icons-material'
import ProfileButton from './MenuItems/ProfileButton'
import logo from '../../assets/onboardittech_logo.png'
import { MenuItems } from './MenuItems/MenuItem'
import { theme } from './SideMenuStyles'
import { useParams, useNavigate, Link, Outlet, NavLink } from 'react-router-dom'
import { GreenColor_10, GreenColor_50, TextColor_100, BlackColor_100, TextColor_50 } from '../../styles/_variables'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logoutEmployee } from '../../redux/store/features/employee'

const drawerWidth = '250px';


function SideMenu() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logout = async () =>{
    const res = await axios
    .post('http://localhost:6001/employees/logout', null, {
      withCredentials:true
    })
    .then(() => {dispatch(logoutEmployee())
      localStorage.clear()
    })
    .then(navigate("/"))
  }

  return ( 
    <>
    <Drawer variant='permanent' anchor='left' sx={theme} >
  <List sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',  marginBottom:'auto'}}>

  <div style = {{display:'flex', width:'250px', justifyContent: 'center', marginBottom:20}}> 
    <img src={logo} style={{width:'120px'}} />
  </div>

  <div style={{display:'flex', justifyContent: 'center', height:130}}> 
    <ProfileButton />
  </div>

{MenuItems.map((item, index) => (
  <NavLink to={`/${item.route}`} style={
    ({isActive}) => {
      return {backgroundColor: isActive ? GreenColor_50 : null, borderRadius:'10px'}
    }
  }>
  <ListItem key={item.id} disablePadding sx={{width:235}} onClick={()=>navigate(item.route)}>
    <ListItemButton>
      <ListItemIcon>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItemButton>
  </ListItem>
    </NavLink>
))}
</List>
<div style={{display: 'flex', justifyContent:'center'}}>
<Button 
variant='contained'
endIcon={<Logout />}
sx={{
  marginBottom:'10px',
  width:'50%',
  backgroundColor:TextColor_100,
  color:BlackColor_100,
  ':hover' :{
    backgroundColor:TextColor_50,
    color: TextColor_100
  }
}}
onClick={logout}>LOGOUT</Button>
</div>
  </Drawer>
  <Outlet />
</>
  )
}

export default SideMenu