import React,{useState} from 'react'
import Button from '../Button'
import Forgotten from '../Forgotten'
import Input from '../Input'
import { FaBible } from "react-icons/fa";
import { alerts } from '../../Utility/alerts';
const LoginForm = () => {
    const[email,setEmail] = useState()
    const[password,setPassword] = useState()
    const [isLoading, setIsLoading] = useState()

       //function to handle login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {email, password}

    setIsLoading(true);

    try {
      //endpoint for user login
      let result = await fetch ("",{
        method:'POST',
        headers:{
          "Content-Type":'application/json',
          "Accept":'application/json',

        },
        body: JSON.stringify(data),
      });
      let resultJson = await result.json();
      if(result.status === 200){
        localStorage.setItem('token', JSON.stringify(resultJson['data']))
        localStorage.setItem('user', JSON.stringify(resultJson['user']))
        window.location.reload(false)
      }
      else{
        alerts("error", resultJson['detail'])
      }
    }
    catch(error) {
      alerts("error", "Oops! Something went wrong")
    };
    setIsLoading(false);
  }


  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center w-3/4 gap-5 h-96 z-10'>
         
          <div className='flex items-center justify-center h-8 border rounded-full w-7 bg-slate-200'>
             {< FaBible/>}
          </div>
        <h1 className='flex justify-center text-2xl font-bold'>
            Login</h1>
        <Input label="name" type="text" placeholder="Enter your username" value={email} handleChange={(event)=>setEmail(event.target.value)}/>
        <Input label="email" type="text" placeholder="Enter your email" value={password} handleChange={(event)=>setPassword(event.target.value)}/>
        <Forgotten/>
        <Button width="360px" name="LOGIN"/>
    </form>
  )
}

export default LoginForm 