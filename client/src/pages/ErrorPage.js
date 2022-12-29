import { Typography, Container } from '@mui/material'
import { useRouteError, Outlet } from 'react-router-dom'
import React from 'react'

function ErrorPage() {
    const error = useRouteError();
    console.error(error)

  return (
    <div style={{
      width:'100%',
      height:'100vh',
      display:"flex",
      flexDirection:'column',
      justifyContent:"center",
      alignItems:'center'

    }}>
      <Typography variant='h2'>DAYM IT'S SUCH A BUMMER</Typography>
      <Typography variant='h1'>THE PAGE YOU LOOKING FOR IS 404</Typography>
      <Typography variant='subtitle2'>*{error.statusText || error.message}</Typography>
    </div>

  )
}

export default ErrorPage