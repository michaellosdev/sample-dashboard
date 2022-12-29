import React from 'react'
import TopMenu from '../../../components/TopMenu/TopMenu'
import CalendarPageCustomer from './CalendarPage'
import JobsCustomer from './JobsCustomer'

function HomeCustomer() {
  return (
    <>
    {/* <SideMenu /> */}
    <TopMenu 
      tab__1={<CalendarPageCustomer />} tabName_1='CALENDAR'
      tab__2={<JobsCustomer />} tabName_2='JOBS' 
      // tab__3={<Mail />} tabName_3='MAIL' 
      // tab__4={<ToDoList />} tabName_4='TODO LIST' 
    />
    </>
  )
}

export default HomeCustomer