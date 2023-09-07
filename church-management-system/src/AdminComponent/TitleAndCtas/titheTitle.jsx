import React, { useState } from 'react'
import Button from '../Button'
import Modal from 'react-modal';
import { customStyles } from '../../Misc/modelStyle';
import { AiOutlineClose } from 'react-icons/ai';
import {Input, SelectInput} from '../ModalInput';
import ModalButton from '../ModalButton';
import {useDispatch, useSelector} from 'react-redux';
import {capitalizeWords, isEmpty, isValidNumber} from "../../Utility/formValidation";
import Loader from "../../Components/Loader";
import {addNewTithe, fetchMembers, setIsAddModalOpen} from "../../Slices/titheSlice";


const TitheTitle = (props) => {
    const dispatch = useDispatch()
    const [addTitheForm, setAddTitheForm] = useState({
        church_member_id: '',
        amount: null,
    })

    const [addTitheErrors, setAddTitheErrors] = useState({
        church_member_id: '',
        amount: '',
    });

    const addTitheStatus = useSelector((state) => state.tithes.isAdding)
    const isLoadingMembers = useSelector((state) => state.tithes.isLoadingMembers)
    const isModalOpen = useSelector((state) => state.tithes.isAddModalOpen)
    const memberOptions = useSelector((state) => state.tithes.memberOptions)

    const checkErrors = () => {
        if(addTitheErrors.amount || addTitheErrors.church_member_id
            || !addTitheForm.church_member_id || !addTitheForm.amount
        ) {
            setAddTitheErrors({church_member_id: isEmpty(addTitheForm.church_member_id),
                amount: isValidNumber(addTitheForm.amount),
            })
            return true
        } else {
            return false;
        }
    }

    const handleAddTithe = (event) => {
        event.preventDefault()
        if(!checkErrors()) {
            // setAddTitheForm({...addTitheForm, amount: parseFloat(addTitheForm.amount)})
            dispatch(addNewTithe(addTitheForm))
        }
    }


    return (
        <div className='flex justify-between mr-8'>
            <h1 className='mt-5 text-2xl font-bold ml-14'>
                Church Tithes
            </h1>
            <Button name="Add New Tithe" onClick={() => {
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
                            Add New Tithe
                        </h2>
                    </div>
                    <button
                        onClick={() =>  dispatch(setIsAddModalOpen())}
                        className="text-[#667085] hover:text-[red]"
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                <form onSubmit={handleAddTithe}>
                    <div className='space-y-5 mt-2'>
                        <SelectInput label="Member" value={addTitheForm.church_member_id}
                                     onChange={(event) => {
                                         setAddTitheForm({...addTitheForm, church_member_id: event.target.value})
                                         setAddTitheErrors({...addTitheErrors, church_member_id: isEmpty(event.target.value)})
                                     }}
                                     error={addTitheErrors.church_member_id}
                                     isLoading={isLoadingMembers}
                                     options={memberOptions}
                                     placeholder={'Please select a member'}
                        />
                        <Input label="Amount (GH₵)" type="text" value={addTitheForm.amount}
                               onChange={(event) => {
                                   setAddTitheForm({...addTitheForm, amount: parseFloat(event.target.value.trim()).toFixed(2)})
                                   setAddTitheErrors({...addTitheErrors, amount: isValidNumber(capitalizeWords(event.target.value))})
                               }}
                               error={addTitheErrors.amount}
                        />
                    </div>
                    <div className='flex mt-5 items-center justify-center space-x-5'>
                        { addTitheStatus === 'loading' ?
                            <Loader/>
                            :
                            <>
                                <ModalButton type="button" onClick={() => setIsAddModalOpen()}  name="Cancel"/>
                                <ModalButton name="Save changes" color="#4044ED" text="white"/>
                            </>
                        }
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default TitheTitle
