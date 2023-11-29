import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';

export const usertSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading:false,
        // currentCart: [],
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
            state.current = null
            state.isLoading = false
            state.message = ''
        },
        clearMessage: (state) => {
          state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
          state.isLoading = false;
          state.current = action.payload;
          state.isLoggedIn = true;
          // state.currentCart = action.payload.cart;
        });
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
          state.isLoading = false;
          state.current = null;
          state.isLoggedIn = false;
          state.token = null
          state.message = 'Phiên đăng nhập đã hết hạn hãy đăng nhập lại'
        });
      },
})

export const {login, logout, clearMessage} = usertSlice.actions
export default usertSlice.reducer

