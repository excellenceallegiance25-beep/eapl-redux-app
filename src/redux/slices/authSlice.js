// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function for sessionStorage
const getSessionStorageItem = (key, defaultValue = null) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing sessionStorage item "${key}":`, error);
    return defaultValue;
  }
};

const initialState = {
  user: getSessionStorageItem('user'),
  token: sessionStorage.getItem('token') || null,
  isAuthenticated: !!sessionStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;

      const fullUser = action.payload.user;

      const safeUser = {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        role: fullUser.role
      };

      state.user = safeUser;
      state.token = action.payload.token;

      try {
        // Store in sessionStorage (clears when browser closes)
        sessionStorage.setItem('token', action.payload.token);
        sessionStorage.setItem('user', JSON.stringify(safeUser));
      } catch (error) {
        console.error('Error storing auth data in sessionStorage:', error);
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      try {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing auth data from sessionStorage:', error);
      }
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;