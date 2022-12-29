import React from 'react'
import SideMenu from '../../../components/SideMenu/SideMenu'
import TopMenu from '../../../components/TopMenu/TopMenu'
import ItemList from '../Invertory/ItemsList/ItemList'
import InvertoryExcel from '../Invertory/InvertoryExcel/InvertoryExcel'

function Invertory() {
  return (
    <>
    <SideMenu/>
    <TopMenu 
      tab__1={<ItemList/>} tabName_1='ITEMS'
      tab__2={<InvertoryExcel/>} tabName_2='INVERTORY' 
    />
    </>
  )
}

export default Invertory