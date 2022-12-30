import React, { useRef, useState, useEffect } from 'react'
import { Container, Box, Typography, Card, Divider } from '@mui/material'
import { Add, DocumentScanner, DoneAll, AccessTime, NotificationImportant, ContentPaste, ArrowForward } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {BoxStyles, ContainerStyles} from '../../../BoxStyles'
import ButtonFilled from '../../../../components/Buttons/ButtonFilled'
import {TextColor_100, BlueColor_100, BlackColor_75, BlueColor_50, BlueColor_75, BlackColor_50, GreenColor_75, YellowColor_75, RedColor_75} from '../../../../styles/_variables'
import InvoicesData from '../Invoices/InvoicesData.json'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import {CChart} from '@coreui/react-chartjs'
import axios from 'axios'


function Accounting() {
  const [invoices, setInvoices] = useState([])
  
  const fetchInvoices = async () => {
    const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/invoices`, {withCredentials:true})
    
    setInvoices(data)
  }

  useEffect(()=>{
    fetchInvoices()
  }, [])

  let paidInvoices = invoices.filter(item => item.status === 'paid') 
  let unpaidInvoices = invoices.filter(item => item.status === 'unpaid') 
  let overdueInvoices = invoices.filter(item => item.status === 'overdue') 
  let draftInvoices = invoices.filter(item => item.status === 'draft') 

  
  const totalPaid = paidInvoices.map(id => {return id.totalPrice})

  const totalInvoices = invoices.map(id => {return id.totalPrice}).splice(0,7)
  console.log(totalPaid)


  return (
    <Container>
      <Box sx={BoxStyles}>
      <div style={{marginBottom: '40px', display:'flex', width:'100%', justifyContent:'space-between'}}>
            <Typography variant='h3'> Accounting</Typography>
            {/* <Link to='invoices/createInvoice'><ButtonFilled value='New Invoice' color={TextColor_100} backgroundColor={BlueColor_100} color__hover={BlackColor_75} backgroundColor__hover={BlueColor_50} icon={<Add />}/></Link> */}
          </div>

          <Card elevation={10} sx={{ height: '100px', borderRadius:5, p:3, marginBottom: 2, display:'flex', justifyContent:'space-between',  '& .MuiCard-root' : {width:'100%'}}}>
            {/* total invoices box */}
            <div style={{width:'20%', display:'flex', justifyContent:'center', alignItems:'center'}}>
              <DocumentScanner sx={{mr:2, color:BlueColor_75}}/>
              <div>
                <Typography variant='subtitle2'>Total </Typography>
                <Typography variant='caption'>{invoices.length} <Typography variant='caption' sx={{color:BlackColor_50}}>invoices</Typography></Typography>
                <Typography variant='subtitle2'>{`$ ${invoices.reduce((partialSum, a )=> partialSum + a.totalPrice, 0).toFixed(2)}`} </Typography>
              </div>
            </div>
              <Divider orientation='vertical' flexItem />
              {/* Paid invoices box */}
            <div style={{width:'20%', display:'flex', justifyContent:'center', alignItems:'center'}}>
              <DoneAll  sx={{mr:2, color:GreenColor_75}}/>
              <div>
                <Typography variant='subtitle2'>Paid </Typography>
                <Typography variant='caption'>{paidInvoices.length} <Typography variant='caption' sx={{color:BlackColor_50}}>invoices</Typography></Typography>
                <Typography variant='subtitle2'>{`$ ${paidInvoices.reduce((partialSum, a )=> partialSum + a.totalPrice, 0).toFixed(2)}`} </Typography>
              </div>
            </div>
              <Divider orientation='vertical' flexItem />
              {/* unpaid invoices box */}
            <div style={{width:'20%', display:'flex', justifyContent:'center', alignItems:'center'}}>
              <AccessTime sx={{mr:2, color:YellowColor_75}}/>
              <div>
                <Typography variant='subtitle2'>Unpaid </Typography>
                <Typography variant='caption'>{unpaidInvoices.length} <Typography variant='caption' sx={{color:BlackColor_50}}>invoices</Typography></Typography>
                <Typography variant='subtitle2'>{`$ ${unpaidInvoices.reduce((partialSum, a )=> partialSum + a.totalPrice, 0).toFixed(2)}`} </Typography>
              </div>
            </div>
              <Divider orientation='vertical' flexItem />
              {/* overdue invoices box */}
            <div style={{width:'20%', display:'flex', justifyContent:'center', alignItems:'center'}}>
              <NotificationImportant sx={{mr:2, color:RedColor_75}}/>
              <div>
                <Typography variant='subtitle2'>Overdue </Typography>
                <Typography variant='caption'>{overdueInvoices.length} <Typography variant='caption' sx={{color:BlackColor_50}}>invoices</Typography></Typography>
                <Typography variant='subtitle2'>{`$ ${overdueInvoices.reduce((partialSum, a )=> partialSum + a.totalPrice, 0).toFixed(2)}`} </Typography>
              </div>
            </div>
              <Divider orientation='vertical' flexItem />
              {/* draft invoices box */}
            <div style={{width:'20%', display:'flex', justifyContent:'center', alignItems:'center'}}>
              <ContentPaste sx={{mr:2, color:BlackColor_75}}/>
              <div>
                <Typography variant='subtitle2'>Draft </Typography>
                <Typography variant='caption'>{draftInvoices.length} <Typography variant='caption' sx={{color:BlackColor_50}}>invoices</Typography></Typography>
                <Typography variant='subtitle2'>{`$ ${draftInvoices.reduce((partialSum, a )=> partialSum + a.totalPrice, 0).toFixed(2)}`} </Typography>
              </div>
            </div>
          </Card>
          

          <Card elevation={10} sx={{ height: '750px', borderRadius:5, p:5, marginBottom: 5,   '& .MuiCard-root' : {width:'100%'}}}>
          <CChart
  type="line" 
  data={{
    labels: ["Monday", "Tueseday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: 'Paid Invoices',
        backgroundColor: "rgba(220, 220, 220, 0.2)",
        borderColor: "rgba(220, 220, 220, 1)",
        pointBackgroundColor: "rgba(220, 220, 220, 1)",
        pointBorderColor: "#fff",
        data: [...totalPaid],
        tension:0.2
      },
      {
        label: "Total invoices",
        backgroundColor: "rgba(151, 187, 205, 0.2)",
        borderColor: "rgba(151, 187, 205, 1)",
        pointBackgroundColor: "rgba(151, 187, 205, 1)",
        pointBorderColor: "#fff",
        data: [...totalInvoices],
        tension:0.2
      },
    ],
  }}
/>
           </Card>
      </Box>
    </Container>
  )
}

export default Accounting