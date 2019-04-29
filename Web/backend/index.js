const express = require('express');
const app = express();
const PATH_DIR = process.env.NODE_ENV === 'production' ? 'build' : 'public';

const router = require('express').Router();
const port = process.env.PORT || 8080;
var cors = require('cors');
var sqlDriver = require('mysql');
var path = require('path');

//initialize db creds
//** creds can vary across machines **
var conn = sqlDriver.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

//attempt to connect
conn.connect((err)=>{
  if(err) throw err;
  console.log("[Database]: Connected Established!");
});

async function executeQuery(queryString){
  conn.query(queryString,(err,res)=>{
    if(err) throw err;
    console.log("[Database]: Output =>");
    console.log(res);
    return res;
  });
}



app.use(express.json());



// //set up routes
// app.use('/api',checkAuth,api);

//
router.get('/getUserInfo/:userId',(req,res)=>{
  const userId = req.params[0];
  res.send(`getUserInfo for ${userId}`)
  //select user info from table

});

router.get('/getUserTrans/:userId',(req,res)=>{
  const userId = req.params[0];
res.send(`getUserTrans for ${userId}`)
//select user transactions with joins from tables

});

router.get('/getBusinesses',(req,res)=>{
  
res.send("getBusinesses")
//select businesses

});

router.get('/getItems',(req,res)=>{
  
res.send("getItems");
//select items

});

router.post('/newTransaction',(req,res)=>{
  let transactionBody = req.body;
  res.send(`newTransaction for ${transactionBody}`);
  //insert into transaction table

  //insert into block table


  //update user balance
});





//error handler
app.use(function(err,req,res,next){
  if(res.headersSent){
    return next(err);
  }
  console.error(`[ERROR]: [${err.statusCode}]: ${err.message}`)
  res.status(err.statusCode).send(err.message);
  
});

//used to redirect front end
app.use(express.static(path.join(__dirname, `../client/src/${PATH_DIR}`)));

app.use('*',(req,res)=>{
  //might be in a client build rather than client dist while in prod
  // res.status(200).redirect('/');
  res.sendFile(path.join(__dirname, `../src/${PATH_DIR}/index.html`));
});







app.listen(port,()=>{
  console.log("[BACKEND]: Listening on port ", port, "...");
}); 