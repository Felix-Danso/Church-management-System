import React from 'react'

const AuthenticationLayout = (props) => {
  return (
    <div className='p-0 m-0 bg-center bg-gradient-to-r from-[#00d5ff] via-[#3e3e45] to-[#df4ecb] ... table bg-no-repeat h-screen w-full'>
     <div className="form bg-[white] absolute max-md:left-[50%] max-md:-translate-x-1/2 md:left-[40%] lg:left-[50%] xl:left-[35%] 2xl:left-[65%] top-1/2 -translate-y-1/2 gap-5 grid">
        <div className="grid gap-4">
            {props.form}
         </div>  
     </div>
    </div>
  )
}

export default AuthenticationLayout
