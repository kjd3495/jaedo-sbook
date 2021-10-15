import './App.css';
import React, {useEffect} from 'react';
import Main from './components/Main';
import Login from './components/Login';
import { selectUser } from './features/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import { auth } from './firebase';
import {login, logout} from './features/userSlice';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect( ()=> {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          displayName:authUser.displayName,
          email:authUser.email,
        }))
        console.log(authUser);
      }else{
        dispatch(logout())
      }
    })
  },[dispatch]);
  return (
    <div className="App">
        {
          user ? (<Main/>):(<Login/>)
        }
    </div>
  );
}

export default App;
