import {useEffect, useMemo, useState} from "react";


type ChatroomProps = {
  messages: [
    {
      user: string;
      text: string;
    }
  ]
}

export function Chatroom({messages}: ChatroomProps) {
  const [state, setState] = useState(messages);
  const isBrowser = typeof window !== "undefined";
  const socket = useMemo(() => isBrowser ? new WebSocket('ws://localhost:8080/ws?user=boi2&room=1336') : null, []);
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event: { data: string; }) => {
        console.log("socket message ", event.data)
        let data = JSON.parse(event.data)
        setState([data]);
      }
    }
  })
  let onClickTest = () => {
    setState([{user: "user_test", text: "test"}])
    console.log("clicked")
  }
  const messageInfo = (
    <ul onClick={onClickTest}>
      {messages.map((message) =>
        <li key={message.text}>{message.user}:{message.text}</li>)}
    </ul>
  )
  return <div>{messageInfo}</div>
}
