const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    amount:{
        type:Number
      
    },
    desc:{
        type:String
        
    },
    category:{
        type:String
       
    },
    userid:{
        type:Schema.Types.ObjectId
    }
  
});

module.exports = mongoose.model('Expense', expenseSchema);

     

/*const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Expense=sequelize.define('expense',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
   
    amount:{
        type:Sequelize.INTEGER
      

    },
    desc:{
        type:Sequelize.STRING
        
    },
    category:{
        type:Sequelize.STRING
       
    }
    
})

module.exports=Expense;*/
