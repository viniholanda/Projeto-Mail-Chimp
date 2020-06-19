const express = require('express')

//necessário para renderizar o html no localhost
const bodyParser = require("body-parser")
const app = express()
const port = 3000

//necessario conforme documentação node api https
const https = require("https")

//renderiza no localhost o css e imagens na pasta public
app.use(express.static("public"))

//necessário para renderizar o html no localhost
app.use(bodyParser.urlencoded({extended: true}))

//renderiza no localhost o arquivo html
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})



app.post('/', function (req, res) {

  const firstName = req.body.fName
  const lastName = req.body.lName
  const emailName = req.body.email


  //criação de objeto
  const data = {

    //request bosy parameters "reference list Mailchimp"
    members: [{
      //hide proprieties members
      email_address: emailName,
      status: "subscribed",

      //audience settings merge fields tags
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName

      }
    }]
  };

  //conversão de data para Json
  const jsonData = JSON.stringify(data);

  //alterado usX por us10 "final do api key"
  //https encontrado no developer request body parameters
  //acrescentado list ID no final
  const url = "https://us10.api.mailchimp.com/3.0/lists/5cbcf1026f";


  const options = {
    method: "POST",

    //autenticação + api key
    auth: "vinicius1:0632946a61434188c8628af8a98125a3-us10"
  }

  const request = https.request(url, options, function (response) {

    //direciona para pagina de sucesso ou falha
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));  

    })
  })

  request.write(jsonData);
  request.end();

})


//o botão redireciona para a pagina principal
app.post("/failure.html", function(req, res) {
  res.redirect('/')
})

//Api Key
//0632946a61434188c8628af8a98125a3-us10

//List ID "audience - menage audience , settings mailchimp"
//5cbcf1026f



app.get('/', (req, res) => res.send('Hello World!'))

//alterado para servidor Heroku
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port port!`))