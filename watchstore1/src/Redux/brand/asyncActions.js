import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetBrand } from "~/apis/brand";
 
export const getBrands = createAsyncThunk(
    'brand/getBrands',
    async(data, {rejectWithValue}) => {
        try {
            const response = await apiGetBrand();
        return response.brands;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)