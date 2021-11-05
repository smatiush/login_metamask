const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();


app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*app.post('/login',(req,res) => {
    req.session.signature = req.body.signature;
    res.end('done');
});*/


app.post('/admin',(req,res) => {
    console.log(req.body)
    if(req.body.signature) {
        //res.write(`<h1>Hello ${req.body.signature} h1><br>`);
        res.redirect('/authenticated.html');
        //res.end('+'>Logout');
    } else {
        res.write('Please login first.');
        //res.end('+'>Login');
    }
});
