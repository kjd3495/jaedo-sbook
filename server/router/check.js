const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/login',(req, res)=>{
    if(req.user){
        res.send(req.user);
    }else { 
        res.send(req.err);
        
    }

    
})

module.exports= router