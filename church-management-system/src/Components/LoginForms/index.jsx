import React,{useState} from 'react'
import Button from '../Button'
import Forgotten from '../Forgotten'
import Input from '../Input'

const LoginForm = () => {
    const[userName,setUserName] = useState()
    const[email,setEmail] = useState()
  return (
    <form className='flex flex-col h-72 gap-5 border '>
        <h1 className='text-2xl flex justify-center font-bold'>
            Login</h1>
        <Input label="name" type="text" placeholder="Enter your username" value={userName} handleChange={(event)=>setUserName(event.target.value)}/>
        <Input label="email" type="text" placeholder="Enter your email" value={email} handleChange={(event)=>setEmail(event.target.value)}/>
        <Forgotten/>
        <Button width="360px" name="LOGIN"/>
    </form>
  )
}

export default LoginForm 