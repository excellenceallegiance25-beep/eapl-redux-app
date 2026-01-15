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
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: "15px" }}>
                <Avatar sx={{ bgcolor: 'white', color: 'primary.main' }}>
                    <BotIcon />
                </Avatar>
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