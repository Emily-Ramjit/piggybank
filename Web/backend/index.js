const express = require('express');
const app = express();
const PATH_DIR = process.env.NODE_ENV === 'production' ? 'build' : 'public';

const router = require('express').Router();
const port = process.env.PORT || 8080;
var cors = require('cors');
// var sqlDriver = require('mysql');
var path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('piggy_bank', 'root','',{
  host: 'localhost',
  dialect: 'mysql'
});
app.use(cors());

const api = require(path.join(__dirname,'/routes'));

/*
setup mysql on your machine
1. download mysql
2. initialize mysqld: mysqld --intialize
3. copy temp creds and login to mysql: mysql -u root -h localhost -p 
4. reset password inside mysql: ALTER USER 'root'@'localhost' IDENTIFIED BY 'piggybank';
5. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'piggybank';
6. create database piggy_bank;
*/

app.use(express.json());
app.use('/api',api);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


sequelize.authenticate().then(()=>{
  console.log("[Database]: Connected Established!");
}).catch((err)=>{
  console.error("[Database]: Unable to connect to database :(",err);
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
