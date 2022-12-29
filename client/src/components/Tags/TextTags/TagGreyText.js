import { Typography } from '@mui/material'
import React from 'react'
import { BlackColor_75, TextColor_100 } from '../../../styles/_variables'


function TagGreyText(props) {
  return (
        <div style={{width:'fit-content', heigth: '24px', backgroundColor: BlackColor_75, marginLeft:'5px', borderRadius:'5px', paddingRight:"5px", paddingLeft:'5px'}}>
            <Typography variant='subtitle2' sx={{color: TextColor_100}}>
            {props.value}
          </Typography>
        </div> 
  )
}

export default TagGreyText