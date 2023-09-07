import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDots} from 'react-icons/bs';
import {GoPrimitiveDot} from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import CustomizedDialogs from '../ConfirmationModal';
import {customStyles} from "../../Misc/modelStyle";
import Modal from "react-modal";
import {
    deleteDepartment,
    setDeleteModal,
    setEditDepartment,
    setEditModal
} from "../../Slices/departmentSlice";
import Loader from "../../Components/Loader";
import EditDepartment from "./editDepartment";

const DepartmentsTable = (props) => {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const deleteModal = useSelector((state) => state.departments.deleteModal);
    const deleteStatus = useSelector((state) => state.departments.deleteStatus);
    const isEditModalOpen = useSelector((state) => state.departments.isEditModalOpen);
    const isLoading = useSelector((state) => state.departments.status)
    //function to display sub menu of doctors
    const menuTrigger = (id) => {
        if (menuOpen === id) {
            setMenuOpen(null);
        } else {
            setMenuOpen(id);
        }
    };

    //A function to close profile menu onclick outside element
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
                        {isLoading === 'loading' ?
                            <div className="h-20 flex justify-center items-center">
                                <Loader/>
                            </div>
                            :
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
                                {props.departments.map((department) => {
                                    return(
                                        <tr key={department.id} className='border-b border-gray_200'>
                                            <td
                                                className='px-6 py-4 cursor-pointer whitespace-nowrap'
                                            >
                                                <div className='flex items-center'>
                                                    <div className='ml-4'>
                                                        <div className='text-sm text-gray_900 font-bold`'>
                                                            {department.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='text-sm text-gray_500'>
                                                    {department.leader}

                                                </div>
                                            </td>
                                            <td className='px-6 py-4 text-sm text-gray_500 whitespace-nowrap'>
                                                {department.contact}
                                            </td>
                                            <td className='px-6 py-4 text-sm text-gray_500 whitespace-nowrap'>
                                                {department.created_at}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                            <span
                                                className={`inline-flex items-center gap-x-1 px-4 py-2 text-xs leading-5 ${
                                                    department.status === 'Active'
                                                        ? 'text-[#027A48] bg-[#ECFDF3]'
                                                        : 'text-[#B42318] bg-[#FEF3F2]'
                                                } rounded-full`}
                                            >
                                                <span>
                                                    <GoPrimitiveDot />
                                                </span>
                                                <span>
                                                {department.status}
                                                </span>
                                            </span>
                                            </td>
                                            <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'>
                                                <div className='cursor-pointer'>
                                                    <BsThreeDots
                                                        color='#344054'
                                                        onClick={() => menuTrigger(department.id)}
                                                    />
                                                </div>
                                                {menuOpen === department.id ? (
                                                    <ul
                                                        ref={wrapperRef}
                                                        className='z-[100] absolute w-40 -translate-x-40 space-y-2 text-gray_600 bg-[white] border-[#F2F4F7] rounded-lg shadow-lg'
                                                        onBlur={() => setMenuOpen(null)}
                                                    >
                                                        <li
                                                            onClick={() => {
                                                                dispatch(setEditDepartment(department))
                                                                dispatch(setEditModal());
                                                                setMenuOpen(false);
                                                            }}
                                                            className='flex ml-3 border-b cursor-pointer border-gray_200 text-gray_700'
                                                        >
                                                            <div className='inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md border-gray2'>
                                                                Edit
                                                            </div>
                                                        </li>
                                                        <li
                                                            onClick={() => {
                                                                dispatch(setDeleteModal(department.id));
                                                                setMenuOpen(false);
                                                            }}
                                                            className='flex ml-3 border-b cursor-pointer border-gray_200 text-gray_700'
                                                        >
                                                            <div className='inline-flex items-center w-full px-2 py-1 text-sm transition-colors duration-150 rounded-md border-gray2'>
                                                                Delete Department
                                                            </div>
                                                        </li>
                                                    </ul>
                                                ) : (
                                                    <></>
                                                )}
                                            </td>
                                            {deleteModal === department.id ? (
                                                <div>
                                                    <CustomizedDialogs
                                                        openModal={deleteModal}
                                                        isLoading={deleteStatus === 'loading'}
                                                        title='Delete Department?'
                                                        onClose={() => dispatch(setDeleteModal(null))}
                                                        accept='Yes, Delete'
                                                        decline='Cancel'
                                                        description={
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: `<span>Deleting <span class="font-bold">${department.name}</span><br> Are you sure of this?</span>`,
                                                                }}
                                                            />
                                                        }
                                                        onClickAccept={() =>
                                                            dispatch(deleteDepartment(department.id))
                                                        }
                                                        onClickDecline={() =>
                                                            dispatch(setDeleteModal(null))
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        }
                        {((props.departments.length <= 0) && isLoading !== 'loading') &&
                            <div className="h-20 flex items-center justify-center text-center">
                                <span>No departments founds</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isEditModalOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <EditDepartment/>
            </Modal>
        </div>

    )
}

export default DepartmentsTable
