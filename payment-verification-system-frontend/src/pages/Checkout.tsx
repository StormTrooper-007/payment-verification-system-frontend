import { useNavigate, useParams } from 'react-router-dom'
import {data} from "../data"
import { AlertTitle, Alert, Box, Button, Card,
   CardActions, CardContent, CardMedia, Paper,
    TextField, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSocketMessage } from '../features/appSlice'



export default function Checkout() {
   
    const [description, setDescription] = useState<string>("")
    const [error, setError] = useState<string>("")
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ws = new WebSocket("ws://localhost:8081/ws")
  
   
    function getElement(){
        const result = data.find((e) => e.id === id)
        if(result) return result;
    }

    const element = getElement()

    function handlePayment(e:FormEvent){
        e.preventDefault()
       
        ws.onmessage = (event) => {
          dispatch(getSocketMessage(event.data))
        }
       
        axios.post("/api/pay", 
        {
          name:element?.name,
          price:element?.price,
          photo:element?.photo, 
          description
        }
        )
        .then(() => {
        
        }).catch(error => setError(error.response.message))
    }
   

  
  return (
    <>
    <Box sx={{marginLeft:3, color:"blue"}} onClick={() => navigate("/")}>
    <ArrowBackIosIcon/>
    <Typography>back to home page</Typography>
    </Box>
    {error!=="" && <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    <strong>{error}</strong>
    </Alert>}
    <Card sx={{ maxWidth: 345,m:2}}>
    <CardMedia
      sx={{ height: 140}}
      image={element?.photo}
      title={element?.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Shoes
      </Typography>
    </CardContent>
    <CardActions>
    </CardActions>
  </Card>
  
 
  <Box sx={{ml:20}}>
    </Box>
    <Paper  sx={{height:200, width:200, marginLeft:2, padding:5}}>
      
        <Typography component="p" sx={{textAlign:"center"}}>Payment details</Typography>
    <Box  
     sx={{ display:"flex", 
     flexDirection:"column",
     '& .MuiTextField-root': { m: 1, width: '25ch'}}} 
     component="form"
     onSubmit={handlePayment}
     >
        <TextField
          required
          label="description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
   
    <Button size="small" variant="contained" type='submit' sx={{ml:2}}> make payment </Button>
    </Box>
    </Paper>
  
    </>
  )
}
