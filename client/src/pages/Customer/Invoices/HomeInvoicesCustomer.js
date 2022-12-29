import React from 'react'
import SideMenu from '../../../components/SideMenu/SideMenu'
import TopMenu from '../../../components/TopMenu/TopMenu'
import EstimatesCustomer from '../Estimates/EstimatesCustomer'
import InvoicesCustomer from './InvoicesCustomer'


function InvoicesPages() {
  return (
    <>
    
    <TopMenu 
      tab__1={<InvoicesCustomer/>} tabName_1='INVOICES'
      tab__2={<EstimatesCustomer/>} tabName_2='ESTIMATES' 
    />
    </>
  )
}

export default InvoicesPages