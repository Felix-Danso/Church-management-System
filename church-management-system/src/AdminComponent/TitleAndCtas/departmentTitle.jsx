import React, {useEffect, useState} from 'react'
import Button from '../Button'
import Modal from 'react-modal';
import { customStyles } from '../../Misc/modelStyle';
import { AiOutlineClose } from 'react-icons/ai';
import {Input, SelectInput} from '../ModalInput';
import ModalButton from '../ModalButton';
import {fetchMembers, setIsModalOpen} from '../Members/MembersSlice';
import {useDispatch, useSelector} from 'react-redux';
import {capitalizeWords, isEmpty, isName, isValidPhoneNumber} from "../../Utility/formValidation";
import {addNewDepartment, fetchAllDepartments, setIsAddModalOpen} from "../../Slices/departmentSlice";
import Loader from "../../Components/Loader";


const DepartmentTitle = (props) => {
    const dispatch = useDispatch()
    const [addDepartmentForm, setAddDepartmentForm] = useState({
        name: '',
        leader: '',
        contact: '',
    })

    const [addDepartmentErrors, setAddDepartmentErrors] = useState({
        name: '',
        leader: '',
        contact: '',
    });
    useSelector(state => state.departments.status);
    useSelector(state => state.departments.departmentOptions);
    const addDepartmentStatus = useSelector((state) => state.departments.isAdding)
    const isModalOpen = useSelector((state) => state.departments.isAddModalOpen)
    const memberOptions = useSelector((state) => state.adminMembers.memberOptions)
    const memberOptionsStatus = useSelector((state) => state.adminMembers.memberOptionsStatus)

    useEffect(() => {
        setAddDepartmentForm({
            name: '',
            leader: '',
            contact: '',
        })
        setAddDepartmentErrors({
            name: '',
            leader: '',
            contact: '',
        })
    }, [isModalOpen]);

    const checkErrors = () => {
        if(addDepartmentErrors.contact || addDepartmentErrors.name || addDepartmentErrors.leader
            || !addDepartmentForm.name || !addDepartmentForm.leader || !addDepartmentForm.contact
        ) {
            setAddDepartmentErrors({name: isName(addDepartmentForm.name),
                contact: isValidPhoneNumber(addDepartmentForm.contact),
                leader: isName(addDepartmentForm.leader)
            })
            return true
        } else {
            return false;
        }
    }

    const handleAddDepartment = (event) => {
        event.preventDefault()
        if(!checkErrors()) {
            dispatch(addNewDepartment(addDepartmentForm))
        }
    }


    return (
        <div className='flex justify-between mr-8'>
            <h1 className='mt-5 text-2xl font-bold ml-14'>
                Church Departments
            </h1>
            <Button name="Add New Department" onClick={() => {
                dispatch(fetchMembers())
                dispatch(setIsAddModalOpen())} }/>
            <Modal
                isOpen={isModalOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className="flex flex-col justify-between max-w-md space-y-6 md:space-y-0 md:flex-row">
                    <div>
                        <h2 className="text-[#101828] font-semibold text-lg">
                            Add New Department
                        </h2>
                    </div>
                    <button
                        onClick={() =>  dispatch(setIsAddModalOpen())}
                        className="text-[#667085] hover:text-[red]"
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                <form onSubmit={handleAddDepartment}>
                    <div className='space-y-5'>
                        <Input label="Department Name" type="text" value={addDepartmentForm.name} capitalize={true}
                               onChange={(event) => {
                                   setAddDepartmentForm({...addDepartmentForm, name: capitalizeWords(event.target.value)})
                                   setAddDepartmentErrors({...addDepartmentErrors, name: isName(capitalizeWords(event.target.value))})
                               }}
                               error={addDepartmentErrors.name}
                        />
                        <SelectInput label="Select leader" value={addDepartmentForm.leader}
                                     onChange={(event) => {
                                         setAddDepartmentForm({...addDepartmentForm, leader: event.target.value})
                                         setAddDepartmentErrors({...addDepartmentErrors, leader: isEmpty(event.target.value)})
                                     }}
                                     error={addDepartmentErrors.leader}
                                     isLoading={memberOptionsStatus}
                                     options={memberOptions}
                                     placeholder={'Please select a leader'}
                        />
                        <Input label="Contact" type="text" value={addDepartmentForm.contact}
                               onChange={(event) => {
                                   setAddDepartmentForm({...addDepartmentForm, contact: event.target.value})
                                   setAddDepartmentErrors({...addDepartmentErrors, contact: isValidPhoneNumber(event.target.value)})
                               }}
                               error={addDepartmentErrors.contact}
                        />
                    </div>
                    <div className='flex mt-5 items-center justify-center space-x-5'>
                        { addDepartmentStatus === 'loading' ?
                            <Loader/>
                            :
                            <>
                                <ModalButton type="submit" name="Cancel"/>
                                <ModalButton name="Save changes" color="#4044ED" text="white"/>
                            </>
                        }
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default DepartmentTitle
