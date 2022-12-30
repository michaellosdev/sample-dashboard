import React, {useRef, useState, useEffect} from 'react'
import SideMenu from '../../../components/SideMenu/SideMenuCustomer'
import {ContainerStyles, BoxStyles} from '../../BoxStyles'
import { Container, Box, Button, Breadcrumbs, Typography, Card, Accordion, AccordionSummary, AccordionDetails, Modal, TextField } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import {
    BrowserRouter as Router,
    generatePath,
    Routes,
    Route,
    useNavigate,
    useParams,
    Navigate,
    Link,
    useLocation
  } from "react-router-dom";
  import {BlueColor_50} from '../../../styles/_variables'
  import Logo from '../../../assets/onboardittech_logo.png'
  import TagGreenText from '../../../components/Tags/TextTags/TagGreenText'
  import TagRedText from '../../../components/Tags/TextTags/TagRedText'
  import TagGreyText from '../../../components/Tags/TextTags/TagGreyText'
  import TagYellowText from '../../../components/Tags/TextTags/TagYellowText'

  import axios from 'axios'
 
 









function InvoiceDetailsCustomer() {
  
  const {id} = useParams()
  const [invoice, setInvoice] = useState([])
  
  
  //get invoice details 
  
  const fetchInvoice = async()=> {
    const {data} = await axios.get(`http://localhost:6001/myInvoices/${id}`, {withCredentials:true})
    setInvoice(data)
    
    
  }
  const navigate = useNavigate()
  const goToPdf = () => {
    id && navigate(generatePath("pdf/:id", {id}))
  }
  
  useEffect(()=>{
    fetchInvoice()
  }, [id])

  // console.log({invoice});
  
   const [expanded, setExpanded] = useState(false);

   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

  

  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
    
  //  const invoice = InvoicesData.invoices.fi(item => item.id === id)
  return (
    <>
    <SideMenu />
    <Container sx={ContainerStyles}>
        <Box sx={BoxStyles}>
        <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
          <Typography variant='h3' sx={{marginBottom: '20px'}}> Invoice Details</Typography>
        </div> 
        <Breadcrumbs sx={{marginBottom:'10px'}}>
            <Link to='/invoices'><Typography sx={{color:BlueColor_50}}>Invoices</Typography></Link>
            <Typography >INV-{invoice.invoice}</Typography>
        </Breadcrumbs>
            <Card elevation='10'sx={{height:'fit-content', borderRadius:'10px', padding:'10px 40px 10px 40px'}}>
              <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <img src={Logo} style={{width:'150px'}} />
                <div style={{marginTop:'20px'}}>  
                <div style={{display:'flex', justifyContent:'right'}}>
                  {invoice.status === 'paid' ? <TagGreenText value={invoice.status} /> : invoice.status === 'unpaid' ? <TagYellowText value={invoice.status} /> : invoice.status === 'overdue' ? <TagRedText value={invoice.status} /> : invoice.status === 'draft' ? <TagGreyText value={invoice.status} /> : '' }
                </div>
                  <Typography variant='h5'>INV-{invoice.invoice}</Typography>
                </div>
              </div>
              <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <div style={{width:'50%', display:'flex', flexDirection:'column'}}>
                  <Typography variant='subtitle2'>ONBOARD IT TECH INC</Typography>
                  <div>
                    <Typography variant='subtitle2'>LIC #1039864</Typography>
                    <Typography variant='subtitle2'>14431 Ventura Blvd #257</Typography>
                    <Typography variant='subtitle2'>Sherman Oaks, California 91423</Typography>
                    
                  </div>
                </div>
                <div style={{width:'50%', display:'flex', flexDirection:'column'}}>
                  <Typography>INVOICE TO: </Typography>
                  <div>
                    <Typography variant='h6'>{invoice.customer?.firstName + ' ' + invoice.customer?.lastName}</Typography>
                    <Typography variant='subtitle2'>{invoice.customer?.street+','+ invoice.customer?.unit +','+invoice.customer?.state}</Typography>
                  </div>
                </div>
              </div>
              <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <div style={{width:'50%', display:'flex', flexDirection:'column'}}>
                  <Typography variant='subtitle1'>Created at: {new Date(invoice?.createdAt).toDateString()}</Typography>
                  <div>
                    <Typography variant='subtitle2'></Typography>
                  </div>
                </div>
                <div style={{width:'50%', display:'flex', flexDirection:'column', marginBottom:'20px'}}>
                  <Typography>Due date: {new Date(invoice?.dueDate).toDateString()}</Typography>
                  <div>
                    <Typography variant='subtitle2'></Typography>
                  </div>
                </div>
              </div>
              <div style={{backgroundColor:BlueColor_50, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%'}}>
                    <Typography variant='body1' sx={{width:'5%'}}>#</Typography>
                    <Typography variant='body1' sx={{width:'40%'}}>Name</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Price</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Amount</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Total</Typography>
              </div>
              <div style={{height:"60%", marginBottom:'50px'}}>
              {invoice.customItems?.map((item, index) => (
              <Accordion expanded={expanded === item._id} onChange={handleChange(item._id)}>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                >
                  <div style={{ height:'30px', width:'100%', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'3%', marginTop:'20px'}}>
                    <Typography variant='body1' sx={{width:'5%'}}>{index + 1}</Typography>
                    <Typography variant='body1' sx={{width:'40%'}}>{item?.name}</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>{'$' + item?.price}</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>{item?.qty}</Typography>
                    <Typography variant='body1' sx={{width:'10%'}}>{'$'+ item?.total}</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                    
                  <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', flexDirection:'column'}}>
                    {/* <img src={item.img} style={{width:'200px', height:'300px'}}/>
                    <Typography variant='h6'>{item.description}</Typography> */}
                    
                      <img src={{...invoice.items.filter(itemDB=> itemDB.itemName === item.name).splice(0,1)[0]}.img} style={{width:'40%'}}/>
                      <Typography variant='body1'>{{...invoice.items.filter(itemDB=> itemDB.itemName === item.name).splice(0,1)[0]}.description}</Typography>
                    
                  </div>
                </AccordionDetails>

              </Accordion>
            ))}
            
              </div>
              <div style={{height:'200px', display: 'flex', justifyContent:'space-between'}}>
                {invoice.signed ? <Typography>Signed by: {invoice.customer.fisrtName} </Typography> : ''}
                <div style={{height:'100px',borderBottom:'1px solid black', width:'30%'}}>
                </div>
                <div style={{height:'100px', width:'30%'}}>
                    <Typography variant='h6' >DISCOUNT: {invoice.discount}%</Typography>
                    <Typography variant='h6' >TAX: </Typography>
                    <Typography variant='h6' >TOTAL PRICE: ${invoice.totalPrice}</Typography>
                </div>
              </div>
              <div style={{width:'100%', display:'flex', justifyContent:'right'}}>
                <Button variant='contained'>MAKE A PAYMENT</Button>
              </div>
              
            </Card>
                
                {/* <Button onClick={goToPdf}>PDF</Button> */}
        </Box>
    </Container>
    </>

  )
}

export default InvoiceDetailsCustomer