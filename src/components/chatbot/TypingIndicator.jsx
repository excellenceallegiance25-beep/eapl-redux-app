import React from 'react';
import { Box } from '@mui/material';

const TypingIndicator = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1 }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        animation: 'typing 1.4s infinite',
                        '&:nth-of-type(2)': { animationDelay: '0.2s' },
                        '&:nth-of-type(3)': { animationDelay: '0.4s' },
                    }}
                />
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        animation: 'typing 1.4s infinite',
                        animationDelay: '0.2s',
                    }}
                />
                <Box
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        animation: 'typing 1.4s infinite',
                        animationDelay: '0.4s',
                    }}
                />
            </Box>

            <style>
                {`
          @keyframes typing {
            0%, 60%, 100% { opacity: 1; }
            30% { opacity: 0.3; }
          }
        `}
            </style>
        </Box>
    );
};

export default TypingIndicator;