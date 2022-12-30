import { Box, Card, TextField, Container, Typography, Input, Button, Modal, OutlinedInput, InputLabel, FormControl, Divider, LinearProgress } from '@mui/material'
import {Add, AddBox, Delete} from '@mui/icons-material'
import React, {useEffect, useState} from 'react'
import Logo from '../../assets/onboardittech_logo.png'
import ButtonText from '../Buttons/ButtonText'
import someData from './someData.json'
import TestAdd from './TestAdd'
import {BoxStyles, ContainerStyles} from '../../pages/BoxStyles'
import ButtonFilled from '../Buttons/ButtonFilled';
import { BlackColor_100, BlueColor_100, BlueColor_50, RedColor_100, RedColor_50, TextColor_100, BlueColor_25, RedColor_75, BlueColor_75, GreenColor_100, GreenColor_50} from '../../styles/_variables';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LocalizationProvider, AdapterDayjs, TimePicker, DateTimePicker, DesktopDatePicker, } from '@mui/x-date-pickers'



function CreateEstimateForm() {
    //post for iunvoice
    //get all the items and post invoice
    const [createDateValue, setCreateDateValue] = useState(new Date());
    const [dueDateValue, setDueDateValue] = useState(new Date());
    const history = useNavigate()
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [customers, setCustomers] = useState([])

    const handleCreateDateValue = (e) => {
        setCreateDateValue(new Date(e.target.value).toISOString());
        console.log(createDateValue)
      };
    
    const handleDueDateValue = (e) => {
        setDueDateValue(new Date(e.target.value).toISOString());
        console.log(dueDateValue)
      };;
    
    const fetchItems = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/items`, {withCredentials:true})
        setItems(data)
        
    }
    
    const fetchCustomers = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/customers`, {withCredentials:true})
        setCustomers(data)
    } 
    
    useEffect(()=> {
        fetchItems()
        fetchCustomers()
        console.log(items)
    }, [])
    
    
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
        id: '',
        name: '',
        address: {
            state: '',
            street:'',
            unit: '',
            zip:'',
            city:''
        },
        phone:''
    })
    
    
    
    
    //adding a new div with inputs for item
    const [inputFields, setInputFields] = useState([
        {
            name: '',
            itemType:'',
            qty:0,
            price:0,
            total: 0
        }
    ])
    
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
    

    let customItem = []
    
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
        dueDate: new Date(dueDateValue),
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

    const submit = async (e) => { 
        
        e.preventDefault();
        setLoading(true)
        console.log(invoice)
        const postInvoice = await axios
            .post(`${process.env.REACT_APP_DEPLOY_URL}/estimates`, {
                items: invoice.items,
                createdAt: createDateValue,
                dueDate: dueDateValue,
                customItems: invoice.customItems,
                totalPrice: invoice.totalPrice,
                discount: invoice.discount,
                tax: invoice.tax,
                customer: invoice.customer
            }, {withCredentials: true}).then(() => {setLoading(false) 
                history(-1)}).catch(err=>console.log(err))
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
                INV111
            </Typography>
        </div>

        <div 
                style={{
                    display:'flex',
                    justifyContent: 'space-between',
                    alignItems:'center'
                }}    
        > 
            <Typography variant='overline' sx={{width:'50%'}}>ESTIMATE FROM</Typography>
            <Typography variant='overline' sx={{width:'39%'}}>ESTIMATE TO</Typography>
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
                <Typography variant='body1'>SAMPLE COMPANY</Typography>
                <Typography variant='body1'>Lic#7171717171717</Typography>
                <Typography variant='body1'>12345 Sample street, Room 777</Typography>
                <Typography variant='body1'>Sample city, California 91111</Typography>
            </Box>

            <Box sx={{display:'flex', flexDirection: 'column', width:'50%'}}>
                <Typography variant='body1'>{customer.name}</Typography>
                <Typography variant='body1'>{`${customer?.street}`}</Typography>
                <Typography variant='body1'>{customer.phone}</Typography>
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
                        value={input.title}
                        name='title'
                        id={`title-${index}`}
                        label='First Name'
                        onChange={event => handleFormChange(index, event)}
                        
                        />
                        </FormControl>
                        <FormControl  sx={{width: '18%'}}>
                        <InputLabel htmlFor={`type-${index}`}>Type</InputLabel>
                        <OutlinedInput
                        name='type'
                        id={`type-${index}`}
                        label='Last Name'
                        onChange={event => handleFormChange(index, event)}
                        />
                        </FormControl >
                        <FormControl sx={{width: '18%'}}>
                        <InputLabel htmlFor={`qty-${index}`}>Quantity</InputLabel>
                        <OutlinedInput
                        type='number'
                        name='qty'
                        id={`qty-${index}`}
                        label='Company Name'
                        onChange={event => handleFormChange(index, event)}
                        /></FormControl>
                        <FormControl sx={{width: '18%'}}>
                        <InputLabel htmlFor={`price-${index}`}>Price</InputLabel>
                        <OutlinedInput
                        value={input.price !== '' ? input.price : 0}
                        name='price'
                        type='number'
                        id={`price-${index}`}
                        label='Company Name'
                        onChange={event => handleFormChange(index, event)}
                        /></FormControl>
                        <FormControl sx={{width: '18%'}}>
                        <InputLabel htmlFor={`total-${index}`}>Total</InputLabel>
                        <OutlinedInput
                        name='total'
                        type='number'
                        id={`total-${index}`}
                        label='Company Name'
                        value={input.total = input.qty * input.price}
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
                                            let field = { title: item.itemName, itemType: item.itemType,  qty:0, price:item.price, total:0 }
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
                                                    state: item?.address?.state,
                                                    city: item?.address?.city,
                                                    zip: item?.address?.zip,
                                                    street: item?.address?.street,
                                                    unit: item?.address?.unit
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
                <Box type='form' sx={{marginTop:'20px', marginBottom:'20px'}}>
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
                                        
                    <div style={{width: '100%', display:'flex', justifyContent:'flex-end' }}> 
                        <ButtonFilled value="SAVE" color={TextColor_100} backgroundColor={GreenColor_100} backgroundColor__hover={GreenColor_50} color__hover={BlackColor_100} onClick={()=>{
                            customItem = inputFields
                            works()
                            }}/>
                        <ButtonFilled value="CANCEL" color={TextColor_100} backgroundColor={RedColor_100} backgroundColor__hover={RedColor_50} color__hover={BlackColor_100} onClick={(e) => {
                            setConfirm(true)
                        }}/>
                        <ButtonFilled value="CREATE" color={TextColor_100} backgroundColor={BlueColor_100} backgroundColor__hover={BlueColor_50} color__hover={BlackColor_100} onClick={submit} />
                    </div>
    </Card>
    {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
</Container>

  )
}




export default CreateEstimateForm