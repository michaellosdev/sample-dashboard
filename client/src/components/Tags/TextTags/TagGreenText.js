import { Typography } from '@mui/material'
import React from 'react'
import { GreenColor_75, TextColor_100 } from '../../../styles/_variables'


function TagGreenText(props) {
  return (
        <div style={{width:'fit-content', heigth: '24px', backgroundColor: GreenColor_75, marginLeft:'5px', borderRadius:'5px', paddingRight:"5px", paddingLeft:'5px'}}>
            <Typography variant='subtitle2' sx={{color: TextColor_100}}>
            {props.value}
          </Typography>
        </div> 
  )
}

export default TagGreenText