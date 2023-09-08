import React, {useState} from 'react'

export const Input = (props) => {
    const [isTouched, setIsTouched] = useState(false)


  return (
    <div className="flex flex-col">
        <label className='ml-1'>{props.label}</label>
         <input className={`${props.capitalize && 'capitalize'} h-11 p-5 text-base font-normal border rounded-md border-gray_300  w-[360px]`}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        pattern={props.pattern}
        onChange={props.onChange}
        title={props.title}
        disabled={props.disabled}
        onBlur={() => setIsTouched(true)}
      />
        <p className="text-red-800 text-xs">{props.error}</p>
    </div>
  )
}

export const SelectInput = (props) => {
    const [isTouched, setIsTouched] = useState(false)
    return (
        <div className="flex flex-col">
            <label className='ml-1'>{props.label}</label>
            <select
                className="h-11 text-base text-black font-normal border rounded-md border-gray_300  w-[360px]"
                onBlur={() => setIsTouched(true)}
                onChange={props.onChange}
                value={props.value}
            >
                <option value='' disabled>
                    {props.isLoading === 'loading' ? 'Loading...' : props.placeholder}
                </option>
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                ))}
            </select>
            <p className="text-red-800 text-xs">{props.error}</p>
        </div>
    )
}
