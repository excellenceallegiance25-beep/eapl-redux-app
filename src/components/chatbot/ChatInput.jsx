import {
    AttachFile as AttachFileIcon,
    Mic as MicIcon,
    Mood as MoodIcon,
    Send as SendIcon,
} from '@mui/icons-material';
import {
    IconButton,
    InputAdornment,
    Paper,
    TextField
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, sendMessage } from '../../redux/slices/chatSlice';

const ChatInput = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const { isLoading } = useSelector((state) => state.chat);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();

        dispatch(addMessage({
            content: userMessage,
            sender: 'user',
        }));

        setInput('');

        try {
            await dispatch(sendMessage(userMessage)).unwrap();
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderTop: `1px solid`,
                borderColor: 'divider',
                bgcolor: 'background.paper',
            }}
        >
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    disabled={isLoading}
                    InputProps={{
                        sx: { borderRadius: 2 },
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton size="small">
                                    <MoodIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton size="small">
                                    <AttachFileIcon />
                                </IconButton>
                                <IconButton size="small">
                                    <MicIcon />
                                </IconButton>
                                <IconButton
                                    type="submit"
                                    color="primary"
                                    disabled={!input.trim() || isLoading}
                                    sx={{ ml: 1 }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </Paper>
    );
};

export default ChatInput;