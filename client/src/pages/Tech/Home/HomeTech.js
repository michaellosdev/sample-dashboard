import React from 'react'
import TopMenu from '../../../components/TopMenu/TopMenu'
import CalendarPageTech from './CalendarPageTech'
import CalendarPageCustomer from './CalendarPageTech'
import JobsTech from '../Jobs/JobsTech'
import JobsCustomer from '../Jobs/JobsTech'

function HomeTech() {
  return (
    <>
    {/* <SideMenu /> */}
    <TopMenu 
      tab__1={<CalendarPageTech />} tabName_1='CALENDAR'
      // tab__3={<Mail />} tabName_3='MAIL' 
      // tab__4={<ToDoList />} tabName_4='TODO LIST' 
    />
    </>
  )
}

export default HomeTech