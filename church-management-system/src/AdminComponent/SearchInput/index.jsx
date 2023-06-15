import { FiSearch } from 'react-icons/fi';

// component to search by input
const SearchInput = (props) => {
    return (
        <div className=' w-72'>
            <div className='max-w-md mx-auto border rounded-lg border-gray_300'>
                <div className='relative flex items-center w-full h-10 rounded-lg overflow-hidden'>
                    <div className='grid place-items-center h-full w-12 text-gray-300'>
                        <FiSearch color='#667085' />
                    </div>
                    <input
                        className='h-full w-full outline-none text-sm text-gray-700 pr-2'
                        type='text'
                        id='search'
                        placeholder={props.placeholder}
                        value={props.searchField}
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchInput;
