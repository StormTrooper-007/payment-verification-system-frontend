import { useParams } from 'react-router-dom'
import {data} from "../data"
import { AlertTitle, Alert, Box, Button, Card,
   CardActions, CardContent, CardMedia, Paper,
    TextField, Typography } from '@mui/material'
import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import {RotatingSquare} from 'react-loader-spinner'



export default function Checkout() {
    const [user, setUser] = useState("")
    const [description, setDescription] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [isverified, setIsVerified] = useState<boolean>(false)
    const {id} = useParams()
   
    function getElement(){
        const result = data.find((e) => e.id === id)
        if(result) return result;
    }

    const element = getElement()

    function handlePayment(e:FormEvent){
        e.preventDefault()
        axios.post("/api/pay", 
        {
          name:element?.name,
          price:element?.price,
          photo:element?.photo, 
          description
        }
        )
        .then(response => {
          console.log(response.data)
          const ws = new WebSocket("ws://localhost:8081/ws")
          ws.onmessage = (event) => {
            setMessage(event.data);
          }
          setTimeout(() => setMessage(""), 3000)
        }).catch(error => console.log(error.response.message))
    }

    function getUser(){
        axios.get("/api/users/me")
        .then(response => {
          setUser(response.data)
          console.log(response.data)
        })
        .catch(error => console.log(error.response.message))
      }
       
    

    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8081/ws")
      ws.onmessage = (event) => {
        const m = event.data
        setMessage(m);
      }

     
        function verify(){
            axios.post("/api/verify", {username:user})
            .then(response => {
                if(response.data) setIsVerified(true)
                setTimeout(() => setMessage(""), 3000)
            })
            .catch(error => console.log(error.response.message))
        }
      
        getUser()
        verify()
    }, [user, isverified])

 
  return (
    <>
    {message!=="" && <Alert severity="success">
    <AlertTitle>Success</AlertTitle>
    <strong>{message}</strong>
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
  
  {
    !isverified?
     <Box sx={{ml:20}}>
   <RotatingSquare
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="rotating-square-loading"
  strokeWidth="4"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </Box>:
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
   
    <Button size="small" variant="contained" type='submit'> make payment </Button>
    </Box>
    </Paper>
    }
    </>
  )
}
