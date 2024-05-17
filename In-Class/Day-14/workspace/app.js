const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const app = express();

app.set('views', './views');
app.set('view engine', "pug");

app.use(session ({
        secret: 'whatever',
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 60000},
    })
);

app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new GoogleStrategy({
        clientID: '1061089523409-dlld5i3fgsec9h95fatqiuls5nt06644.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/auth/google/callback',
        }, 
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    )        
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const authRouter = express.Router();
app.use("/auth", authRouter);

authRouter.get("/google", passport.authenticate('google', {scope : ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate('google', {
    successRedirect: '/displayUserDetails',
    failureRedirect: '/'
}));

app.get('/', (req, res) => {
    res.render("index");
});
app.get('/displayUserDetails', (req, res) => {
    console.log(req.user);
    res.render("UserDetails", {user: req.user});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});