import React, {useState, useEffect} from 'react'
import PdfRender from '../../../../../components/PdfRender'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function EstimatePdf() {

const {id} = useParams()
  const [invoice, setInvoice] = useState([])
  
  
  //get invoice details 
  
  const fetchInvoice = async()=> {
    const {data} = await axios.get(`http://localhost:6001/estimates/myEstimates/${id}`, {withCredentials:true})
    setInvoice(data)
  }

    useEffect(()=>{
        fetchInvoice()
      }, [id])
    

  return (
    <div>
        <PdfRender  item={invoice}/>
    </div>
  )
}

export default EstimatePdf