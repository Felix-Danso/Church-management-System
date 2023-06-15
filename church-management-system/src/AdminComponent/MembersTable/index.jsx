import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots} from 'react-icons/bs';
import {GoPrimitiveDot} from 'react-icons/go';
import { useDispatch } from 'react-redux';
import { fetchAllMembers, fetchMember } from '../Members/MembersSlice';

const MembersTable = (props) => {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);

       //function to display sub menu of doctors
       const menuTrigger = (id) => {
        if (menuOpen === id) {
            setMenuOpen(null);
        } else {
            setMenuOpen(id);
        }
    };

    //A function to close profilemenu onclick outside element
    useEffect(() => {
        //Alert if clicked on outside of element
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setMenuOpen(null);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const [menuOpen, setMenuOpen] = useState(null);

  return (
    <div className='flex flex-col mt-6 ml-12 mr-9 min-h-[55vh]'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                    <div className='overflow-hidden border-b rounded-md shadow-md border-gray_200'>
                        <table className='min-w-full overflow-x-scroll divide-y divide-gray-200'>
                            <thead className='bg-[#F9FAFB] border-b border-gray_200'>
                                <tr>
                                    {props.heads.map((head) => (
                                        <th
                                            key={head}
                                            scope='col'
                                            className='px-6 py-5 text-xs font-semibold tracking-wider text-left text-gray_500'
                                        >
                                            {head}
                                        </th>
                                    ))}
                                    <th scope='col' className='relative px-6 py-3'>
                                        <span className='sr-only'></span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {props.details.map((detail, index) => (
                                    <tr key={detail.id} className='border-b border-gray_200'>
                                        <td
                                            onClick={" "}
                                            className='px-6 py-4 cursor-pointer whitespace-nowrap'
                                        >
                                            <div className='flex items-center'>
                                                {/* <div className='flex-shrink-0 w-10 h-10'>
                                                    <img
                                                        className='w-10 h-10 rounded-full'
                                                        src={detail?.profile_picture ? detail?.profile_picture : createImageFromInitialsName(600, detail.full_name, getRandomColor())}
                                                        alt=''
                                                    />
                                                </div> */}
                                                <div className='ml-4'>
                                                    <div className='text-sm text-gray_900'>
                                                        {detail.full_name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm text-gray_500'>
                                                {detail.tithe}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray_500 whitespace-nowrap'>
                                            {detail.department}
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray_500 whitespace-nowrap'>
                                            {detail.contact}
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray_500 whitespace-nowrap'>
                                            {detail.date_joined}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span
                                                className={`inline-flex items-center gap-x-1 px-4 py-2 text-xs leading-5 ${
                                                    detail.status === 'Active'
                                                        ? 'text-[#027A48] bg-[#ECFDF3]'
                                                        : 'text-[#B42318] bg-[#FEF3F2]'
                                                } rounded-full`}
                                            >
                                                <span>
                                                    <GoPrimitiveDot />
                                                </span>
                                                <span>
                                                {detail.status}
                                                </span>
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                                            <div className='cursor-pointer'>
                                                <BsThreeDots
                                                    color='#344054'
                                                    onClick={() => menuTrigger(detail.id)}
                                                />
                                            </div>
                                            {menuOpen === detail.id ? (
                                                <ul
                                                    ref={wrapperRef}
                                                    className='z-[100] absolute w-40 -translate-x-40 space-y-2 text-gray_600 bg-[white] border-[#F2F4F7] rounded-lg shadow-lg'
                                                    onBlur={() => setMenuOpen(null)}
                                                >
                                                    <li
                                                        onClick={""}
                                                        className='flex ml-3 border-b cursor-pointer border-gray_200 text-gray_700'
                                                    >
                                                        <div className='inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md border-gray2'>
                                                            Activate user
                                                        </div>
                                                    </li>
                                                    <li
                                                        onClick={""}
                                                        className='flex ml-3 border-b cursor-pointer border-gray_200 text-gray_700'
                                                    >
                                                        <div className='inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md border-gray2'>
                                                            Deactivate user
                                                        </div>
                                                    </li>
                                                    <li
                                                        onClick={""}
                                                        className='flex ml-3 border-b cursor-pointer border-gray_200 text-gray_700'
                                                    >
                                                        <div className='inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md border-gray2'>
                                                            Delete user
                                                        </div>
                                                    </li>
                                                </ul>
                                            ) : (
                                                <></> 
                                                )} 
                                        </td>
                                      </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default MembersTable
