import React, {useRef, useState, useEffect} from 'react'
import {Box, Breadcrumbs, Container, Typography,Switch, Card, TextField, Radio, RadioGroup, FormLabel, FormControl, FormControlLabel, Button, LinearProgress, Checkbox} from '@mui/material'
import {BoxStyles, ContainerStyles} from '../../../../pages/BoxStyles'
import ButtonFilled from '../../../../components/Buttons/ButtonFilled';
import { Delete, DoorSlidingSharp } from '@mui/icons-material';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BlackColor_100, BlueColor_100, BlueColor_50, GreenColor_100, GreenColor_50, RedColor_100, RedColor_50, TextColor_100 } from '../../../../styles/_variables';
import axios from 'axios';



function EditCustomer() {
    const {id} = useParams()
    const history = useNavigate()
    const [loading, setLoading] = useState(false)
    const [getCustomer, setGetCustomer] = useState({})
    const [flaggedSwitch, setFlaggedSwitch] = useState(getCustomer.flagged);
    
    const handleFlaggedSwitch = (event) => {
        setFlaggedSwitch(event.target.checked)
      };
    
    const fetchCustomer = async()=> {
        await axios.get(`http://localhost:6001/customers/${id}`, {withCredentials:true}).then(data=>{
            
            setGetCustomer(data.data)
        } )

    }

    

    useEffect(()=>{
        fetchCustomer()   
   }, [id])
   useEffect(()=>{
    setAddress({
        stateP: getCustomer.state,
        cityP:getCustomer.city,
        zipP: getCustomer.zip,
        streetP: getCustomer.street,
        unitP: getCustomer.unit,
        stateC: getCustomer.companyState,
        cityC: getCustomer.companyCity,
        zipC: getCustomer.companyZip,
        streetC: getCustomer.companyStreet,
        unitC: getCustomer.companyUnit
        })
    setRep({
        name: getCustomer.representativeName,
        email: getCustomer.representativeEmail,
        contactPhone: getCustomer.representativeContactPhone,
        role: getCustomer.representativeRole
    })
    setInputFields({
        firstName: getCustomer.firstName,
        lastName: getCustomer.lastName,
        primaryPhoneNumber: getCustomer.primaryPhoneNumber,
        secondaryPhoneNumber: getCustomer.secondaryPhoneNumber,
        email: getCustomer.email,
        password: getCustomer.password,
        company: getCustomer.company,
        referral: getCustomer.referral,
        role: getCustomer.role,
        type: getCustomer.customerType,
        notes: getCustomer.notes,
        isActive: getCustomer.isActive })
   },[getCustomer])

    const [address, setAddress] = useState({
            stateP: getCustomer.state,
            cityP:getCustomer.city,
            zipP: getCustomer.zip,
            streetP: getCustomer.street,
            unitP: getCustomer.unit,
            stateC: getCustomer.companyState,
            cityC: getCustomer.companyCity,
            zipC: getCustomer.companyZip,
            streetC: getCustomer.companyStreet,
            unitC: getCustomer.companyUnit
    })

    const [rep, setRep] = useState({
            name: getCustomer.representativeName,
            email: getCustomer.representativeEmail,
            contactPhone: getCustomer.representativeContactPhone,
            role: getCustomer.representativeRole
    })

    const [inputFields, setInputFields] = useState({
        firstName: getCustomer.firstName,
        lastName: getCustomer.lastName,
        primaryPhoneNumber: getCustomer.primaryPhoneNumber,
        secondaryPhoneNumber: getCustomer.secondaryPhoneNumber,
        email: getCustomer.email,
        password: getCustomer.password,
        company: getCustomer.company,
        referral: getCustomer.referral,
        role: getCustomer.role,
        type: getCustomer.customerType,
        notes: getCustomer.notes,
        isActive: getCustomer.isActive
    })



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

    const handleRepChange = (event) => {
        event.preventDefault()
        setRep({...rep, [event.target.name]: event.target.value})
        console.log(rep)
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
            .delete(`http://localhost:6001/customers/${id}`, {withCredentials: true})
            .then(data => console.log(data.response)).then(setLoading(false))
            .then(history(-2))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const postCustomer = await axios
            .patch(`http://localhost:6001/customers/${id}`, {
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
                flagged: flaggedSwitch,
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
                        />
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
                        <TextField
                        name='password'
                        id='lastName'
                        key={inputFields.password}
                        defaultValue={inputFields.password}
                        label='Password'
                        sx={{width: '32%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>ADDRESS  </Typography>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='streetP'
                        id='lastName'
                        key={address.streetP}
                        defaultValue={address.streetP}
                        label='Street'
                        sx={{width: '100%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                                    
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='unitP'
                        id='lastName'
                        key={address.unitP}
                        defaultValue={address.unitP}
                        label='Unit'
                        sx={{width: '10%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                        <TextField
                        required
                        name='cityP'
                        id='lastName'
                        key={address.cityP}
                        defaultValue={address.cityP}
                        label='City'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />   
                        <TextField
                        required
                        name='stateP'
                        id='lastName'
                        key={address.stateP}
                        defaultValue={address.stateP}
                        label='State'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                        <TextField
                        required
                        name='zipP'
                        id='lastName'
                        key={address.zipP}
                        defaultValue={address.zipP}
                        label='Zip'
                        sx={{width: '26%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />

                        
                        
                    </div> 
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>COMPANY INFO</Typography>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='company'
                        id='lastName'
                        key={inputFields.company}
                        defaultValue={inputFields.company}
                        label='Company name'
                        sx={{width: '30%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
                         <TextField
                        required
                        name='streetC'
                        id='lastName'
                        key={address.streetC}
                        defaultValue={address.streetC}
                        label='Street'
                        sx={{width: '68%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                        
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        required
                        name='unitC'
                        id='lastName'
                        key={address.unitC}
                        defaultValue={address.unitC}
                        label='Unit'
                        sx={{width: '10%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                        <TextField
                        required
                        name='cityC'
                        id='lastName'
                        key={address.cityC}
                        defaultValue={address.cityC}
                        label='City'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />   
                        <TextField
                        name='stateC'
                        id='lastName'
                        key={address.stateC}
                        defaultValue={address.stateC}
                        label='State'
                        sx={{width: '30%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />
                        <TextField
                        name='zipC'
                        id='lastName'
                        key={address.zipC}
                        defaultValue={address.zipC}
                        label='Zip'
                        sx={{width: '26%'}}
                        onChange={e => handleAddressChange(e)}
                        autoFocus
                        />

                        
                        
                    </div> 
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='referral'
                        id='lastName'
                        key={inputFields.referral}
                        defaultValue={inputFields.referral}
                        label='Referal'
                        sx={{width: '70%'}}
                        onChange={e => handleFormChange(e)}
                        autoFocus
                        />
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
                    <Typography variant='subtitle2' sx={{marginBottom: '20px'}}>REPRESENTATIVE INFO</Typography>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='name'
                        id='lastName'
                        key={rep.name}
                        defaultValue={rep.name}
                        label='Full name'
                        sx={{width: '49%'}}
                        onChange={e => handleRepChange(e)}
                        autoFocus
                        />
                         <TextField
                        required
                        name='email'
                        id='lastName'
                        key={rep.email}
                        defaultValue={rep.email}
                        label='Email'
                        sx={{width: '49%'}}
                        onChange={e => handleRepChange(e)}
                        autoFocus
                        />
                    </div>
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px'}}>
                        <TextField
                        name='contactPhone'
                        id='lastName'
                        key={rep.contactPhone}
                        defaultValue={rep.contactPhone}
                        label='Contact phone'
                        sx={{width: '49%'}}
                        onChange={e => handleRepChange(e)}
                        autoFocus
                        />
                         <TextField
                        required
                        name='role'
                        id='lastName'
                        key={rep.role}
                        defaultValue={rep.role}
                        label='Role'
                        sx={{width: '49%'}}
                        onChange={e => handleRepChange(e)}
                        autoFocus
                        />
                    </div>
                    <FormControl sx={{display:'flex', flexDirection:'row', alignItems:'center', marginBottom:'20px'}}>
                    <Switch
                        checked={flaggedSwitch}
                        onChange={handleFlaggedSwitch}
                        label='Flagged'
                        inputProps={{ 'aria-label': 'controlled' }}
                        color='error'
                     />
                     <Typography>Flagged</Typography>
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
                        <div style={{width: '50%', display:'flex', justifyContent:'flex-start' , alignItems:'center'}}>
                            <Button variant='contained' sx={{
                                width:'120px',
                                height:'35px', 
                                borderRadius:'10px', 
                                marginRight:'10px',
                                backgroundColor:GreenColor_100,
                                ':hover':{
                                    backgroundColor:GreenColor_50,
                                    color: BlackColor_100
                                }
                            }} onClick={saveEdit}>save </Button>
                            {getCustomer.role === 'admin' ? 
                            <Button variant='contained' sx={{
                                width:'120px', 
                                height:'35px', 
                                borderRadius:'10px',
                                backgroundColor:RedColor_100,
                                ':hover':{
                                    backgroundColor:RedColor_50,
                                    color: BlackColor_100
                                }

                            }} onClick={handleDelete}>Delete </Button> : ''}
                        </div>
                        <div style={{width: '50%', display:'flex', justifyContent:'flex-end' , alignItems:'center'}}> 
                            <ButtonFilled value="CANCEL" color={TextColor_100} backgroundColor={BlueColor_100} backgroundColor__hover={BlueColor_50} color__hover={BlackColor_100}  />
                            <Button variant='contained' type='submit' sx={{width:'120px', height:'35px', borderRadius:'10px',
                            backgroundColor: BlueColor_100, ':hover': {backgroundColor:BlueColor_50, color: BlackColor_100}
                        }}>create </Button>
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

export default EditCustomer