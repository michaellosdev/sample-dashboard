import React from 'react'
import SideMenu from '../../../components/SideMenu/SideMenu'
import TopMenu from '../../../components/TopMenu/TopMenu'
import EmployeeList from '../Employees/EmployeeList/EmployeeList'
import AddAnEmployee from '../Employees/AddAnEmployee/AddAnEmployee'

function Employees() {
  return (
    <>
    <TopMenu 
      tab__1={<EmployeeList />} tabName_1='Employee List'
      tab__2={<AddAnEmployee />} tabName_2='Add'
    />
    </>

  )
}

export default Employees