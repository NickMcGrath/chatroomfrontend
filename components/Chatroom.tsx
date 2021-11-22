import {useEffect, useMemo, useState} from "react";


export type ChatroomProps = {
  user: string;
  room: string;
}
export type Messages = [Message]
export type Message = {
  user: string;
  text: string;
}

export function Chatroom({user, room}: ChatroomProps) {
  const [state, setState] = useState([]);
  const isBrowser = typeof window !== "undefined";
  const socket = useMemo(() => isBrowser ? new WebSocket(`ws://localhost:8080/ws?user=${user}&room=${room}`) : null, [])
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event: { data: string; }) => {
        let message: Message = JSON.parse(event.data)
        setState((prevState: Messages) => {
          return [...prevState, message]
        })
      }
    }
  })
  return <ul>
    {state.map((message: Message) =>
      <li key={message.text}>{message.user}:{message.text}</li>)}
  </ul>
}
