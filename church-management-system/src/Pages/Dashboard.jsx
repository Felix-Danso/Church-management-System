import React, { useState } from 'react'
import Navbar from '../AdminComponent/NavBar'
import Card from '../AdminComponent/Card'
import AdminActions from '../AdminComponent/AdminActions'
import TitleAndCtas from '../AdminComponent/TitleAndCtas'
import TitleAndCtas1 from '../TitleAndCtas1'
import members from '../Assets/members.svg';
import Tithe from '../Assets/Tithe.svg'
import Departments from '../Assets/Departments.svg'
import { Route, Routes } from 'react-router'
import Members from '../AdminComponent/Members'
import { useSelector } from 'react-redux'


const Dashboard = () => {
    // const dispatch = useDispatch()
    // const count = useSelector((state) => state.totalChurchMember.count)
    const total_members = useSelector((state) => state.cards.total_members)
    const[status,] = useState()

  return (
    <div>
      <Navbar/>
      <AdminActions/>
      <TitleAndCtas/>
      <TitleAndCtas1/>
      <div className='grid grid-cols-1 gap-12 pt-8 ml-10 mr-10 md:grid-cols-2 lg:grid-cols-3'>
                <Card
                    title='Members'
                    number={status === 'loading' ? 'loading...': total_members}
                    image={members}
                    color='bg-[#66B6FF33]'
                />
                <Card
                    title='Tithe'
                    number={status === 'loading' ? 'loading...' : ""}
                    image={Tithe}
                    color='bg-[#FF8B6633]'
                />
                <Card
                    title='Departments'
                    number={status === 'loading' ? 'loading...' : ""}
                    image={Departments}
                    color='bg-[#66FFED33]'
                />
            </div>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Members/>
                    }
                />
            </Routes>
            {/* <Members/> */}
    </div>
  )
}

export default Dashboard
