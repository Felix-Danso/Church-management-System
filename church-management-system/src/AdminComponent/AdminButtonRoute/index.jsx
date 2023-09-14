import React from 'react'
import { Link } from 'react-router-dom';

const AdminButtonRoute = (props) => {
  return (
    <button
    type={props.type}
    className={`w-[${props.width}] bg-black font-medium max-sm:font-normal rounded-lg text-base max-sm:px-1 px-5 py-2.5 text-center mr-3 md:mr-0 text-white`}
    onClick={props.onClick}
    >    
     <Link
        to={props.to}
        onClick={props.onClick}
        className='ml-1 text-white hover:underline' >
        {props.name}
    </Link>     
</button>
  )
}

export default AdminButtonRoute
