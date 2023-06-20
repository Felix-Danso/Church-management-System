import React,{useState} from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Profile from '../Profile/ProfileMenu';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';
// import { useLocation } from 'react-router';

//Navigation bar component
const Navbar = (props) => {
    
    const hamburger = () => {
        setHamburgerMenuOpen((opened) => !opened);
    };
    
    // const user = JSON.parse(localStorage.getItem('user'));
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
                            Administrator
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
                                <a
                                    href='/'
                                    className='block py-2 pl-3 pr-4 font-semibold hover:text-primary hover:border-b border-primary md:p-0'
                                    aria-current='page'
                                >
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#g'
                                    className='block py-2 pl-3 pr-4 font-semibold hover:text-primary hover:border-b border-primary md:p-0'
                                >
                                    Department
                                </a>
                            </li>
                            <li>
                                <AnchorLink
                                    href='#services'
                                    className='block py-2 pl-3 pr-4 font-semibold hover:text-primary hover:border-b border-primary md:p-0'
                                >
                                    Tithe
                                </AnchorLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
    );
};

export default Navbar;
