import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';


export const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orderOfUser: [],
        isLoading: false,
        errorMessage: null,
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getOrderOfUser.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(actions.getOrderOfUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.orderOfUser = action.payload;
        });
        builder.addCase(actions.getOrderOfUser.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload.message;
        });
      },
  })

  // export const {} = appSlice.actions
export default orderSlice.reducer