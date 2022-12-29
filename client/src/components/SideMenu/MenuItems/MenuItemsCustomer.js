

import {Home, Person, Settings, ListAltTwoTone, Inventory2, People} from '@mui/icons-material'

const color = {color:'white'}

export const MenuItemsCustomer = [
  {
    id: 0, 
    icon: <Home  sx={{color}}/>,
    label: 'HOME',
    route: 'customer-dashboard/home',
  },

  {
    id: 1, 
    icon: <ListAltTwoTone sx={{color}} />,
    label: 'INVOICES',
    route: 'customer-dashboard/invoices',
  },


]