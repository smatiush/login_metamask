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
app.use('/', router)

router.post("/login", (req, res) => {
  console.log(req.body.signature)
  if(req.body.signature == 'null'){
    console.log('pre-invio')
    res.send({'logedIn': false ,'signature':req.body.signature})
    console.log('inviata')
    res.end()
  } else {
    console.log('pre-invio')
    res.send({'logedIn': true ,'signature':req.body.signature})
    console.log('inviata')
    res.end()
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
