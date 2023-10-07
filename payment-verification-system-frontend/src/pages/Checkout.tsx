import { useParams } from 'react-router-dom'
import {data} from "../data"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { FormEvent, useState } from 'react'

export default function Checkout() {
    const [amount, setAmount] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const {id} = useParams()

    function getElement(){
        const result = data.find((e) => e.id === id)
        if(result) return result;
    }

    const element = getElement()

    function handlePayment(e:FormEvent){
        e.preventDefault()
        axios.post("/api/pay", {amount:Number(amount), description})
        .then(response => {
            const approvalUrl = response.data.approval_url
            window.location.href=approvalUrl
        }).catch(error => console.log(error.response.message))
    }
 
  return (
    <>
     <Card sx={{ maxWidth: 345,m:2}}>
    <CardMedia
      sx={{ height: 140 }}
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
        <TextField
          required
          label="amount"
          type="text"
          onChange={(e) => setAmount(e.target.value)}
        />
    <Button size="small" variant="contained" type='submit'>Pay with paypal</Button>
    </Box>
    </Paper>
    </>
  )
}
