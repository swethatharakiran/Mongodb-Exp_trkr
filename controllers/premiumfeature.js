const User=require('../models/user');
const Expense=require('../models/expense');
//const sequelize = require('../util/database');

exports.getuserleaderboard=async(req,res,next)=>{
    try{
        Expense.aggregate([{
            $group:{
                _id:'$userid',
                total:{$sum:'$amount'}
            }
        }])
        
        .then(async data=>{
            const result=data.map(async ele=>{
            const user=await User.findOne({_id:ele._id});
            console.log("LEADERBOARD",user.username);
            const obj={username:user.username,total:ele.total,id:ele._id};
            return obj;
        });
        Promise.all(result).then(row=>{
            res.status(201).json(row.sort((a,b)=>b.total-a.total))
        });
    })
    .catch(err=>{res.status(500).json({error:err})})
        /*const usersleaderboard=await User.findAll({
            attributes:[
                'id',
            'username',
            [sequelize.fn('sum',sequelize.col('expenses.amount')),'total']
             ], //optimization-choosing selected fields from table
            include:[
                {
                    model:Exp,
                    attributes:[]
                }
            ],
                group:['user.id'],
                order:[['total','desc']     
        });
        
          */    
      
        //userleaderboarddetails.sort((a,b)=>b.total-a.total)
        
        //res.status(200).json(usersleaderboard);
    }
    catch(err){
        console.log(err);
    }
}