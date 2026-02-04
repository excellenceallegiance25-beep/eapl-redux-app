import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Fab, Badge, Zoom, useTheme, useMediaQuery } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { toggleChat } from '../../redux/slices/chatSlice';
import ChatWindow from './ChatWindow';

const ChatBotWidget = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { isOpen, unreadCount } = useSelector((state) => state.chat);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggleChat = () => {
        dispatch(toggleChat());
    };

    return (
        <>
            <ChatWindow />

            <Zoom in={!isOpen && isVisible}>
                <Fab
                    color="primary"
                    variant={isMobile ? "circular" : "extended"}
                    onClick={handleToggleChat}
                    sx={{
                        position: 'fixed',
                        bottom: 60,
                        right: 10,
                        zIndex: 1000,
                        boxShadow: theme.shadows[8],
                        '&:hover': {
                            boxShadow: theme.shadows[12],
                        },
                    }}
                >
                    <Badge badgeContent={unreadCount} color="error">
                        {isMobile ? <SmartToyIcon /> : <SmartToyIcon sx={{ mr: 1 }} />}
                    </Badge>
                    {!isMobile && 'AI Assistant'}
                </Fab>
            </Zoom>
        </>
    );
};

export default ChatBotWidget;