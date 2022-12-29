import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../../../components/SideMenu/SideMenu'
import TopMenu from '../../../components/TopMenu/TopMenu'
import Chat from './Chat/Chat'
import CustomerList from './CustomerList/CustomerList'

function CRM() {
  return (
    <>
    <SideMenu/>
    <Outlet />
    <TopMenu 
      tab__1={<CustomerList />} tabName_1='CUSTOMERS' hrefTab_1='/invoices/home'
      // tab__2={<Chat />} tabName_2='CHAT'
    />
    </>
  )
}

export default CRM