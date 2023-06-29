import React, { useState } from 'react'
import Button from '../Button'
import Modal from 'react-modal';
import { customStyles } from '../../Misc/modelStyle';
import { AiOutlineClose } from 'react-icons/ai';
import Input from '../../AdminComponent/ModalInput';
import ModalButton from '../ModalButton';
import { addNewMember } from '../Members/MembersSlice';
import { useDispatch } from 'react-redux';


const TitleAndCtas = (props) => {
  const dispatch = useDispatch()
    const [addMember, setAddMember] = useState(false);

  return (
    <div className='flex justify-between mr-8'>
        <h1 className='mt-5 text-2xl font-bold ml-14'>
            Dashboard
        </h1>
        <Button name="Add new members" onClick={() => {setAddMember(!addMember)} }/> 
        <Modal
    isOpen={addMember}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div className="flex flex-col justify-between max-w-md space-y-6 md:space-y-0 md:flex-row">
      <div>
        <h2 className="text-[#101828] font-semibold text-lg">
          Add New Members
        </h2>
      </div>
      <button
        onClick={() => setAddMember(!addMember)}
        className="text-[#667085] hover:text-[red]"
      >
        <AiOutlineClose />
      </button>
    </div>
    <div className='space-y-5'>
    <Input 
        label="Name"
        type="text"
        required
    />
    <Input 
      label="Department"
      type="text"
      required
    />
    <Input 
      label="Contact"
      type="number "
      required
    />
    <Input 
      label="Tithe"
      type="number"
      required
    />
    <Input 
      label="Date"
      type="date"
      required
    />
    </div>
    <div className='flex mt-5 space-x-5'>
        <ModalButton type="submit" name="Cancel" onClick={() => setAddMember(!addMember)}/>
        <ModalButton name="Save changes" color="#4044ED" text="white" onClick={() => {dispatch(addNewMember())}}/>
    </div>
  </Modal> 
    </div>
  )
}

export default TitleAndCtas
