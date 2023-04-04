import React from 'react'
import './index.css';

const AuthenticationLayout = (props) => {
  return (
    <div className='flex w-full h-screen p-0 m-0 bg-center bg-no-repeat blobs'>
        <div className='flex justify-center w-1/2 h-full bg-orange-400 border'>
          <h1 className='mt-10 font-bold text-9xl'>
            welcome
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center float-right w-1/2 h-full bg-white h-96">
            {props.form}
         </div>  
    </div>
  )
}

export default AuthenticationLayout
