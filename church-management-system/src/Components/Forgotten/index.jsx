import React from 'react'
// import { Link } from 'react-router-dom'

const Forgotten = () => {
  return (
    <div className="mt-1 w-[360px]  text-sm">
    <div className='inline-flex float-left'>
        <input type={"checkbox"} id="remember"/>
        <label className="ml-1" htmlFor='remember'>Remember me</label>
    </div>
    <div className='float-right text-[#0408E7] hover:underline'>
        {/* <Link to='/forgotPassword'>Forgot password?</Link> */}
    </div>
</div>   
  )
}

export default Forgotten
