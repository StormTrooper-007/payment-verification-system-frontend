import { Alert, AlertTitle, AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { getSocketMessage, removeSocketMessage } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";


export default function Root() {
  const [username, setUsername]= useState<string>("");
  const ws = new WebSocket("ws://localhost:8081/ws")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {socketMessage} = useSelector((state:RootState) => state.appState)
  
  function logout(e:FormEvent){
    e.preventDefault()
    ws.onmessage = (event) =>{
      dispatch(getSocketMessage(event.data))
    }
    axios.get("api/users/logout")
    .then(() => {
      setTimeout(() => {
        dispatch(removeSocketMessage())
        navigate("/login")
      }, 3000)
    })
  }

 
  function getUser(){
    axios.get("/api/users/me")
    .then((response) => setUsername(response.data))
    .catch((error) => console.log(error))
  }

   useEffect(() => {
   getUser()
   },[])

  return (
    <>
     {socketMessage !=="" && <Alert 
     severity={socketMessage === ("verifying user" || "logging out") ? "info":"success"}
     onClick={() => dispatch(removeSocketMessage())}
     >
    <AlertTitle>{socketMessage === ("verifying user" || "logging out") ? "info":"success"}</AlertTitle>
    <strong>{socketMessage}</strong>
    </Alert>}
     <Box sx={{ flexGrow: 1,}}>
      <AppBar position="static">
        <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box>
          <Typography variant="h6" color="inherit" component="div"> Welcome to shop</Typography>
          <Typography variant="h6" color="inherit" component="div"> user:{!username || username==="anonymousUser"? "not logged in" : username}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="form" onSubmit={logout}>
      <Button type="submit" variant="contained" sx={{m:2}}> sign out</Button>
      </Box>
    </Box>
    <Outlet/>
    </>
  )
}
