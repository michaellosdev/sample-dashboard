import React from 'react'
import {TextColor_100, YellowColor_75 } from '../../../styles/_variables'
import {Typography} from '@mui/material'

function TagYellow(props) {
  return (
        <div style={{width:'24px', heigth: '24px', backgroundColor: YellowColor_75, marginLeft:'5px', borderRadius:'5px'}}>
            <Typography variant='subtitle2' sx={{color: TextColor_100}}>
            {props.value}
          </Typography>
        </div> 
  )
}

export default TagYellow