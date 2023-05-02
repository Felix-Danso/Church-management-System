import React from 'react'
import './index.css';
import AdminFormHeaderText from '../FormHeaderText';

const AuthenticationLayout = (props) => {
  return (
                //  <div className="grid gap-4">
                //      <AdminFormHeaderText text={props.title}/>
                //      {props.form}
                //  </div>  
        <div className='w-full h-full bg-black absolute  '>        
        <div className='form '>
        <div className='blobs'> 
        <div className='blob'>
        <div className='poly'>
        <div className='poly1'>
        <div className='poly2'>
        <div className=" w-[450px] relative justify-center items-center max-md:left-[50%] max-md:-translate-x-1/2 md:left-[40%] lg:left-[50%] xl:left-[32%] 2xl:left-[%] top-1/2 -translate-y-1/2">
                 <AdminFormHeaderText text={props.title}/>
                     {props.form}
        </div> 
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
  )
}

export default AuthenticationLayout
