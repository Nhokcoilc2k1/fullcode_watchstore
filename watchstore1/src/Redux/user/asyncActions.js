import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCurrent } from "~/apis/user";
 
export const getCurrent = createAsyncThunk(
    'user/getCurrent',
    async(data, {rejectWithValue}) => {
        try {
            const response = await apiGetCurrent();
            // if(response.message === 'Invalid access token'){
            //     const rs = await apiRefreshToken();
            // }
        return response.rs;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)