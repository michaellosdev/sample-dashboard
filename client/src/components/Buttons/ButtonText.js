import React from 'react'
import {Button, Typography} from '@mui/material'
import {People, ArrowForward, Add} from '@mui/icons-material'
import { BlackColor_25, BlackColor_100, GreenColor_100, GreenColor_50 } from '../../styles/_variables'

function ButtonText(props) {
    
  return (
    <Button variant='text' sx={{width:'fit-content', marginTop:2, marginBottom:2, marginRight:1, paddingLeft:4, paddingRight:4, color: props.color, borderRadius:3,':hover': { color: props.color__hover}}} onClick={props.onClick}>
       {props.iconLeft}
      <Typography variant='button' sx={{marginRight:1, marginLeft:1}}>
      {props.value}
      </Typography>
      {props.iconRight}
    </Button> 
  )
}

export default ButtonText