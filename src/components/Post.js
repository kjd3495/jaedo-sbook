import { Avatar, Button } from '@material-ui/core'
import { ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined} from '@material-ui/icons'
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ThumbDownSharpIcon from '@mui/icons-material/ThumbDownSharp';
import React, {useEffect, useState} from 'react';
import { selectUser } from '../features/userSlice'
import {useSelector, useDispatch} from 'react-redux'
import '../styles/Post.css'
import {selectQuestionId, selectQuestionName, setQuestionInfo } from '../features/questionSlice';
import Modal from 'react-modal';
import db from '../firebase';
import firebase from 'firebase';
const Post = ({Id, image, question,timestamp, QuestionUser}) => { 
    const questionId = useSelector(selectQuestionId);
    const questionName = useSelector(selectQuestionName);
    const user = useSelector(selectUser);
    const [answer, setAnswer] =useState("");
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const [getAnswer, setGetAnswer] = useState([]);
    useEffect(()=> {
        if(questionId) {
            db.collection('questions').doc(questionId).collection('answer').orderBy('timestamp','desc')
            .onSnapshot((snapshot)=> {
                setGetAnswer(
                    snapshot.docs.map((doc)=>
                    ({id:doc.id, answers:doc.data()}))
                )
            })
        }
    },[questionId]);
    const onAnswerDelte = (id) => {
        db.collection('questions').doc(questionId).collection('answer').doc(id).delete()
    }
    const onDelete = () =>{
        db.collection('questions').doc(questionId).delete();
    }
    const handleAnswer = (e) => {
        e.preventDefault(); 

        if(questionId){
            db.collection('questions').doc(questionId).collection('answer').add({
                    questionId: questionId,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    answer:answer,
                    user:user,
            })

            console.log(questionId, questionName, answer)
            setAnswer("")
            setOpenModal(false)
        }
    }
    return (
        <div className="post"
        onClick={()=> dispatch(setQuestionInfo({
            questionId:Id,
            questionName:question,
        }))}>
            <div className="post_info">
                <Avatar src={QuestionUser.photo}/>
                <h5>{QuestionUser.displayName?QuestionUser.displayName:QuestionUser.email}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleDateString()}</small>
            </div>
            <div className="post_body">
            <div className="post_question">
                <p>{question}</p>

                    <button className="post_btnAnswer" onClick={()=>setOpenModal(true)}>답변하기</button>
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
                    <div className="modal_question"> 
                    <h1>{question}</h1>
                    <p><span className="name">{QuestionUser.displayName?QuestionUser.displayName:QuestionUser.email}</span>
                    로부터의 질문 <span className="time">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                    에 작성됨
                    </p>
                    </div>
                    <div className="modal_answer">
                        <textarea placeholder="답변을 작성해주세요" type ="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
                    </div>
                    <div className="modal_buttons"> 
                    <button type="text" className="add" onClick={handleAnswer}>등록하기</button>
                    <button onClick={()=> setOpenModal(false)} className="can">닫기</button>
                    </div>
                </Modal>

            </div>

            <div className="post_answer">
                    {
                     getAnswer.map(({id, answers}) =>
                        (   
                            <p key={id} style ={{position: "relative", paddingBottom: "5px"}}>
                            {Id === answers.questionId ? (
                                <span>{answers.answer}
                                <br/>
                                <span style={{
                                    position:"absolute",
                                    color: "yellowgreen",
                                    fontSize:"small",
                                    display:"flex",
                                    right:"0px"}}>
                                        <span style={{color:"#b92b27"}}>
                                            {answers.user.displayName ? answers.user.displayName : answers.user.email}
                                            </span>{""} {new Date(answers.timestamp?.toDate()).toLocaleString()}에 작성됨
                                            </span>
                                            <Button onClick={()=>{onAnswerDelte(id)}}>댓글삭제</Button>
                                            </span> ) : (
                                                " "
                                            
                            )}
                            </p>
                        )
                      )
                    }
            </div>
                <img src={image}alt=""/>
                <Button onClick={onDelete}>글삭제</Button>
            </div>
            <div className="post_footer">
               <div className="post_footerAction">
                   <ThumbUpAltSharpIcon/>
                   <div class="like">0</div>
                   <ThumbDownSharpIcon/>
                   <div className="dislike">0</div>
               </div>
               <RepeatOneOutlined/>
               <ChatBubbleOutlineOutlined/>
               <div className="post_footerRight">
                <ShareOutlined/>
                <MoreHorizOutlined/>
               </div>
           </div>
        </div>
    )
}

export default Post
