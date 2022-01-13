const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt')
const saltRounds=10
const passport = require('passport');

router.post('/login', (req, res, next)=>{
    passport.authenticate(
        'local' , (err, user, info)=>{
            if(err) {
                return next(err); }
        
            if(user) {
                req.logIn(user, (error)=>{
                    if(error)return next(error);
                    
                    return res.send(user);
                });
            }else{
                res.send(info);
            }
        }
    )(req, res, next);
});
router.post('/register', (req, res)=>{
    const user_email = req.body.user_email;
    const user_nickname = req.body.user_nickname;
    const user_pw = req.body.user_pw;
    const createDate = req.body.createDate;
    const AdminAuth = false;
    const user_name = req.body.user_name;
    const param = [ user_email, user_pw, user_nickname, user_name, createDate, AdminAuth ];

    bcrypt.hash(param[1], saltRounds, (err, hash)=>{
    const sql = 'INSERT INTO jaedobook.user(UserEmail, Password, NickName, Name, CreateDate, AdminAuth) VALUES (?,?,?,?,?,?)'
    param[1] = hash;
    db.query(sql, param, (error, result)=> {
        if(!error)res.send('가입한 아이디로 로그인해주세요!')
        else res.send(error);
        })
    })
});
    router.get('/logout', (req,res)=>{
        req.logout();
        req.session.destroy();
    });

module.exports = router;