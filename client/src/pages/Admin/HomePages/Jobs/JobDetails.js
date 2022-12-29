import React, {useState, useEffect} from 'react'
import { Container, Card, Typography, Button, Box, TextField, FormControl, InputLabel, OutlinedInput, Modal, Divider, LinearProgress, Breadcrumbs } from '@mui/material'
import { Add, Delete, AddBox, Clear } from '@mui/icons-material';
import { BlueColor_100, BlueColor_25, RedColor_75, TextColor_100, RedColor_100, RedColor_50, BlackColor_100, BlackColor_25, BlueColor_50, GreenColor_100, GreenColor_50 } from '../../../../styles/_variables';
import ButtonText from '../../../../components/Buttons/ButtonText';
import ButtonFilled from '../../../../components/Buttons/ButtonFilled';
import Logo from '../../../../assets/onboardittech_logo.png'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ContainerStyles } from '../../../BoxStyles'
import axios from 'axios';

function JobDetails() {
    const history =useNavigate()
    const {id} = useParams()
    const [job, setJob] = useState([])
    const [loading, setLoading] = useState(false)

    
  
    const fetchJob = async () => {
        const data = await axios.get(`http://localhost:6001/jobs/${id}`, {withCredentials: true})
        setJob(data.data)
        console.log(job)
    }

    const handleDelete = async() => {
        const deleteInvoice = await axios
            .delete(`http://localhost:6001/jobs/${id}`,
                    {withCredentials: true})
            .then(history(-1))

    }
    const handleComplete = async() => {
        const deleteInvoice = await axios
            .patch(`http://localhost:6001/jobs/${id}`,{
                    status: 'complete'
            },
                    {withCredentials: true})
            .then(history(-1))

    }
    


    useEffect(()=> {
        fetchJob()
        
    }, [id])



  return (
    <Container sx={ContainerStyles}>
        <Container sx={{width:'100%' }}>
            <Typography variant='h2'>Job details</Typography>
            <Breadcrumbs sx={{marginBottom:'10px'}}>
                <Link to='/employee-dashboard/admin/invertory'><Typography sx={{color:BlueColor_50}}>Invertory</Typography></Link>
            <Typography >Add new item</Typography>
            </Breadcrumbs>
        <Box 
           
            sx={{marginTop:'40px', display:'flex', alignItems:'center', flexDirection:'column'}}
        >
        <Card elevation={10} sx={{p:'25px', borderRadius:'10px', height:'500px', width:'100%' }}>
            <div style={{width: '100%', height: '90%', display:'flex',flexDirection:'column', alignItems:'start' }}>
                <div style={{width: '100%', height:'40%', display: 'flex'}}>
                    <div style={{marginRight:'auto'}}>
                    <Typography variant='h3'>{job.customer?.firstName + ' ' + job.customer?.lastName}</Typography>
                    <Typography variant='subtitle2'>{job.customer?.email}</Typography>
                    <Typography variant='subtitle2'>{job.customer?.primaryPhoneNumber}</Typography>
                    <Typography variant='subtitle2'>INV-{job.invoice?.invoice}</Typography>
                    </div>
                    <div style={{marginRight: 'auto'}}>
                    <Typography variant='h5'>{job.customer?.street + ',' + job.customer?.unit}</Typography>
                    <Typography variant='h5'>{job.customer?.city + ',' + job.customer?.state}</Typography>
                    <Typography variant='h5'>{job.customer?.zip}</Typography>
                    
                    </div>
                    <div style={{display:'felx', flexDirection: 'column'}}>
                    <Typography variant='h5'>Start date: {new Date(job.startJobDate).toDateString()}</Typography>
                    <Typography variant='h5'>End date: {new Date(job.endJobDate).toDateString()}</Typography>
                    </div>
                    <div style={{display:'felx', flexDirection: 'column'}}>
                    <Typography variant='h5'>Notes: {job.notes}</Typography>
                    </div>
                </div>
                <div style={{width: '100%', height:'29%'}}>
                    <div style={{width: '100%', height:'40%', display: 'flex'}}>
                    <div style={{marginRight:'auto'}}>
                    <Typography variant='h3'>{job.employee?.firstName + ' ' + job.employee?.lastName}</Typography>
                    <Typography variant='subtitle2'>INV-{job.invoice?.invoice}</Typography>
                    </div>
                    <div style={{marginRight: 'auto'}}>
                    <Typography variant='h5'>{job.employee?.email}</Typography>
                    <Typography variant='h5'>{job.employee?.primaryPhoneNumber}</Typography>
                    </div>
                    
                    </div>
                </div>
            </div>
            <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                <Button variant='contained' sx={{
                    backgroundColor: GreenColor_100,
                    ':hover':{
                        backgroundColor:GreenColor_50,
                        color: BlackColor_100
                    }
                }} onClick={handleComplete}>COMPLETE</Button>
                <Button variant='contained'sx={{
                    backgroundColor: RedColor_100,
                    ':hover':{
                        backgroundColor:RedColor_50,
                        color: BlackColor_100
                    }
                }} onClick={handleDelete}>CANCEL JOB</Button>
            </div>
        </Card> 
            {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
        </Box>
    </Container>

    </Container>
  )  
  
}

export default JobDetails