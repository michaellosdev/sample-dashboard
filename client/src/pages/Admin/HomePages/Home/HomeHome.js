import React from 'react'
import {Box, Card, Container, Typography, Checkbox, Avatar, Divider, Button, CssBaseline} from '@mui/material'
import { ArrowForward, Delete, Edit } from '@mui/icons-material'
import { Outlet } from 'react-router-dom'
import HomeData from '../HomeData.json'
import ButtonText from '../../../../components/Buttons/ButtonText'
import { BoxStyles, ContainerStyles } from '../../../BoxStyles'
import { BlackColor_50, RedColor_50 } from '../../../../styles/_variables'
import AddEventForm from '../../../../components/Forms/AddEventForm'


function HomeHome() {
  return (


    <Container >

        <Box sx={BoxStyles}> 
            
            

            <Typography variant='h3' sx={{marginBottom: 5}}> Welcome Back, John</Typography>
            
                

                <Card elevation={10} sx={{  height: '400px', borderRadius:5, p:3, marginBottom: 5, '& .MuiCard-root' : {width:'100%'}}}>
                    <div>
                        <Box sx={{marginBottom: 5}}> 
                            <Typography variant='h4'> Jobs in progress </Typography>
                        </Box>
                        <Box> 
                            {HomeData.Jobs.map((item, index) =>(
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}> 
                                    <div style={{display:'flex', alignItems:'center'}}> 
                                        <Avatar></Avatar>
                                        <Typography> {item.techName} </Typography>
                                    </div>
                                    <Typography>{item.jobDescription}</Typography>
                                    <Typography>{item.date}</Typography>
                                </div>
                            )).slice(0,5)}
                        </Box>
                        <Divider />
                        <Box sx={{width: '100%', display:'flex', justifyContent:'flex-end'}}> 
                            <ButtonText value="see all" iconRight={<ArrowForward />}/>
                        </Box>
                    </div> 
                </Card>

               
            

           
                <div style={{display:'flex', justifyContent: 'space-between'}}>


            
                <Card elevation={10} sx={{width:'49%', height: '400px', borderRadius:5, p:3, marginBottom: 5, marginRight:'1%', '& .MuiCard-root' : {width:'49%'}}}>
                    <div>
                        <Box sx={{marginBottom: 5}}> 
                            <Typography variant='h4'> TODO List </Typography>
                        </Box>
                        <Box> 
                            {HomeData.todoList.map((item, index) =>(
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}> 
                                    <Checkbox />
                                    <Typography>{item.todo}</Typography>
                                    <Typography>{item.date}</Typography>
                                </div>
                            )).slice(0,5)}
                        </Box>
                        <Divider />
                        <Box sx={{width: '100%', display:'flex', justifyContent:'flex-end'}}> 
                            <ButtonText value="see all" iconRight={<ArrowForward />}/>
                        </Box>
                    </div> 
                </Card>
                                
                <Card elevation={10} sx={{width:"49%", height: '400px', borderRadius:5, p:3, marginBottom: 5, marginLeft:'1%', '& .MuiCard-root' : {width:'49%'}}}>
                    <div>
                        <Box sx={{marginBottom: 5}}> 
                            <Typography variant='h4'> TODO List </Typography>
                        </Box>
                        <Box> 
                            {HomeData.todoList.map((item, index) =>(
                                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10}}> 
                                    <Checkbox />
                                    <Typography>{item.todo}</Typography>
                                    <div> 
                                        <Button sx={{color:BlackColor_50}}><Edit /></Button>
                                        <Button sx={{color:RedColor_50}}><Delete /></Button>
                                    </div>
                                </div>
                            )).slice(0,5)}
                        </Box>
                        <Divider />
                        <Box sx={{width: '100%', display:'flex', justifyContent:'flex-end'}}> 
                            <ButtonText value="see all" iconRight={<ArrowForward />}/>
                        </Box>
                    </div> 
                </Card>

                </div>

           
              
        
        </Box>

    </Container>

  )
}

export default HomeHome