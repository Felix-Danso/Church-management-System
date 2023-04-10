import React,{useState,useEffect} from 'react'
import Input from '../Input'
import Loader from '../Loader'
import Button from '../Button'
import Back from '../Back'
import { useNavigate, useParams } from 'react-router-dom'
import { alerts } from '../../Utility/alerts'
import { checkPassword } from '../../Utility/validator'

const ResetPasswordForm = () => {

    const [state,setState] = useState({
        password: '',
        re_password: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

     let params = useParams();

      //handing form input on change
  const handleChange = (event) => {
    const value = event.target.value;
    setState({
        ...state,
        [event.target.name]: value
      }
    );
  }
    //handles when form is submitted
  const handleSubmit = async (event) => {

    event.preventDefault();
    setIsLoading(true);
      //getting user token
      const token = params['token'];
      let item = state
      //sending api request
      try{
        let result = await fetch(`${token}/`, {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
        });

        let resultJson = await result.json();

        if(result.status === 200){
        //  alert if api request successful
        alerts("success",resultJson['detail'])
          navigate("/login");
        }

        else{
          //alert if api request not successful
          alerts("error",resultJson['detail'])
        }
      }
      catch(error) {
        // unable to send api request alert
        alerts("error","Ooops something went wrong") 
      };
      setIsLoading(false)
  }
  //useEffect for form validation
  useEffect(() => {
    checkPassword(state)
  }, [state])



  return (
      <form onSubmit={handleSubmit} className="grid gap-5">
    <Input type="password" name="password" value={state.password} placeholder="New password" onChange={handleChange} />
    <Input type="password" name="re_password"  value={state.re_password} placeholder="Comfirm new password" onChange={handleChange} />
      { isLoading ?
          <Loader/>
          :
          <Button name="Save new Password" width="360px"/>
      }
     <Back to="/login" description="Back to login"/>
    </form>
  )
}

export default ResetPasswordForm
