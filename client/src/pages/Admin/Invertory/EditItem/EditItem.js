import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { Container, Card, TextField, Box, Typography, Button, Breadcrumbs, LinearProgress } from '@mui/material'
import { Clear} from '@mui/icons-material'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {BlueColor_100, BlueColor_50, GreenColor_100, RedColor_100, RedColor_50, RedColor_75, TextColor_100} from '../../../../styles/_variables'

function EditItem() {
    const history = useNavigate()
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [imgData, setImgData] = useState("")

    const [itemDetails, setItemDetails] = useState({})

    const fetchItem = async()=> {
        await axios.get(`http://localhost:6001/items/${id}`, {withCredentials:true}).then(data=>{
            
            setItemDetails(data.data)
        } )

    }

    const [inputFields, setInputFields] = useState({
        itemName: itemDetails.itemName,
        itemType: itemDetails.itemType,
        cost: itemDetails.cost,
        price: itemDetails.price,
        inStockQty: itemDetails.inStockQty,
        description: itemDetails.description,
        img: itemDetails.img
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


    useEffect(()=>{
        fetchItem()   
   }, [id])

   useEffect(()=>{
    setInputFields({
        itemName: itemDetails.itemName,
        itemType: itemDetails.itemType,
        cost: itemDetails.cost,
        price: itemDetails.price,
        inStockQty: itemDetails.inStockQty,
        description: itemDetails.description,
        img: itemDetails.img })
   },[itemDetails])
   
   const handleDelete = async () =>{
    setLoading(true)
    let response = window.confirm('Are you sure you want to delete item?')
    if(response) {
        return  await axios
        .delete(`http://localhost:6001/items/${id}`, {withCredentials: true})
        .then(data => console.log(data.response)).then(setLoading(false))
        .then(history(-1))
    } else {
        setLoading(false)
    }
}




    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();
        formData.append("image", imgData);
        
        const postItem = await
            axios.post( `http://localhost:6001/api/images/`,formData).then((data) => {
                axios
                .patch(`http://localhost:6001/items/${id}`, {
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
                key={inputFields.itemName}
                defaultValue={inputFields.itemName}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px'}}
                autoFocus
                fullWidth />
                <TextField 
                id='itemType'
                name='itemType'
                label='Item Type'
                key={inputFields.itemType}
                defaultValue={inputFields.itemType}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px'}}
                autoFocus
                fullWidth/>
                <TextField 
                required
                type='number'
                id='Cost'
                name='cost'
                label='Cost'
                key={inputFields.cost}
                defaultValue={inputFields.cost}
                onChange={(e) => handleFormChange(e)}
                autoFocus
                sx={{marginBottom:'20px' , width: '33%', marginRight: '1%'}} />
                <TextField 
                required
                type='number'
                id='Price'
                name='price'
                label='Price'
                key={inputFields.price}
                defaultValue={inputFields.price}
                autoFocus
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px' , width: '33%', marginRight: '1%'}} />
                <TextField 
                type='number'
                id='Stock'
                name='inStockQty'
                label='Stock Qty'
                key={inputFields.inStockQty}
                defaultValue={inputFields.inStockQty}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px' , width: '32%'}}/>
                <TextField 
                id='Description'
                name='description'
                label='Description'
                multiline
                rows={5}
                autoFocus
                key={inputFields.description}
                defaultValue={inputFields.description}
                onChange={(e) => handleFormChange(e)}
                sx={{marginBottom:'20px'}}
                fullWidth />

                <div style={{display: 'flex', alignItems:'center', width:'100%'}}>
                    <div style={{display: 'flex', alignItems:'center', width:'90%'}}>
                    <Button variant="contained" component="label" sx={{marginRight:'10px'}}>
                        Upload Image
                    <input hidden accept="image/" type="file" name='img' onChange={handlePhoto}/>
                    </Button>
                    <Button variant='contained' type='submit' sx={{width:'12%'}}>submit </Button>
                    <Typography sx={{display:'inline', marginLeft:'20px'}}>{imgData.name} </Typography>
                    {imgData.name ? <Button onClick={handleDeleteImg}><Clear sx={{color: RedColor_100}}/></Button> : null}
                    </div>
                    <div>
                    <Button onClick={handleDelete} variant='contained' sx={{backgroundColor: RedColor_100, ' :hover':{backgroundColor:RedColor_50}}}>Delete</Button>
                    </div> 
                </div>
            </Card> 
            {loading ? <LinearProgress sx={{ color:TextColor_100, width:'99%', borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}/> : null}
        </Box>
    </Container>
  )
  
}

export default EditItem