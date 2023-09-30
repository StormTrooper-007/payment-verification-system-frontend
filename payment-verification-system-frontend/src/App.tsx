import { useEffect, useState } from "react";



function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState<string>("");
  const [websocket, setWebSocket] = useState<WebSocket>();

 

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081/ws")
    setWebSocket(ws);
  
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }

  

  },[])

  function sendMessage(){
    websocket?.send(text);
    setText("");
    console.log(text)
  }

 
  return (
    <>
   <div>Display</div>
   {messages.map((message , index)=> (
    <div key={index}>{message}</div>
   ))}
   <input type="text" onChange={(e) => setText(e.target.value)}/>
   <button onClick={sendMessage}>send</button>
    </>
  )
}

export default App
