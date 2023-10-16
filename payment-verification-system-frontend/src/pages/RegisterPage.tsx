import { Alert, AlertTitle, Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function RegisterPage() {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const navigate = useNavigate()

    const ws = new WebSocket("ws://localhost:8081/ws")

    function signIn(e:FormEvent){
      e.preventDefault()
      ws.onmessage = (event) => {
        setMessage(event.data)
    }
        if(password === repeatPassword){
            axios.post("api/users/register", {username, email, password})
            .then(() => {
                setTimeout(() => setMessage(""), 3000)
            }
            )
            .catch((error)=> {
                setError(error.response.message)
                setTimeout(() => setError(""), 3000)
            })
        }
        setUsername("")
        setPassword("")
        setRepeatPassword("")
        setEmail("")
    }

  return (
    <div>
    {message!=="" && <Alert severity="success">
    <AlertTitle>Success</AlertTitle>
    <strong>{message}</strong>
    </Alert>}
    {error!=="" && <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    <strong>{error}</strong>
    </Alert>}
    <Button variant="contained" onClick={() => navigate("/login")}>login</Button>
        <Paper  sx={{minHeight:200, width:200, ml:5, mt:5, padding:5}}>
        <Typography component="p" sx={{textAlign:"center"}}>Sign-up</Typography>
    <Box  
     sx={{ display:"flex", 
     flexDirection:"column",
     '& .MuiTextField-root': { m: 1, width: '25ch'}}} 
     onSubmit={signIn}
     component="form">
        <TextField
          required
           label="username"
          onChange={(e) => setUsername(e.target.value)}
        />
         <TextField
          required
          label="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          label="repeat-password"
          type="password"
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
    <Button type="submit" variant="contained" sx={{mt:2,ml:1}}>sign-up</Button>
    </Box>
    </Paper>
    </div>
  )
}
