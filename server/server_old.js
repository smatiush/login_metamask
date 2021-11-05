const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();


app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(session({secret: 'ssshhhhh' ,saveUninitialized: false, resave: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login',(req,res) => {
    req.session.signature = req.body.signature;
    res.end('done');
});


router.post('/admin',(req,res) => {
    console.log(req.body)
    if(req.body.signature) {
        res.write(`<h1>Hello ${req.body.signature} h1><br>`);
        //res.end('+'>Logout');
    } else {
        res.write('Please login first.');
        //res.end('+'>Login');
    }
});

app.get('/authenticated', function(req, res) {
  res.redirect('/authenticated.html');;
});
