import React, { useEffect, useState } from 'react'
import MembersTable from '../MembersTable'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAllMembers, setSearchMembers} from './MembersSlice'
import Pagination from '../Pagination'
import SearchInput from "../SearchInput";
import TitleAndCtas from "../TitleAndCtas";

const Members = () => {
 const dispatch = useDispatch()
 const members = useSelector((state) => state.adminMembers.members)
 const totalMembers = useSelector((state) => state.adminMembers.totalMembers)
 const status = useSelector((state) => state.adminMembers.status);
 const searchField = useSelector((state) => state.adminMembers.searchField)
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);

  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(8);

  const nPages = Math.ceil(totalMembers / recordsPerPage);

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  useEffect(() =>{
    dispatch(fetchAllMembers({currentPage, search: searchField}))
  },[dispatch, currentPage, searchField])

  return (
    <div>
        <div className="mt-10">
            <TitleAndCtas/>
        </div>
        <div className='flex flex-col justify-between mt-8 ml-12 space-y-6 md:space-y-0 md:flex-row mr-9'>
            <SearchInput
                placeholder='Search member'
                value={searchField}
                onChange={(event) => {
                    dispatch(setSearchMembers(event.target.value))}

                }
            />
        </div>
          <MembersTable
                  heads={[
                      'Name',
                      'Tithe',
                      'Department',
                      'Contact',
                      'Date Joined',
                      'Status',
                  ]}
                  members={members}
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

export default Members
