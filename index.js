const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(session({
    secret: 'SECRET KEY',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/test-app',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}));


app.get('/', (req,res,next) => {
    req.session.user = {
        uiud: '12234-2345-2323423'
    }
    req.session.save(err => {
        if(err){
            console.log(err);
        } else {
            res.send(req.session.user)
        }
    });
})

app.get('/end', (req,res,next) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        } else {
            res.send('Session is destroyed')
        }
    });
})


app.listen(4000, () => {
    console.log("App listening on port 4000")
})