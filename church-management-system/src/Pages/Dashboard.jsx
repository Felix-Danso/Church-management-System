import React, {useEffect, useState} from 'react'
import Navbar from '../AdminComponent/NavBar'
import Card from '../AdminComponent/Card'
import Search from '../AdminComponent/Search'
import TitleAndCtas from '../AdminComponent/TitleAndCtas'
import members from '../Assets/members.svg';
import Tithe from '../Assets/Tithe.svg'
import department from '../Assets/department.svg'
import { Route, Routes } from 'react-router'
import Members from '../AdminComponent/Members'
import {useDispatch, useSelector} from 'react-redux'
import {getDashboardStats} from "../Slices/DashboardSlice";
import Departments from "./Department";
import Tithes from "./Tithes";

const Dashboard = () => {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.dashboard.status)
    const totalMembers = useSelector((state) => state.dashboard.totalMembers)
    const totalDepartments = useSelector((state) => state.dashboard.totalDepartments)
    const totalTithe = useSelector((state) => state.dashboard.totalTithe)

    useEffect(() => {
        dispatch(getDashboardStats())
    }, []);

  return (
    <div>
      <Navbar/>
      <div className='grid grid-cols-1 gap-12 pt-8 ml-10 mr-10 md:grid-cols-2 lg:grid-cols-3'>
                <Card
                    title='Members'
                    number={status === 'loading' ? 'loading...': totalMembers}
                    image={members}
                    color='bg-[#66B6FF33]'
                />
                <Card
                    title='Tithe'
                    number={status === 'loading' ? 'loading...' : totalTithe}
                    image={Tithe}
                    color='bg-[#FF8B6633]'
                />
                <Card
                    title='Departments'
                    number={status === 'loading' ? 'loading...' : totalDepartments}
                    image={department}
                    color='bg-[#66FFED33]'
                />
            </div>
            <Routes>
                <Route
                    path='/members'
                    element={
                        <Members/>
                    }
                />
                <Route
                    path='/departments'
                    element={
                        <Departments/>
                    }
                />
                <Route
                    path='/tithes'
                    element={
                        <Tithes/>
                    }
                />
            </Routes>
    </div>
  )
}

export default Dashboard
