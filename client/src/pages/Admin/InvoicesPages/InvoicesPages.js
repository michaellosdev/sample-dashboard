import React from 'react'
import SideMenu from '../../../components/SideMenu/SideMenu'
import TopMenu from '../../../components/TopMenu/TopMenu'
import Invoices from './Invoices/Invoices'
import Estimates from './Estimates/Estimates'
import Accounting from './Accounting/Accounting'
import HomePageInvoices from './HomePageInvoices/HomePageInvoices'


function InvoicesPages() {
  return (
    <>
    
    <TopMenu 
      tab__1={<HomePageInvoices/>} tabName_1='HOME'
      tab__2={<Invoices/>} tabName_2='INVOICES' 
      tab__3={<Estimates />} tabName_3='ESTIMATES' 
      tab__4={<Accounting/>} tabName_4='ACCOUNTING' 
    />
    </>
  )
}

export default InvoicesPages