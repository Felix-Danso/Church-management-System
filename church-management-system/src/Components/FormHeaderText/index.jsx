import React from 'react'

const AdminFormHeaderText=(props)=> {
  return (
    <div className='h-10 w-[360px] leading-[38px] '>
        <p className='not-italic font-semibold text-[1.875rem] flex justify-center self-stretch'>
            {props.text}
        </p>
    </div>
  )
}

export default AdminFormHeaderText
