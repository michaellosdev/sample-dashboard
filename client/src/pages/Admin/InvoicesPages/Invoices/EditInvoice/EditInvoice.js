import React, {useEffect, useState} from 'react'
import { Box, Card, TextField, Container, Typography, Input, Button, Modal, OutlinedInput, InputLabel, FormControl, Divider, LinearProgress } from '@mui/material'
import {Add, AddBox, Delete, InputRounded} from '@mui/icons-material'
import Logo from '../../../../../assets/onboardittech_logo.png'
import ButtonText from '../../../../../components/Buttons/ButtonText'
import {ContainerStyles, BoxStyles} from '../../../../BoxStyles'
import ButtonFilled from '../../../../../components/Buttons/ButtonFilled';
import { BlackColor_100, BlueColor_100, BlueColor_50, RedColor_100, RedColor_50, TextColor_100, BlueColor_25, RedColor_75, BlueColor_75, GreenColor_100, GreenColor_25} from '../../../../../styles/_variables';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { LocalizationProvider, AdapterDayjs, TimePicker, DateTimePicker, DesktopDatePicker, } from '@mui/x-date-pickers'


function EditInvoice() {
     //post for iunvoice
    //get all the items and post invoice
    const {id} = useParams()
    const history = useNavigate()
    const [createDateValue, setCreateDateValue] = useState(new Date());
    const [dueDateValue, setDueDateValue] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [customers, setCustomers] = useState([])
    const [existingInvoice, setExistingInvoice] = useState({})
    
   

   

    const handleCreateDateValue = (e) => {
        setCreateDateValue(e.target.value);
        console.log(createDateValue)
      };
    
    const handleDueDateValue = (e) => {
        setDueDateValue(e.target.value);
        console.log(dueDateValue)
      };

    const fetchExistingInvoice = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/invoices/myInvoices/${id}`,{withCredentials:true})

        return data
    }
    
    const fetchItems = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/items`, {withCredentials:true})
        setItems(data)
    }
    
    const fetchCustomers = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/customers`, {withCredentials:true})
        setCustomers(data)
    } 
    


    
    //items modal
    const [openItemsModal, setOpenItemsModal] = useState(false);
    const [openCustomersModal, setOpenCustomersModal] = useState(false);
    const handleOpenItems = () => setOpenItemsModal(true);
    const handleCloseItems = () => setOpenItemsModal(false);
    const handleOpenCustomers = () => setOpenCustomersModal(true);
    const handleCloseCustomers = () => setOpenCustomersModal(false);
    const [discount, setDiscount] = useState(0)
    const [tax, setTax] = useState(0)
    const [customer, setCustomer] = useState({
        id: existingInvoice?.customer?._id,
        name: existingInvoice?.customer?.firstName + ' ' + existingInvoice?.customer?.lastName,
        address: {
            state: existingInvoice?.customer?.state,
            street:existingInvoice?.customer?.street,
            unit: existingInvoice?.customer?.unit,
            zip: existingInvoice?.customer?.zip,
            city: existingInvoice?.customer?.city
        },
        phone: existingInvoice?.customer?.primaryPhoneNumber
    })
    
    let customItem = []
    
    //adding a new div with inputs for item
    const [inputFields, setInputFields] = useState([
        
    ])


    useEffect(()=> {
        fetchExistingInvoice().then(data => {
            setExistingInvoice(data)
            customItem = data.customItems
            console.log(customItem)
            setInputFields([...customItem,...inputFields])

        })
        fetchItems()
        fetchCustomers()
        
    }, [id])
    
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        console.log(data)
    }
    
    const addFields = (e) => {    
        e.preventDefault();
        let field = { name: '', itemType: '',  qty:0,price:0, total:0  }
        setInputFields([...inputFields, field])
    }
    
    // useEffect(()=>{
    //     setInputFields([...inputFields, existingInvoice?.customItems])
    //     console.log(existingInvoice)
    // },[existingInvoice])

    
    
    const [itemId, setItemId] = useState([])

    const [invoice, setInvoice] = useState({
        items: itemId,
        customItems: [
            {
                name: '',
                itemType: '',
                qty: 0,
                price: 0,
                total: 0
            }
        ],
        discount: 0,
        tax:0,
        createdAt: createDateValue,
        dueDate: dueDateValue,
        totalPrice: 0,
        sendToEmails: [],
        customer: customer.id,
        employee: ''
        
    })
    const works = () => {
        setInvoice({
            items: itemId,
            customItems: customItem,
            createdAt: createDateValue,
            dueDate: dueDateValue,
            discount: Number(discount),
            tax: Number(tax),
            totalPrice: inputFields.map(i => i.total).reduce((a,b)=> a+b),
            customer: customer.id
        })

        console.log(invoice.items)
    }


    // useEffect(()=>{
    //     works()
    // },[inputFields])

    const handleDelete = async() => {
        const deleteInvoice = await axios
            .delete(`${process.env.REACT_APP_DEPLOY_URL}/invoices/myInvoices/${id}`,
                    {withCredentials: true})
            .then(history(-2))

    }

    const submit = async (e) => { 
        
        e.preventDefault();
        setLoading(true)
        console.log(invoice)
        const postInvoice = await axios
            .patch(`${process.env.REACT_APP_DEPLOY_URL}/invoices/myInvoices/${id}`, {
                items: invoice.items,
                createdAt: createDateValue,
                dueDate: dueDateValue,
                customItems: invoice.customItems,
                totalPrice: invoice.totalPrice,
                discount: invoice.discount,
                tax: invoice.tax,
                customer: invoice.customer
            }, {withCredentials: true}).then(setLoading(false)).catch(err=>console.log(err))
        }
        
        const removeFields = ( index) => {
            let data = [...inputFields];
            data.splice(index, 1)
            setInputFields(data)
        }
        // Function to update list on drop;
        
        
        const [name, setName] = useState('')
        
        const [value, setValue] = useState(null);
        const [confirm, setConfirm] = useState(false)
  return (
    <Container sx={ContainerStyles}>
        
        <Container sx={{ width: '100%'}} >

    <Card elevation={10} sx={{p:'25px', borderRadius:'10px'}}>
        <div 
            style={{
                display:'flex',
                justifyContent: 'space-between',
                alignItems:'center'
            }}
        >
            <img src={Logo}
            style={{
                width: '100px',
            }}
            />

            <Typography  variant='h5'>
                INVOICE
            </Typography>
        </div>

        <div 
                style={{
                    display:'flex',
                    justifyContent: 'space-between',
                    alignItems:'center'
                }}    
        > 
            <Typography variant='overline' sx={{width:'50%'}}>INVOICE FROM</Typography>
            <Typography variant='overline' sx={{width:'39%'}}>INVOICE TO</Typography>
            <div style={{width:'11%'}}>
            <ButtonText value='ADD' iconLeft={<Add />} color={`${BlueColor_100}`} onClick={()=>handleOpenCustomers()}/>
            </div> 
        </div>
        <div 

        
                style={{
                    display:'flex',
                    justifyContent: 'space-between',
                    alignItems:'center'
                }}    
        > 
            <Box sx={{display:'flex', flexDirection: 'column', width:'50%'}}>
                <Typography variant='body1'>INVOICE FROM</Typography>
                <Typography variant='body1'>INVOICE FROM</Typography>
                <Typography variant='body1'>INVOICE FROM</Typography>
            </Box>

            <Box sx={{display:'flex', flexDirection: 'column', width:'50%'}}>
                <Typography variant='body1'>{existingInvoice.customer?.firstName + ' ' + existingInvoice.customer?.lastName}</Typography>
                <Typography variant='body1'>{existingInvoice.customer?.street + ', ' + existingInvoice.customer?.unit }</Typography>
                <Typography variant='body1'>{existingInvoice.customer?.zip+ ' '+existingInvoice.customer?.state }</Typography>
                <Typography variant='body1'>{existingInvoice.customer?.primaryPhoneNumber}</Typography>
            </Box>

            
        </div>

        

        <Box component="form"
            autoComplete='off'
            sx={{marginTop:'40px'}}
        >
            
                <div style={{display:'flex', flexDirection:'column'}}>
                    
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'20px', backgroundColor:BlueColor_25, padding:"10px"}}>
                        
                    <TextField
                         id="date"
                        label="Creation date"
                        type="date"
                        defaultValue={Date.now()}
                        onChange={(e) => handleCreateDateValue(e)}
                        sx={{ width: '49%' }}
                        InputLabelProps={{
                        shrink: true,
                    }}         
                    />
                        
                        <TextField
                         id="date"
                        label="Creation date"
                        type="date"
                        defaultValue={Date.now() + 14*24*60*60*1000}
                        onChange={(e) => handleDueDateValue(e)}
                        sx={{width: '49%' }}
                        InputLabelProps={{
                        shrink: true,
                    }}         
                    />
                    </div> 
                
                </div>
            </Box>
            <Box component="form"
            autoComplete='off'
            sx={{ height:'fit-content'}}
        >
           
        
            
                {inputFields.map((input, index)=>(
                    <div style={{display:'flex', justifyContent: 'space-between', marginBottom:'10px', padding:"10px"}} key={index}>
                        <FormControl sx={{width: '18%'}}>
                        <InputLabel htmlFor={`title-${index}`}>Title</InputLabel>
                        <OutlinedInput
                        key={input?.name}
                        defaultValue={input?.name}
                        value={input?.name}
                        name='name'
                        id={`title-${index}`}
                        label='First Name'
                        onChange={event => handleFormChange(index, event)}
                        autoFocus
                        
                        />
                        </FormControl>
                        <FormControl  sx={{width: '18%'}}>
                        <InputLabel htmlFor={`type-${index}`}>Type</InputLabel>
                        <OutlinedInput
                        name='type'
                        key={input?.itemType}
                        defaultValue={input?.itemType}
                        id={`type-${index}`}
                        label='Last Name'
                        onChange={event => handleFormChange(index, event)}
                        autoFocus
                        />
                        </FormControl >
                        <FormControl sx={{width: '18%'}}>
                        <InputLabel htmlFor={`qty-${index}`}>Quantity</InputLabel>
                        <OutlinedInput
                        type='number'
                        name='qty'
                        key={input?.qty}
                        defaultValue={input?.qty}
                        id={`qty-${index}`}
                        label='Company Name'
                        onChange={event => handleFormChange(index, event)}
                        autoFocus
                        /></FormControl>
                        <FormControl sx={{width: '18%'}}>
                        <InputLabel htmlFor={`price-${index}`}>Price</InputLabel>
                        <OutlinedInput
                        key={input?.price}
                        defaultValue={input?.price}
                        name='price'
                        type='number'
                        id={`price-${index}`}
                        label='Company Name'
                        onChange={event => handleFormChange(index, event)}
                        autoFocus
                        /></FormControl>
                        <FormControl sx={{width: '18%'}}>
                        <InputLabel htmlFor={`total-${index}`}>Total</InputLabel>
                        <OutlinedInput
                        name='total'
                        type='number'
                        id={`total-${index}`}
                        label='Company Name'
                        key={input.total = input?.qty * input?.price}
                        defaultValue={input.total = input?.qty * input?.price}
                        value={input.total = input?.qty * input?.price}
                        autoFocus
                        /></FormControl>
                        <Button onClick={() =>  removeFields(index)} sx={{color:RedColor_75}}><Delete/></Button>
                            
                    </div>     
                    )
                )}
                <ButtonText value='add a field' onClick={addFields} color={BlueColor_100}/>
                <div>
                    <Button onClick={handleOpenItems}>Open modal</Button>

                    <Modal
                        open={openItemsModal}
                        onClose={handleCloseItems}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Container sx={{height:'100vh',width: '100vh' }}>    
                           <Card elevation={10} sx={{height:'600px', width:'400px', borderRadius:'10px', position: 'absolute', left: '50%', top: '50%', transform: 'translateY(-50%)', padding: '20px' }}>
                            <TextField fullWidth sx={{marginTop:'50px', marginBottom:'30px'}}></TextField>
                            <div className='modal-scroll'>
                                {items.map((item, index) => (
                                    <div sx={{width:'100%', display:'flex'}}>
                                        <div sx={{display:'flex', flexDirection:'column', }}>
                                            <Typography variant='h4' >{item.itemName}</Typography>
                                            <Typography variant='h6'>{item.price + '$'}</Typography>
                                        </div>
                                        <Button variant='text' onClick={()=>{
                                            let field = { name: item.itemName, itemType: item.itemType,  qty:0, price:item.price, total:0 }
                                            setInputFields([...inputFields, field])
                                            setItemId(current => [...current, item._id])

                                            setOpenItemsModal(false)
                                            console.log(inputFields)

                                        }}><AddBox /></Button> 
                                    </div>
                                ))}
                            </div>
                            <ButtonText value='cancel' onClick={()=> setOpenItemsModal(false)} />
                           </Card>
                        </Container>
                    </Modal>
                </div>

                {/* customers modal */}
                <div>

                    <Modal
                        open={openCustomersModal}
                        onClose={handleCloseCustomers}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Container sx={{height:'100vh',width: '100vh' }}>    
                           <Card elevation={10} sx={{height:'600px', width:'400px', borderRadius:'10px', position: 'absolute', left: '50%', top: '50%', transform: 'translateY(-50%)', padding: '20px' }}>
                            <TextField fullWidth sx={{marginTop:'50px', marginBottom:'30px'}}></TextField>
                            <div className='modal-scroll'>
                                {customers.map((item, index) => (
                                    <div sx={{width:'100%', display:'flex'}}>
                                        <div sx={{display:'flex', flexDirection:'column', }}>
                                            <Typography variant='h4' >{item.firstName}</Typography>
                                            <Typography variant='h6'>{item.lastName + '$'}</Typography>
                                        </div>
                                        <Button variant='text' onClick={()=>{
                                            setCustomer({
                                                id: item._id,
                                                name: item.firstName + ' ' + item.lastName,
                                                address: {
                                                    state: item?.state,
                                                    city: item?.city,
                                                    zip: item?.zip,
                                                    street: item?.street,
                                                    unit: item?.unit
                                                },
                                                phone: item.primaryPhoneNumber
                                            })
                                            setOpenCustomersModal(false)
                                            console.log(customer)
                                        }}><AddBox /></Button> 
                                    </div>
                                ))}
                            </div>
                            <ButtonText value='cancel' onClick={()=> setOpenCustomersModal(false)} />
                           </Card>
                        </Container>
                    </Modal>
                </div>
                
                <Divider />
                <Box type='form'>
                    <FormControl sx={{width: '25%'}}>
                        <InputLabel htmlFor={`discount-field`}>Discount</InputLabel>
                        <OutlinedInput
                        name='Discount'
                        type='number'
                        id={`discount-field`}
                        label='Company Name'
                        onChange={e => setDiscount(e.target.value)}
                        /></FormControl>
                    <FormControl sx={{width: '25%'}}>
                        <InputLabel htmlFor={`Tax`}>Tax</InputLabel>
                        <OutlinedInput
                        name='Tax'
                        type='number'
                        id={`tax-field`}
                        label='Company Name'
                        onChange={e => setTax(e.target.value)}
                        /></FormControl>
                </Box>

        </Box>
                                        
                    <div style={{width: '100%', display:'flex', justifyContent:'space-between' }}> 
                        <ButtonFilled value="SAVE" color={TextColor_100} backgroundColor={GreenColor_100} backgroundColor__hover={GreenColor_25} color__hover={BlackColor_100} onClick={()=>{
                            customItem = inputFields
                            works()
                            }}/>
                        <div style={{width: '50%', display:'flex', justifyContent:'flex-end' }}>
                        <ButtonFilled value="Delete" color={TextColor_100} backgroundColor={RedColor_100} backgroundColor__hover={RedColor_50} color__hover={BlackColor_100} onClick={(e) => {
                            handleDelete()
                        }}/>
                        <ButtonFilled value="Update" color={TextColor_100} backgroundColor={BlueColor_100} backgroundColor__hover={BlueColor_50} color__hover={BlackColor_100} onClick={submit} />
                        </div>
                    </div>
    </Card>
    {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
</Container>


    </Container>
  )
}

export default EditInvoice