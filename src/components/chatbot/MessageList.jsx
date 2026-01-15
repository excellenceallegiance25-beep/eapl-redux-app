import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';

const MessageList = () => {
    const { messages, isTyping } = useSelector((state) => state.chat);

    return (
        <Box
            sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                '&::-webkit-scrollbar': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '3px',
                },
            }}
        >
            {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
        </Box>
    );
};

export default MessageList;