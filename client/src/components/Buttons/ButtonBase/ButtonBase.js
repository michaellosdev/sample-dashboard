import React from 'react'
import {Button} from '@mui/material'
import { BaseButtonStyles } from './ButtonBaseStyle'
import { GlobalStyles } from '../../../styles/GlobalStyles'
import { BlackColor_100 } from '../../../styles/_variables'




function ButtonBase() {
  return (

    <>
    <Button   variant='contained' sx={{backgroundColor:BlackColor_100}}>Hello </Button>

    </>


    
  )
}

export default ButtonBase