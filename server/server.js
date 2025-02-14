const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const session = require('express-session')
const app = express();
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const user = require('./router/user');
const check = require('./router/check');


app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json({ limit : "50mb" })); 
app.use(express.urlencoded({ limit:"50mb", extended: false }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin: true,
    credentials: true,
    
}));

app.use(
    session({
        secret: 'jaedobook',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60*60*24,
            secure: false
        },
        store: new MySQLStore({
            host: "localhost",
            port:"3306",
            user: "root",
            password: "1234",
            database: "jaedobook"
        })
    })
)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) { 
    done(null, user.UserEmail); 
    
  });
  
passport.deserializeUser(function (userEmail, done) { 
    db.query(
      'SELECT * FROM jaedobook.user WHERE UserEmail=?',
      [userEmail],
    function (err, result) {
        let user;
        if(!err){
            if(result.length>0){
                user=result[0];
                done(null, user);
                
            }else{
                return done(err);
            }
        }else{
            return done(err);
            
        }
        });
    });
    passport.use(new LocalStrategy( {
        usernameField:'user_email',
        passwordField: 'user_pw',
        session:true
    },
    function (username, password, done) {
    
        db.query(
        'SELECT * FROM jaedobook.user WHERE UserEmail=?',
        [username],
        function (err, result) {
            if(result.length>0){
            let user = result[0];
            bcrypt.compare(password, user.Password,(error, results)=>{
                if(results){
                    return done(null, user);
                }else{
                    return done(null, false, {message:"틀린 비밀번호입니다"});
                }
                })
            }
                else{
                    return done(null, false, {message:"존재하지 않는 유저입니다."});
                    }
            
        }
    )
}));

app.use('/user', user);
app.use('/check', check);

const port = process.env.port || 8000;
app.listen(port, () => console.log(`Node.js Server is running on port ${port}...`));