import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./UserSlice";

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// LIST PRODUCT
export const fetchProducts = createAsyncThunk(
    'productList/fetchProducts',
    async () => {
        const response = await api.get('/products');
        return response.data;
    }
)

const ProductSlice = createSlice({
    name: 'productList',
    initialState: {
      loading: false,
      products: [],
      error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload.products;
          state.paginationPro = action.payload.pagination;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        });
    },
})

// GET SINGLE PRODUCT
export const fetchSingleProducts = createAsyncThunk(
  'productDetail/fetchSingleProducts',
  async (id) => {
      const response = await api.get(`/products/${id}`);
      return response.data;
  }
)

const ProductSingleSlice = createSlice({
  name: 'productDetail',
  initialState: {
    loading: false,
    product: {},
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
})

// PRODUCT REVIEW CREATE
export const createProductReview = createAsyncThunk(
  'productReviewCreate/createProductReview',
  async(productId, review, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`http://localhost:5000/api/products/${productId}/review`, review, config);
    } catch (error) {
      const message = error.response.data;
      if (message === "Not authorized, token failed") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const productCreateReviewSlice = createSlice({
  name: "productReviewCreate",
  initialState:{},
  reducers: {
    productCreateReviewReset: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

// CREATE PRODUCT
export const createProduct = createAsyncThunk(
  'productCreate/createProduct',
  async( product, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`http://localhost:5000/api/products`, product, config);
    } catch (error) {
      const message = error.response.data;
      if (message === "Not authorized, token failed") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
)

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState:{},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.payload && action.payload.thumbnail) {
          state.thumbnail = action.payload.thumbnail;
        }
      });
  },
})

const { reducer: productReducer} = ProductSlice;
const {reducer: productDetailReducer} = ProductSingleSlice;
const {reducer: ProductCreateReviewReducer} = productCreateReviewSlice;
const {reducer: ProductCreateReducer} = productCreateSlice;
export const {productCreateReviewReset} = productCreateReviewSlice.actions;
export  {productReducer, productDetailReducer, ProductCreateReviewReducer, ProductCreateReducer};