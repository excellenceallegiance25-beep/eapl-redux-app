import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Avatar,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Person as PersonIcon,
    SmartToy as BotIcon,
    ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const MessageItem = ({ message }) => {
    const theme = useTheme();
    const isAI = message.sender === 'ai';
    const isError = message.isError;

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isAI ? 'flex-start' : 'flex-end',
                mb: 2,
            }}
        >
            <Box sx={{ maxWidth: '85%' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        flexDirection: isAI ? 'row' : 'row-reverse',
                    }}
                >
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: isAI
                                ? isError
                                    ? theme.palette.error.main
                                    : theme.palette.secondary.main
                                : theme.palette.primary.main,
                        }}
                    >
                        {isAI ? <BotIcon /> : <PersonIcon />}
                    </Avatar>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: isAI
                                ? isError
                                    ? 'error.light'
                                    : 'grey.50'
                                : theme.palette.primary.main,
                            color: isAI ? 'text.primary' : 'white',
                            border: isAI
                                ? `1px solid ${isError ? theme.palette.error.light : theme.palette.divider}`
                                : 'none',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}
                        >
                            {message.content}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderTop: `1px solid ${isAI
                                    ? theme.palette.divider
                                    : 'rgba(255,255,255,0.2)'}`,
                            }}
                        >
                            <Typography
                                variant="caption"
                                height="10px"
                                sx={{
                                    color: isAI ? 'text.secondary' : 'rgba(255,255,255,0.7)',

                                }}
                            >
                                {formatTime(message.timestamp)}
                            </Typography>

                            {isAI && (
                                <Tooltip title="Copy">
                                    <IconButton
                                        size="small"
                                        onClick={handleCopy}
                                        sx={{
                                            color: isAI ? 'text.secondary' : 'rgba(255,255,255,0.7)',
                                            '&:hover': {
                                                color: isAI ? 'text.primary' : 'white',
                                            },
                                        }}
                                    >
                                        <CopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default MessageItem;