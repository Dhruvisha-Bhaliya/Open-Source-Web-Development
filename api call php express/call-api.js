var express = require('express');
var app = express();
var request = require('request');

//request(URL or options,callback(error, response, body){  })
app.get("/getdata",(req,res)=>{
	let url1="http://localhost:8000/books"
	request({url: url2,method:"GET"},(err,response,body)=>{
		res.send(body)
	})
})
//Call books API from another node app
app.get("/books",function(req,res){
	//let url1="http://localhost:8000/books"
	//let url2=
	var options = { 
		method: 'GET',
	  	url: "http://localhost/user_module/mysqli-rest.php"
	 };  //develop rest api in express, test in postman, modularize app

	//request({},()=>{})
	//request("url",(err,response,body)=>{}) 	
	request(options, function (error, response, body) 
	{
	  if (error) throw new Error(error);
    console.log(body);
    res.status(200).send(body);
	});
})

// Call third party URL and obtain response
app.get("/google",function(req,res){
	//request("url",()=>{})
  request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    res.send(body);
  }
})
})

//call third party Weather API with key
app.get("/weather",function(req,res){
	let apiKey = 'c023846de2f6f2ad3237a783df1a7a0b';
	let city = 'surat';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
//let url="https://api.openweathermap.org/geo/1.0/direct?q=surat&appid=c023846de2f6f2ad3237a783df1a7a0b"
//http://api.openweathermap.org/geo/1.0/direct?q=surat&appid=027d20f699f50aaa3622eda92507fea0

	request(url, function (error, response, body) {
	  if(error){
	    console.log('error:', error);
	    res.send(error);
	  } else {
	  	var weather = JSON.parse(body)
        console.log(weather)
	  	var t=`  Temperature ${weather.main.temp} degrees in ${weather.name}!`;
	    console.log( body +t);
	    res.send("got data "+t);
	  }
	});
})

app.listen(8001);