import React from 'react'
import SideMenu from '../../../../components/SideMenu/SideMenu'
import { Container, Box, Typography, Breadcrumbs, Card} from '@mui/material'
import { BoxStyles, ContainerStyles } from '../../../BoxStyles'
import CreateCustomerForm from '../../../../components/Forms/CreateCustomerForm'
import { BlueColor_50 } from '../../../../styles/_variables'
import { Link } from 'react-router-dom'
import CreateEmployeeForm from '../../../../components/Forms/CreateEmployeeForm'


function AddAnEmployee() {
  return (
    <>
    <SideMenu />
    <Container sx={ContainerStyles}>
      <Box sx={BoxStyles}>
        <Typography variant='h3' sx={{margin:'0 0 30px 20px'}}> Create new customer</Typography>
        <Breadcrumbs sx={{margin:'0 0 10px 20px'}}>
            <Link to='/employee-dashboard/admin/employees'><Typography sx={{color:BlueColor_50}}>Employees</Typography></Link>
            <Typography >Create Employee</Typography>
        </Breadcrumbs>
        <CreateEmployeeForm />
      </Box>
    </Container>
    </>
  )
}

export default AddAnEmployee