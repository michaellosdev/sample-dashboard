import React from 'react'
import { Box, Card, TextField, Container, Typography, Input } from '@mui/material'
import { BoxStyles, ContainerStyles } from '../../../../BoxStyles'
import CreateEstimateForm from '../../../../../components/Forms/CreateEstimateForm'


function CreateEstimate() {
  return (
    <Container sx={ContainerStyles}>
      <CreateEstimateForm />
    </Container>

  )
}

export default CreateEstimate