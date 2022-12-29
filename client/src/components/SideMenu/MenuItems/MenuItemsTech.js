

import {Home, Person, Settings, ListAltTwoTone, Inventory2, People, Work} from '@mui/icons-material'

const color = {color:'white'}

export const MenuItemsTech = [
  {
    id: 0, 
    icon: <Home  sx={{color}}/>,
    label: 'HOME',
    route: 'employee-dashboard/tech/home',
  },

  {
    id: 1, 
    icon: <Work sx={{color}} />,
    label: 'JOBS',
    route: 'employee-dashboard/tech/jobs',
  },


]