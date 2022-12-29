import React from 'react'
import TopMenu from '../../../components/TopMenu/TopMenu'

import JobsTech from './JobsTech'
import JobsCustomer from './JobsTech'

function HomeTechJobs() {
  return (
    <>
    {/* <SideMenu /> */}
    <TopMenu 
      tab__1={<JobsTech />} tabName_1='JOBS'
      // tab__3={<Mail />} tabName_3='MAIL' 
      // tab__4={<ToDoList />} tabName_4='TODO LIST' 
    />
    </>
  )
}

export default HomeTechJobs