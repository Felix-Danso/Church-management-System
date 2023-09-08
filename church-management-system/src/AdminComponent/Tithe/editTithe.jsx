import {Input, SelectInput} from "../ModalInput";
import {capitalizeWords, isEmpty, isName, isValidNumber, isValidPhoneNumber} from "../../Utility/formValidation";
import Loader from "../../Components/Loader";
import ModalButton from "../ModalButton";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editTithe, setEditModal} from "../../Slices/titheSlice";

const EditTithe = () => {
    const dispatch = useDispatch()
    const editTitheSelected = useSelector(state => state.tithes.editTithe)
    const [editTitheForm, setEditTitheForm] = useState({
        id: editTitheSelected.id,
        amount: editTitheSelected.amount,
    })

    const [editTitheErrors, setEditTitheErrors] = useState({
        id: '',
        amount: '',
    });

    const editStatus = useSelector((state) => state.tithes.editStatus)
    const isLoadingMembers = useSelector((state) => state.tithes.isLoadingMembers)
    const memberOptions = useSelector((state) => state.tithes.memberOptions)

    const checkErrors = () => {
        if(editTitheErrors.id || editTitheErrors.amount
            || !editTitheForm.id || !editTitheForm.amount
        ) {
            setEditTitheErrors({id: isEmpty(editTitheForm.id),
                amount: isValidNumber(editTitheForm.amount)
            })
            return true
        } else {
            return false;
        }
    }
    const handleEditTithe = (event) => {
        event.preventDefault()
        if(!checkErrors()) {
            dispatch(editTithe(editTitheForm))
        }
    }
    return (
        <form onSubmit={handleEditTithe}>
            <div className='space-y-5'>
                <SelectInput label="Member" value={editTitheForm.church_member_id}
                             onChange={(event) => {
                                 setEditTitheForm({...editTitheForm, id: event.target.value})
                                 setEditTitheErrors({...editTitheErrors, id: isEmpty(event.target.value)})
                             }}
                             error={editTitheErrors.id}
                             isLoading={isLoadingMembers}
                             options={memberOptions}
                             placeholder={'Please select a member'}
                />
                <Input label="Amount (GH₵)" type="text" value={editTitheForm.amount}
                       onChange={(event) => {
                           setEditTitheForm({...editTitheForm, amount: parseFloat(event.target.value.trim()).toFixed(2)})
                           setEditTitheErrors({...editTitheErrors, amount: isValidNumber(capitalizeWords(event.target.value))})
                       }}
                       error={editTitheErrors.amount}
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

export default EditTithe
