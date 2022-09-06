import {configureStore, Store} from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

const store:Store = configureStore({
    reducer:{
        cart:cartReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch