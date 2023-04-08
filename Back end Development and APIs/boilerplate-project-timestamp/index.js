// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
let res_obj = {};
app.get("/api/:input", function (req, res) {
  let input = req.params.input;
  if(input.includes('-')){
    res_obj['unix'] = new Date(input).getTime();
    res_obj['utc'] = new Date(input).toUTCString();
  }else{
    input = parseInt(input);
    res_obj['unix'] = new Date(input).getTime();
    res_obj['utc'] = new Date(input).toUTCString();
  }

  if(!res_obj['unix'] || !res_obj['utc']){
    res.json({error: 'Invalid Date'});
  }
  res.json(res_obj);
});

app.get("/api", function(req,res){
  res_obj['unix'] = new Date().getTime();
  res_obj['utc'] = new Date().toUTCString();

  res.json(res_obj);
});



// listen for requests :)
app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000.");
});
