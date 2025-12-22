// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to safely parse localStorage data
const getLocalStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    return defaultValue;
  }
};

const initialState = {
  user: getLocalStorageItem('user'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
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

      // ✅ MINIMAL USER OBJECT
      const safeUser = {
        id: fullUser.id,
        name: fullUser.name,
        email: fullUser.email,
        role: fullUser.role
      };

      state.user = safeUser;
      state.token = action.payload.token;

      try {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(safeUser));
      } catch (error) {
        console.error('Error storing auth data in localStorage:', error);
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
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing auth data from localStorage:', error);
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