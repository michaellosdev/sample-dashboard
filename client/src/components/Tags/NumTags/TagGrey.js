import React from 'react'
import { BlackColor_75, TextColor_100 } from '../../../styles/_variables'
import {Typography} from '@mui/material'

function TagGrey(props) {
  return (
        <div style={{width:'24px', heigth: '24px', backgroundColor: BlackColor_75, marginLeft:'5px', borderRadius:'5px'}}>
             <Typography variant='subtitle2' sx={{color: TextColor_100}}>
            {props.value}
          </Typography>
        </div> 
  )
}

export default TagGrey