import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        newProducts: [],
        isLoading: false,
        errorMessage: null,
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getNewProduct.pending, (state) => {
          state.isLoading = true;
        });
        builder.addCase(actions.getNewProduct.fulfilled, (state, action) => {
          state.isLoading = false;
          state.newProducts = action.payload;
        });
        builder.addCase(actions.getNewProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.errorMessage = action.payload.message;
        });
      },
})


// export const {} = appSlice.actions
export default productSlice.reducer

