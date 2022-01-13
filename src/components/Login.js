import { ArrowForwardIos, NavigateBefore} from '@material-ui/icons'
import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import{ useNavigate} from 'react-router-dom'
import '../styles/Login.css'
import { login } from '../features/userSlice'
import  Modal from 'react-modal'
import moment from 'moment'
import 'moment/locale/ko'

const Login = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]= useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [nickname, setNickname] = useState('')
    const [name, setName] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passEmail, setPassEmail] = useState(false)
    const [passNickname, setPassNickname] = useState(false)
    const [pwMessage, setPwMessage] = useState('비밀번호가 일치하지 않습니다')

    const handleLogin=()=>{
        axios.post('http://localhost:8000/user/login', {
            user_email:email,
            user_pw:password
        }).then(res =>{
            if(res.data.UserEmail){
                dispatch(login({
                    user_email : res.data.UserEmail,
                    user_nickname:res.data.NickName,
                    user_name:res.data.Name,
                    user_adminAuth: res.data.AdminAuth,
                    user_date : res.data.CreateDate
                }));
                
            }else {
                alert(res.data.message);
            }
        })
    }
    const onCreate = () =>{
        axios.post('http://localhost:8000/user/register',{
            user_email : email,
            user_nickname : nickname,
            createDate :  moment().format('YYYY-MM-DD HH:mm:ss'),
            user_pw : password,
            user_name : name
        }).then(setOpenModal(false))
        .then(res=>alert(res.data))
        
    }
    const emailCheck = () =>{
        axios.post('http://localhost:8000/check/email',{
            user_email : email
        }).then(res=>{
            if(!res.data){
                alert('사용가능한 이메일입니다');
                setPassEmail(true);
            }
            })
    }
    const nicknameCheck = () =>{
        axios.post('http://localhost:8000/check/nickname',{
            user_nickname : nickname
        }).then(res=>{
            if(!res.data){
                alert('사용가능한 닉네임입니다')
                setPassNickname(true);
            }
        })
    }
    return (
        <div className="login">
        <div className="login_container">
            <div className="login_logo">
                <div>
                <h1 style={{color:"white", fontSize:70}}>JaeDo's book</h1>
                </div>
            </div>
            <div className="login_desc">
                <p>환영합니다.</p>
                <h3>지금 시작하세요!</h3>
            </div>

            <div className="login_auth">
                <div className="login_authOptions">
                    <div className= "login_authOption">
                        <img className="login_googleAuth" src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg" alt=""/>
                        <p>구글 아이디 로그인</p>
                    </div>
                    <div className="login_authOption">
                        <img className="login_googleAuth" src="https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png" alt=""/>
                        <p>페이스북 아이디 로그인</p>
                    </div>

                    <div className="login_authDesc">
                        <p>
                            <span>
                                이메일로 회원가입
                            </span>
                            시 본사의 <p>
                            <span>
                                개인정보정책
                            </span>
                            </p>
                            과
                            <span>
                                서비스 제공 정책
                            </span>
                            에 동의하는 것으로 간주합니다.
                            </p>
                    </div>
                </div>
                <div className="login_emailPass">
                    <div className="login_label">
                        <h3>로그인</h3>
                    </div>
                    <div className="login_inputFields">
                        <div className="login_inputField">
                            <input type="text" placeholder="이메일"
                            value={email} onChange={e=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login_inputField">
                            <input type="password" placeholder="비밀번호"
                            value={password} onChange={e=>setPassword(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="login_forgButt">
                        <small>비밀번호 찾기</small>
                        <button type ="submit" onClick={handleLogin}>로그인</button>
                    </div>
                <button onClick={()=>setOpenModal(true)}>회원가입</button>
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
                    <div className="modal_create"> 
                    <div className="create">
                <div className='create_rap'><div className='createTitle'><strong>회원가입</strong></div></div>
                <div className="create_inputFields">
                <div className='create_check_rap'><div className="create_check"><input className="create_input" type="email" name="user_email" id="email" placeholder="이메일을 입력해 주세요" value={email} onChange={(e)=>{setEmail(e.target.value); setPassEmail(false)}}/></div><br/><button type="submit" onClick={emailCheck} className="emailCheck_btn">중복확인</button></div>
                <div className="create_inputField"><input className="create_input" type="password" name="user_pw" id="password" placeholder="비밀번호를 입력해 주세요." value={password} onChange={(e)=>{setPassword(e.target.value)}}/></div>
                <div className='create_check_rap'><div className="create_check"><input className="create_input" type="password" id="passwordCheck" placeholder="비밀번호를 다시 입력해 주세요." value={passwordCheck} onChange={(e)=>{setPasswordCheck(e.target.value)}}/></div><br/><span style={pwMessage==='비밀번호가 일치합니다'?{color:'green'}:{color:'red'}}>{pwMessage}</span></div>
                <div className="create_inputField"><input className="create_input" type="name" name="user_name"id="name" placeholder="이름을 입력해 주세요." value={name} onChange={(e)=>{setName(e.target.value)}}/></div>
                <div className="create_check_rap"><div className='create_check'><input className="create_input" type="nickname"name="user_nickname" id="nickname" placeholder="닉네임을 입력해 주세요." value={nickname} onChange={(e)=>{setNickname(e.target.value); setPassNickname(false)}}/></div><br/><button type="submit" onClick={nicknameCheck} className="nicknameCheck_btn">중복확인</button></div>
                
                </div>
                <div className="create_footer">
                    <div className='createBtn'>
                    <button type="submit" onClick={onCreate} className="createUser_btn">가입하기</button>
                    </div>
                </div>
            </div>

                    </div>
                </Modal>
                </div>
            </div>
    <div className="login_lang">
        <p>언어 설정</p>
        <ArrowForwardIos fontSize="small"/>
    </div>

        <div className="login_footer">
            <p>About</p>
            <p>오시는길</p>
            <p>비지니스 문의</p>
            <p>고객센터</p>
            <p>전화번호</p>
            <p>&copy; Jaedo's book</p>
        </div>

    </div>
    </div>
    )
}

export default Login
