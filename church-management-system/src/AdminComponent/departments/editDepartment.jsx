import {Input} from "../ModalInput";
import {capitalizeWords, isName, isValidPhoneNumber} from "../../Utility/formValidation";
import Loader from "../../Components/Loader";
import ModalButton from "../ModalButton";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteDepartment, editDepartment, setEditModal} from "../../Slices/departmentSlice";

const EditDepartment = () => {
    const dispatch = useDispatch()
    const editDepartmentSelected = useSelector(state => state.departments.department)
    const [editDepartmentForm, setEditDepartmentForm] = useState({
        id: editDepartmentSelected.id,
        name: editDepartmentSelected.name,
        leader: editDepartmentSelected.leader,
        contact: editDepartmentSelected.contact,
    })

    const [editDepartmentErrors, setEditDepartmentErrors] = useState({
        name: '',
        leader: '',
        contact: '',
    });

    const editStatus = useSelector((state) => state.departments.editStatus)

    const checkErrors = () => {
        if(editDepartmentErrors.contact || editDepartmentErrors.name || editDepartmentErrors.leader
            || !editDepartmentForm.name || !editDepartmentForm.leader || !editDepartmentForm.contact
        ) {
            setEditDepartmentErrors({name: isName(editDepartmentForm.name),
                contact: isValidPhoneNumber(editDepartmentForm.contact),
                leader: isName(editDepartmentForm.leader)
            })
            return true
        } else {
            return false;
        }
    }
    const handleEditDepartment = (event) => {
        event.preventDefault()
        if(!checkErrors()) {
            dispatch(editDepartment(editDepartmentForm))
        }
    }
    return (
        <form onSubmit={handleEditDepartment}>
            <div className='space-y-5'>
                <Input label="Department Name" type="text" value={editDepartmentForm.name} capitalize={true}
                       onChange={(event) => {
                           setEditDepartmentForm({...editDepartmentForm, name: capitalizeWords(event.target.value)})
                           setEditDepartmentErrors({...editDepartmentErrors, name: isName(capitalizeWords(event.target.value))})
                       }}
                       error={editDepartmentErrors.name}
                />
                <Input label="Leader's Name" type="text" value={editDepartmentForm.leader} capitalize={true}
                       onChange={(event) => {
                           setEditDepartmentForm({...editDepartmentForm, leader: capitalizeWords(event.target.value)})
                           setEditDepartmentErrors({...editDepartmentErrors, leader: isName(capitalizeWords(event.target.value))})
                       }}
                       error={editDepartmentErrors.leader}
                />
                <Input label="Contact" type="text" value={editDepartmentForm.contact}
                       onChange={(event) => {
                           setEditDepartmentForm({...editDepartmentForm, contact: event.target.value})
                           setEditDepartmentErrors({...editDepartmentErrors, contact: isValidPhoneNumber(event.target.value)})
                       }}
                       error={editDepartmentErrors.contact}
                />
            </div>
            <div className='flex mt-5 items-center justify-center space-x-5'>
                { editStatus === 'loading' ?
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

export default EditDepartment
