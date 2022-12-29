import React from 'react'
import {Button, Typography} from '@mui/material'
import {AddBox} from '@mui/icons-material'
import { BlackColor_25, BlackColor_100, GreenColor_100, GreenColor_50, BlueColor_100, BlueColor_50, BlackColor_50 } from '../../styles/_variables'

function NewEstimateButton_filled() {
  return (
    <Button variant='contained' sx={{width:'fit-content', margin:2,paddingLeft:4, paddingRight:4, backgroundColor:BlueColor_100, borderRadius:3,':hover': {backgroundColor:BlueColor_50, color: BlackColor_100}}}>
      <AddBox sx={{marginRight:2}}/>
      <Typography variant='button'>
      New Estimate
      </Typography>
    </Button> 
  )
}

export default NewEstimateButton_filled