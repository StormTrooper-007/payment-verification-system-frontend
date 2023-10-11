import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios'
import { FormEvent, useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() { 
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const navigate = useNavigate()

    const ws = new WebSocket("ws://localhost:8081/ws")

   function login(e:FormEvent){
    e.preventDefault()
    ws.onmessage = (event) => {
      setMessage(event.data)
    }
    axios.post("/api/users/login",{username, password},
    { 
    auth:{username, password},
     headers: {
        'Content-Type': 'application/json'}}).then(response => {
          if(response.data !== "anonymousUser"){
            navigate("/")
            }
     }).catch(error => {
        console.log(error.response.data)
     })
     setPassword("")
     setUsername("")
     
   }

  return (
    <div>
      {message}
    <Paper  sx={{height:200, width:200, ml:5, mt:5, padding:5}}>
        <Typography component="p" sx={{textAlign:"center"}}>Login</Typography>
    <Box  
     sx={{ display:"flex", 
     flexDirection:"column",
     '& .MuiTextField-root': { m: 1, width: '25ch'}}} 
     component="form" onSubmit={login}>
        <TextField
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
    <Button type="submit" variant="contained" sx={{mt:2,ml:1}}>login</Button>
    </Box>
    </Paper>
    </div>
  )
}

