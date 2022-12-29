import React, {useEffect, useState}from 'react'
import {Box, Container, Typography, Card, Tabs, Tab, AppBar, Button, TextField, Divider, Avatar} from '@mui/material'
import { BoxStyles, ContainerStyles } from '../../../BoxStyles'
import { Add } from '@mui/icons-material';
import { Link, useNavigate,generatePath } from 'react-router-dom';
import { TextColor_100, BlackColor_100, BlueColor_25, BlackColor_75, BlueColor_100, BlueColor_50, BlackColor_25 } from '../../../../styles/_variables';
import ButtonFilled from '../../../../components/Buttons/ButtonFilled';
import TagGreen from '../../../../components/Tags/NumTags/TagGreen';
import TagYellow from '../../../../components/Tags/NumTags/TagYellow';
import TagRedText from '../../../../components/Tags/TextTags/TagRedText';
import TagGreenText from '../../../../components/Tags/TextTags/TagGreenText'
import TagYellowText from '../../../../components/Tags/TextTags/TagYellowText';
import TagRed from '../../../../components/Tags/NumTags/TagRed';
import axios from 'axios';




function Jobs() {

    const [id, setId] = useState()

    const navigate = useNavigate()
  
    const handleProceed = (e) => {
      id && navigate(generatePath("jobs/:id", {id}))
    }

    const [selectedTab, setSelectedTab] = useState(0)
    const [jobs, setJobs] = useState([])

    const fetchJobs = async() => {
        const {data} = await axios.get('http://localhost:6001/jobs', {withCredentials: true})
        setJobs(data)
    }

    useEffect(()=>{
        fetchJobs()
    }, [])

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  let completedJobsLength = jobs.filter(item => item?.status === 'complete')
  let inProgressJobsLength = jobs.filter(item => item?.status === 'inProgress')

  return (
    <Container > 
        <Box sx={BoxStyles}>
        <div style={{marginBottom: '40px', display:'flex', width:'100%', justifyContent:'space-between'}}>
            <Typography variant='h3'> Jobs</Typography>
            <Link to='createJob'><ButtonFilled value='New Job' color={TextColor_100} backgroundColor={BlueColor_100} color__hover={BlackColor_75} backgroundColor__hover={BlueColor_50} icon={<Add />}/></Link>
          </div>
            
                <Card elevation={5} sx={{ height: '500px', borderRadius:5, p:0, marginBottom: 5, '& .MuiCard-root' : {width:'100%'}}}>
                    <Tabs value={selectedTab} onChange={handleChange} sx={{backgroundColor:BlueColor_25, boxShadow:'0 2px 10px 0px gray'}}>
                        <Tab label='ALL' icon={<TagGreen value={jobs.length} />} iconPosition="end" /> 
                        <Tab label='Completed' icon={<TagGreen value={completedJobsLength.length} />} iconPosition="end" />
                        <Tab label='In Progress' icon={<TagYellow value={inProgressJobsLength.length} />} iconPosition="end"/>
                    </Tabs>

                    

                    {selectedTab === 0 &&
                        <Box sx={{
                            marginTop:'20px',
                            paddingLeft: '20px',
                            paddingRight: '20px'

                        }}>
                            <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%', marginBottom:'20px'}}>
                    <Typography variant='body1' sx={{width:'15%'}}>Tech</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Customer</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Date</Typography>
                    <Typography variant='body1' sx={{width:'30%'}}>Address</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Status</Typography>
                  </div>
                  <div></div>
                            <TextField fullWidth></TextField>
                            <div >
                                {jobs.slice(0).reverse().map((item, index) => (
                                   <>
                                   <div style={{display:'flex', justifyContent:'space-between', height:'60px', cursor:'pointer'}}  onClick={(e) => {
                                     setId(item._id); handleProceed(e)
                                   }}> 
                           
                                    
                                     <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'15%'}}> 
                                       <Typography variant='subtitle2'>{item.employee?.firstName} {item.employee?.lastName}</Typography>
                                     </div>
                                       <Typography variant='subtitle2' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.customer?.firstName} {item.customer?.lastName}</Typography>
                                       <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{new Date(item?.jobDate).toDateString()}</Typography>
                                       <Typography variant='caption' sx={{width:'30%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.customer?.street},{item.customer?.unit}, {item.customer?.city}</Typography>
                                       <Typography variant='caption' sx={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{new Date(item?.jobDate).toDateString()}</Typography>
                                   </div>
                                   <Divider />
               
                                   </>

                                )).slice(0,5)}
                            </div>
                        </Box>
                        
                    } 
                    {selectedTab === 1 && 
                    <Box sx={{
                        marginTop:'20px',
                        paddingLeft: '20px',
                        paddingRight: '20px'

                    }}>
                        <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%', marginBottom:'20px'}}>
                <Typography variant='body1' sx={{width:'15%'}}>Tech</Typography>
                <Typography variant='body1' sx={{width:'15%'}}>Customer</Typography>
                <Typography variant='body1' sx={{width:'20%'}}>Date</Typography>
                <Typography variant='body1' sx={{width:'30%'}}>Address</Typography>
                <Typography variant='body1' sx={{width:'20%'}}>Status</Typography>
              </div>
              <div></div>
                        <TextField fullWidth></TextField>
                        <div >
                            {completedJobsLength.slice(0).reverse().map((item, index) => (
                               <>
                               <div style={{display:'flex', justifyContent:'space-between', height:'60px', cursor:'pointer'}}  onClick={(e) => {
                                 setId(item._id); handleProceed(e)
                               }}> 
                       
                                
                                 <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'15%'}}> 
                                   <Typography variant='subtitle2'>{item.employee?.firstName} {item.employee?.lastName}</Typography>
                                 </div>
                                   <Typography variant='subtitle2' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.customer?.firstName} {item.customer?.lastName}</Typography>
                                   <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{new Date(item?.jobDate).toDateString()}</Typography>
                                   <Typography variant='caption' sx={{width:'30%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.customer?.street},{item.customer?.unit}, {item.customer?.city}</Typography>
                                   <Typography variant='caption' sx={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{new Date(item?.jobDate).toDateString()}</Typography>
                               </div>
                               <Divider />
           
                               </>

                       
                            )).slice(0,5)}
                        </div>
                    </Box>
                    }
                    {selectedTab === 2 && 
                        <Box sx={{
                            marginTop:'20px',
                            paddingLeft: '20px',
                            paddingRight: '20px'

                        }}>
                            <div style={{backgroundColor:BlueColor_25, width:'100%', height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%', marginBottom:'20px'}}>
                    <Typography variant='body1' sx={{width:'15%'}}>Tech</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Customer</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Date</Typography>
                    <Typography variant='body1' sx={{width:'30%'}}>Address</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Status</Typography>
                  </div>
                  <div></div>
                            <TextField fullWidth></TextField>
                            <div >
                                {inProgressJobsLength.slice(0).reverse().map((item, index) => (
                                   <>
                                   <div style={{display:'flex', justifyContent:'space-between', height:'60px', cursor:'pointer'}}  onClick={(e) => {
                                     setId(item._id); handleProceed(e)
                                   }}> 
                           
                                    
                                     <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'15%'}}> 
                                       <Typography variant='subtitle2'>{item.employee?.firstName} {item.employee?.lastName}</Typography>
                                     </div>
                                       <Typography variant='subtitle2' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.customer?.firstName} {item.customer?.lastName}</Typography>
                                       <Typography variant='caption' sx={{width:'15%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{new Date(item?.jobDate).toDateString()}</Typography>
                                       <Typography variant='caption' sx={{width:'30%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{item.customer?.street},{item.customer?.unit}, {item.customer?.city}</Typography>
                                       <Typography variant='caption' sx={{width:'20%', display:'flex', justifyContent:'flex-start', alignItems:'center'}}>{new Date(item?.jobDate).toDateString()}</Typography>
                                   </div>
                                   <Divider />
               
                                   </>

                                )).slice(0,5)}
                            </div>
                        </Box>
                    }
                    
                    
                </Card>

                
        </Box>
    </Container>
  )
}

export default Jobs