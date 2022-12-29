import React from 'react'
import {Button, Typography} from '@mui/material'
import {People} from '@mui/icons-material'
import { BlackColor_25, BlackColor_100, GreenColor_100, GreenColor_50 } from '../../styles/_variables'

function ButtonFilled(props) {
   

  return (
    <Button variant='contained' sx={{
      width:'fit-content',
      marginTop:2, 
      marginBottom:2, 
      marginRight:1,  
      paddingLeft:4, 
      paddingRight:4, 
      backgroundColor: props.backgroundColor, 
      color: props.color, 
      borderRadius:3,
      ':hover': {
        backgroundColor: props.backgroundColor__hover, 
        color: props.color__hover
      }}}
      href={props.href}
      onClick={props.onClick}
      >

      {props.icon}
      <Typography variant='button' sx={{marginRight:1, marginLeft:1}}>
      {props.value}
      </Typography>
    </Button> 
  )
}

export default ButtonFilled