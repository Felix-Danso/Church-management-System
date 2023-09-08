import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MembersTable from "../AdminComponent/MembersTable";
import {fetchAllMembers, setSearchMembers} from "../AdminComponent/Members/MembersSlice";
import {fetchAllDepartments} from "../Slices/departmentSlice";
import DepartmentsTable from "../AdminComponent/departments";
import DepartmentTitle from "../AdminComponent/TitleAndCtas/departmentTitle";
import SearchInput from "../AdminComponent/SearchInput";
import Pagination from "../AdminComponent/Pagination";

const Departments = () => {
    const dispatch = useDispatch()
    const departments = useSelector((state) => state.departments.departments)
    const status = useSelector((state) => state.departments.status);
    const searchField = useSelector((state) => state.departments.searchField)

    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);

    // No of Records to be displayed on each page
    const [recordsPerPage] = useState(5);


    const nPages = Math.ceil(departments.length / recordsPerPage);

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    useEffect(() =>{
        dispatch(fetchAllDepartments(searchField))
    },[dispatch,currentPage])

    return (
        <div>
            <div className="mt-10">
                <DepartmentTitle/>
            </div>
            <div className='flex flex-col justify-between mt-8 ml-12 space-y-6 md:space-y-0 md:flex-row mr-9'>
                <SearchInput
                    placeholder='Search doctor by name or email'
                    value={searchField}
                    onChange={(event) => {
                        dispatch(setSearchMembers(event.target.value))}

                    }
                />
            </div>
            <DepartmentsTable
                heads={[
                    'Name',
                    'Leader',
                    'Contact',
                    'Date Created',
                    'Status',
                ]}
                departments={departments}
            />
            <div>
                {status !== 'loading' ?
                    <Pagination
                        pageNumbers={pageNumbers}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        nPages={nPages}
                    />
                    :
                    <></>
                }
            </div>

        </div>
    )
}

export default Departments
