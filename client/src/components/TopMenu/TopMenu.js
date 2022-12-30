import React, {useState} from 'react'
import {AppBar, ListItem, ListItemButton, ListItemText, List, Typography, Tabs, Tab, Box, Container, Button, Badge} from '@mui/material'
import { NotificationsOutlined } from '@mui/icons-material'
import { Link, BrowserRouter, Route, Routes, Switch } from 'react-router-dom'
import {MenuItems} from './MenuItem/MenuItems'
import { BlackColor_100, BlueColor_75, TextColor_100 } from '../../styles/_variables'
import { color } from '@mui/system'
import PropTypes from 'prop-types';
import ProfileButton from '../SideMenu/MenuItems/ProfileButton'
import AccordionComponent from '../Accordion/Accordion'
import ButtonsTest from '../Buttons/ButtonsTest'
import CardsTest from '../Card/CardsTest'
import FormsTest from '../Forms/FormsTest'
import {ContainerStyles} from '../../pages/BoxStyles'




function TabPanel(props) {
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
        <Box sx={{ }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function TopMenu(props) {
  let tabName_1 = props.tabName_1;
  let tabName_2 = props.tabName_2;
  let tabName_3 = props.tabName_3;
  let tabName_4 = props.tabName_4;
  let tabName_5 = props.tabName_5;
  let tabName_6 = props.tabName_6;
  let tabName_7 = props.tabName_7;
  let tabName_8 = props.tabName_8;
  let tabName_9 = props.tabName_9;
  let tabName_10 = props.tabName_10;

  const [selectedTab, setSelectedTab] = useState(0)

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
  }


  return (
    <>
  

   {/* <Box sx={{width: 'calc(100%-250px)', marginTop:'100px'}}> */}
  <Container sx={ContainerStyles}>
    <AppBar 

position='fixed'

sx={{
  width:'calc(100% - 250px)',
  height: 60,
  backgroundColor: TextColor_100,
  color: BlackColor_100,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
  
  
}}>
  <Tabs value={selectedTab} onChange={handleChange} >
    {tabName_1 === undefined ? null :  <Tab label={props.tabName_1} sx={{height:60}} component = {Link} to={props.pathTab_1}/> }
    {tabName_2 === undefined ? null :  <Tab label={props.tabName_2} sx={{height:60}} component = {Link} to={props.pathTab_2}/> }
    {tabName_3 === undefined ? null :  <Tab label={props.tabName_3} sx={{height:60}} component = {Link} to={props.pathTab_3}/> }
    {tabName_4 === undefined ? null :  <Tab label={props.tabName_4} sx={{height:60}} component = {Link} to={props.pathTab_4}/> }
    {tabName_5 === undefined ? null :  <Tab label={props.tabName_5} sx={{height:60}} component = {Link} to={props.pathTab_5}/> }
    {tabName_6 === undefined ? null :  <Tab label={props.tabName_1} sx={{height:60}} component = {Link} to={props.pathTab_6}/> }
    {tabName_7 === undefined ? null :  <Tab label={props.tabName_2} sx={{height:60}} component = {Link} to={props.pathTab_7}/> }
    {tabName_8 === undefined ? null :  <Tab label={props.tabName_3} sx={{height:60}} component = {Link} to={props.pathTab_8}/> }
    {tabName_9 === undefined ? null :  <Tab label={props.tabName_4} sx={{height:60}} component = {Link} to={props.pathTab_9}/> }
    {tabName_10 === undefined ? null :  <Tab label={props.tabName_5} sx={{height:60}} component = {Link} to={props.pathTab_10}/> }
      
  </Tabs>

  <div>
      {/* <Button>
        <Badge badgeContent={5} color='primary'>
          <NotificationsOutlined />
        </Badge>
      </Button> */}
  </div>

       </AppBar>

      {selectedTab === 0 && props.tab__1}
      {selectedTab === 1 && props.tab__2}
      {selectedTab === 2 && props.tab__3}
      {selectedTab === 3 && props.tab__4}
      {selectedTab === 4 && props.tab__5}
      {selectedTab === 5 && props.tab__1}
      {selectedTab === 6 && props.tab__2}
      {selectedTab === 7 && props.tab__3}
      {selectedTab === 8 && props.tab__4}
      {selectedTab === 9 && props.tab__5}

   
     
    
      
    

    </Container> 
      
    </>
  )
}








export default TopMenu