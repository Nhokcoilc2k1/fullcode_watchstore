import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetOrderByUser } from "~/apis/product";

export const getOrderOfUser = createAsyncThunk(
    'orders/getOrderOfUser',
    async(data, {rejectWithValue}) => {
        try {
            const response = await apiGetOrderByUser();
        return response.orders;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)