import React from 'react'
import Button from '../Button'

const TitleAndCtas = () => {
  return (
    <div className='flex justify-between mr-8'>
        <h1 className='text-2xl font-bold mt-5 ml-14'>
            Dashboard
        </h1>
        <Button name="Add new members"/>  
    </div>
  )
}

export default TitleAndCtas
