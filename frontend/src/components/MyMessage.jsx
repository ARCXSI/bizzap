import React from 'react';
import { Box } from '@mui/material';

export default function MyMessage({ text, color }) {
    return (
        <div>
            <Box sx={{
                backgroundColor: color, // #69c9ab
                color: '#fff',
                width: '90%',
                textAlign: 'center',
                borderRadius: '5px',
                padding: '5px',
                margin: 'auto'
            }}>
                {text}
            </Box>
        </div>
    )
}