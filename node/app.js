var express = require('express')
var app = express()

var mysql = require('mysql')
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : '',
	database : 'testnode'})

connection.connect()

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

console.log('p1')
app.post('/ajax_send_email', function(req, res){
	var email = req.body.email;
	var responseData = {};
	
	var query = connection.query('select name from user where id="' + email + '"', function(err, rows) {
		if(err) throw err;
		if(rows[0]) {
			responseData.result = "ok";
			responseData.name = rows[0].name;
		}
		else {
			responseData.result = "none";
			responseData.name = "";	
		}
		
		res.json(responseData)
	})
});
