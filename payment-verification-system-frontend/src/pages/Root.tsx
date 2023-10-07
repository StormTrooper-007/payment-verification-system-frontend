import { AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Root() {
  const [username, setUsername]= useState<string>("");
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
     <Box sx={{ flexGrow: 1,}}>
      <AppBar position="static">
        <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box>
          <Typography variant="h6" color="inherit" component="div">Welcome to shop</Typography>

          <Typography variant="h6" color="inherit" component="div" >user:   {username==="anonymousUser"? "not logged in" : username}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet/>
    </>
  )
}
