var express = require('express')
var app = express()

app.listen(3000, function(){
	console.log('start! express servr on port 3000');
});
app.use(express.static('public'))

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/public/main.html");
});

app.get('/main', function(req, res) {
	res.sendFile(__dirname + "/public/main.html");
});

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.post('/email_post', function(req, res){
	var name = req.body.email;
	//res.send("<h1> Welcome! </h1> " + name);
	res.render("email.ejs", {name: req.body.email})
});

app.post('/ajax_send_email', function(req, res){
	console.log(req.body.email)
	
	var responseData = {'result': 'ok', 'email': req.body.email}
	res.json(responseData)
});
