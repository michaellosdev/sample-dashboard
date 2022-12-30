import React, {useState, useEffect} from 'react'
import { Container, Card, Typography, Button, Box, TextField, FormControl, InputLabel, OutlinedInput, Modal, Divider, LinearProgress, Breadcrumbs } from '@mui/material'
import { Add, Delete, AddBox, Clear } from '@mui/icons-material';
import { BlueColor_100, BlueColor_25, RedColor_75, TextColor_100, RedColor_100, RedColor_50, BlackColor_100, BlackColor_25, BlueColor_50 } from '../../../../styles/_variables';
import ButtonText from '../../../../components/Buttons/ButtonText';
import ButtonFilled from '../../../../components/Buttons/ButtonFilled';
import Logo from '../../../../assets/onboardittech_logo.png'
import { useNavigate, Link } from 'react-router-dom';
import { ContainerStyles } from '../../../BoxStyles'
import axios from 'axios';

function CreateJob() {
    const history =useNavigate()
    const [loading, setLoading] = useState(false)
    const [startJobDate, setStartJobDate] = useState(new Date());
    const [startJobTime, setStartJobTime] = useState(new Date());
    const [endJobDate, setEndJobDate] = useState(new Date());
    const [note, setNote] = useState('')
    const [invoice, setInvoice] = useState({})
    const [invoices, setInvoices] = useState([])
    const [customer, setCustomer] = useState({})
    const [employee, setEmployee] = useState({})
    const [employees, setEmployees] = useState([])
    const [openInvoicesModal, setOpenInvoicesModal] = useState(false);
    const [openEmployeesModal, setOpenEmployeesModal] = useState(false);
    const handleOpenInvoices = () => setOpenInvoicesModal(true);
    const handleCloseInvoices = () => setOpenInvoicesModal(false);

    const handleOpenEmployees = () => setOpenEmployeesModal(true);
    const handleCloseEmployees = () => setOpenEmployeesModal(false);

    const handleStartJobDate = (e) => {
        setStartJobDate(new Date(e.target.value).toISOString());

    };
    // const handleStartJobTime = (e) => {
    //     // setStartJobTime(new Date(e.target.value).toISOString());
    //     console.log(new Date(e.target.value).getHours())
    // };
    const handleEndJobDate = (e) => {
        setEndJobDate(new Date(e.target.value).toISOString());
    };
    const handleNote =(e) => {
        setNote(e.target.value)
    }

    const fetchEmployees = async () => {
        const {data} =  await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/employees/`, {withCredentials: true})
        setEmployees(data)
    }
    const fetchInvocies = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/invoices/`, {withCredentials: true})
        setInvoices(data)
    }
    
    useEffect(()=> {
        fetchEmployees()
        fetchInvocies()
    }, [])

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const postJob = await axios
                .post(`${process.env.REACT_APP_DEPLOY_URL}/jobs`, {
                    startJobDate: startJobDate,
                    endJobDate: endJobDate,
                    notes: note,
                    employee: employee._id,
                    customer: customer._id,
                    invoice: invoice._id
                },  {withCredentials:true})
                .then(setLoading(false))
                .then(history(-1))
                .catch(err=>console.log(err))
           
    
            
            // .then(data => imgUrl = data.response.path)

    


        

    }

  return (
    <Container sx={ContainerStyles}>
        <Container sx={{width:'100%' }}>
            <Typography variant='h2'>Add new job</Typography>
            <Breadcrumbs sx={{marginBottom:'10px'}}>
                <Link to='/employee-dashboard/admin/invertory'><Typography sx={{color:BlueColor_50}}>Invertory</Typography></Link>
            <Typography >Add new item</Typography>
            </Breadcrumbs>
        <Box 
           
            sx={{marginTop:'40px', display:'flex', alignItems:'center', flexDirection:'column'}}
        >
        <Card elevation={10} sx={{p:'25px', borderRadius:'10px', height:'500px', width:'100%' }}>
            <div style={{width: '100%', height: '90%', display:'flex',flexDirection:'column', alignItems:'start' }}>
                    <Button onClick={handleOpenInvoices}>Add Invoice </Button>
                <div style={{width: '100%', height:'40%', display: 'flex'}}>
                    <div style={{marginRight:'auto'}}>
                    <Typography variant='h3'>{customer?.firstName === undefined ? ' ' : customer?.firstName + ' ' + customer?.lastName}</Typography>
                    <Typography variant='subtitle2'>{customer?.firstName === undefined ? ' ' : customer.email}</Typography>
                    <Typography variant='subtitle2'>{customer?.firstName === undefined ? ' ' : customer.primaryPhoneNumber}</Typography>
                    <Typography variant='subtitle2'>INV-{customer?.firstName === undefined ? ' ' : invoice.invoice}</Typography>
                    </div>
                    <div style={{marginRight: 'auto'}}>
                    <Typography variant='h5'>{customer?.firstName === undefined ? ' ' : customer?.street + ',' + customer?.unit}</Typography>
                    <Typography variant='h5'>{customer?.firstName === undefined ? ' ' : customer?.city + ',' + customer?.state}</Typography>
                    <Typography variant='h5'>{customer?.firstName === undefined ? ' ' : customer?.zip}</Typography>
                    
                    </div>
                    <div style={{display: 'flex', flexDirection:'column', width:'50%'}}>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <TextField
                                id="date"
                                label="Start job date"
                                type="datetime-local"
                                defaultValue={Date.now()}
                                onChange={(e) => handleStartJobDate(e)}
                                sx={{ width: '100%', marginBottom:'20px' }}
                                InputLabelProps={{
                                    shrink: true }} 
                                    />
                        </div>
                        <TextField
                            id="date"
                            label="End job date"
                            type="datetime-local"
                            onChange={(e) => handleEndJobDate(e)}
                            sx={{ width: '100%',  }}
                            InputLabelProps={{
                                shrink: true }} 
                                />
                    </div>
                </div>
                <div style={{width: '100%', height:'29%'}}>
                    <Button onClick={handleOpenEmployees}>Add Employee </Button>
                    <div style={{width: '100%', height:'40%', display: 'flex'}}>
                    <div style={{marginRight:'auto'}}>
                    <Typography variant='h3'>{employee?.firstName === undefined ? ' ' : employee?.firstName + ' ' + employee?.lastName}</Typography>
                    <Typography variant='subtitle2'>INV-{invoice.invoice}</Typography>
                    </div>
                    <div style={{marginRight: 'auto'}}>
                    <Typography variant='h5'>{employee?.firstName === undefined ? ' ' : employee?.email}</Typography>
                    <Typography variant='h5'>{employee?.firstName === undefined ? ' ' : employee?.primaryPhoneNumber}</Typography>
                    </div>
                    <div style={{display: 'flex', flexDirection:'column', width:'50%'}}>
                        <TextField
                            id="date"
                            label="NOTES"
                            placeholder='Job notes'
                            multiline={true}
                            rows={5}
                            onChange={(e) => handleNote(e)}
                            sx={{ width: '100%', marginBottom:'20px' }}
                            InputLabelProps={{
                                shrink: true }} 
                                />
                    </div>
                    </div>
                </div>
            </div>


            <Button variant='contained' onClick={handleSubmit} sx={{width:'12%'}}>submit </Button>
        </Card> 
            {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
        </Box>
    </Container>
    <Modal
                        open={openInvoicesModal}
                        onClose={handleCloseInvoices}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Container sx={{height:'100vh',width: '100vh' }}>    
                           <Card elevation={10} sx={{height:'600px', width:'400px', borderRadius:'10px', position: 'absolute', left: '50%', top: '50%', transform: 'translateY(-50%)', padding: '20px' }}>
                            <TextField fullWidth sx={{marginTop:'50px', marginBottom:'30px'}}></TextField>
                            <div className='modal-scroll'>
                                {invoices?.map((item, index) => (
                                    <div sx={{width:'100%', display:'flex'}}>
                                        <div sx={{display:'flex', flexDirection:'column', }}>
                                            <Typography variant='h4' >{item.customer?.firstName + ' '
                                             + item.customer?.lastName}</Typography>
                                            <Typography variant='h6'>INV-{item?.invoice}</Typography>
                                        </div>
                                        <Button variant='text' onClick={()=>{
                                            setCustomer(item.customer)
                                            setInvoice(item)

                                            setOpenInvoicesModal(false)

                                        }}><AddBox /></Button> 
                                    </div>
                                ))}
                            </div>
                            <ButtonText value='cancel' onClick={handleCloseInvoices} />
                           </Card>
                        </Container>
                    </Modal>
    <Modal
                        open={openEmployeesModal}
                        onClose={handleCloseEmployees}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Container sx={{height:'100vh',width: '100vh' }}>    
                           <Card elevation={10} sx={{height:'600px', width:'400px', borderRadius:'10px', position: 'absolute', left: '50%', top: '50%', transform: 'translateY(-50%)', padding: '20px' }}>
                            <TextField fullWidth sx={{marginTop:'50px', marginBottom:'30px'}}></TextField>
                            <div className='modal-scroll'>
                                {employees?.map((item, index) => (
                                    <div sx={{width:'100%', display:'flex'}}>
                                        <div sx={{display:'flex', flexDirection:'column', }}>
                                            <Typography variant='h4' >{item?.firstName + ' '
                                             + item?.lastName}</Typography>
                                            <Typography variant='h6'>INV-{item?.invoice}</Typography>
                                        </div>
                                        <Button variant='text' onClick={()=>{
                                            setEmployee(item)

                                            setOpenEmployeesModal(false)

                                        }}><AddBox /></Button> 
                                    </div>
                                ))}
                            </div>
                            <ButtonText value='cancel' onClick={handleCloseEmployees} />
                           </Card>
                        </Container>
                    </Modal>
    </Container>
  )  
  
}

export default CreateJob