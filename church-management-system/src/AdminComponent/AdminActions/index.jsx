import React from 'react'
import SearchInput from '../SearchInput';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { customStyles } from '../../Misc/modelStyle';
import { setSearchField } from '../Members/MembersSlice';

const AdminActions = () => {
    const dispatch = useDispatch();
    const searchField = useSelector((state) => state.adminActions.searchField);
    // const isModalOpen = useSelector((state) => state.adminDoctors.isModalOpen);
    // console.log(store.getState().adminActions)

  return (
    <div>
    <div className='flex flex-col justify-between mt-8 ml-12 space-y-6 md:space-y-0 md:flex-row mr-9'>
        <SearchInput
            placeholder='Search doctor by name or email'
            value={searchField}
            onChange={(event) => dispatch(setSearchField(event.target.value))}
        />
        </div>
       <div>
        <Modal isOpen={""} style={customStyles} contentLabel='Example Modal'>
            <div className='flex flex-col justify-between ml-4 mr-4 space-y-6 md:space-y-0 md:flex-row'>
                <div>
                    <h2 className='text-[#101828] font-semibold text-lg'>Add new Member</h2>
                </div>
                <button
                    onClick={""}
                    className='text-[#667085] hover:text-[red]'
                >
                </button>
            </div>
            </Modal>
                </div>
            </div>

);
};

export default AdminActions 
