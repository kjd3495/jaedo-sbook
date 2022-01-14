import './App.css';
import React, {useEffect, useState} from 'react';
import Main from './components/Main';
import Login from './components/Login';
import { selectLoading, selectUser } from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {login, loadingState} from './features/userSlice';
import axios from 'axios';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  
    useEffect( ()=> {
    axios.get('http://localhost:8000/check/login',{},{withCredentials: true})
    .then(res=>{
      if(res.data){
        dispatch(login({
          user_email : res.data.UserEmail,
          user_nickname:res.data.NickName,
          user_name:res.data.Name,
          user_adminAuth: res.data.AdminAuth,
          user_date : res.data.CreateDate
      }));
     console.log(res.data);
      }else {
        dispatch(loadingState(false));
        
        
      }
      })  
    
  },[dispatch]);
        
  return (
    <div className="App">
        
        {
          user? <Main/>:(loading?<div>로딩중입니다....</div>:<Login/>)
        }
    </div>
  );
}

export default App;
