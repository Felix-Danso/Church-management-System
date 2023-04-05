import React,{useState} from 'react'
import Button from '../Button'
import Forgotten from '../Forgotten'
import Input from '../Input'
import { FaBible } from "react-icons/fa";
const LoginForm = () => {
    const[userName,setUserName] = useState()
    const[email,setEmail] = useState()
  return (
    <form className='flex flex-col items-center justify-center w-3/4 gap-5 h-96 z-10'>
         
          <div className='flex items-center justify-center h-8 border rounded-full w-7 bg-slate-200'>
             {< FaBible/>}
          </div>
        <h1 className='flex justify-center text-2xl font-bold'>
            Login</h1>
        <Input label="name" type="text" placeholder="Enter your username" value={userName} handleChange={(event)=>setUserName(event.target.value)}/>
        <Input label="email" type="text" placeholder="Enter your email" value={email} handleChange={(event)=>setEmail(event.target.value)}/>
        <Forgotten/>
        <Button width="360px" name="LOGIN"/>
    </form>
  )
}

export default LoginForm 