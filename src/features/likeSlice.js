import { createSlice } from '@reduxjs/toolkit';

export const likeSlice = createSlice({
    name:'like',
    initialState : {
        like:0,
        dislike: 0 
    },
    reducers: {
        setLike: state => {
            state.like ++;
        },
        setDislike: state=> {
            state.dislike ++;
        }
        
    },



});
export const {setLike,setDislike} = likeSlice.actions;

export const selectLike = state => state.like.like;

export const selectDislike = state => state.like.dislike;

export default likeSlice.reducer;