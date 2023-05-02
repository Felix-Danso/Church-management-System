import React from 'react'
import SideBar from '../DashboardComponents/SideBar'

const Dashboard = () => {
  return (
    <div className='w-full bg-[#666666] h-full absolute'>
      <div className='flex items-center border bg-[#22262F] w-full h-full rounded-3xl'>
        <SideBar/>
      </div>
    </div>
  )
}

export default Dashboard
