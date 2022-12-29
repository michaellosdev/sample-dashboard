import React from 'react'
import {Button, Typography} from '@mui/material'
import {People} from '@mui/icons-material'
import { BlackColor_25, BlackColor_100, GreenColor_100, GreenColor_50 } from '../../styles/_variables'

function AssignTechnitianButton_filled() {
  return (
    <Button variant='contained' sx={{width:'fit-content', margin:2,paddingLeft:4, paddingRight:4, backgroundColor:GreenColor_100, borderRadius:3,':hover': {backgroundColor:GreenColor_50, color: BlackColor_100}}}>
      <People sx={{marginRight:2}}/>
      <Typography variant='button'>
      ASSIGN A TECHNITIAN
      </Typography>
    </Button> 
  )
}

export default AssignTechnitianButton_filled