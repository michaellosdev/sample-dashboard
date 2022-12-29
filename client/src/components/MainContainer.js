import { Box } from '@mui/material'
import React from 'react'
import TopMenu from './TopMenu/TopMenu'

function MainContainer() {
  return (
    <Box sx={{
        width: 'calc(100% - 250px)',
        height: 'fit-content',
        margin: '100px'
    }}>
      <TopMenu />

    </Box>
  )
}

export default MainContainer