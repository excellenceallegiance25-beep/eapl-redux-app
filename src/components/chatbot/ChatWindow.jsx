import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Paper,
    Box,
    Slide,
    Fade,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { closeChat } from '../../redux/slices/chatSlice';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';

const ChatWindow = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const messagesEndRef = useRef(null);
    const { isOpen, messages, isTyping } = useSelector((state) => state.chat);

    useEffect(() => {
        if (messagesEndRef.current && isOpen) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen, isTyping]);

    if (!isOpen) return null;

    if (isMobile) {
        return (
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <Paper
                    elevation={24}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1300,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 0,
                    }}
                >
                    <ChatHeader onClose={() => dispatch(closeChat())} />
                    <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <MessageList />
                        <div ref={messagesEndRef} />
                        <QuickActions />
                    </Box>
                    <ChatInput />
                </Paper>
            </Slide>
        );
    }

    return (
        <Fade in={isOpen}>
            <Paper
                elevation={16}
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 32,
                    width: 400,
                    height: 500,
                    maxHeight: '70vh',
                    zIndex: 1300,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    border: `1px solid ${theme.palette.divider}`,
                }}
            >
                <ChatHeader onClose={() => dispatch(closeChat())} />
                <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <MessageList />
                    <div ref={messagesEndRef} />
                    <QuickActions />
                </Box>
                <ChatInput />
            </Paper>
        </Fade>
    );
};

export default ChatWindow;