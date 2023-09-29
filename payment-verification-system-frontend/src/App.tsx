import { useEffect, useState } from "react";





function App() {
 
const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081/ws", []);
  socket.onmessage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const m = event?.data
    setTimeout(() => setMessage(m), 3000)
  }

  },[])
  return (
    <>
   Hello
   <div>{message}</div>
     
    </>
  )
}

export default App
