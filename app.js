const express = require('express')
const app = express()
const port = 3000
const https = require("https")

//necessário para renderizar o html no localhost
const bodyParser = require("body-parser")
const { request } = require('http')

//necessário para renderizar o html no localhost
app.use(bodyParser.urlencoded({extended: true}))

//renderiza no localhost o arquivo html
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

//renderiza no localhost o css e imagens na pasta public
app.use(express.static("public"))

app.post('/', function (req, res) {

    const firstName = req.body.fName
    const lastName = req.body.lName
    const emailName = req.body.email

    const data = {
      members: [
        {
          email_address: emailName,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName

          }
        }
      ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/5cbcf1026f";

    const options = {
      method: "POST",
      auth: "vinicius1:0632946a61434188c8628af8a98125a3-us10"
    }

    const request = https.request(url, options, function(response){
      response.on("data", function(data){
        console.log(JSON.parse(data));
        
      })
    })

    request.write(jsonData);
    request.end();

 
  
    
})

//Api Key
//0632946a61434188c8628af8a98125a3-us10

//List ID
//5cbcf1026f










app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))