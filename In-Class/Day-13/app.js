const users = require('./db/users');
const student = require('./protected/student')
const passport = require('passport')
const login = require('connect-ensure-login');
const bcrypt = require('bcryptjs');
const { Strategy } = require('passport-local');

const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
app.use(express.static('public'))
//application/x-www-form-urlencoded - Represents a URL encoded form
app.use(express.urlencoded({ extended: false }))


app.use(require('express-session')({
    secret: 'WhyPassportLocal!',
    resave: false,
    saveUninitialized: false
}))

passport.use(new Strategy(
    (username, password, cb) => {
        console.log(`in passport local strategy checking user ${username}`);
        users.findByUsername(username, (err, user) => {
            if (err) { return cb(err) }
            if (!user) { return cb(null, false) }
            let isMatched = bcrypt.compareSync(password, user.password)
            if (!isMatched) { return cb(null, false) }
            return cb(null, user)
        })
    }
))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})
    passport.deserializeUser((id, cb) => {
    users.findById(id, (err, user) => {
        if (err) { return cb(err) }
        cb(null, user)
    })
})

app.use(passport.initialize())
app.use(passport.session())

app.post('/login',
    passport.authenticate('local', {failureRedirect:'/login'}),
    (req, res)=>{
        console.log(`Login success`);
        res.redirect('/') }
)

app.get('/logout', (req, res, cb) => {
    req.logout((err) => {
        if (err) { return cb(err) }
    })
    res.redirect('/')
})
app.use('/students?', login.ensureLoggedIn(), student)
app.get('/test', login.ensureLoggedIn(), (req, res) => {
    res.send('This is protected');
})




app.get('/login', (req, res) => {
    res.redirect('/login.html')
})
app.listen(port, ()=>{
    console.log(`port :${port}`);
})