import React from 'react'
import {Button, Typography} from '@mui/material'
import {People} from '@mui/icons-material'
import { BlackColor_25, BlackColor_100, GreenColor_100, GreenColor_50 } from '../../styles/_variables'

function ButtonOutlined(props) {
    const iconTag = props.icon

  return (
    <Button variant='outlined' sx={{width:'fit-content', marginTop:2, marginBottom:2, marginRight:1, paddingLeft:4, paddingRight:4, backgroundColor: props.backgroundColor, color: props.color, border: `1px solid ${ props.borderColor}`, borderRadius:3,':hover': {backgroundColor: props.backgroundColor__hover, border: `1px solid ${ props.borderColor}`, color: props.color__hover}}} onClick={props.onClick}>
      {props.icon}
      <Typography variant='button' sx={{marginRight:1, marginLeft:1}}>
      {props.value}
      </Typography>
    </Button> 
  )
}

export default ButtonOutlined