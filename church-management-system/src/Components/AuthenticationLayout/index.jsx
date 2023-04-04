import React from 'react'

const AuthenticationLayout = (props) => {
  return (
    <div className='p-0 m-0 bg-center bg-gradient-to-tr from-[#00d5ff] via-[#3e3e45] to-[#df4ecb] ... table bg-no-repeat h-screen w-full'>
        <div className="flex flex-col items-center justify-center float-right w-1/2 h-full h-96 bg-slate-200">
            {props.form}
         </div>  
    </div>
  )
}

export default AuthenticationLayout
