import { Container, Card, TextField } from '@mui/material'
import CreateItemForm from '../../../../components/Forms/CreateItemForm'
import { ContainerStyles } from '../../../BoxStyles'
import React, {useState} from 'react'
import axios from 'axios'

function CreateItem() {
    
  return (
    <Container sx={ContainerStyles}>
    
    <CreateItemForm />
  </Container>
   
  )
}

export default CreateItem