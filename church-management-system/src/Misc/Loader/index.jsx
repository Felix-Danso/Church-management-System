import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';

const Loader = () => {
    return (
        <div className='flex justify-center'>
            <Box sx={{ color: '#6425D3' }}>
                <CircularProgress color='inherit'/>
            </Box>
        </div>
    );
};

export default Loader;
