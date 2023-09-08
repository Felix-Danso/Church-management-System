import React, { useState } from 'react'
import Button from '../Button'
import Modal from 'react-modal';
import { customStyles } from '../../Misc/modelStyle';
import { AiOutlineClose } from 'react-icons/ai';
import {Input, SelectInput} from '../ModalInput';
import ModalButton from '../ModalButton';
import {addNewMember, setIsModalOpen} from '../Members/MembersSlice';
import {useDispatch, useSelector} from 'react-redux';
import {capitalizeWords, isEmpty, isName, isValidPhoneNumber} from "../../Utility/formValidation";
import {fetchAllDepartments} from "../../Slices/departmentSlice";
import Loader from "../../Components/Loader";


const TitleAndCtas = (props) => {
    const dispatch = useDispatch()
    const [addMemberForm, setAddMemberForm] = useState({
        full_name: '',
        department_id: '',
        contact: '',
        is_paid: 'False'
    })

    const [addMemberErrors, setAddMemberErrors] = useState({
        full_name: '',
        department_id: '',
        contact: '',
        is_paid: 'False'
    });
    const departmentsStatus = useSelector(state => state.departments.status)
    const departmentsOptions = useSelector(state => state.departments.departmentOptions)
    const addMemberStatus = useSelector((state) => state.adminMembers.addMemberStatus)
    const isModalOpen = useSelector((state) => state.adminMembers.isModalOpen)

    const checkErrors = () => {
        if(addMemberErrors.contact || addMemberErrors.full_name || addMemberErrors.department_id
            || !addMemberForm.full_name || !addMemberForm.department_id || !addMemberForm.contact
        ) {
            setAddMemberErrors({full_name: isName(addMemberForm.full_name),
                contact: isValidPhoneNumber(addMemberForm.contact),
                department_id: isEmpty(addMemberForm.department_id)
            })
            return true
        } else {
            return false;
        }
    }

    const handleAddMember = (event) => {
        event.preventDefault()
        if(!checkErrors()) {
            dispatch(addNewMember(addMemberForm))
        }
    }


  return (
    <div className='flex justify-between mr-8'>
      <h1 className='mt-5 text-2xl font-bold ml-14'>
          Church Members
      </h1>
      <Button name="Add new members" onClick={() => {
          dispatch(fetchAllDepartments())
          dispatch(setIsModalOpen())} }/>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-col justify-between max-w-md space-y-6 md:space-y-0 md:flex-row">
          <div>
            <h2 className="text-[#101828] font-semibold text-lg">
              Add New Member
            </h2>
          </div>
          <button
            onClick={() =>  dispatch(setIsModalOpen())}
            className="text-[#667085] hover:text-[red]"
          >
            <AiOutlineClose />
          </button>
        </div>
          <form onSubmit={handleAddMember}>
            <div className='space-y-5'>
              <Input label="Name" type="text" value={addMemberForm.full_name} capitalize={true}
                 onChange={(event) => {
                     setAddMemberForm({...addMemberForm, full_name: capitalizeWords(event.target.value)})
                     setAddMemberErrors({...addMemberErrors, full_name: isName(capitalizeWords(event.target.value))})
                     }}
                 error={addMemberErrors.full_name}
              />
              <SelectInput label="Department" value={addMemberForm.department_id}
                onChange={(event) => {
                    setAddMemberForm({...addMemberForm, department_id: event.target.value})
                    setAddMemberErrors({...addMemberErrors, department_id: isEmpty(event.target.value)})
                }}
                error={addMemberErrors.department_id}
                isLoading={departmentsStatus}
                options={departmentsOptions}
                placeholder={'Please select a department'}
              />
                <Input label="Contact" type="text" value={addMemberForm.contact}
                       onChange={(event) => {
                           setAddMemberForm({...addMemberForm, contact: event.target.value})
                           setAddMemberErrors({...addMemberErrors, contact: isValidPhoneNumber(event.target.value)})
                       }}
                       error={addMemberErrors.contact}
                />
            </div>
            <div className='flex mt-5 items-center justify-center space-x-5'>
                { addMemberStatus === 'loading' ?
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

export default TitleAndCtas
