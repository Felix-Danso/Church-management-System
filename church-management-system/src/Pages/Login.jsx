import React from 'react'
import AuthenticationLayout from '../Components/AuthenticationLayout'
import LoginForm from '../Components/LoginForms'

const Login = () => {
  return (
    <div >
      <AuthenticationLayout
      text ="log"
         form={<LoginForm/>}
     />
    </div>  
  )
}

export default Login 