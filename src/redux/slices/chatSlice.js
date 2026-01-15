// src/redux/slices/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API for demo - replace with your actual AI service
const mockAIResponse = async (message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
        greeting: "Hello! I'm your AI Assistant. How can I help you today?",
        coding: "I can help with coding questions. What specific language or framework are you working with?",
        general: "I understand you're asking: " + message + ". I can help with that!",
    };

    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        return responses.greeting;
    }
    if (message.toLowerCase().includes('code') || message.toLowerCase().includes('programming')) {
        return responses.coding;
    }
    return responses.general;
};

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (message, { rejectWithValue }) => {
        try {
            const response = await mockAIResponse(message);
            return { message: response };
        } catch (error) {
            return rejectWithValue('Failed to get AI response');
        }
    }
);

const initialState = {
    messages: [],
    isOpen: false,
    isLoading: false,
    isTyping: false,
    error: null,
    unreadCount: 0,
    settings: {
        soundEnabled: true,
        autoExpandCode: false,
    }
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        toggleChat: (state) => {
            state.isOpen = !state.isOpen;
            if (state.isOpen) {
                state.unreadCount = 0;
            }
        },
        addMessage: (state, action) => {
            state.messages.push({
                id: Date.now(),
                content: action.payload.content,
                sender: action.payload.sender,
                timestamp: new Date().toISOString(),
            });
        },
        clearChat: (state) => {
            state.messages = [];
        },
        closeChat: (state) => {
            state.isOpen = false;
        },
        updateSettings: (state, action) => {
            state.settings = { ...state.settings, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.isTyping = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isTyping = false;
                state.messages.push({
                    id: Date.now(),
                    content: action.payload.message,
                    sender: 'ai',
                    timestamp: new Date().toISOString(),
                });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isTyping = false;
                state.error = action.payload;
                state.messages.push({
                    id: Date.now(),
                    content: 'Sorry, I encountered an error. Please try again.',
                    sender: 'ai',
                    timestamp: new Date().toISOString(),
                    isError: true,
                });
            });
    },
});

export const { toggleChat, addMessage, clearChat, closeChat, updateSettings } = chatSlice.actions;
export default chatSlice.reducer;