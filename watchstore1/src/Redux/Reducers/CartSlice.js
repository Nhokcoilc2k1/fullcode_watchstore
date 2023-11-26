const { createSlice } = require("@reduxjs/toolkit");


const cartSlide = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        shippingAddress: {},
    },
    reducers: {
        addCartItem : (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.productId === item.productId);

            if(existItem){
                existItem.quantity += 1;
            }else{
                state.cartItems.push(item);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        decreaseCartItem: (state, action) => {
            const productId = action.payload;
            const existingItem = state.cartItems.find((x) => x.productId === productId);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1; // Giảm số lượng sản phẩm
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        increaseCartItem: (state, action) => {
            const productId = action.payload;
            const existingItem = state.cartItems.find((x) => x.productId === productId);

            if (existingItem && existingItem.quantity < existingItem.totalQyt) {
                existingItem.quantity += 1; // Tăng số lượng sản phẩm
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeCartItem: (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.productId !== productId);

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
        },
        cartClearItems: (state, action) => {
            state.cartItems = [];
        }

    }
})


const {reducer: CartReducer} = cartSlide;
export const {addCartItem, removeCartItem , decreaseCartItem, increaseCartItem, saveShippingAddress, cartClearItems} = cartSlide.actions;
export default CartReducer;
