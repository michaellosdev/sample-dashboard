import React from 'react'
import {Button, Typography} from '@mui/material'
import {Check} from '@mui/icons-material'
import { BlackColor_25, BlackColor_100, GreenColor_100, GreenColor_50, BlueColor_100, BlueColor_50, BlackColor_50 } from '../../styles/_variables'

function MarkAsPaidButton_outlined() {
  return (
    <Button variant='outlined' sx={{width:'fit-content', margin:2,paddingLeft:4, paddingRight:4, color: BlackColor_100, border: `1px solid ${ BlackColor_50}`,borderRadius:3, ':hover': {backgroundColor:BlackColor_25, color: BlackColor_100, border: `1px solid ${ BlackColor_50}`} }}>
      <Check sx={{marginRight:2}}/>
      <Typography variant='button'>
      Mark as paid
      </Typography>
    </Button> 
  )
}

export default MarkAsPaidButton_outlined