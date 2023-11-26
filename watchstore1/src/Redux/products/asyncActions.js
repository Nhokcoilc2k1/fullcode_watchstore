import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "~/apis/product";
 
export const getNewProduct = createAsyncThunk(
    'products/getNewProduct',
    async(data, {rejectWithValue}) => {
        try {
            const response = await apiGetProducts({sort: '-createdAt'});
        return response.products;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

