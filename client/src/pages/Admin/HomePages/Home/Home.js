import React from 'react'
import SideMenu from '../../../../components/SideMenu/SideMenu'
import TopMenu from '../../../../components/TopMenu/TopMenu'
import HomeHome from './HomeHome'
import Jobs from '../Jobs/Jobs'
import Mail from '../Mail/Mail'
import ToDoList from '../ToDoList/ToDoList'
import FormsTest from '../../../../components/Forms/FormsTest'
import CalendarPage from '../CalendarPage'

function Home() {
  return (
    <>
    {/* <SideMenu /> */}
    <TopMenu 
      tab__1={<CalendarPage />} tabName_1='CALENDAR'
      tab__2={<Jobs />} tabName_2='JOBS' 
      // tab__3={<Mail />} tabName_3='MAIL' 
      // tab__4={<ToDoList />} tabName_4='TODO LIST' 
    />
    </>
  )
}

export default Home