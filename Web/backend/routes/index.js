var path = require('path');
const router = require('express').Router();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('piggy_bank', 'root','piggybank',{
  host: 'localhost',
  dialect: 'mysql'
});

async function executeQuery(queryString){
  // let res = conn.query(queryString,(err,res)=>{
  //   if(err) throw err;
  //   console.log("[Database]: Output =>");
  //   console.log(res);
  // });

  // let result = await res;
  // return result;

  let prom = sequelize.query(queryString).then((results)=>{
    console.log("[Query Results]: ",results);
    return results;
  }).catch(err=>{
    console.error("[Querying Error]: ",err.parent);
  });
  let queryResp = await prom;
  return queryResp;
}

// //set up routes
// app.use('/api',checkAuth,api);

router.get('/getUserInfo/:userId',(req,res)=>{
  const userId = req.params.userId;
  console.log("userId: ", userId);
  const formattedQuery = `SELECT * FROM USER WHERE u_id = ${userId}`;
  const userInfo = executeQuery(formattedQuery);
  res.send(userInfo);
  console.log(`getUserInfo for ${userId}`);
  //select user info from table

});

router.get('/getUserTrans/:userId',(req,res)=>{
    const userId = req.params.userId;
    res.send(`getUserTrans for ${userId}`)
    //select user transactions with joins from tables
    const formattedQuery = `
      SELECT UT.first_name, 
             UT.middle_initial, 
             UT.last_name, 
             UT.transaction_date_time,
             BI.business_name, 
             BI.item_name, 
             BI.price 
      FROM (
        SELECT U.first_name, 
               U.middle_initial, 
               U.last_name, 
               T.item_id, 
               T.u_id, 
               T.b_id, 
               T.transaction_date_time 
        FROM user U JOIN transaction T ON U.u_id = T.u_id
      ) UT
        JOIN (
          B.b_id, 
          B.business_name, 
          I.item_id, 
          I.item_name, 
          I.price

          FROM business B JOIN item I ON B.b_id = I.b_id
        ) BI
        ON 
           UT.item_id = BI.item_id AND 
           UT.b_id = BI.b_id 

      WHERE u_id = ${userId};

    `;
    const userTrans = executeQuery(formattedQuery);
    res.send(userTrans);
    console.log(`getUserTrans for ${userId}`);


});

router.get('/getBusinesses',(req,res)=>{
  const formattedQuery = `SELECT b_id, business_name FROM business;`;
  const businesses = executeQuery(formattedQuery);
  res.send(businesses);
  console.log("getBusinesses: ", businesses);

});

router.get('/getItems/:businessId',(req,res)=>{
	const businessId = req.params.businessId;
  const formattedQuery = `SELECT item_id, item_name, price FROM item WHERE b_id = ${businessId};`;
  const items = executeQuery(formattedQuery);
  res.send(items);
  console.log("getItems: ", items);

});

router.get('/getBal/:userId',(req,res)=>{
	const userId = req.params.userId;
  const formattedQuery = `SELECT balance FROM user WHERE u_id = ${userId};`;
  const balanceResult = executeQuery(formattedQuery);
  res.send(balanceResult);
  console.log("getBal: ", balanceResult);
});

router.post('/newTransaction',(req,res)=>{
  let {itemId, 
      userId,
      businessId,
      transactionHash,
      hashVersion,
      blockId,
      transactionDateTime,
      newBalance} = req.body;
  
  const formattedQuery = `INSERT INTO transaction(
  item_id, u_id, b_id, transaction_hash, 
  hash_version, block_id, transaction_date_time) 
  values(
    ${itemId}, 
    ${userId}, 
    ${businessId}, 
    ${transactionHash},
  ${hashVersion}, 
  ${blockId}, 
  ${transactionDateTime});`;

  //insert into transaction table
  const insertResult = executeQuery(formattedQuery);
  console.log("Inserting into transaction table: ",insertResult);
  res.send(insertResult);

  //insert into block table


  //update user balance
  const updateBalanceFormattedQuery =
  `UPDATE user SET balance = ${newBalance} WHERE u_id = ${userId};
  `;
  const updateStatus = executeQuery(updateBalanceFormattedQuery);
  console.log("updateBalance status: ",updateStatus);

});
module.exports = router;