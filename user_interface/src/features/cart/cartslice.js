import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        totalCost: 0
    },
    reducers: {
        addProduct: (state, action) => {
            let product = state.products.find((product)=> product._id === action.payload._id)
            if(!product){
                state.products.push(action.payload);

                state.totalCost = state.totalCost + parseInt(action.payload.originalPrice);
            }  
        },
        deleteProduct:(state, action) => {
            let product = state.products.find((product) => product._id === action.payload );
            state.totalCost = state.totalCost - product.originalPrice
            state.products = state.products.filter((product) => product._id !== action.payload)
        },
        deletecart: (state, action) => {
             state.products.length = 0
             state.totalCost = 0   
        },
        totalProductCost: (state, action) => {
            for(let i =0 ; i < state.products.length; i++) {
                state.totalCost = state.totalCost + state.products[i].originalPrice;
            }
        }
    }
});
export const { addProduct, deleteProduct, deletecart } = cartSlice.actions;
export default cartSlice.reducer;
