import { Alert, AlertTitle, AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";


export default function Root() {
  const [username, setUsername]= useState<string>("");
  const [message, setMessage] = useState<string>("")
  const ws = new WebSocket("ws://localhost:8081/ws")
  const navigate = useNavigate()
  
  function getUser(){
      axios.get("/api/users/me")
      .then((response) => setUsername(response.data))
      .catch((error) => console.log(error))
  }


  useEffect(() => {
 getUser()
  },[])

  function logout(e:FormEvent){
    e.preventDefault()
    axios.get("api/users/logout")
    .then((response) => {
      console.log(response.data)
      setTimeout(() => {
        setMessage("")
        navigate("/login")
      }, 3000)
    })
    .catch(error => console.log(error.response.messge))
  }

  ws.onmessage = (event) =>{
    setMessage(event.data)
  }

 

  return (
    <>
    { message!=="" && <Alert severity="success">
    <AlertTitle>Success</AlertTitle>
    <strong>{message}</strong>
    </Alert>}
     <Box sx={{ flexGrow: 1,}}>
      <AppBar position="static">
        <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box>
          <Typography variant="h6" color="inherit" component="div">Welcome to shop</Typography>
          <Typography variant="h6" color="inherit" component="div" >user:   {!username || username==="anonymousUser"? "not logged in" : username}</Typography>
      
          </Box>
        </Toolbar>
        
      </AppBar>
      <Box component="form" onSubmit={logout}>
      <Button type="submit">sign out</Button>
      </Box>
     
    </Box>
    <Outlet/>
    </>
  )
}
