import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products:[],
    total:0,
    quantity:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        addProduct:(state,action)=>{
            state.products = [...state.products,action.payload]
            state.quantity +=1
            state.total += action.payload.price * action.payload.quantity
        },
        reset:(state,action)=>{
            state = initialState
        }
    }
})

export const {addProduct,reset} = cartSlice.actions
export default cartSlice.reducer

