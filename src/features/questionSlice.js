import { createSlice } from '@reduxjs/toolkit';

export const questionSlice = createSlice({
    name:'answer',
    initialState:{
    questionId:null,
    questionName: null,
   
    },
    reducers: {
    setQuestionInfo: (state, action)=> {
        state.questionId= action.payload.questionId
        state.questionName=action.payload.questionName
       

    } 
  } 
});

export const { setQuestionInfo } = questionSlice.actions;


export const selectQuestionId = state => state.answer.questionId;
export const selectQuestionName = state => state.answer.questionName;


export default questionSlice.reducer;
