import React, {useState} from 'react'
import {Drawer,List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography, Toolbar, AppBar, Divider, Box, Avatar, Grid, Button, ListItemSecondaryAction, ButtonBase, CircularProgress} from '@mui/material'
import { Logout } from '@mui/icons-material'
import ProfileButtonCustomer from './MenuItems/ProfileButtonCustomer'
import logo from '../../assets/onboardittech_logo.png'
import { MenuItemsCustomer } from './MenuItems/MenuItemsCustomer'
import { theme } from './SideMenuStyles'
import { useParams, useNavigate, Link, Outlet, NavLink } from 'react-router-dom'
import { BlackColor_100, BlackColor_50, BlackColor_75, GreenColor_10, GreenColor_50, RedColor_50, RedColor_75, TextColor_100, TextColor_50, TextColor_75 } from '../../styles/_variables'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {logoutCustomer } from '../../redux/store/features/customer'


const drawerWidth = '250px';


function SideMenuCustomer() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logout = async () =>{
    setLoading(true)
    const res = await axios
    .post('http://localhost:6001/customers/logout', null, {
      withCredentials:true
    })
    .then(() => {dispatch(logoutCustomer())
      localStorage.clear()
    })
    .then(navigate("/"))
    
  }

  return ( 
    <>
    <Drawer variant='permanent' anchor='left' sx={theme} >
  <List sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginBottom: 'auto'}}>

  <div style = {{display:'flex', width:'250px', justifyContent: 'center', marginBottom:20}}> 
    <img src={logo} style={{width:'120px'}} />
  </div>

  <div style={{display:'flex', justifyContent: 'center', height:130}}> 
    <ProfileButtonCustomer />
  </div>

{MenuItemsCustomer.map((item, index) => (
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
endIcon={loading ? <CircularProgress size={20} sx={{ color:GreenColor_50}}/> : <Logout />}
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

export default SideMenuCustomer