import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Avatar,
    Tooltip,
    Badge,
} from '@mui/material';
import {
    Close as CloseIcon,
    SmartToy as BotIcon,
    Minimize as MinimizeIcon,
    Settings as SettingsIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { clearChat } from '../../redux/slices/chatSlice';

const ChatHeader = ({ onClose }) => {
    const dispatch = useDispatch();

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: '#2d87a0',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: "15px" }}>
                {/* <Box
                    sx={{
                        display: 'inline-flex',
                        color: '#ffff',
                        animation: 'subtleFloat 1s ease-in-out infinite',
                        transformOrigin: 'center 85%',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '130%',
                            height: '130%',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(25, 118, 210, 0.15) 0%, transparent 70%)',
                            animation: 'glowPulse 1s ease-in-out infinite',
                            zIndex: -1,
                        },
                        '@keyframes subtleFloat': {
                            '0%, 100%': {
                                transform: 'rotate(0deg) translateY(0px)',
                            },
                            '33%': {
                                transform: 'rotate(3deg) translateY(-2px)',
                            },
                            '66%': {
                                transform: 'rotate(-3deg) translateY(-1px)',
                            },
                        },
                        '@keyframes glowPulse': {
                            '0%, 100%': { opacity: 0.3 },
                            '50%': { opacity: 0.6 },
                        }
                    }}
                >
                    <BotIcon sx={{ fontSize: 28, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                </Box> */}

                <Box
                    sx={{
                        display: 'inline-flex',
                        background: 'linear-gradient(135deg, #033c98 0%, #be0735 100%)',
                        color: '#ffff',
                        borderRadius: '50%',
                        padding: 1,
                        animation: 'professionalBob 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                        '@keyframes professionalBob': {
                            '0%, 100%': {
                                transform: 'rotate(0deg) translateY(0)',
                                boxShadow: '10 4px 12px rgba(25, 118, 210, 0.3)',
                            },
                            '50%': {
                                transform: 'rotate(5deg) translateY(-4px)',
                                boxShadow: '10 8px 20px rgba(25, 118, 210, 0.4)'
                            },
                        },
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            animationPlayState: 'paused',
                            transform: 'scale(1.05)',
                            boxShadow: '0 8px 24px rgba(25, 118, 210, 0.5)',
                        },
                    }}
                >
                    <BotIcon sx={{ fontSize: 22 }} />
                </Box>

                <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        AI Assistant
                    </Typography>
                    {/* <Typography variant="caption" sx={{ opacity: 0.9 }}>
                        Online • Ready to help
                    </Typography> */}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title="Clear chat">
                    <IconButton
                        size="small"
                        sx={{ color: 'white' }}
                        onClick={() => dispatch(clearChat())}
                    >
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* <Tooltip title="Settings">
                    <IconButton size="small" sx={{ color: 'white' }}>
                        <SettingsIcon fontSize="small" />
                    </IconButton>
                </Tooltip> */}

                <Tooltip title="Close chat">
                    <IconButton
                        size="small"
                        sx={{ color: 'white' }}
                        onClick={onClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default ChatHeader;