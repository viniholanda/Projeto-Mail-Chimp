const express = require('express')
const app = express()
const port = 3000

//necessário para renderizar o html no localhost
const bodyParser = require("body-parser")

//necessário para renderizar o html no localhost
app.use(bodyParser.urlencoded({extended: true}))

//renderiza no localhost o arquivo html
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

//renderiza no localhost o css e imagens na pasta public
app.use(express.static("public"))

app.post('/', function (req, res) {

    let firstName = req.body.fName
    let lastName = req.body.lName
    let emailName = req.body.email
 
    console.log(firstName, lastName, emailName);
    
})












app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))