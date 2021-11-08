const express = require("express")
var cors = require('cors')
const path = require("path")
const bodyParser = require("body-parser")
router = express.Router();

const PORT = 3001;

const app = express();
app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())
const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions))

router.route('/').get((req, res)=>{
  console.log('simple get req')
  res.send('lol')
  res.sendFile(path.join(__dirname, "auth.html"))
})

router.route('/login').post((req,res,next)=>{
  console.log(req.body)
  if (req.body.signature != ''){
    res.redirect('./auth.html')
  }
})

/*app.get("/api", (req, res) => {
  res.send('lol')
  res.sendFile(path.join(__dirname, "auth.html"))
  //res.redirect('../auth.html');
});*/

app.post("/login", (req, res) => {
  console.log(req.body)
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
