const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/create', (req, res)=>{

    const boardId = req.body.boardId;
    const boardContent = req.body.boardContent;
    const boardUrl = req.body.boardUrl;
    const nickName = req.body.nickName;
    const createDate = req.body.createDate;
    const updateDate = "----";
    const tag = req.body.tag;
    const param = [boardId, boardContent, boardUrl, nickName, createDate, updateDate, tag ];
    const sql = "INSERT INTO jaedobook.board (BoardId, BoardContent, BoardURL, NickName, CreateDate, UpdateDate, Tag) values (?,?,?,?,?,?,?)";

    db.query(sql, param, (err, result)=>{
        if(!err){
            res.send('등록완료');
        }else res.send(err);
    })
    
});