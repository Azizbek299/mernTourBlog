import {configureStore} from '@reduxjs/toolkit'
import userSlice from './features/authSlice'
import tourSlice from './features/tourSlice'


export default configureStore({
    reducer: {
        auth:userSlice,
        tour:tourSlice
    }
})