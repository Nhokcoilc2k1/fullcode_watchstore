import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
//   });

// LOGIN
export const login = createAsyncThunk(
    'userLogin/login',
    async({ email, password },thunkAPI) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post("http://localhost:5000/api/users/login", {email, password}, config);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
)

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        loading: false,
        userInfo: null,
        error: null,
    },
    reducers:{
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
            localStorage.removeItem("orderOfUser");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("shippingAddress");
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(login.pending, (state) => {
            state.loading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
})

// REGISTER
export const register = createAsyncThunk(
  'userRegister/register',
  async({name, phone, email, password},{rejectWithValue}) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        }
        const response = await axios.post("http://localhost:5000/api/users", {name, phone, email, password}, config);

        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

// USER DETAIL
export const getUserDetail = createAsyncThunk(
  'userDetail/getUserDetail',
  async (id, {getState, rejectWithValue, dispatch}) => {

    try {
      const {userLogin: {userInfo}} = getState(); // cho phép truy cập vào trạng thái hiện tại của redux Store
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    };

    const response = await axios.get(`http://localhost:5000/api/users/${id}`, config);
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
    
    // if(response.status === 404){
    //   return rejectWithValue(response);
    // }
  }
)

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState:{
    loading: false,
    user: {},
    error: '',
  },
  reducers: {
    userDetailReset: (state) => {
      state.user = {};
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUserDetail.pending, (state) => {
      state.loading = true;
    })  
    .addCase(getUserDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(getUserDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
  }
})

// UPDATE PROFILE
export const updateUserProfile = createAsyncThunk(
  "userUpdateProfile/updateUserProfile",
  async(user, {getState, rejectWithValue}) => {
    const {userLogin: {userInfo} }= getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await axios.put('http://localhost:5000/api/users/profile', user, config);

    if(response.status === 401){
      return rejectWithValue(response);
    }

    // if (message === 'Not authorized, token failed') {
    //   dispatch(logout());
    // }

    return response.data;

  }
);

const userUpdateProfileSlice = createSlice({
  name: 'userUpdateProfile',
  initialState: {},
  extraReducers: (builder) => {
    builder
    .addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    })  
    .addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    })
    .addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  }
})

const {reducer: userLoginReducer} = userLoginSlice;
const { reducer: userRegisterReducer} = userRegisterSlice;
const {reducer: userDetailReducer} = userDetailSlice;
const {reducer: userUpdateProfileReducer} = userUpdateProfileSlice
export const {logout} = userLoginSlice.actions;
export {userLoginReducer, userRegisterReducer, userDetailReducer, userUpdateProfileReducer};