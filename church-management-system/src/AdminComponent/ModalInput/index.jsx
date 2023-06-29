import React from 'react'

const Input = (props) => {
  return (
    <div >
        <p className='ml-1'>{props.label}</p>
         <input className="h-11 p-5 text-base font-normal border rounded-md border-gray_300  w-[360px]"
        type={props.type}
        // label={props.label}
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
