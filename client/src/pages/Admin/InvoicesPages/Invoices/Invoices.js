import React, {useState, useEffect}from 'react'
import {Box, Card, Container, Typography, Checkbox, Avatar, Divider, Button, CssBaseline, Tab, Tabs, AppBar, TextField, Grid, LinearProgress} from '@mui/material'
import {BoxStyles, ContainerStyles} from '../../../BoxStyles'
import { Add, DocumentScanner, DoneAll, AccessTime, NotificationImportant, ContentPaste, ArrowForward } from '@mui/icons-material'
import ButtonFilled from '../../../../components/Buttons/ButtonFilled'
import { BlueColor_100, BlueColor_50, TextColor_100, TextColor_50, BlackColor_75, BlackColor_50, BlueColor_75, GreenColor_75, YellowColor_75, RedColor_75, BlueColor_25, BlackColor_25 } from '../../../../styles/_variables'
import InvoicesData from './InvoicesData.json'
import TagGreen from '../../../../components/Tags/NumTags/TagGreen'
import TagYellow from '../../../../components/Tags/NumTags/TagYellow'
import TagRed from '../../../../components/Tags/NumTags/TagRed'
import TagBlue from '../../../../components/Tags/NumTags/TagBlue'
import TagGrey from '../../../../components/Tags/NumTags/TagGrey'
import TagGreyText from '../../../../components/Tags/TextTags/TagGreyText'
import TagGreenText from '../../../../components/Tags/TextTags/TagGreenText'
import TagRedText from '../../../../components/Tags/TextTags/TagRedText'
import TagYellowText from '../../../../components/Tags/TextTags/TagYellowText'
import ButtonText from '../../../../components/Buttons/ButtonText'
import {
  BrowserRouter as Router,
  generatePath,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
  Link,
} from "react-router-dom";
import CreateInvoice from './CreateInvoice/CreateInvoice'
import axios from 'axios'


