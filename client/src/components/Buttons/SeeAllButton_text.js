import React from 'react'
import {Button, Typography} from '@mui/material'
import {ArrowForward} from '@mui/icons-material'
import { BlackColor_25, BlackColor_100, GreenColor_100, GreenColor_50, BlueColor_100, BlueColor_50, BlackColor_50 } from '../../styles/_variables'

function SeeAllButton_text() {
  return (
    <Button variant='text' sx={{width:'fit-content', margin:2,paddingLeft:4, paddingRight:4, borderRadius:3,':hover': { color: BlackColor_100}}}>
      <Typography variant='button'>
      New Estimate
      </Typography>
      <ArrowForward sx={{marginLeft:2}}/>
    </Button> 
  )
}

export default SeeAllButton_text