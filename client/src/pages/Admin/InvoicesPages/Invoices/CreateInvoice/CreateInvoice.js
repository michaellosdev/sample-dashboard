import React from 'react'
import { Box, Card, TextField, Container, Typography, Input } from '@mui/material'
import { BoxStyles, ContainerStyles } from '../../../../BoxStyles'
import CreateInvoiceForm from '../../../../../components/Forms/CreateInvoiceForm'


function CreateInvoice() {
  return (
    <Container sx={ContainerStyles}>
      <CreateInvoiceForm />
    </Container>

  )
}

export default CreateInvoice