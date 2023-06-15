import React,{useState} from 'react'
import Button from '../Button'
import Forgotten from '../Forgotten'
import Input from '../Input'
import { FaBible } from "react-icons/fa";
import { alerts } from '../../Utility/alerts';
import { useNavigate } from 'react-router';
import Loader from '../Loader';
const LoginForm = () => {

  const navigate = useNavigate();

    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const [isLoading, setIsLoading] = useState()

       //function to handle login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {username, password}
    setIsLoading(true);
    try {
      //endpoint for user login
      let result = await fetch ("https://churchmanagement91.pythonanywhere.com/auth/login/",{
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
        localStorage.setItem('user', JSON.stringify(resultJson['admin']))
        alerts("success", resultJson['detail'])
      navigate("/dashboard")
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
    <form onSubmit={handleSubmit} className='z-10 flex flex-col items-center w-full gap-5 h-96'>
         
          <div className='flex items-center justify-center h-8 border rounded-full w-7 bg-slate-200'>
             {< FaBible/>}
          </div>
        <h1 className='flex justify-center text-2xl font-bold text-white'>
            Login</h1>
        <Input label="name" type="text" placeholder="Enter your UserName" value={username} onChange={(event)=>setUsername(event.target.value)}/>
        <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
        <Forgotten/>
        { isLoading?
          <Loader/>
          :
        <Button width="360px" name="LOGIN"/>
        }
    </form>
  )
}

export default LoginForm 