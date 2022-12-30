import React, {useState,  useRef, useEffect} from 'react'
import { Container, Box, Card, Typography, TextField, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material'
import { Download, ExpandMore } from '@mui/icons-material'
import { AddBox } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import {ContainerStyles, BoxStyles} from '../../../BoxStyles'
import ButtonFilled from '../../../../components/Buttons/ButtonFilled'
import {TextColor_100, BlueColor_100, BlackColor_75, BlueColor_25, BlueColor_50, BlackColor_100, TextColor_50} from '../../../../styles/_variables'
import ItemsData from './ItemsData.json'
import { useNavigate, generatePath } from 'react-router-dom'
import axios from 'axios'



function ItemList() {
  const [items, setItems] = useState([])
  const [id, setId] = useState('')

  const fetchItems = async()=> {
    const {data} = await axios.get(`${process.env.REACT_APP_DEPLOY_URL}/items`, {withCredentials: true})
    setItems(data)
  }
  useEffect(()=>{
    fetchItems()
  }, [])


  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useNavigate()


    const handleProceed = async (e) => {
        id && navigate(generatePath("edit-item/:id", {id}))
    }

  const search = useRef(null)

  return (
    <Container >
      <Box sx={BoxStyles}>
        <div style={{marginBottom: '40px', display:'flex', width:'100%', justifyContent:'space-between'}}>
            <Typography variant='h3'> Items</Typography>
            <Link to='create-item'><ButtonFilled value='Add an item' color={TextColor_100} backgroundColor={BlueColor_100} color__hover={BlackColor_75} backgroundColor__hover={BlueColor_50} icon={<AddBox />} /></Link>
          </div>

        <Card elevation={10} sx={{ height: '2000px', borderRadius:5, p:0, marginBottom: 2, display:'flex', flexDirection:'column',   '& .MuiCard-root' : {width:'100%'}}}>
          
          <div style={{height:'70px', width: '100%', paddingRight: '20px', backgroundColor: BlueColor_25, boxShadow:'0 2px 10px 0px gray', display: 'flex', justifyContent:'end'}}> 
              <ButtonFilled value='export' backgroundColor={TextColor_100} color={BlackColor_100} icon={<Download/>} backgroundColor__hover={TextColor_50} />
          </div>
          <div style={{ margin:'20px'}}>
            <TextField fullWidth ref={search}/>

            <div style={{backgroundColor:BlueColor_25, height:'60px', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%', marginTop:'20px'}}>
                    <Typography variant='body1' sx={{width:'20%'}}>Name</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Cost</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>Price</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>Qty</Typography>
            </div>
          </div>

          <div> 
            {items.map((item, index) => (
              <Accordion expanded={expanded === item._id} onChange={handleChange(item._id)}>
                <AccordionSummary 
                  expandIcon={<ExpandMore />}
                >
                  <div style={{ height:'30px', width:'100%', borderRadius: '5px', display:'flex',justifyContent:'space-between', alignItems:'center', paddingLeft:'5%', marginTop:'20px'}}>
                    <Typography variant='body1' sx={{width:'20%'}}>{item.itemName}</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>{item.cost}</Typography>
                    <Typography variant='body1' sx={{width:'15%'}}>{item.price}</Typography>
                    <Typography variant='body1' sx={{width:'20%'}}>{item.inStockQty}</Typography>
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', flexDirection:'column', marginBottom:'20px'}}>
                    <img src={item.img} style={{width:'50%', height:'50%'}}/>
                  </div>
                    <Typography variant='subtitle2' sx={{textAligh:'left'}}>{item.description}</Typography>
                    <Button onClick={()=>{handleProceed();  setId(item._id)}}>Edit</Button>
                </AccordionDetails>

              </Accordion>
            ))}
          </div>
          

          

        </Card>
      </Box>
    </Container>

  )
}

export default ItemList