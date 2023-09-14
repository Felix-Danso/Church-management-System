const Button = (props) => {
    return (
        <button
            type={props.type}
            className={`w-[${props.width}] bg-[#4044ED] font-medium max-sm:font-normal rounded-lg text-base max-sm:px-1 px-5 py-2.5 text-center mr-3 md:mr-0 text-white`}
            onClick={props.onClick}
        >
            {props.name}
            
        </button>
    );
};

export default Button;
