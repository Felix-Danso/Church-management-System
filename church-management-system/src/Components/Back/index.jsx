import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom'

const Back=(props)=> {
  return (
    <div className="flex justify-center mt-8 text-gray1">
    <Link to={props.to} className="flex text-[#667085]"><ArrowBackIcon fill="#667085"/><p className="ml-2">{props.description}</p></Link>
</div>
  )
}

export default Back