function Invoices() {

//loading 
const [loading, setLoading] = useState(false)
//data fetch
const [invoices, setInvoices] = useState([])

const fetchInvoices = async () => {
  setLoading(true)
  const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/invoices`, {withCredentials:true})

  setInvoices(data)
  setLoading(false)
}

console.log(invoices)

useEffect(()=>{
  fetchInvoices()
}, [])


//mui tabs
  const [selectedTabInvoices, setSelectedTabInvoices] = useState(0)

  const handleChangeInvoices = (event, newValue) => {
    setSelectedTabInvoices(newValue)
  }
  

  const [id, setId] = useState()

  const navigate = useNavigate()

  const handleProceed = (e) => {
    id && navigate(generatePath(":id", {id}))
}

  let paidInvoices = invoices.filter(item => item.status === 'paid') 
  let unpaidInvoices = invoices.filter(item => item.status === 'unpaid') 
  let overdueInvoices = invoices.filter(item => item.status === 'overdue') 
  let draftInvoices = invoices.filter(item => item.status === 'draft') 



  
  
  return (
    <>
    <Container>
    
      <Box sx={BoxStyles}>
      <div style={{marginBottom: '40px', display:'flex', width:'100%', justifyContent:'space-between'}}>
            <Typography variant='h3'> Invoices</Typography>
            <Link to='create-invoice'><ButtonFilled value='New Invoice' color={TextColor_100} backgroundColor={BlueColor_100} color__hover={BlackColor_75} backgroundColor__hover={BlueColor_50} icon={<Add />}/></Link>
          </div>
          

          <Card elevation={10} sx={{ height: 'fit-content', borderRadius:5, p:0, marginBottom: 5,   '& .MuiCard-root' : {width:'100%'}}}>
    
            <Tabs value={selectedTabInvoices} onChange={handleChangeInvoices} sx={{backgroundColor:BlueColor_25, boxShadow:'0 2px 10px 0px gray'}}>
              <Tab label='ALL'   icon={<TagBlue value={invoices.length} />} iconPosition="end"/> 
              <Tab label='PAID'   icon={<TagGreen value={paidInvoices?.length} />} iconPosition="end"/>
              <Tab label='UNPAID'   icon={<TagYellow value={unpaidInvoices?.length} />} iconPosition="end" />
              <Tab label='OVERDUE'   icon={<TagRed value={overdueInvoices?.length} />} iconPosition="end" />
              <Tab label='DRAFT'   icon={<TagGrey value={draftInvoices.length} />} iconPosition="end" />
            </Tabs>
            <div style={{height:'10px'}}>
                {loading ? <LinearProgress sx={{ color:TextColor_100, width:'100%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
            </div>

            {selectedTabInvoices === 0 && 
              <div style={{paddingLeft:'20px', paddingRight:'20px', paddingTop:'20px'}}> 
              <TextField sx={{marginBottom:'20px'}}
              placeholder='Search invoices'
              onChange={e => setInvoices(e.target.value)}
              fullWidth/>
    
                  <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%'}}>
                    <Typography variant='body1' sx={{width:'20%'}}>Client</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Created</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Due date</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Amount</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Status</Typography>
                  </div>
                  <div>
                    {invoices.slice(0).reverse().map((item, i) => (
                      <>
                      <div style={{display:'flex', justifyContent:'space-between', height:'60px', cursor:'pointer'}}  onClick={(e) => {
                        setId(item._id); handleProceed(e)
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
              
              ))}
                    <div style={{width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'flex-end', alignItems:'center', paddingRight:'5%'}}>
                      <ButtonText value='See all' iconRight={<ArrowForward />}/>
                    </div>
                  </div>
              </div>
            }
              {/* PAID TAB */}
            {selectedTabInvoices === 1 && 
              <div style={{paddingLeft:'20px', paddingRight:'20px', paddingTop:'20px'}}> 
                  
                  <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%'}}>
                    <Typography variant='body1' sx={{width:'20%'}}>Client</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Created</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Due date</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Amount</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Status</Typography>
                  </div>
                  <div>
                    {paidInvoices.slice(0).reverse().map((item) => (
                      <>
                       <div style={{display:'flex', justifyContent:'space-between', height:'60px', cursor:'pointer'}}  onClick={(e) => {
                         setId(item._id); handleProceed(e)
                        }}> 
               
                        
                         <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'20%'}}> 
                           <Typography variant='subtitle2'>{item.customer?.firstName}</Typography>
                           <Typography variant='caption' sx={{color:BlackColor_25}}>INV-{item.invoice}</Typography>
                         </div>
                           <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.createdAt}</Typography>
                           <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.dueDate}</Typography>
                           <Typography variant='caption' sx={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{`$ ${item.totalPrice.toFixed(2)}`}</Typography>
                         <div style={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}> 
                           {item.status === 'paid' ? <TagGreenText value='paid' /> : item.status === 'unpaid' ? <TagYellowText value='unpaid' /> : item.status === 'overdue' ? <TagRedText value='overdue' /> : item.status === 'grey' ? <TagGreyText value='draft' /> : null }
                         </div>
                       </div>
                       <Divider />
   
                       </>
                    )).slice(0,5)}
                    <div style={{width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'flex-end', alignItems:'center', paddingRight:'5%'}}>
                      <ButtonText value='See all' iconRight={<ArrowForward />}/>
                    </div>
                  </div>
              </div>
            }
              {/* UNPAID TAB */}
            {selectedTabInvoices === 2 && 
              <div style={{paddingLeft:'20px', paddingRight:'20px', paddingTop:'20px'}}> 
                  
                  <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%'}}>
                    <Typography variant='body1' sx={{width:'20%'}}>Client</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Created</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Due date</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Amount</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Status</Typography>
                  </div>
                  <div>
                    {unpaidInvoices.slice(0).reverse().map((item) => (
                      <>
                      <div style={{display:'flex', height:'60px', cursor:'pointer'}}  onClick={(e) => {
                        setId(item._id); handleProceed(e)
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
                    <div style={{width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'flex-end', alignItems:'center', paddingRight:'5%'}}>
                      <ButtonText value='See all' iconRight={<ArrowForward />}/>
                    </div>
                  </div>
              </div>
            }
              {/* OVERDUE TAB */}
            {selectedTabInvoices === 3 && 
              <div style={{paddingLeft:'20px', paddingRight:'20px', paddingTop:'20px'}}> 
                  
                  <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%'}}>
                    <Typography variant='body1' sx={{width:'20%'}}>Client</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Created</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Due date</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Amount</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Status</Typography>
                  </div>
                  <div>
                    {overdueInvoices.map((item) => (
                      <>
                       <div style={{display:'flex', justifyContent:'space-between', height:'60px', cursor:'pointer'}}  onClick={(e) => {
                         setId(item._id); handleProceed(e)
                        }}> 
               
                        
                         <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'20%'}}> 
                           <Typography variant='subtitle2'>{item.customer?.firstName}</Typography>
                           <Typography variant='caption' sx={{color:BlackColor_25}}>INV-{item.invoice}</Typography>
                         </div>
                           <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.createdAt}</Typography>
                           <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.dueDate}</Typography>
                           <Typography variant='caption' sx={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{`$ ${item.totalPrice.toFixed(2)}`}</Typography>
                         <div style={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}> 
                           {item.status === 'paid' ? <TagGreenText value='paid' /> : item.status === 'unpaid' ? <TagYellowText value='unpaid' /> : item.status === 'overdue' ? <TagRedText value='overdue' /> : item.status === 'grey' ? <TagGreyText value='draft' /> : null }
                         </div>
                       </div>
                       <Divider />
   
                       </>
              
              )).slice(0,5)}
                    <div style={{width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'flex-end', alignItems:'center', paddingRight:'5%'}}>
                      <ButtonText value='See all' iconRight={<ArrowForward />}/>
                    </div>
                  </div>
              </div>
            }
              {/* DRAFT TAB */}
            {selectedTabInvoices === 4 && 
              <div style={{paddingLeft:'20px', paddingRight:'20px', paddingTop:'20px'}}> 
                  
                  <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%'}}>
                    <Typography variant='body1' sx={{width:'20%'}}>Client</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Created</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Due date</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Amount</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Status</Typography>
                  </div>
                  <div>
                    {draftInvoices.map((item) => (
                      <>
                       <div style={{display:'flex', justifyContent:'space-between', height:'60px', cursor:'pointer'}}  onClick={(e) => {
                         setId(item._id); handleProceed(e)
                        }}> 
               
                        
                         <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'20%'}}> 
                           <Typography variant='subtitle2'>{item.customer?.firstName}</Typography>
                           <Typography variant='caption' sx={{color:BlackColor_25}}>INV-{item.invoice}</Typography>
                         </div>
                           <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.createdAt}</Typography>
                           <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.dueDate}</Typography>
                           <Typography variant='caption' sx={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{`$ ${item.totalPrice.toFixed(2)}`}</Typography>
                         <div style={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}> 
                           {item.status === 'paid' ? <TagGreenText value='paid' /> : item.status === 'unpaid' ? <TagYellowText value='unpaid' /> : item.status === 'overdue' ? <TagRedText value='overdue' /> : item.status === 'grey' ? <TagGreyText value='draft' /> : null }
                         </div>
                       </div>
                       <Divider />
   
                       </>
              
              )).slice(0,5)}
                    <div style={{width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'flex-end', alignItems:'center', paddingRight:'5%'}}>
                      <ButtonText value='See all' iconRight={<ArrowForward />}/>
                    </div>
                  </div>
              </div>
            }
                            

                        
                           
                       
                          
                       
          </Card>
      </Box>
    </Container>
  </>
  )
}

export default Invoices