import React from 'react'

const Button = (props) => {
  return (
    <button 
    type={props.type}
    className={`w-[${props.width}] hover:from-gray_800 hover:to-gray_800 text-[white] bg-gradient-to-r from-primary to-secondary font-medium max-sm:font-normal rounded-lg text-base max-sm:px-1 px-5 py-2.5 text-center mr-3 md:mr-0`} 
    onClick={props.onClick}
>
    {props.name}
</button>
);
}

export default Button 
