import React from 'react'
import SearchInput from '../SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchField } from '../Members/MembersSlice';

const Search = () => {
    const dispatch = useDispatch();
    const searchField = useSelector((state) => state.adminActions.searchField);

  return (
    <div className='flex flex-col justify-between mt-8 ml-12 space-y-6 md:space-y-0 md:flex-row mr-9'>
        <SearchInput
            placeholder='Search doctor by name or email'
            value={searchField}
            onChange={(event) => dispatch(setSearchField(event.target.value))}
        />
    </div>
);
};

export default Search
