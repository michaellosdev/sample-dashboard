import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,  generatePath, useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import {Container, Box, Card, Typography, Divider, Breadcrumbs, Button} from '@mui/material'
import { BoxStyles, ContainerStyles } from '../../../BoxStyles'
import SideMenu from '../../../../components/SideMenu/SideMenu'
import TagRedText from '../../../../components/Tags/TextTags/TagRedText'
import { BlackColor_100, BlackColor_50, BlueColor_100, BlueColor_50, RedColor_100, RedColor_50, TextColor_100, BlackColor_25 } from '../../../../styles/_variables'
import ButtonFilled from '../../../../components/Buttons/ButtonFilled'
import ButtonOutlined from '../../../../components/Buttons/ButtonOutlined'
import { Edit, Message } from '@mui/icons-material'
import ButtonText from '../../../../components/Buttons/ButtonText'
import axios from 'axios'
import TagGreenText from '../../../../components/Tags/TextTags/TagGreenText'
import TagYellowText from '../../../../components/Tags/TextTags/TagYellowText'
import TagGreyText from '../../../../components/Tags/TextTags/TagGreyText'
let firstRender = true


function EmployeeDetails() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [customerDetails, setCustomerDetails] = useState([])
    const [invoices, setInvoices] = useState([])
    

    const fetchCustomer = async()=> {
      const data = await axios.get(`http://localhost:6001/employees/${id}`, {withCredentials:true})
      setCustomerDetails(data.data)

    }

    const fetchInvoices = async () => {
        const {data} = await axios.get('http://localhost:6001/invoices', {withCredentials:true})
        data.map(inv => {
            if (inv?.customer?._id == id){
               setInvoices(current => [...current, inv])
            }
        })


      }
      const [idInv, setIdInv] = useState()

    
    
      const handleProceedInv = (e) => {
        id && navigate(generatePath(":id", {idInv}))
      }

    const handleProceed = (e) => {

        id && navigate(generatePath("edit-employee/:id", {id}))
    }
    
   useEffect(()=>{
        fetchCustomer()
        fetchInvoices()
   }, [id])


    


// const customer = customerDetails.data.find(item=> item.id === id)


return (
    <>
    <SideMenu />
    <Container sx={ContainerStyles}>
        <Box sx={BoxStyles}>
        <Typography variant='h3' sx={{marginBottom: '20px'}}> Customer Details</Typography>

        <Breadcrumbs sx={{marginBottom:'10px'}}>
            <Link to='/employee-dashboard/admin/crm'><Typography sx={{color:BlueColor_50}}>CRM</Typography></Link>
            <Typography >{customerDetails.firstName + ' ' + customerDetails.lastName} </Typography>
        </Breadcrumbs>
            <Card elevation={10} sx={{
                borderRadius: '20px',
                height:'500px',
                padding:"20px",
                marginBottom: '40px'
            }}>
                <div style={{display:'flex', height:'90%'}}>
                    <div style={{width:'50%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', padding:'10px'}}>
                        <div style={{border:`1px solid ${BlackColor_50}`, borderRadius: '10px', width: '90%', height:'20%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 10px 0 10px', marginBottom:'10px' }}>
                            <div >
                                <Typography>{`${customerDetails.firstName} ${customerDetails.lastName}`}</Typography>
                                <Typography>{!customerDetails.company ? '  ' : customerDetails.company}</Typography>
                            </div>
                            {customerDetails.flagged ? <div><TagRedText value='Flagged' /></div> : ''}
                        </div>
                        <div style={{ width: '90%', height:'20%', display: 'flex', justifyContent:"space-between" }}>
                            <div>
                                <Typography>CONTACT NUMBER</Typography>
                                <Typography>{customerDetails.primaryPhoneNumber}</Typography>
                                {customerDetails.secondaryPhoneNumber ? <Typography>{customerDetails.primaryPhoneNumber}</Typography> : ''}
                            </div>
                            <div style={{width:'50%'}}>
                                <Typography>ADDRESS</Typography>
                                <Typography >{!customerDetails.street ? 'No address' :`${customerDetails.street},${customerDetails.city}, ${customerDetails.state}, ${customerDetails.zip}`}</Typography>
                            </div>
                        </div>  
                        <div style={{width: '90%', height:'40%'}}>
                                <Typography>NOTES:</Typography>
                                <Typography>{customerDetails.notes}</Typography>
                        </div>
                    </div>
                    <div style={{width:'50%', height:'100%',  display:'flex', flexDirection:'column', alignItems:'center', padding:'10px'}}>
                        <div style={{ width: '90%', height:'20%', display: 'flex', justifyContent:"space-between" }}>
                            <div>
                                <Typography>ROLE</Typography>
                                <Typography>{customerDetails.role}</Typography>
                            </div>
                            <div style={{width:'50%'}}>
                                <Typography>EMAIL</Typography>
                                <Typography >{customerDetails.email}</Typography>
                            </div>
                        </div> 
                        

                        </div>
                    </div>

                    
              
                    <Divider />
                <div style={{display:'flex',justifyContent:'space-between', width:'100%'}}>
                    
                    <ButtonFilled value='flag cutomer' color={TextColor_100} backgroundColor={RedColor_100} backgroundColor__hover={RedColor_50} color__hover={BlackColor_100}/>
                    <div>
                        <ButtonOutlined value='edit profile' icon={<Edit />}color={BlackColor_100} borderColor={BlackColor_100} onClick={handleProceed}/>
                        {/* <ButtonFilled  value='message' icon={<Message />} color={TextColor_100} backgroundColor={BlueColor_100} backgroundColor__hover={BlueColor_50} color__hover={BlackColor_100}/> */}
                    </div>
                </div>
            </Card>

            <Card elevation={10} sx={{
                borderRadius: '20px',
                height:'500px',
                padding:"40px"
            }}>
            {invoices.slice(0).reverse().map((item, i) => (
                      <>
                      <div style={{display:'flex', justifyContent:'space-between', height:'60px', cursor:'pointer'}}  onClick={(e) => {
             setIdInv(item._id); handleProceedInv(e)
            }}> 
              
                       
                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'25%'}}> 
                          <Typography variant='subtitle2'>{item.customer?.firstName}</Typography>
                          <Typography variant='caption' sx={{color:BlackColor_25}}>INV-{item.invoice}</Typography>
                        </div>
                          <Typography variant='caption' sx={{width:'18%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{new Date(item.createdAt).toDateString()}</Typography>
                          <Typography variant='caption' sx={{width:'18%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{new Date(item.dueDate).toDateString()}</Typography>
                          <Typography variant='caption' sx={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{`$ ${item.totalPrice.toFixed(2)}`}</Typography>
                        <div style={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}> 
                          {item.status === 'paid' ? <TagGreenText value='paid' /> : item.status === 'unpaid' ? <TagYellowText value='unpaid' /> : item.status === 'overdue' ? <TagRedText value='overdue' /> : item.status === 'grey' ? <TagGreyText value='draft' /> : null }
                        </div>
                      </div>
                      <Divider />
  
                      </>
              
              )).slice(0,5)}
            </Card>
        </Box>
    </Container>
    
    </>
    
    
  )
}

export default EmployeeDetails