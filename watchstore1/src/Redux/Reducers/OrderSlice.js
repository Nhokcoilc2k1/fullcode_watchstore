import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./UserSlice";
import { cartClearItems } from "./CartSlice";

// CREATE ORDER
export const createOrder = createAsyncThunk(
    'orderCreate/createOrder',
    async(order, {getState, rejectWithValue, dispatch}) => {
        try {
            const {
                userLogin: {userInfo},
            } = getState();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const response = await axios.post('http://localhost:5000/api/orders', order, config);
            dispatch(cartClearItems());
            return response.data;
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if(message === 'Not authorized, token failed'){
              dispatch(logout());
            } 
          return rejectWithValue(message);
        }
    }
)

const orderCreateSlice = createSlice({
    name: 'orderCreate',
    initialState: {},
    reducers:{
      orderCreateReset: () => {},
    },
    extraReducers:(builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
          state.loading = true;
        })  
        .addCase(createOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.order = action.payload;
          localStorage.removeItem('cartItems');
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
      } 
})

// ORDER USER LIST
export const getOderDetails = createAsyncThunk(
  'orderDetails/getOderDetails',
  async(id,{getState, dispatch, rejectWithValue} ) => {
    try {
      const {
        userLogin: {userInfo},
    } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await axios.get(`http://localhost:5000/api/orders/${id}`, config);
      return response.data;
    } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      return rejectWithValue(message)
    }
  }
)

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    loading: true,
    orderOfUser: null,
    error: '',
  },
  extraReducers:(builder) => {
    builder
    .addCase(getOderDetails.pending, (state) => {
      state.loading = true;
    })  
    .addCase(getOderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.orderOfUser = action.payload;
      localStorage.setItem('orderOfUser', JSON.stringify(action.payload));
    })
    .addCase(getOderDetails.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.orderOfUser = action.payload;
    })
  }  
})

// ORDER DELETE
export const deleteOrder = createAsyncThunk(
  'orderDelete/deleteOrder',
  async(orderId, thunkAPI) => {
    try {
      const {userLogin : {userInfo}} = thunkAPI.getState();

      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`, config)
      return response.data;
    } catch (error) {
      const message = error.response.data;
      if(message === 'Not authorized, token failed'){
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }

  }
)

const orderDeleteSlice = createSlice({
  name: 'orderDelete',
  initialState: {},
  extraReducers:(builder) => {
    builder
    .addCase(deleteOrder.pending, (state) => {
      state.loading = true;
    })  
    .addCase(deleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(deleteOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }  
})

// ORDER LIST ALL
export const getOrderAll = createAsyncThunk(
  'orderList/getOrderAll',
  async(thunkAPI) => {
    try {
      const {userLogin : {userInfo}} = thunkAPI.getState();

      const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const response = await axios.get(`http://localhost:5000/api/orders`, config)
      return response.data;
    } catch (error) {
      const message = error.response.data
      if(message === 'Not authorized, token failed'){
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const orderListSlice = createSlice({
  name: 'orderList',
  initialState: {
    loading: true,
    orders: [],
    error: '',
  },
  extraReducers:(builder) => {
    builder
    .addCase(getOrderAll.pending, (state) => {
      state.loading = true;
    })  
    .addCase(getOrderAll.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload
    })
    .addCase(getOrderAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }  
})


const {reducer : orderCreateReducer} = orderCreateSlice;
const {reducer: orderDetailsReducer } = orderDetailsSlice;
const {reducer: orderDeleteReducer} = orderDeleteSlice;
const {reducer: orderListReducer} = orderListSlice;
export const {orderCreateReset} = orderCreateSlice.actions;
export  {orderCreateReducer, orderDetailsReducer, orderDeleteReducer, orderListReducer} ;