const express = require("express")
var cors = require('cors')
const path = require("path")
const bodyParser = require("body-parser")
router = express.Router();
var Accounts = require('web3-eth-accounts');
var account = new Accounts('https://mainnet.infura.io/v3/3d1d2343f9994001a3876a91ad7ef4cf');
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
  console.log('pre-invio')
  console.log(req.body)
  let adr = account.recover(req.body.message, req.body.signature)
  if (adr = req.body.account){
    console.log(adr)
    res.send({'logedIn': true})
    console.log('inviata')
    res.end()
  } else {
    console.log(adr)
    res.send({'logedIn': false})
    console.log('inviata')
    res.end()
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
