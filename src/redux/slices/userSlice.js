import { createSlice } from '@reduxjs/toolkit';

// Load initial profile from localStorage if available
const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
const initialState = {
  profile: storedProfile || {
    name: '',
    email: '',
    phone: '',
    title: '',
    company: '',
    location: '',
    bio: '',
    skills: [],
    education: '',
    website: '',
    github: '',
    linkedin: '',
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = { ...state.profile, ...action.payload };
      // Update localStorage
      localStorage.setItem('userProfile', JSON.stringify(state.profile));
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
});

// Export both the reducer and the action creators
export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  clearUserError,
} = userSlice.actions;

// Export individual action creators for convenience
export const updateProfile = (profileData) => (dispatch) => {
  dispatch(updateProfileStart());
  try {
    // Simulate API call
    setTimeout(() => {
      dispatch(updateProfileSuccess(profileData));
    }, 1000);
  } catch (error) {
    dispatch(updateProfileFailure(error.message));
  }
};

export default userSlice.reducer;