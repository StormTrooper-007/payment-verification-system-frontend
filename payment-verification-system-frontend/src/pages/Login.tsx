import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
   // const[result, setResult] = useState<string>("")
    //const [user, setUser] = useState<string>("") 
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

   function login(e:FormEvent){
    e.preventDefault()
    axios.post("/api/users/login",{username, password},
    { 
    auth:{username, password},
     headers: {
        'Content-Type': 'application/json'}}).then(response => {
        if(response.data!=="anonymousUser"){
            navigate("/")
        }
        console.log(response.data)
     }).catch(error => {
        console.log(error.response.data)
     })
     setPassword("")
     setUsername("")
   }

    function getUser(){
        axios.get("/api/users/me")
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
   getUser()
    },[])


  return (
    <Paper  sx={{height:200, minWidth:250, marginLeft:5, padding:5}}>
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
    <Button type="submit" variant="contained" sx={{mt:2}}>login</Button>
    </Box>
    </Paper>
  )
}

