import React, {useRef, useState, useEffect} from 'react'
import {Box, Breadcrumbs, Container, Typography, Card, TextField, Radio, RadioGroup, FormLabel, FormControl, FormControlLabel, Button, LinearProgress, Checkbox} from '@mui/material'
import {BoxStyles, ContainerStyles} from '../../../../pages/BoxStyles'
import ButtonFilled from '../../../../components/Buttons/ButtonFilled';
import { Delete, DoorSlidingSharp } from '@mui/icons-material';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BlackColor_100, BlueColor_100, BlueColor_50, RedColor_100, RedColor_50, TextColor_100 } from '../../../../styles/_variables';
import axios from 'axios';



function EditEmployee() {
    const {id} = useParams()
    const history = useNavigate()
    const [loading, setLoading] = useState(false)
    const [getCustomer, setGetCustomer] = useState({})
    
    const fetchCustomer = async()=> {
        await axios.get(`http://localhost:6001/employees/${id}`, {withCredentials:true}).then(data=>{
            
            setGetCustomer(data.data)
        } )

    }

    

    useEffect(()=>{
        fetchCustomer()   
   }, [id])
   useEffect(()=>{
    setAddress({
        state: getCustomer.state,
        city:getCustomer.city,
        zip: getCustomer.zip,
        street: getCustomer.street,
        unit: getCustomer.unit,
        })
    setInputFields({
        firstName: getCustomer.firstName,
        lastName: getCustomer.lastName,
        primaryPhoneNumber: getCustomer.primaryPhoneNumber,
        secondaryPhoneNumber: getCustomer.secondaryPhoneNumber,
        email: getCustomer.email,
        password: getCustomer.password,
        role: getCustomer.role,
        SSN: getCustomer.SSN,
        startDate: getCustomer.startDate,
        salary: getCustomer.salary,
        notes: getCustomer.notes,
        isActive: getCustomer.isActive })
   },[getCustomer])

    const [address, setAddress] = useState({
            state: getCustomer.state,
            city:getCustomer.city,
            zip: getCustomer.zip,
            street: getCustomer.street,
            unit: getCustomer.unit,
    })

    const [inputFields, setInputFields] = useState({
        firstName: getCustomer.firstName,
        lastName: getCustomer.lastName,
        primaryPhoneNumber: getCustomer.primaryPhoneNumber,
        secondaryPhoneNumber: getCustomer.secondaryPhoneNumber,
        email: getCustomer.email,
        password: getCustomer.password,
        role: getCustomer.role,
        SSN: getCustomer.SSN,
        startDate: getCustomer.startDate,
        salary: getCustomer.salary,
        notes: getCustomer.notes,
        isActive: getCustomer.isActive
    })

    const [flagged, setFlagged ] = useState(false)


    const handleFormChange = (event) => {
        event.preventDefault()
        setInputFields({...inputFields, [event.target.name]: event.target.value})
        console.log(inputFields)
    }

    const handleAddressChange = (event) => {
        event.preventDefault()
        setAddress({...address, [event.target.name]: event.target.value})
        console.log(address)
    }



    const saveEdit =() => {
        // setAddress({
        //     stateP: getCustomer.state,
        //     cityP:getCustomer.city,
        //     zipP: getCustomer.zip,
        //     streetP: getCustomer.street,
        //     unitP: getCustomer.unit,
        //     stateC: getCustomer.companyState,
        //     cityC: getCustomer.companyCity,
        //     zipC: getCustomer.companyZip,
        //     streetC: getCustomer.companyStreet,
        //     unitC: getCustomer.companyUnit
        //     })
        // setRep({
        //     name: getCustomer.representativeName,
        //     email: getCustomer.representativeEmail,
        //     contactPhone: getCustomer.representativeContactPhone,
        //     role: getCustomer.representativeRole
        // })
        // setInputFields({
        //     firstName: getCustomer.firstName,
        //     lastName: getCustomer.lastName,
        //     primaryPhoneNumber: getCustomer.primaryPhoneNumber,
        //     secondaryPhoneNumber: getCustomer.secondaryPhoneNumber,
        //     email: getCustomer.email,
        //     password: getCustomer.password,
        //     company: getCustomer.company,
        //     referral: getCustomer.referral,
        //     role: getCustomer.role,
        //     type: getCustomer.customerType,
        //     notes: getCustomer.notes,
        //     isActive: getCustomer.isActive })

            console.log(inputFields)
    }



    const handleDelete = async () =>{
        setLoading(true)
        let response = window.confirm('Are you sure you want to delete customer?')
        if(response) {
            return  await axios
            .delete(`http://localhost:6001/employees/${id}`, {withCredentials: true})
            .then(data => console.log(data.response)).then(setLoading(false))
            .then(history(-2))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const postCustomer = await axios
            .patch(`http://localhost:6001/employees/${id}`, {
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
                setLoading(true)}).then(history(-2))
           
    
            
            // .then(data => imgUrl = data.response.path)

            setLoading(false)

        
    }
    



  return (
    <Container sx={ContainerStyles}>
    <Container sx={{width:'100%'}}>
    
    <Box sx={BoxStyles}>

    
    <Typography variant='h3' sx={{margin:'0 0 20px 20px'}}> Create new customer</Typography>
        <Breadcrumbs sx={{margin:'0 0 10px 20px'}}>
            <Link to='/employee-dashboard/admin/crm'><Typography sx={{color:BlueColor_50}}>CRM</Typography></Link>
            <Link to={`/employee-dashboard/admin/crm/${id}`} ><Typography sx={{color:BlueColor_50}}>CRM</Typography></Link>
            <Typography >Create Customer</Typography>
        </Breadcrumbs>
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
                        key={inputFields.firstName}
                        defaultValue={inputFields.firstName}
                        name='firstName'
                        label='First name'
                        sx={{width: '25%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
                        <TextField
                        required
                        name='lastName'
                        key={inputFields.lastName}
                        defaultValue={inputFields.lastName}
                        id='lastName'
                        label='Last Name'
                        sx={{width: '25%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
                       {getCustomer.role === 'superuser' || getCustomer.role === 'admin'  ? ' ' :
                        <TextField
                        required
                        name='email'
                        key={inputFields.email}
                        defaultValue={inputFields.email}
                        id='lastName'
                        label='Email'
                        sx={{width: '47%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />}
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        id='firstName'
                        key={inputFields.primaryPhoneNumber}
                        defaultValue={inputFields.primaryPhoneNumber}
                        name='primaryPhoneNumber'
                        label='Primary phone'
                        sx={{width: '32%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
                        <TextField
                        required
                        name='secondaryPhoneNumber'
                        id='lastName'
                        key={inputFields.secondaryPhoneNumber}
                        defaultValue={inputFields.secondaryPhoneNumber}
                        label='Secondary Phone'
                        sx={{width: '32%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
                       {getCustomer.role === 'superuser' || getCustomer.role === 'admin'  ? ' ' : <TextField
                        name='password'
                        id='lastName'
                        key={inputFields.password}
                        defaultValue={inputFields.password}
                        label='Password'
                        sx={{width: '32%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />}
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>ADDRESS  </Typography>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='street'
                        id='lastName'
                        key={address.street}
                        defaultValue={address.street}
                        label='Street'
                        sx={{width: '100%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                                    
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='unit'
                        id='lastName'
                        key={address.unit}
                        defaultValue={address.unit}
                        label='Unit'
                        sx={{width: '10%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                        <TextField
                        required
                        name='city'
                        id='lastName'
                        key={address.city}
                        defaultValue={address.city}
                        label='City'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />   
                        <TextField
                        required
                        name='state'
                        id='lastName'
                        key={address.state}
                        defaultValue={address.state}
                        label='State'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                        <TextField
                        required
                        name='zip'
                        id='lastName'
                        key={address.zip}
                        defaultValue={address.zip}
                        label='Zip'
                        sx={{width: '26%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />

                        
                        
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>COMPANY INFO</Typography>
                   
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <FormControl>
                            <RadioGroup
                             row
                             aria-labelledby="demo-row-radio-buttons-group-label"
                             name="row-radio-buttons-group"
                             >
                                {inputFields.role === 'single' ? <FormControlLabel checked name='role' value="single" control={<Radio />} label="Single customer" 
                                onChange={e => handleFormChange(e)}
                                /> : <FormControlLabel name='role' value="single" control={<Radio />} label="Single customer" 
                                onChange={e => handleFormChange(e)}
                                />}
                                {inputFields.role === 'company' ? <FormControlLabel checked name='role' value="company" control={<Radio />} label="Company"
                                onChange={e => handleFormChange(e)}
                                /> : <FormControlLabel  name='role' value="company" control={<Radio />} label="Company"
                                onChange={e => handleFormChange(e)}
                                />}
                                
                                
                            </RadioGroup>
                        </FormControl>
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>RERSONAL INFO</Typography>
    
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='salary'
                        id='lastName'
                        key={inputFields.salary}
                        defaultValue={inputFields.salary}
                        label='Contact phone'
                        sx={{width: '49%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
                         <TextField
                        required
                        name='SSN'
                        id='lastName'
                        key={inputFields.SSN}
                        defaultValue={inputFields.SSN}
                        label='Role'
                        sx={{width: '49%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
                    </div>
                    <FormControl>
                            <RadioGroup
                             row
                             aria-labelledby="demo-row-radio-buttons-group-label"
                             name="row-radio-buttons-group"
                             >
                                {inputFields.role === 'company' ? <FormControlLabel value='flag'control={<Radio />} label="Flagg" 
                                onChange={()=> setFlagged(true)}
                                /> : <FormControlLabel value='flag'control={<Radio />} label="Flagg" 
                                onChange={()=> setFlagged(true)}
                                />}
                               
                            </RadioGroup>
                        </FormControl>

                    <TextField
                        id='notes'
                        name='notes'
                        key={inputFields.notes}
                        defaultValue={inputFields.notes}
                        label='Notes'
                        fullWidth
                        multiline
                        rows={5}
                        onChange={e => handleFormChange(e)}
                        
                        />
                    <div style={{width: '100%', display:'flex', justifyContent:'space-between' , alignItems:'center'}}>

                        <Button variant='contained' sx={{width:'80px', height:'40px'}} onClick={saveEdit}>save </Button>
                        <Button variant='contained' sx={{width:'80px', height:'40px'}} onClick={handleDelete}>Delete </Button>
                        <div style={{width: '50%', display:'flex', justifyContent:'flex-end' , alignItems:'center'}}> 
                            <ButtonFilled value="CANCEL" color={TextColor_100} backgroundColor={RedColor_100} backgroundColor__hover={RedColor_50} color__hover={BlackColor_100}  />
                            <Button variant='contained' type='submit' sx={{width:'80px', height:'40px'}}>create </Button>
                        </div>
                        
                        
                    </div>
                </div>

                
            </Card>
            {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
            
            
            
        </Box>
        </Box>
       </Container>                 
    </Container>

    
  )
}

export default EditEmployee