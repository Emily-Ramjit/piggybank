var path = require('path');
var crypto = require('crypto')
const ENCRYPTION_KEY = '11111111111111112222222222222234' // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

const router = require('express').Router();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('piggy_bank', 'root','newyork96',{
  host: 'localhost',
  dialect: 'mysql'
});

//this function executes any raw queries it is passed
async function executeQuery(queryString){
  let prom = sequelize.query(queryString).then((results)=>{
    console.log("[Query Results]: ",results);
    return results;
  }).catch(err=>{
    console.error("[Querying Error]: ",err.parent);
  });
  let queryResp = await prom;
  return queryResp;
}

//this route returns the entire user record from the user table given a userId
router.get('/getUserInfo/:userId',(req,res)=>{
  const userId = req.params.userId;
  console.log("userId: ", userId);
  const formattedQuery = `SELECT * FROM USER WHERE u_id = "${userId}"`;
  executeQuery(formattedQuery).then(userInfo=>{
      console.log(`getUserInfo for ${userId[0]}`);
      res.send(userInfo[0]);
  });

  //select user info from table

});

//this route returns the users transactions given the user id
router.get('/getUserTrans/:userId',(req,res)=>{
    const userId = req.params.userId;
    
    //select user transactions with joins from tables
    const formattedQuery = `SELECT UT.t_id, UT.first_name, UT.middle_initial, UT.last_name, UT.transaction_date_time,
  BI.business_name, BI.item_name, BI.price 
  FROM (SELECT U.first_name, U.middle_initial, U.last_name, 
    T.t_id, T.item_id, T.u_id, T.b_id, T.transaction_date_time 
    FROM user U JOIN transaction T ON U.u_id = T.u_id) UT
  JOIN (SELECT B.b_id, B.business_name, I.item_id, I.item_name, I.price
    FROM business B JOIN item I ON B.b_id = I.b_id) BI
    ON UT.item_id = BI.item_id AND UT.b_id = BI.b_id 
WHERE u_id = "${userId}" order by UT.t_id asc;`;
    executeQuery(formattedQuery).then(userTrans=>{
      res.send(userTrans[0]);
      console.log(`getUserTrans for ${userId}`);
    });
    


});

//this route returns the list of businesses in the business table.
router.get('/getBusinesses',(req,res)=>{
  const formattedQuery = `SELECT b_id, business_name FROM business;`;
  executeQuery(formattedQuery).then((businesses)=>{
      console.log("getBusinesses: ", businesses[0]);
      res.send(businesses[0]);
  });

});

//this route returns the list of items associated to the business id.
router.get('/getItems/:businessId',(req,res)=>{
	const businessId = req.params.businessId;
  const formattedQuery = `SELECT item_id, item_name, price FROM item WHERE b_id = "${businessId}";`;
  executeQuery(formattedQuery).then((items)=>{
    console.log("getItems: ", items[0]);
    res.send(items[0]);
  });
  
  

});

//this route gets the user's balance given the user's id.
router.get('/getBal/:userId',(req,res)=>{
	const userId = req.params.userId;
  const formattedQuery = `SELECT balance FROM user WHERE u_id = "${userId}";`;
  executeQuery(formattedQuery).then((balanceResult)=>{
     res.send(balanceResult[0]);
    console.log("getBal: ", balanceResult[0]);
  });
 
});

router.get('/getPreviousHash',(req,res)=>{
	const userId = req.params.userId;
  const formattedQuery = `SELECT block_hash FROM block order by block_id desc
  LIMIT 1`;
  executeQuery(formattedQuery).then((previousHash)=>{
     res.send(previousHash[0]);
    console.log("getPreviousHash: ", previousHash[0]);
  });
 
});

//this route creates and inserts a new transaction, updates user balance, creates a new block record and returns the result of that query.
router.post('/newTransaction',(req,res)=>{
  
  let {itemId, 
      userId,
      user_first_name,
      user_last_name,
      user_balance,
      businessId,
      transactionDateTime,
      newBalance,
      previousHash} = req.body;

   
   function generateHash(user_first_name, user_last_name, user_balance, transactionDateTime) {

    hashvalue = user_first_name + user_last_name + toString(user_balance) + toString(transactionDateTime); 
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let finalhash = cipher.update(hashvalue);
    finalhash = Buffer.concat([finalhash, cipher.final()]);
    return finalhash.toString('hex');
   
   }   
   
	
	

    const transactionHash = generateHash(user_first_name, user_last_name, user_balance, transactionDateTime)
    const hashVersion = generateHash(user_first_name, user_last_name, user_balance, transactionDateTime)
    console.log(transactionHash)
	
	
    const blockQuery = `INSERT INTO block (previous_block_hash, previous_block_id, block_hash, created_date_time)
    values("${previousHash}", "0", "${hashVersion}", "${transactionDateTime}");`;
	
	
    const updateBalanceFormattedQuery =
    `UPDATE user SET balance = "${newBalance}" WHERE u_id = "${userId}";
    `;


       //insert into block table
  executeQuery(blockQuery).then(insertRes=>{
    console.log("Inserting into block table: ", insertRes);

    const lastBlockQuery = `SELECT block_id FROM block order by block_id desc
    LIMIT 1`;
   // var blockId = JSON.stringify(insertRes[0])
     // get last block id 
     executeQuery(lastBlockQuery).then(getRes => {
      
      // console.log(JSON.parse(getRes[0]))
      // var blockId = JSON.parse(getRes[0]);
      // blockId = JSON.stringify(blockId)
      // console.log(blockId)

      console.log(JSON.parse(insertRes[0]));
      var blockId = JSON.parse(insertRes[0])
  const formattedQuery = `INSERT INTO transaction(item_id, u_id, b_id, transaction_hash,hash_version, block_id,transaction_date_time) 
  values("${itemId}", "${userId}", "${businessId}", "${transactionHash}","${hashVersion}", "${blockId}", "${transactionDateTime}");`;



  //insert into transaction table
  executeQuery(formattedQuery).then(insertResult =>{
    console.log("Inserting into transaction table: ",insertResult);

    //update user balance
    executeQuery(updateBalanceFormattedQuery).then(updateStatus=>{
      console.log("updateBalance status: ",updateStatus);


        res.send({
          "insertTransaction": insertResult,
          "updateUserBalance": updateStatus,
          "insertBlock": insertRes
        });

      });
     });
    });   
  });
});
module.exports = router;
