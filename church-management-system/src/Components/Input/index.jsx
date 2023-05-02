import React from 'react'

const Input = (props) => {
  return (
    <div >
         <input className="h-11 p-5 text-base font-normal border-b border-gray_300  w-[360px] bg-black text-white"
        type={props.type}
        label={props.label}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        pattern={props.pattern}
        onChange={props.onChange}
        title={props.title}
        disabled={props.disabled}
        required
      />
    </div>
  )
}

export default Input
