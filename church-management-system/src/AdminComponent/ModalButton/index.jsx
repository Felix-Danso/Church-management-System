import React from 'react'

const ModalButton = (props) => {
  return (
    <button 
    type={props.type}
    className={`w-[170px] bg-[${props.color}] hover:from-slate-500 hover:to-black text-[${props.text}] font-medium max-sm:font-normal rounded-lg text-base max-sm:px-1 px-5 py-2.5 text-center mr-3 md:mr-0 border`} 
    onClick={props.onClick}
>
    {props.name}
</button>
);
}

export default ModalButton 
