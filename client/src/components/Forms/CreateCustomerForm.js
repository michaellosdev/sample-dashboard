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
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState({
        stateP: '',
        cityP:'',
        zipP: '',
        streetP: '',
        unitP: '',
        stateC: '',
        cityC:'',
        zipC: '',
        streetC: '',
        unitC: ''
    })

    const [rep, setRep] = useState({
        name: '',
        email: '',
        contactPhone: '',
        role: ''
    })

    const [inputFields, setInputFields] = useState({
        firstName: '',
        lastName: '',
        primaryPhoneNumber: '',
        secondaryPhoneNumber: '',
        email: '',
        password: '',
        company:'',
        referral: '',
        role: '',
        type:'',
        notes: '',
        isActive: true
    })

    const [flagged, setFlagged ] = useState(false)



    const handleFormChange = (event) => {
        setInputFields({...inputFields, [event.target.name]: event.target.value})
        console.log(inputFields)
    }

    const handleAddressChange = (event) => {
        setAddress({...address, [event.target.name]: event.target.value})
        console.log(address)
    }

    const handleRepChange = (event) => {
        setRep({...rep, [event.target.name]: event.target.value})
        console.log(rep)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const postCustomer = await axios
            .post('http://localhost:6001/customers', {
                firstName: inputFields.firstName,
                lastName: inputFields.lastName,
                primaryPhoneNumber: inputFields.primaryPhoneNumber,
                secondaryPhoneNumber: inputFields.secondaryPhoneNumber,
                email: inputFields.email,
                password: inputFields.password,
                state: address.stateP,
                city: address.cityP,
                zip: address.zipP,
                street: address.streetP,
                unit: address.unitP,
                company:inputFields.company,
                companyState: address.stateC,
                companyCity: address.cityC,
                companyZip: address.zipC,
                companyStreet: address.streetC,
                companyUnit: address.unitC,
                referral: inputFields.referral,
                role: inputFields.role,
                type: inputFields.type,
                notes: inputFields.notes,
                representativeName: rep.name,
                representativeEmail: rep.email,
                representativeContactPhone: rep.contactPhone,
                representativeRole: rep.role,
                flagged: flagged,
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
                    <Typography variant='h5' sx={{marginBottom: '20px'}}>CUSTOMER INFO  </Typography>
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
                        name='streetP'
                        id='lastName'
                        label='Street'
                        sx={{width: '100%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                                    
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='unitP'
                        id='lastName'
                        label='Unit'
                        sx={{width: '10%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                        <TextField
                        required
                        name='cityP'
                        id='lastName'
                        label='City'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        />   
                        <TextField
                        required
                        name='stateP'
                        id='lastName'
                        label='State'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                        <TextField
                        required
                        name='zipP'
                        id='lastName'
                        label='Zip'
                        sx={{width: '26%'}}
                        onChange={e => handleAddressChange(e)}
                        />

                        
                        
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>COMPANY INFO</Typography>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='company'
                        id='lastName'
                        label='Company name'
                        sx={{width: '30%'}}
                        onChange={e => handleFormChange(e)}
                        />
                         <TextField
                        required
                        name='streetC'
                        id='lastName'
                        label='Street'
                        sx={{width: '68%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                        
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='unitC'
                        id='lastName'
                        label='Unit'
                        sx={{width: '10%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                        <TextField
                        required
                        name='cityC'
                        id='lastName'
                        label='City'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        />   
                        <TextField
                        name='stateC'
                        id='lastName'
                        label='State'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        />
                        <TextField
                        name='zipC'
                        id='lastName'
                        label='Zip'
                        sx={{width: '26%'}}
                        onChange={e => handleAddressChange(e)}
                        />

                        
                        
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='referral'
                        id='lastName'
                        label='Referal'
                        sx={{width: '70%'}}
                        onChange={e => handleFormChange(e)}
                        />
                        <FormControl>
                            <RadioGroup
                             row
                             aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel name='role' value="single" control={<Radio />} label="Single customer" 
                                onChange={e => handleFormChange(e)}
                                />
                                <FormControlLabel  name='role' value="company" control={<Radio />} label="Company"
                                onChange={e => handleFormChange(e)}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>REPRESENTATIVE INFO</Typography>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='name'
                        id='lastName'
                        label='Full name'
                        sx={{width: '49%'}}
                        onChange={e => handleRepChange(e)}
                        />
                         <TextField
                        required
                        name='email'
                        id='lastName'
                        label='Email'
                        sx={{width: '49%'}}
                        onChange={e => handleRepChange(e)}
                        />
                    </div>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='contactPhone'
                        id='lastName'
                        label='Contact phone'
                        sx={{width: '49%'}}
                        onChange={e => handleRepChange(e)}
                        />
                         <TextField
                        required
                        name='role'
                        id='lastName'
                        label='Role'
                        sx={{width: '49%'}}
                        onChange={e => handleRepChange(e)}
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