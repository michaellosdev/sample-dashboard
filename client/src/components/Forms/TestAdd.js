import React from 'react'
import someData from './someData.json'
import {Button, Card, Typography} from '@mui/material'

function testAdd() {
  return (
    

    <div>
        

{someData.customers.map((item, index) => (
  <Card sx={{margin:1, p:2}}>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h4'>{item.address}</Typography>
        <Button> Add </Button>

  </Card>
))}
    </div>

 

    
  )
}

export default testAdd