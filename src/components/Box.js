import { Avatar } from '@material-ui/core'
import React from 'react'
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice'
import '../styles/Box.css'
const Box = () => {
    const user = useSelector(selectUser);
    return (
        <div className="box">
            <div className="box_info">
                <Avatar src={user.photo}/>
                <h5>{user.displayName ?user.displayName:user.email}</h5>
            </div>
            <div className="box_content">
                <p>무엇이 궁금하신가요?</p>
            </div>
        </div>
    )
}

export default Box
