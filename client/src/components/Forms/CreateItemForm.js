import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { Container, Card, TextField, Box, Typography, Button, Breadcrumbs, LinearProgress } from '@mui/material'
import { Clear} from '@mui/icons-material'
import {Link, useNavigate} from 'react-router-dom'
import {BlueColor_50, GreenColor_100, RedColor_100, TextColor_100} from '../../styles/_variables'

function CreateItemForm() {
    const history =useNavigate()
    const [loading, setLoading] = useState(false)
    const [imgData, setImgData] = useState("")
    const [inputFields, setInputFields] = useState({
        itemName: '',
        itemType: '',
        cost: '',
        price: '',
        inStockQty: '',
        description: '',
        img: ''
    })
    
    const handleFormChange = (event) => {
        setInputFields({...inputFields, [event.target.name]: event.target.value})
        console.log(inputFields)
    }
    
    const handlePhoto = (e) => {
        setImgData(e.target.files[0])
        setInputFields({...inputFields, img: e.target.files[0].name})
    }

    const handleDeleteImg = () => {
        setImgData('')
    }

   


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let imgUrl =''
        const formData = new FormData();
        formData.append("image", imgData);
        
        const postItem = await
            axios.post( `${process.env.REACT_APP_DEPLOY_URL}/api/images`,formData).then((data) => {
                axios
                .post(`${process.env.REACT_APP_DEPLOY_URL}/items`, {
                    itemName: inputFields.itemName,
                    itemType: inputFields.itemType,
                    cost: Number(inputFields.cost),
                    price: Number(inputFields.price),
                    inStockQty: Number(inputFields.inStockQty),
                    description: inputFields.description,
                    img: data.data
                },  {withCredentials: true}).then(setLoading(false)).then(history(-1)).catch(err=>console.log(err))
                
            }).catch(err => console.log(err))
           
    
            
            // .then(data => imgUrl = data.response.path)

    

        setInputFields({
            itemName: '',
            itemType: '',
            cost: '',
            price: '',
            inStockQty: '',
            description: '',
            img:''
        })

        setImgData('')

    }

    console.log(imgData)
  return (
    <Container sx={{width:'100%' }}>
            <Typography variant='h2'>Add new item</Typography>
            <Breadcrumbs sx={{marginBottom:'10px'}}>
                <Link to='/employee-dashboard/admin/invertory'><Typography sx={{color:BlueColor_50}}>Invertory</Typography></Link>
            <Typography >Add new item</Typography>
            </Breadcrumbs>
        <Box component="form"
            autoComplete='off'
            encType='multipart/form-data'
            onSubmit={handleSubmit}
            sx={{marginTop:'40px', display:'flex', alignItems:'center', flexDirection:'column'}}
        >
            <Card elevation={10} sx={{p:'25px', borderRadius:'10px', }}>
                <TextField 
                required
                id='ItemName'
                name='itemName'
                label='Item Name'
                value={inputFields.itemName}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px'}}
                fullWidth />
                <TextField 
                id='itemType'
                name='itemType'
                label='Item Type'
                value={inputFields.itemType}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px'}}
                fullWidth/>
                <TextField 
                required
                type='number'
                id='Cost'
                name='cost'
                label='Cost'
                value={inputFields.cost}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px' , width: '33%', marginRight: '1%'}} />
                <TextField 
                required
                type='number'
                id='Price'
                name='price'
                label='Price'
                value={inputFields.price}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px' , width: '33%', marginRight: '1%'}} />
                <TextField 
                type='number'
                id='Stock'
                name='inStockQty'
                label='Stock Qty'
                value={inputFields.inStockQty}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px' , width: '32%'}}/>
                <TextField 
                id='Description'
                name='description'
                label='Description'
                multiline
                rows={5}
                maxRows={5}
                value={inputFields.description}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px'}}
                fullWidth />
                <div style={{display: 'flex', alignItems:'center'}}>
                    <Button variant="contained" component="label" sx={{marginRight:'10px'}}>
                        Upload Image
                    <input hidden accept="image/" type="file" name='img' onChange={handlePhoto}/>
                    </Button>
                    <Button variant='contained' type='submit' sx={{width:'12%'}}>submit </Button>
                    <Typography sx={{display:'inline', marginLeft:'20px'}}>{imgData.name} </Typography>
                    {imgData.name ? <Button onClick={handleDeleteImg}><Clear sx={{color: RedColor_100}}/></Button> : null}
                </div>
            </Card> 
            {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
        </Box>
    </Container>
  )
  
}

export default CreateItemForm