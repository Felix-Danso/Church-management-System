import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-wrapper';
import { CircularProgress } from '@mui/material';
import { createImageFromInitials } from '../../Utility/createImage';
import { useDispatch, useSelector } from 'react-redux';
import {getRandomColor} from "../../Utility/getRamdomColor";
import {signOut} from "../../Slices/userSlice";

//profile drop menu component
const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user)
    const token = JSON.parse(localStorage.getItem('token'))?.refresh
    const status = useSelector((state) => state.login.signOutStatus)
    //state of profile menu
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
            setIsProfileMenuOpen(false);
            }}
        >
            <li className='relative list-none max-[768px]:mr-4'>
                <button
                    className='align-middle rounded-full border-4 border-[white] shadow-sm focus:shadow-outline-purple focus:outline-none'
                    onClick={() => setIsProfileMenuOpen((opened) => !opened)}
                >
                    <img
                        className='object-cover w-8 h-8 rounded-full'
                        src={user?.profile_picture ? user?.profile_picture : createImageFromInitials(600, getRandomColor())}
                        alt=''
                        aria-hidden='true'
                    />
                </button>
                {isProfileMenuOpen ? (
                    <ul
                        className='absolute right-0 w-56 mt-2 space-y-2 text-gray_600 bg-[white] border-[#F2F4F7] rounded-lg shadow-lg'
                        aria-label='submenu'
                    >
                            <li className='flex ml-3 border-b border-gray_200 text-gray_700'>
                                <Link
                                    to={''}
                                    className='inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md border-gray2'
                                >
                                    <svg
                                        className='w-4 h-4 mr-3'
                                        aria-hidden='true'
                                        fill='none'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
                                    </svg>
                                    <span>Account Settings</span>
                                </Link>
                            </li>
                        <li className='flex ml-3 text-gray2'>
                            {status === 'loading' ? (
                                <div className='inline-flex items-center w-full px-2 py-1 text-sm font-normal transition-colors duration-150 rounded-md animate-pulse text-gray_500'>
                                    <CircularProgress size={15} />
                                    <span className='pl-2 text-black'>logging out...</span>
                                </div>
                            ) : (
                                <button
                                    onClick={() => dispatch(signOut(token))}
                                    className='inline-flex items-center w-full px-2 py-1 text-sm font-normal transition-colors duration-150 rounded-md text-gray_700'
                                >
                                    <svg
                                        className='w-4 h-4 mr-3'
                                        aria-hidden='true'
                                        fill='none'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'></path>
                                    </svg>
                                    <span className='text-black'>Logout</span>
                                </button>
                            )}
                        </li>
                    </ul>
                ) : (
                    <></>
                )}
            </li>
        </OutsideClickHandler>
    );
};

export default Profile;
