import {customStyles} from "../../Misc/modelStyle";
import {editMember, setEditModal} from "../Members/MembersSlice";
import {AiOutlineClose} from "react-icons/ai";
import {Input, SelectInput} from "../ModalInput";
import {capitalizeWords, isEmpty, isName, isValidPhoneNumber} from "../../Utility/formValidation";
import Loader from "../../Components/Loader";
import ModalButton from "../ModalButton";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const EditMember = () => {
    const dispatch = useDispatch()
    const editMemberSelected = useSelector(state => state.adminMembers.editMember)
    const [editMemberForm, setEditMemberForm] = useState({
        church_member_id: editMemberSelected.id,
        full_name: editMemberSelected.full_name,
        department_id: editMemberSelected.department__id,
        contact: editMemberSelected.contact,
        is_paid: 'False'
    })

    const [editMemberErrors, setEditMemberErrors] = useState({
        full_name: '',
        department: '',
        contact: '',
    });
    const departmentsStatus = useSelector(state => state.departments.status)
    const departmentsOptions = useSelector(state => state.departments.departmentOptions)
    const editMemberStatus = useSelector((state) => state.adminMembers.editMemberStatus)

    const checkErrors = () => {
        if(editMemberErrors.contact || editMemberErrors.full_name || editMemberErrors.department
            || !editMemberForm.full_name || !editMemberForm.department_id || !editMemberForm.contact
        ) {
            setEditMemberErrors({full_name: isName(editMemberForm.full_name),
                contact: isValidPhoneNumber(editMemberForm.contact),
                department: isEmpty(editMemberForm.department_id)
            })
            return true
        } else {
            return false;
        }
    }
    const handleEditMember = (event) => {
        event.preventDefault()
        if(!checkErrors()) {
            dispatch(editMember(editMemberForm))
        }
    }
    return (
            <form onSubmit={handleEditMember}>
                <div className='space-y-5'>
                    <Input label="Name" type="text" value={editMemberForm.full_name} capitalize={true}
                           onChange={(event) => {
                               setEditMemberForm({...editMemberForm, full_name: capitalizeWords(event.target.value)})
                               setEditMemberErrors({...editMemberErrors, full_name: isName(capitalizeWords(event.target.value))})
                           }}
                           error={editMemberErrors.full_name}
                    />
                    <SelectInput label="Department" value={editMemberForm.department_id}
                                 onChange={(event) => {
                                     setEditMemberForm({...editMemberForm, department_id: event.target.value})
                                     setEditMemberErrors({...editMemberErrors, department: isEmpty(event.target.value)})
                                 }}
                                 error={editMemberErrors.department}
                                 isLoading={departmentsStatus}
                                 options={departmentsOptions}
                                 placeholder={'Please select a department'}
                    />
                    <Input label="Contact" type="text" value={editMemberForm.contact}
                           onChange={(event) => {
                               setEditMemberForm({...editMemberForm, contact: event.target.value})
                               setEditMemberErrors({...editMemberErrors, contact: isValidPhoneNumber(event.target.value)})
                           }}
                           error={editMemberErrors.contact}
                    />
                </div>
                <div className='flex mt-5 items-center justify-center space-x-5'>
                    { editMemberStatus === 'loading' ?
                        <Loader/>
                        :
                        <>
                            <ModalButton onClick={() => dispatch(setEditModal())} type="button" name="Cancel"/>
                            <ModalButton type="submit" name="Update" color="#4044ED" text="white"/>
                        </>
                    }
                </div>
            </form>
    )
}

export default EditMember
