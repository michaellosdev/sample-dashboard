import { Box, TextField, Card, Typography, Checkbox } from '@mui/material'
import React from 'react'
import ButtonOutlined from '../Buttons/ButtonOutlined'
import ButtonFilled from '../Buttons/ButtonFilled'
import { BlackColor_100, BlackColor_75, BlueColor_100, BlueColor_50, BlackColor_25 } from '../../styles/_variables'

function AddEventForm() {
  return (
    <Card elevation={10} sx={{width:420, heigth:'fit-content', borderRadius:3}}>
    <Typography variant='h4' sx={{m:2}}>
        Add Event
    </Typography>
    
    <Box
      component="form"
      sx={{
          '& .MuiTextField-root': { m: 1, width:400  },
        }}
        noValidate
        autoComplete="off"
        >
      <div>
        <TextField 
            required
            id='outlined-required'
            label='Title'
            />
        <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={12}
            
            
            />

         <TextField 
            required
            id='outlined-required'
            label='Title'
            />
         <TextField 
            required
            id='outlined-required'
            label='Title'
            />

        

      </div>
      <div style={{width: 200, heigth:20, display:'flex'}}>
        <Checkbox defaultChecked />
        <Checkbox defaultChecked color="secondary" />
        <Checkbox defaultChecked color="success" />
        <Checkbox defaultChecked color="default" />
        <Checkbox
               
               sx={{
                   color: 'red',
                   '&.Mui-checked': {
                       color: 'red',
                       
                    },
                }}
                />
        
      </div>
      <div style={{width: 420, heigth:20, display:'flex', justifyContent:'flex-end'}}>
      <ButtonFilled value='ADD' backgroundColor={`${BlackColor_25}`} backgroundColor__hover={`${BlueColor_50}`} color__hover={`${BlackColor_100}`} />  
      <ButtonFilled value='ADD' backgroundColor={`${BlueColor_100}`} backgroundColor__hover={`${BlueColor_50}`} color__hover={`${BlackColor_100}`}/>
      </div>


        
    </Box>
                
    </Card>
  )
}

export default AddEventForm