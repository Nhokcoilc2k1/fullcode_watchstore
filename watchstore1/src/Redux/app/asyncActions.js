import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategory } from "~/apis";
 
export const getCategories = createAsyncThunk(
    'app/getCategories',
    async(data, {rejectWithValue}) => {
        try {
            const response = await apiGetCategory();
        return response.categorys;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)