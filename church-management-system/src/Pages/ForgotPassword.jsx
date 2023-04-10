import React from 'react'
import AuthenticationLayout from '../Components/AuthenticationLayout'
import ForgottenPasswordForm from '../Components/ForgottenPasswordForm'

const ForgotPassword = () => {
  return (
    <div>
          <AuthenticationLayout
         form={<ForgottenPasswordForm/>}
     />
    </div>
  )
}

export default ForgotPassword
