const mongoose=require('mongoose');
const path=require('path');
const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
//const helmet=require('helmet');
//const morgan=require('morgan');
const fs=require('fs');
//const https=require('https');

const app=express();
const dotenv=require('dotenv');
dotenv.config();
//const sequelize=require('./util/database');
const User=require('./models/user');
const Expense=require('./models/expense');
const Order = require('./models/orders');
//const Forgotpassword=require('./models/password');
//const Downloadedfilesurl=require('./models/downloadedfilesurl');

const expenseroutes=require('./routes/user');
const addexpenseroutes=require('./routes/expense');
const purchaseroutes=require('./routes/purchase');
const premiumfeatureroutes=require('./routes/premiumfeature');
//const passwordroutes=require('./routes/password');
//const accesslogstream=fs.createWriteStream(path.join(__dirname,'access.log'));

//const privateKey=fs.readFileSync('server.key');
//const certificate=fs.readFileSync('server.cert');

//app.use(helmet());
//app.use(morgan('combined',{stream:accesslogstream}));



app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(expenseroutes);
app.use(addexpenseroutes);
app.use(purchaseroutes);
app.use(premiumfeatureroutes);
//app.use(passwordroutes);

//app.use((req,res)=>{
  //  res.sendFile(path.join(__dirname,`frontend/${req.url}`))
//})


mongoose
  .connect(
    'mongodb+srv://swethakh:switchcareer1@cluster0.ovg1ccy.mongodb.net/exp_trkr?retryWrites=true&w=majority'
  )
   .then(()=>{

    app.listen(process.env.PORT);

   })
  .catch(err => {
    console.log(err);
  });

//sequelize.sync().then(res=>{
    //https.createServer(
        //{key:privateKey,cert:certificate},app).listen(3000);
  //  app.listen(process.env.PORT);
//}).catch(err=>console.log(err));
