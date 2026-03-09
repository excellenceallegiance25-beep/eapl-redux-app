import {
    Code as CodeIcon,
    Email as EmailIcon,
    Help as HelpIcon,
    Summarize as SummarizeIcon,
    Translate as TranslateIcon,
} from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../redux/slices/chatSlice';

const QuickActions = () => {
    const dispatch = useDispatch();

    const quickActions = [
        { label: 'Help with coding', icon: <CodeIcon />, prompt: 'Can you help me with a coding problem?' },
        { label: 'Explain concept', icon: <HelpIcon />, prompt: 'Explain machine learning in simple terms' },
        { label: 'Write email', icon: <EmailIcon />, prompt: 'Help me write a professional email' },
        { label: 'Translate text', icon: <TranslateIcon />, prompt: 'Translate this text to Spanish:' },
        { label: 'Summarize', icon: <SummarizeIcon />, prompt: 'Summarize this article for me' },
    ];

    const handleActionClick = (prompt) => {
        dispatch(sendMessage(prompt));
    };

    return (
        <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" gutterBottom>
                Quick Actions
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {quickActions.map((action, index) => (
                    <Chip
                        key={index}
                        icon={action.icon}
                        label={action.label}
                        onClick={() => handleActionClick(action.prompt)}
                        size="small"
                        variant="outlined"
                        sx={{
                            '&:hover': {
                                bgcolor: 'primary.light',
                                color: 'primary.contrastText',
                            },
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default QuickActions;