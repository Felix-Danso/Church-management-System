const Card = (props) => {
    return (
        <div className='p-4 bg-[white] transition-shadow border-t-2 border-primary rounded-lg shadow-md'>
            <div className='flex mb-4 items-start gap-2'>
                <div className='flex flex-col items-center text-center h-full rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105'>
                    <span className={`${props.color} text-center rounded-full max-lg:p-2 p-2.5`}>
                        <img
                            className='w-6 h-6 max-lg:w-4 max-lg:h-4 text-black_alpha font-thin'
                            src={props.image}
                            alt='icon'
                        />
                    </span>
                </div>
                <div className='flex flex-col flex-shrink-0 space-y-2'>
                    <span className='text-gray_900 lg:text-lg xl:text-xl md:text-base sm:text-sm font-semibold'>
                        {props.title}
                    </span>
                    <span className='text-2xl text-gray_500'>{props.number}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
