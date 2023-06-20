import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import React from 'react';
import { createPageList } from '../../Utility/createPaginationList';

//pagination component
const Pagination = (props) => {
    //function to move to next page in pagination
    const nextPage = () => {
        if (props.currentPage !== props.nPages) props.setCurrentPage(props.currentPage + 1);
    };

    //function to move to previous page in pagination
    const previousPage = () => {
        if (props.currentPage !== 1) props.setCurrentPage(props.currentPage - 1);
    };
    const pages = createPageList(props.pageNumbers.length, props.currentPage, 5);

    return (
        <div className='flex justify-center mt-4 px-4 py-3 sm:px-6'>
            <div className='flex justify-center'>
                <div>
                    <nav
                        className='isolate inline-flex text-gray_700 -space-x-px rounded-md border border-gray_200 text-sm shadow-sm'
                        aria-label='Pagination'
                    >
                        <button
                            className='relative gap-x-2 inline-flex items-center rounded-l-md border-r border-gray_200 px-2 py-2 text-sm'
                            onClick={previousPage}
                        >
                            <AiOutlineArrowLeft />
                            <span className='text-gray_800'>Previous</span>
                        </button>
                        {pages.map((pageNumber, index) => (
                            <React.Fragment key={pageNumber}>
                                {index > 0 && pages[index - 1] < pageNumber - 1 && (
                                    <span className='px-2'>...</span>
                                )}
                                <button
                                    className={`${
                                        props.currentPage === pageNumber
                                            ? 'bg-[#F9FAFB] text-white'
                                            : ''
                                    } relative z-10 inline-flex border-r border-gray_200 items-center px-4 py-2`}
                                    onClick={() => {
                                        props.setCurrentPage(pageNumber);
                                    }}
                                >
                                    {pageNumber}
                                </button>
                            </React.Fragment>
                        ))}
                        <button
                            className='relative gap-x-2 inline-flex items-center rounded-r-md px-2 py-2 text-sm'
                            onClick={nextPage}
                        >
                            <span className='text-gray_800'>Next</span>
                            <AiOutlineArrowRight />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
