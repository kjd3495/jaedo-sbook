import { ArrowForwardIos} from '@material-ui/icons'
import React,{useState} from 'react'
import {auth, provider} from '../firebase'
import '../styles/Login.css'
const Login = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]= useState("");

    const handleLogin=(e)=>{
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then(
            auth => {
                console.log(auth);
            }).catch((e)=> alert(e.message));
        setEmail("");
        setPassword("");
    }
    const handleRegister=(e)=> {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then(auth=>{
                if(auth){
                    console.log(auth);
                }
        }).catch((e)=>alert(e.message));
        setEmail("");
        setPassword("");
    }
    const signIn = () =>{
        auth.signInWithPopup(provider).catch(e=> alert(e.message));

        console.log(auth);
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
                        <p onClick={signIn}>구글 아이디 로그인</p>
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
                <button onClick={handleRegister}>회원가입</button>
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
