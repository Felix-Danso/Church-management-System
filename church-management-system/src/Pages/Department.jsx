import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAllDepartments, setSearchField} from "../Slices/departmentSlice";
import DepartmentsTable from "../AdminComponent/departments";
import DepartmentTitle from "../AdminComponent/TitleAndCtas/departmentTitle";
import SearchInput from "../AdminComponent/SearchInput";
import Pagination from "../AdminComponent/Pagination";

const Departments = () => {
    const dispatch = useDispatch()
    const departments = useSelector((state) => state.departments.departments)
    const status = useSelector((state) => state.departments.status);
    const searchField = useSelector((state) => state.departments.searchField)
    const totalDepartments = useSelector((state) => state.departments.totalDepartments)

    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);

    // No of Records to be displayed on each page
    const [recordsPerPage] = useState(5);


    const nPages = totalDepartments

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    useEffect(() =>{
        dispatch(fetchAllDepartments({currentPage, search: searchField}))
    },[dispatch,currentPage, searchField])

    return (
        <div>
            <div className="mt-10">
                <DepartmentTitle/>
            </div>
            <div className='flex flex-col justify-between mt-8 ml-12 space-y-6 md:space-y-0 md:flex-row mr-9'>
                <SearchInput
                    placeholder='Search departments'
                    value={searchField}
                    onChange={(event) => {
                        dispatch(setSearchField(event.target.value))}
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
