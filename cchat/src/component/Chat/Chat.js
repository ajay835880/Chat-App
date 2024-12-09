// import React, { useEffect, useState } from 'react'
// import {user} from "../join/join";
// import socketIo from "socket.io-client"
// import "./chat.css";


// let socket;

// const ENDPOINT = "http://localhost:4500/";

// const Chat =()=>{
    
//     const[id, setid] =useState("")

//  const send =()=>{
//   const message = document.getElementById('chatInput').Value;
//     socket.emit('message',{message, id});
//     document.getElementById('chatInput').Value ="";
//  }


//    useEffect(()=>{

//     const socket = socketIo(ENDPOINT,{ transports : ["websocket"]});

//     socket.on('connect', ()=>{
//         alert("connected");
//         setid(socket.id);
//     })

//     console.log(socket)

//     socket.emit('joined',{user})

//     socket.on('Welcome',(data)=>{
//         console.log(data.user, data.message);
//     })

//     socket.on('userJoined',(data)=>{
//         console.log(data.user,data.message);
//     })

//     socket.on('Leave',(data)=>{
//         console.log(data.user,data.message)
//     })

// return()=>{
// socket.emit('user_disconnect');
// socket.off();
// }

//    }, [])

//    useEffect(()=>{

//     socket.on('sendMessage', (data)=>{
//         console.log(data.user, data.message, data.id);
//     })
//     return()=>{

//     }
//    },[])
//     return(
//         <div className='chatPage'>
//             <div className='chatContainer'>
//                 <div className='header'></div>
//                     <div className='chatBox'></div>
//                 <div className='inputBox'>
//                 <input type="text" id='chatInput'/>
//                 <button  onClick={send} className='sendBtn'>➣</button>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Chat



import React, { useEffect, useState } from 'react';
import { user } from "../join/join";
import socketIo from "socket.io-client";
import "./chat.css";
import Message from "../Message/message";
import ReactScrollToBotton from "react-scroll-to-bottom";

let socket; // Declare socket in global scope

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    const [id, setId] = useState("");
    
    const[messages, setMessage] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value; // Correct property is 'value'
        if (message.trim() !== "") {
            socket.emit('message', { message, id });
            document.getElementById('chatInput').value = ""; // Clear input field
        }
    };

    console.log(messages);

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ["websocket"] }); // Initialize global socket variable

        socket.on('connect', () => {
            alert("Connected");
            setId(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('Welcome', (data) => {
            setMessage([...messages, data]);
            console.log(data.user, data.message);
        });

        socket.on('userJoined', (data) => {
            setMessage([...messages, data]);
            console.log(data.user, data.message);
        });

        socket.on('Leave', (data) => {
            setMessage([...messages, data]);
            console.log(data.user, data.message);
        });

        return () => {
            socket.emit('user_disconnect');
            socket.off();
        };
    }, []); // Run only once when the component mounts

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessage([...messages, data]);
            console.log(data.user, data.message, data.id);
        });

        return () => {
            socket.off(); // Cleanup listener
        };
    }, [messages]); // Run only once when the component mounts

    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2> C chat</h2>
                  <a href='/'>  <button   className='closeBtn'>✖️ </button></a>
                </div>
                <ReactScrollToBotton className='chatBox'>
                    {messages.map((item, i)=><Message user={item.id === id ? '': item.user} message={item.message} classs={item.id === id ? 'right':'left'} />)}
                </ReactScrollToBotton>
                <div className='inputBox'>
                    <input type="text" id='chatInput' />
                    <button onClick={send} className='sendBtn'>➣</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;

