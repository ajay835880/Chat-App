import React, { useState } from 'react'
import "./join.css";
import {Link} from "react-router-dom"


 export let user;


  const sendUser=()=>{
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  }

  const Join= ()=>{
    const[name, setname] = useState("");
    console.log(name)
  

  return (
    <div className='joinpage'>
      <div className='joinContainer'>
        {/* <img src="" alt="logo"/> */}
        {/* <button>🎓</button> */}
        <h1>C Chat </h1>
        <input  onChange={(e)=>setname(e.target.value)}  placeholder='Enter your name' type='text' id='joinInput'/>
    
        <Link onClick={(event)=>!name ?event.preventDefault(): null} to="/chat">
        <button onClick={sendUser} className='joinbtn'>LogIn</button></Link>
      </div>
    </div>
  )

  }
export default Join
