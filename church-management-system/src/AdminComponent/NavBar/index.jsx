import React, {useState} from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Profile from '../Profile/ProfileMenu';
import {Link, NavLink} from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = (props) => {
    const user = useSelector((state) => state.login.user)

    const hamburger = () => {
        setHamburgerMenuOpen((opened) => !opened);
    };

    const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
    
    return (
        <div className=''>
            <nav className='bg-[#27262C] px-2 sm:px-4 py-5 w-full z-[1000] top-0 left-0 border-gray_200 border-b'>
                <div className='container flex flex-wrap items-center justify-between mx-auto text-white'>
                    Logo
                    <div className='flex md:order-2 mr-9'>
                        <div className='flex gap-x-4'>
                            <Profile />
                            <h5 className='grid items-center font-semibold text-white'>
                                {user.username}
                            </h5>
                        </div>

                        <button
                            type='button'
                            className='inline-flex items-center text-gray-500 md:hidden'
                            onClick={hamburger}
                        >
                            <GiHamburgerMenu />
                        </button>
                    </div>
                    <div
                        className={`items-center text-center justify-between w-full ${
                            isHamburgerMenuOpen ? 'max-md:flex' : ''
                        } md:w-auto md:order-1`}
                        id='navbar-sticky'
                    >
                        <ul className='flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-1'>
                            <li>
                                <NavLink to={'members'}
                                         className={({ isActive }) =>
                                             isActive
                                                 ? "border-b"
                                                 : "block py-2 pl-3 pr-4 font-semibold hover:text-primary hover:border-b border-primary md:p-0"
                                         }
                                    aria-current='page'
                                >
                                    Members
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'departments'}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "border-b"
                                            : "block py-2 pl-3 pr-4 font-semibold hover:text-primary hover:border-b border-primary md:p-0"
                                    }
                                >
                                    Department
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tithes'}
                                    href='#services'
                                         className={({ isActive }) =>
                                             isActive
                                                 ? "border-b"
                                                 : "block py-2 pl-3 pr-4 font-semibold hover:text-primary hover:border-b border-primary md:p-0"
                                         }
                                >
                                    Tithe
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
    );
};

export default Navbar;
