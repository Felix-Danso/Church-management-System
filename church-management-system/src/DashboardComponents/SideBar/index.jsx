import React from 'react'
import element from '../../Assets/element.png'

const SideBar = () => {
  return (
    <div className='border w-72 h-[893.65px] relative'>
        <div className='border h-[662.65px] relative'>
            <div className='border h-[76.91px] text-white'>
                jbfadhha
            </div> 
            <div className='w-[220px] h-[505.74px] absolute bottom-0 border '>
              <div className='border h-[74.06px] rounded-2xl flex justify-center items-center'>
                <div className='border w-[132.39px] h-[40.78px] flex'>
                  <div className='border w-[22.16px] h-[22.16px] flex justify-center mt-2'>
                    <img className='' src={element} alt="group" />
                  </div>
                  <div className='border w-full flex justify-center items-center'>
                    <span className='w-[83px] h-[19px] flex border items-center text-white'>
                      <h5 className='text-[16.3366px] font-normal not-italic leading-5'>Dashboard</h5>
                    </span>
                  </div>
                </div>
              </div>
            </div>

        </div>
        <div className='h-[81px] border w-[252px]  bottom-0 absolute right-0'>
        </div>
    </div>
  )
}

export default SideBar 
