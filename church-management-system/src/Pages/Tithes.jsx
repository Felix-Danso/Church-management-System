import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setSearchMembers} from "../AdminComponent/Members/MembersSlice";
import SearchInput from "../AdminComponent/SearchInput";
import TitheTitle from "../AdminComponent/TitleAndCtas/titheTitle";
import {fetchAllTithes} from "../Slices/titheSlice";
import TithesTable from "../AdminComponent/Tithe";
import Pagination from "../AdminComponent/Pagination";

const Tithes = () => {
    const dispatch = useDispatch()
    const tithes = useSelector((state) => state.tithes.tithes)
    const status = useSelector((state) => state.tithes.status);
    const searchField = useSelector((state) => state.departments.searchField)

    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);


    const nPages =  useSelector((state) => state.tithes.totalPages);

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    useEffect(() =>{
        dispatch(fetchAllTithes(searchField))
    },[dispatch,currentPage])

    return (
        <div>
            <div className="mt-10">
                <TitheTitle/>
            </div>
            <div className='flex flex-col justify-between mt-8 ml-12 space-y-6 md:space-y-0 md:flex-row mr-9'>
                <SearchInput
                    placeholder='Search tithe'
                    value={searchField}
                    onChange={(event) => {
                        dispatch(setSearchMembers(event.target.value))}

                    }
                />
            </div>
            <TithesTable
                heads={[
                    'Member',
                    'Amount',
                    'Date Paid',
                    'Frequency',
                ]}
                tithes={tithes}
            />
            <div>
                {status !== 'loading' ?
                    <Pagination
                        pageNumbers={pageNumbers}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        nPages={4}
                    />
                    :
                    <></>
                }
            </div>

        </div>
    )
}

export default Tithes
