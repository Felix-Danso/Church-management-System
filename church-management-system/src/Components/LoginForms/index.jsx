import React,{useState} from 'react'
import Button from '../Button'
import Forgotten from '../Forgotten'
import Input from '../Input'
import { FaBible } from "react-icons/fa";
import { alerts } from '../../Utility/alerts';
import { useNavigate } from 'react-router';
import Loader from '../Loader';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../Slices/userSlice";

const LoginForm = () => {
    const navigate = useNavigate();
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const loginStatus = useSelector((state) => state.login.status)
    const dispatch = useDispatch()

   //function to handle login form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {username, password}
        dispatch(login(data)).then((response) => {
            if(response.error) {
                alerts('error', response.payload)
            } else {
                alerts('success', `Welcome ${response.payload.user.username}`)
                navigate("/dashboard/members")
            }
        })
    }

  return (
    <form onSubmit={handleSubmit} className='z-10 flex flex-col items-center w-full gap-5 h-96'>
          <div className='flex items-center justify-center h-8 border rounded-full w-7 bg-slate-200'>
             {< FaBible/>}
          </div>
        <h1 className='flex justify-center text-2xl font-bold text-white'>
            Login</h1>
        <Input label="name" type="text" placeholder="Enter your UserName" value={username} onChange={(event)=>setUsername(event.target.value)}/>
        <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
        <Forgotten/>
        { loginStatus === 'loading' ?
          <Loader/>
          :
        <Button width="360px" name="LOGIN"/>
        }
    </form>
  )
}

export default LoginForm 
