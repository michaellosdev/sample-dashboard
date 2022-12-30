import React, {useRef, useState} from 'react'
import {Box, Container, Typography, Card, TextField, Radio, RadioGroup, FormLabel, FormControl, FormControlLabel, Button, LinearProgress} from '@mui/material'
import {BoxStyles, ContainerStyles} from '../../pages/BoxStyles'
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import ButtonFilled from '../Buttons/ButtonFilled';
import { Delete } from '@mui/icons-material';
import { BlackColor_100, BlueColor_100, BlueColor_50, RedColor_100, RedColor_50, TextColor_100 } from '../../styles/_variables';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function CreateCustomerForm() {
    const history = useNavigate()
    const [createDateValue, setCreateDateValue] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState({
        state: '',
        city:'',
        zip: '',
        street: '',
        unit: '',
        
    })



    const [inputFields, setInputFields] = useState({
        firstName: '',
        lastName: '',
        primaryPhoneNumber: '',
        secondaryPhoneNumber: '',
        email: '',
        password: '',
        startDate: createDateValue,
        SSN: '',
        role: '',
        salary: '',
        notes: '',
        isActive: true
    })

    const [flagged, setFlagged ] = useState(false)

    const handleCreateDateValue = (e) => {
        setCreateDateValue(new Date(e.target.value).toISOString());
        console.log(createDateValue)
      };


    const handleFormChange = (event) => {
        setInputFields({...inputFields, [event.target.name]: event.target.value})
        console.log(inputFields)
    }

    const handleAddressChange = (event) => {
        setAddress({...address, [event.target.name]: event.target.value})
        console.log(address)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const postCustomer = await axios
            .post(`${process.env.REACT_APP_DEPLOY_URL}/employees`, {
                firstName: inputFields.firstName,
                lastName: inputFields.lastName,
                primaryPhoneNumber: inputFields.primaryPhoneNumber,
                secondaryPhoneNumber: inputFields.secondaryPhoneNumber,
                email: inputFields.email,
                password: inputFields.password,
                startDate: inputFields.startDate,
                state: address.state,
                city: address.city,
                zip: address.zip,
                SSN: inputFields.SSN,
                street: address.street,
                unit: address.unit,
                role: inputFields.role,
                notes: inputFields.notes,
                salary: inputFields.salary,
                isActive: inputFields.isActive
            }, {withCredentials: true}).then(data => {console.log(data) 
                setLoading(false)}).then(history(-1))
           
    
            
            // .then(data => imgUrl = data.response.path)

            setLoading(false)

        setInputFields({
            itemName: '',
            itemType: '',
            cost: '',
            price: '',
            inStockQty: '',
            description: '',
            img:''
        })
    }
    



  return (
    <Container >
        <Box component="form"
            autoComplete='off'
            sx={BoxStyles}
            onSubmit={handleSubmit}
        >
            <Card elevation='10' sx={{
                height: 'fit-content',
                padding: '25px',
                borderRadius: '20px',
            }}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant='h5' sx={{marginBottom: '20px'}}>EMPLOYEE INFO</Typography>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        id='firstName'
                        name='firstName'
                        label='First name'
                        sx={{width: '25%'}}
                        onChange={e => handleFormChange(e)}
                        />
                        <TextField
                        required
                        name='lastName'
                        id='lastName'
                        label='Last Name'
                        sx={{width: '25%'}}
                        onChange={e => handleFormChange(e)}
                        />
                        <TextField
                        required
                        name='email'
                        id='lastName'
                        label='Email'
                        sx={{width: '47%'}}
                        onChange={e => handleFormChange(e)}
                        />
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        id='firstName'
                        name='primaryPhoneNumber'
                        label='Primary phone'
                        sx={{width: '32%'}}
                        onChange={e => handleFormChange(e)}
                        />
                        <TextField
                        required
                        name='secondaryPhoneNumber'
                        id='lastName'
                        label='Secondary Phone'
                        sx={{width: '32%'}}
                        onChange={e => handleFormChange(e)}
                        />
                        <TextField
                        required
                        name='password'
                        id='lastName'
                        label='Password'
                        sx={{width: '32%'}}
                        onChange={e => handleFormChange(e)}
                        />
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>ADDRESS  </Typography>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='street'
                        id='lastName'
                        label='Street'
                        sx={{width: '100%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                                    
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='unit'
                        id='lastName'
                        label='Unit'
                        sx={{width: '10%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                        <TextField
                        required
                        name='city'
                        id='lastName'
                        label='City'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        />   
                        <TextField
                        required
                        name='state'
                        id='lastName'
                        label='State'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                        <TextField
                        required
                        name='zip'
                        id='lastName'
                        label='Zip'
                        sx={{width: '26%'}}
                        onChange={e => handleAddressChange(e)}
                        />

                        
                        
                    </div> 
                    
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                       
                        <FormControl>
                            <RadioGroup
                             row
                             aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel name='role' value="tech" control={<Radio />} label="tech" 
                                onChange={e => handleFormChange(e)}
                                />
                                <FormControlLabel  name='role' value="admin" control={<Radio />} label="admin"
                                onChange={e => handleFormChange(e)}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>PERSONAL INFO</Typography>
                    
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                       
                         <TextField
                        required
                        name='salary'
                        id='lastName'
                        label='SSN'
                        sx={{width: '49%'}}
                        onChange={e => handleFormChange(e)}
                        />
                         <TextField
                        required
                        name='SSN'
                        id='lastName'
                        label='SSN'
                        sx={{width: '49%'}}
                        onChange={e => handleFormChange(e)}
                        />
                    </div>
                    <FormControl>
                            <RadioGroup
                             row
                             aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value='flag'control={<Radio />} label="Flagg" 
                                onChange={()=> setFlagged(true)}
                                />
                            </RadioGroup>
                        </FormControl>

                    <TextField
                        id='notes'
                        name='notes'
                        label='Notes'
                        fullWidth
                        multiline
                        rows={5}
                        onChange={e => handleFormChange(e)}
                        
                        />

                    <div style={{width: '100%', display:'flex', justifyContent:'flex-end' , alignItems:'center'}}> 
                        <ButtonFilled value="CANCEL" color={TextColor_100} backgroundColor={RedColor_100} backgroundColor__hover={RedColor_50} color__hover={BlackColor_100} />
                        <Button variant='contained' type='submit' sx={{width:'80px', height:'40px'}}>create </Button>
                    </div>
                </div>

                
            </Card>
            {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
            
            
            
        </Box>
        
    </Container>

    
  )
}

export default CreateCustomerForm