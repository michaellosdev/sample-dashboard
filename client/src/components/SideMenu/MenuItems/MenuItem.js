// import React from 'react'
// import {List, ListItem, ListItemIcon, ListItemText, ListItemButton} from '@mui/material'
// import {Home} from '@mui/icons-material'
// import { TextColor_100 } from '../../../styles/_variables'

// function MenuItem(props) {
//   return (
//     <ListItem key={props.MenuItemName} disablePadding>
//                 <ListItemButton>
//                     <ListItemIcon sx={{color: TextColor_100}}> 
//                         {props.iconName} 
//                     </ListItemIcon > 
//                     <ListItemText primary={props.MenuItemName} />
//                 </ListItemButton>
//             </ListItem>
//   )
// }

// export default MenuItem

import {Home, Person, Settings, ListAltTwoTone, Inventory2, People} from '@mui/icons-material'

const color = {color:'white'}

export const MenuItems = [
  {
    id: 0, 
    icon: <Home  sx={{color}}/>,
    label: 'HOME',
    route: 'employee-dashboard/admin/home',
  },

  {
    id: 1, 
    icon: <ListAltTwoTone sx={{color}} />,
    label: 'INVOICES',
    route: 'employee-dashboard/admin/invoices',
  },

  {
    id: 2, 
    icon: <Person sx={{color}} />,
    label: 'CRM',
    route: 'employee-dashboard/admin/crm',
  },

  {
    id: 3, 
    icon: <Inventory2 sx={{color}} />,
    label: 'INVERTORY',
    route: 'employee-dashboard/admin/invertory',
  },

  {
    id: 4, 
    icon: <People sx={{color}}/>,
    label: 'EMPLOYEES',
    route: 'employee-dashboard/admin/employees',
  }


]