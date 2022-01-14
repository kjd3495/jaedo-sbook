  
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading:true
  },
  reducers: {
    login: (state, action) => {

      state.user = action.payload;
    },
    logout: state => {
      state.user = null;
    },
    loadingState: (state,action) =>{
      state.loading = action.payload;
    }
  },
});

export const { login, logout, loadingState } = userSlice.actions;



export const selectUser = state => state.user.user;
export const selectLoading = state => state.user.loading;

export default userSlice.reducer;