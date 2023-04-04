import React,{useState} from 'react'
import Button from '../Button'
import Forgotten from '../Forgotten'
import Input from '../Input'

const LoginForm = () => {
    const[userName,setUserName] = useState()
    const[email,setEmail] = useState()
  return (
    <form className='flex flex-col items-center justify-center w-3/4 gap-5 border bg-slate-600 h-96'>
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