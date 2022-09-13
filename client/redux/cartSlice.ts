import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Pizza } from '../types'

type Products={
  quantity:number
  price:number
} & Pizza

type initialStateType ={
products:Products[]
total:number
quantity:number
}

const initialState:initialStateType = {
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
        reset:(state,action:PayloadAction)=>{
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
})

export const {addProduct,reset} = cartSlice.actions
export default cartSlice.reducer

