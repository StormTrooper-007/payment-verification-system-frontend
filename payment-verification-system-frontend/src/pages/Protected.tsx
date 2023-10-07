import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
    const [user, setUser] = useState<string>("")

    function getUser(){
        axios.get("/api/users/me")
        .then((response) => setUser(response.data))
        .catch((error) => console.log(error.response.message))
    }

   useEffect(() => {
   getUser()
   },[])

   return (
    user === "anonymousUser"
        ?
        <Navigate to="/login"/>
        :
        <Outlet/>
)
}
