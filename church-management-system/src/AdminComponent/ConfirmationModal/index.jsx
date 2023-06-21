import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../../Misc/Loader';
import { GrClose } from 'react-icons/gr';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
    return (
        <div>
            <BootstrapDialog
                onClose={props.onClose}
                aria-labelledby='customized-dialog-title'
                open={props.openModal}
                style={{
                    backdropFilter: props.openModal ? 'blur(2.5px)' : '',
                    backgroundColor: props.openModal ? 'rgba(52, 64, 84, 0)' : '',
                }}
            >
                <BootstrapDialogTitle id='customized-dialog-title' onClose={props.onClose}>
                    <div className="flex justify-between">
                    <span className='text-[#101828] text-lg font-semibold'>{props.title}</span>
                    <span 
                        className='text-gray_700 hover:text-primary text-base font-semibold cursor-pointer'
                        onClick={props.onClickDecline}
                    ><GrClose/></span>
                    </div>
                </BootstrapDialogTitle>
                <div className='mr-4 ml-4 text-gray_500 text-sm'>
                    <span>{props.description}</span>
                </div>
                <div className='mr-4 ml-4 mt-8 mb-7 flex gap-3 self-center'>
                    {props.isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <button
                                onClick={props.onClickDecline}
                                className='w-40 h-12 rounded-lg text-gray_700 border border-gray_300 '
                            >
                                {props.decline}
                            </button>
                            <button
                                onClick={props.onClickAccept}
                                className='bg-[#D92D20] w-40 h-12 font-thin rounded-lg text-[white]'
                            >
                                {props.accept}
                            </button>
                        </>
                    )}
                </div>
            </BootstrapDialog>
        </div>
    );
}
