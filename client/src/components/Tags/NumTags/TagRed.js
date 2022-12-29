import React from 'react'
import { TextColor_100, RedColor_75 } from '../../../styles/_variables'
import { Typography } from '@mui/material'


function TagRed(props) {
  return (
        <div style={{width:'24px', heigth: '24px', backgroundColor: RedColor_75, marginLeft:'5px', borderRadius:'5px'}}>
            <Typography variant='subtitle2' sx={{color: TextColor_100}}>
              {props.value}
            </Typography>
        </div> 
  )
}

export default TagRed