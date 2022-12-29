import React, {useState, useEffect} from 'react'
import CustomerData from '../CustomersData.json'
import { BrowserRouter as Router, useNavigate, generatePath, Link } from 'react-router-dom'
import {Box, Container, Typography, Tab, Tabs, Card, TextField, Button, Checkbox, Divider, LinearProgress} from '@mui/material'
import {Add, AddBox, CheckBox, Edit, ViewAgenda} from '@mui/icons-material'
import {ContainerStyles, BoxStyles} from '../../../BoxStyles'
import ButtonFilled from '../../../../components/Buttons/ButtonFilled'
import {TextColor_100, BlueColor_100, BlackColor_75, BlueColor_50, BlueColor_25, BlackColor_25} from '../../../../styles/_variables'
import TagRed from '../../../../components/Tags/NumTags/TagRed'
import TagRedText from '../../../../components/Tags/TextTags/TagRedText'
import CreateCustomer from '../CreateCustomer/CreateCustomer'
import axios from 'axios'



function CustomerList() {
    
    //data fetch \
    const [loading, setLoading] = useState(false)
    const [dbCustomers, setDbCustomers] = useState([])
    const [id, setId] = useState('')

const fetchCustomers = async () => {
    setLoading(true)
    const {data} = await axios.get('http://localhost:6001/customers', {withCredentials:true})
  
    setDbCustomers(data)
    setLoading(false)
  }
  
  console.log(dbCustomers)
  
  useEffect(()=>{
    fetchCustomers()
  }, [])

const [selectedTab, setSelectedTab] = useState(0)

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  let flaggedCustomers = dbCustomers.filter(item => item.flagged === true)


  const navigate = useNavigate()


    const handleProceed = async (e) => {
        id && navigate(generatePath(":id", {id}))
    }




  return (
    <Container>
        <Box  sx={BoxStyles}>
            <div style={{marginBottom: '40px', display:'flex', width:'100%', justifyContent:'space-between'}}>
                <Typography variant='h3'> Customer List</Typography>
               <Link to='create-customer'> <ButtonFilled value='Add Customer' color={TextColor_100} backgroundColor={BlueColor_100} color__hover={BlackColor_75} backgroundColor__hover={BlueColor_50} icon={<AddBox />} /> </Link>
            </div>
        
        <Card elevation={10} sx={{ height: 'fit-content', borderRadius:5, p:0, marginBottom: 5,   '& .MuiCard-root' : {width:'100%'}}}>
    
            <Tabs value={selectedTab} onChange={handleChange} sx={{backgroundColor:BlueColor_25, boxShadow:'0 2px 10px 0px gray'}}>
                <Tab label='ALL' /> 
                <Tab label='PAID'   icon={<TagRed value={flaggedCustomers.length} />} iconPosition="end"/>
            </Tabs>
                {loading ? <LinearProgress sx={{ color:TextColor_100, width:'100%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}

        {/* ALL CUSTOMERS TAB */}
            {selectedTab === 0 && 
                <div style={{padding:'20px'}}>
                    <TextField fullWidth/>
                    <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%',paddingRight:'5%', marginTop:'20px'}}>
                        <Typography variant='body1' sx={{width:'20%'}}>Name</Typography>
                        <Typography variant='body1' sx={{width:'40%'}}>Address</Typography>
                        <Typography variant='body1' sx={{width:'30%'}}>Phone</Typography>
                        <Typography variant='body1' sx={{width:'10%'}}>Action</Typography>
                    </div>
                    {dbCustomers.slice(0).reverse().map((item) => (
                        <>
                        <div style={{display:'flex', alignItems:'center', height:'60px', cursor: 'pointer', padding:"0 20px"}} id={item._id} onClick={(e) => {
                           setId(item._id) ;handleProceed(e);
                        }
                            
                            }> 
                            <div style={{display:'flex', flexDirection:'column', width:'20%'}}>
                                <Typography variant='subtitle2'>{`${item.firstName} ${item.lastName}`} </Typography>
                                <Typography variant='caption' sx={{color:BlackColor_25}}> {item.company}</Typography>
                            </div>
                            <Typography variant='subtitle2' sx={{width:'30%'}}> {!item.street && !item.unit ? 'No address on file' : `${item?.street},${item?.unit},${item?.city}`}</Typography>
                            <div style={{width:'10%'}}></div>
                            <Typography variant='subtitle2' sx={{width:'25%'}}>{item.primaryPhoneNumber} </Typography>
                            <div style={{display:'flex', width:'10%', paddingRight:'5%'}}>
                                <Button sx={{color:BlackColor_75}} ><Edit /></Button>
                                <Button sx={{color:BlackColor_75}}><ViewAgenda /></Button>
                            </div>
                            
                        </div>
                        <Divider />
                        </>
                    ))}
                </div>
            }
        {/* FLAGGED CUSTOMERS TAB */}
            {selectedTab === 1 && 
                <div style={{padding:'20px'}}>
                <TextField fullWidth/>
                <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%',paddingRight:'5%', marginTop:'20px'}}>
                        <Typography variant='body1' sx={{width:'20%'}}>Name</Typography>
                        <Typography variant='body1' sx={{width:'40%'}}>Address</Typography>
                        <Typography variant='body1' sx={{width:'30%'}}>Phone</Typography>
                        <Typography variant='body1' sx={{width:'10%'}}>Action</Typography>
                    </div>
                {flaggedCustomers.map((item) => (
                    <>
                    <div style={{display:'flex', alignItems:'center', height:'60px', cursor: 'pointer', padding:"0 20px"}} id={item._id} onClick={(e) => {
                           setId(item._id) ;handleProceed(e);
                        }
                            
                            }> 
                        <div style={{display:'flex', flexDirection:'column', width:'20%'}}>
                            <Typography variant='subtitle2'>{item.firstName} </Typography>
                            <Typography variant='caption' sx={{color:BlackColor_25}}> {`${item.city}, ${item.state}`}</Typography>
                        </div>
                        <Typography variant='subtitle2' sx={{width:'27%'}}> {!item.street && !item.unit ? 'No address on file' : `${item?.street},${item?.unit},${item?.city}`}</Typography>
                        <div style={{width:'10%'}}><TagRedText value='flagged' /></div>
                        <Typography variant='subtitle2' sx={{width:'25%'}}>{item.primaryPhoneNumber} </Typography>
                        <div style={{display:'flex', width:'10%', paddingRight:'5%'}}>
                            <Button sx={{color:BlackColor_75}}><Edit /></Button>
                            <Button sx={{color:BlackColor_75}}><ViewAgenda /></Button>
                        </div>
                        
                    </div>
                    <Divider />
                    </>
                ))}
            </div>
            
            }
      

                
                   
               
                  
               
        </Card>

        
        </Box>
    </Container>
  )
}

export default CustomerList