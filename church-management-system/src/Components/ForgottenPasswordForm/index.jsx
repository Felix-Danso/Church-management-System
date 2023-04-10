import React,{useState} from 'react'
import Input from '../Input'
import Loader from '../Loader'
import Button from '../Button'
import Back from '../Back'
import { alerts } from '../../Utility/alerts'

const ForgottenPasswordForm = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [state, setState] = useState({
      email: ''
    })

    const handleChange = (event) => {
      const value = event.target.value;
      setState({
        ...state,
        [event.target.name]: value
      });
  }
       //handles when form is submitted
    const handleSubmit = async (event) => {
      event.preventDefault();
      let item = state
      setIsLoading(true);
      try{
        let result = await fetch("", {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });
        let resultJson = await result.json();
        // if api request is successfull
        if(result.status === 200){
          alerts("success", resultJson['detail'])
        }
        // if api response not executed
        else{
           alerts("error",resultJson['detail'])
        }
      }
  
      // unable to send api request alert
      catch(error) {
          alerts("Oops!, Something went wrong...")
      };
      setIsLoading(false)
    }
  

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 z-10">
    <Input type="email"  name="email" value={state.email} placeholder="Enter your email" onChange={handleChange} />
    { isLoading ?
        <Loader/>
        :
        <Button name="Send reset link" width="360px"/>
    }
     <Back to="/" description="Back to login"/>
    </form>
  )
}

export default ForgottenPasswordForm
