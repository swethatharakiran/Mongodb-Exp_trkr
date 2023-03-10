const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const saltrounds=10;

exports.postsignupform=async(req,res,next)=>{

    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;

    if(username ==undefined|| username.length===0||email==undefined ||
        email.length===0 || password==undefined||password.length===0){
        res.status(400).json({err:"null parameters , something is not entered"})
    }
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
        if(err){
            console.log(err);
        }
        else{
            const user=new User({
            username:username,
            email:email,
            password:hash,
            ispremiumuser:false
        });
        user.save()
        .then(()=>{
            res.json({message:'successfully created new user'});
          })
          .catch(err => {
            console.log(err);
          });
            //await User.create({username:username,email:email,password:hash})  
        
         }
      })

    }
  
    
exports.postloginform=(req,res,next)=>{
    try{
    const email=req.body.email;
    const password=req.body.password;
    if(email==undefined||email.length===0||password==undefined||password.length===0){
        res.status(400).json({message:"fields should not be empty"});
    }
    else{
        User.find({email:email})
        .then(user=>{
            if(user[0].email==email)
            {
                console.log(user[0].password);//from database
                console.log("LOGINN",password)
                bcrypt.compare(password,user[0].password,async(err,result)=>{
                    if(err){
                        throw new Error("something went wrong");
                    }
                    else{
                        console.log("RESULT",result);
                        if(result===true){
                            if(user[0].ispremiumuser){
                                res.status(200).json(
                                {message:"login successful",statuscode:'200',
                                token:generatetoken(user[0]._id,user[0].ispremiumuser)})

                            }
                            else{
                              res.json({message:"login successful",
                              statuscode:'401',
                              token:generatetoken(user[0]._id,user[0].ispremiumuser)})
                             }
                            }
                        else{
                            res.status(400).json(
                                {message:"password incorrect/user not authorized"})
                        }
                    }
                })                       
            }
            else{
                res.status(404).json({message:"user does not exist"})
            }
        }).catch(err=>res.status(500).json({message:"error and mostly user does not exist"}));
    }
    }
    catch(err){console.log(err)}

}

function generatetoken(id,ispremiumuser){
    return jwt.sign({userid:id,ispremiumuser:ispremiumuser},'secretkey123')
}



//module.exports= {generatetoken};