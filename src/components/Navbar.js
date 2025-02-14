import { Avatar, Button, Input} from '@material-ui/core'
import LogoutIcon from '@mui/icons-material/Logout';
import { Search, AssignmentIndOutlined, BorderAllRounded, Home, NotificationsOutlined, PeopleAltOutlined, Language, ExpandMore, Link } from '@material-ui/icons'
import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import '../styles/Navbar.css'
import { selectUser, logout, loadingState } from '../features/userSlice';
import Modal from 'react-modal'
import { selectDislike, selectLike } from '../features/likeSlice';
import axios from 'axios';
const Navbar = () => {
    const user = useSelector(selectUser);
    const [ openModal, setOpenModal]= useState(false);
    const[input, setInput] = useState("");
    const[inputUrl, setInputUrl]= useState("");
    const like = useSelector(selectLike);
    const dislike = useSelector(selectDislike);
    const dispatch = useDispatch()

    const handleQuestion = (e)=> {
        e.preventDefault();
        setOpenModal(false);
        axios.post('http://localhost:8000/post/create',{
            
        })
        setInput("");
        setInputUrl("");
    }
    const useLogout = () =>{
        axios.get('http://localhost:8000/user/logout',{},{ withCredentials : true })
        .then(dispatch(logout()))
        .then(dispatch(loadingState(false)))
        
    }
    return (
        <div className="navbar">  
            <div className="logo">
            <h1>JaeDo's book</h1>
            </div> 
            <div className="icons_list">
                <div className="icons">
                    <Home/>
                </div>
                <div className="icons">
                    <BorderAllRounded/>
                </div>
                <div className="icons">
                    <AssignmentIndOutlined/>
                </div>
                <div className="icons">
                    <PeopleAltOutlined/>
                </div>
                <div className="icons">
                    <NotificationsOutlined/>
                </div>
            </div>

            <div className="search">
                <input type="text" placeholder="검색"/><Search/>
            </div>
            <div className="ren">
                <div className="avatar">
                    <Avatar src={user.photo}/>
                </div>
                <div className="logout">
                    <LogoutIcon onClick={useLogout}/>
                </div>
                <Language/>
                <Button onClick={()=>setOpenModal(true)}>글쓰기</Button>
                <Modal isOpen={openModal} onRequestClose={()=>setOpenModal(false)}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
                style={{
                    overlay: {
                        width: 700,
                        height: 600,
                        backgroundColor: "rgba(0,0,0,0.8)",
                        zIndex: "1000",
                        top: "50%",
                        left: "50%",
                        marginTop: "-300px",
                        marginLeft: "-350px",
                    }
                }}>
                    <div className="modal_title">
                    <h5>질문</h5>
                    <h5>공유하기</h5>
                    </div>
                    <div className="modal_info">
                        <Avatar/>
                        <p>질문자 : {user.user_nickname}</p>
                        <div className="modal_scope">
                            <PeopleAltOutlined/>
                            <p>전체공개</p>
                            <ExpandMore/>
                        </div>
                    </div>
                    <div className="modal_Field">
                        <Input type ="text" placeholder ="내용을 입력하세요" required value={input} onChange={(e)=>setInput(e.target.value)}/>

                        <div className="modal_fieldLink">
                            <Link/>
                        <Input type ="text" placeholder ="링크를 입력해주세요" required value={inputUrl} onChange={(e)=>setInputUrl(e.target.value)}/>
                        </div>
                    </div>
                    <div className="modal_buttons">
                    <button type="text" className="add" onClick={handleQuestion}>등록하기</button>
                    <button onClick={()=> setOpenModal(false)} className="can">닫기</button>
                    </div>
                </Modal>

            </div>        
                
        </div>
    )
}

export default Navbar
