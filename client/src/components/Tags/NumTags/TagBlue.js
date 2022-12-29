import React from 'react'
import { BlueColor_75, TextColor_100 } from '../../../styles/_variables'
import {Typography} from '@mui/material'

function TagBlue(props) {
  return (
        <div style={{width:'24px', heigth: '24px', backgroundColor: BlueColor_75, color:TextColor_100, marginLeft:'5px', borderRadius:'5px'}}>
            <Typography variant='subtitle2' sx={{color: TextColor_100}}>
            {props.value}
          </Typography>
        </div> 
  )
}

export default TagBlue