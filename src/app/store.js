import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import questionReducer from '../features/questionSlice'
import likeReducer from '../features/likeSlice'
export default configureStore({
    reducer: {
        user:userReducer,
        question:questionReducer,
        like: likeReducer
    },
})