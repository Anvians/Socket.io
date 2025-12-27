import { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3003')

const App = () => {
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [receiveMessage, setReceiveMessage] = useState('')

  const joinRoom = () => {
    if (room !== "") {
      socket.emit('join_room', room)
    }
  }

  const send_message = () => {
    socket.emit('send_message', { room, message })
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setReceiveMessage(data.message)
    })
  }, [socket])

  return (
    <div>
      <h1>Chatting</h1>
      <p>Join Room</p>
      <input
        placeholder="Enter Room"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <br/>
      <input
        placeholder="Enter Message"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={send_message}>Send Message</button>
      <p>{receiveMessage}</p>
    </div>
  )
}

export default App