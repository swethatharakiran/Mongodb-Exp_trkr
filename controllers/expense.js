const Exp=require('../models/expense');
const Downloadedfilesurl=require("../models/downloadedfilesurl");
const jwt=require('jsonwebtoken');
const AWS=require('aws-sdk');
const { v1: uuidv1} = require('uuid');
const Expense = require('../models/expense');
require('dotenv').config();

exports.postaddexpense=async(req,res,next)=>{
    try{
    const amount=req.body.amount;
    const desc=req.body.desc;
    const category=req.body.category;
    const userid=req.user[0]._id;
    console.log("USERID",userid);
    console.log("hello-->req.user",req.user);
    const expense=new Expense({
        amount:amount,
        desc:desc,
        category:category,
        userid:userid
    })
    expense.save()

    //await Exp.create({amount:amount,desc:desc,category:category,userId:req.user.id})
    .then((result)=>{
        console.log(result);
        //result._id=ObjectId(result._id).valueOf();
        res.status(200).json(result)})
    //.then((result)=>{res.status(200).json(result.dataValues)})
      
    .catch(err=>{res.send(err)})
    }
    catch(err){
        console.log(err)
    }

}

exports.delete_expense=async(req,res,next)=>{
    //const id=mongoose.Types.ObjectId(req.params.id);
    const id=(req.params.id);
    try{
        await Expense.findByIdAndRemove(id);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err});
    }

}

exports.edit_exp=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const exp=await Expense.findByIdAndRemove(id)
        .then((result)=>{
            console.log("INSIDE EDIT",result)

            res.json(result)
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
}

exports.getexpense=async(req,res,next)=>{
    try{
        const ITEMS_PER_PAGE=+req.query.itemspp||2;
        console.log(ITEMS_PER_PAGE);
        const page=+req.query.page||1;
        const total= await Expense.count({userid:req.user[0]._id})
          console.log("TOTAL--",total) 
        const expenses=await Expense.find({userid:req.user[0]._id})
        .limit(ITEMS_PER_PAGE).skip((page-1)*ITEMS_PER_PAGE).exec();
        
            res.status(200).json({allexpenses:expenses,
                currentpage:page,
                hasnextpage:total-page*ITEMS_PER_PAGE>0,
                nextpage:page+1,
                haspreviouspage:page>1,
                previouspage:page-1,
                lastpage:Math.ceil(total/ITEMS_PER_PAGE)
            })
        
}
catch(err){console.log(err)};
}

/*
exports.downloadExpenses =  async (req, res) => {

    try {
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        
        const expenses=await req.user.getExpenses();
        const fileData=JSON.stringify(expenses);
        const fileName=`expenses${req.user.id}/${new Date()}.txt`;
        const S3result=await uploadtoS3(fileData,fileName);//S3result stores file url
        await Downloadedfilesurl.create({fileURL:S3result,userId:req.user.id});// to store downloaded files url in table
        const downloadedfilesurl=await Downloadedfilesurl.findAll({where:{userId:req.user.id}});
        //console.log("FROM DOWNLOADS",downloadedfilesurl);
        res.status(201).json({fileURL:S3result,message:'file uplaod successful',downloadedfilesurl:downloadedfilesurl});
    
    }
        catch(err){
            console.log(err);
            res.status(500).send({message:'interval server error'});
        }
    }
        
    
    const uploadtoS3=(fileData,fileName)=>{
        console.log("KEYSSSS-->",process.env.AMAZON_S3_KEY_ID);
        const s3=new AWS.S3({
            accessKeyId:process.env.AMAZON_S3_KEY_ID,//amazon aws s3 access key id
            secretAccessKey:process.env.AMAZON_SECRET_KEY// aws secret access key, its in .env file
        });
        const params={
            Bucket:'khs29expensetracker',
            Key:fileName,
            Body:fileData,
            ACL:'public-read'//who can access
        };
        return new Promise((resolve,reject)=>{
            s3.upload(params,(S3Err,S3Result)=>{
                if(S3Err){
                    console.log("ERR-->",S3Err);
                    reject(S3Err);
                }
            
            console.log("--->",S3Result);
              resolve(S3Result.Location);
            })
        })
    }*/