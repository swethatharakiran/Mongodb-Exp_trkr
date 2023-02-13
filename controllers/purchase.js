const Order=require('../models/orders');
const User=require('../models/user');
const Razorpay=require('razorpay');
const jwt=require('jsonwebtoken');
//const usercontroller=require('./user');
//import { generatetoken } from './user';
require('dotenv').config();

exports.purchasepremium=async(req,res,next)=>{
    try{
        
    var rzp=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
const amount=3000;
rzp.orders.create({amount,currency:'INR'},(err,order)=>{
    if(err){
        throw new Error(JSON.stringify(err));
    }
    //req.user.createOrder({orderid:order.id,status:'PENDING'})
    const orders=new Order({
        orderid:order.id,
        status:'PENDING',
        userid:req.user[0]._id
    })
    orders.save()
    .then(()=>{
         res.status(201).json({order,key_id:rzp.key_id});
    }).catch(err=>{throw new Error(err)})
})
    }
    catch(err){
        console.log(err);
    }
}

exports.updatetransaction=async(req,res,next)=>{
    try{
        console.log(req.body);
        const paymentid=req.body.paymentid;
        const orderid=req.body.orderid;
        const order=await Order.findOne({orderid:orderid})
        
        const promise1= Order.updateOne({orderid:orderid},
            {$set:{paymentid:paymentid,status:'SUCCESSFULL'}})
            console.log("USERID--UDATETRANSC",req.user[0]._id);
        const promise2= User.updateOne({_id:req.user[0]._id},
            {$set:{ispremiumuser:true}})
        Promise.all([promise1,promise2]).then(()=>{
            return res.status(202).json({success:true,message:'Transaction successful'})
            //return res.status(202).json({success:true,message:'Transaction successful',
            //token:generatetoken(userid,true)})
        }).catch(err=>{
            throw new Error(err);
        })           
    }
    catch(err){
        console.log(err);
        res.json({error:err,message:'Something went wrong'});
    }
}