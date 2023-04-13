import React from 'react'
import AuthenticationLayout from '../Components/AuthenticationLayout'
import ResetPasswordForm from '../Components/ResetPasswordForm'

function ResetPassword() {
  return (
    <div>
         <AuthenticationLayout
         form={<ResetPasswordForm/>}
     />
    </div>
  )
}

export default ResetPassword
