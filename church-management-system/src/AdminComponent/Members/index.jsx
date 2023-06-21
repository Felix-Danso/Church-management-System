import React, { useEffect, useState } from 'react'
import MembersTable from '../MembersTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMembers } from './MembersSlice'
import { filterArraySelect } from '../../Misc/search'
import Pagination from '../Pagination'

const Members = () => {
 const dispatch = useDispatch()
 const members = useSelector((state) => state.adminMembers.members)
 const status = useSelector((state) => state.adminMembers.status);
 const searchField = useSelector((state) => state.adminMembers.searchField)
 const [service, setService] = useState("");
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);

  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(5);
 
 const indexOfLastRecord = currentPage * recordsPerPage;
 const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

 const filteredData = filterArraySelect(
  members,
  searchField,
  { full_name: '' },
  service,
);

  // Records to be displayed on the current page
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  useEffect(() =>{
    dispatch(fetchAllMembers(currentPage))
  },[dispatch,currentPage])

  return (
    <div>
          <MembersTable
                  heads={[
                      'Name',
                      'Tithe',
                      'Department',
                      'Contact',
                      'Date Joined',
                      'Status',
                  ]}
                  members={currentRecords}
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
