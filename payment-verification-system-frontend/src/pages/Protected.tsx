import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { removeSocketMessage } from '../features/appSlice'

export default function Protected() {
    const [user, setUser] = useState<string>("")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(removeSocketMessage())
      })
    
    function getUser(){
        axios.get("/api/users/me")
        .then((response) => {
            setUser(response.data)
        })
        
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
