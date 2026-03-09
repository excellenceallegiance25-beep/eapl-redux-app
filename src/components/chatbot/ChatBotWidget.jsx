import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Badge, Fab, Zoom, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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