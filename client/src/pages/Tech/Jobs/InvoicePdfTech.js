import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PdfRenderTech from './PdfRenderTech'


function InvoicePdfTech() {

const {invID} = useParams()
  const [invoice, setInvoice] = useState([])
  
  
  //get invoice details 
  
  const fetchInvoice = async()=> {
    const {data} = await axios.get(`http://localhost:6001/myInvoices/${invID}`, {withCredentials:true})
    setInvoice(data)
  }

    useEffect(()=>{
        fetchInvoice()
      }, [invID])
    

  return (
    <div>
        <PdfRenderTech  item={invoice}/>
    </div>
  )
}

export default InvoicePdfTech