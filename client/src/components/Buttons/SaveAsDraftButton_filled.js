import React from 'react'
import {Button, Typography} from '@mui/material'
import {AddBox} from '@mui/icons-material'
import { BlackColor_25, BlackColor_100, GreenColor_100, GreenColor_50, BlueColor_100, BlueColor_50, BlackColor_50 } from '../../styles/_variables'

function SaveAsDraftButton_filled() {
  return (
    <Button variant='contained' sx={{width:'fit-content', margin:2, paddingLeft:4, paddingRight:4, backgroundColor:BlackColor_25, color: BlackColor_100, borderRadius:3,':hover': {backgroundColor:BlueColor_50, color: BlackColor_100}}}>
      <Typography variant='button'>
      Save as Draft
      </Typography>
    </Button> 
  )
}

export default SaveAsDraftButton_filled