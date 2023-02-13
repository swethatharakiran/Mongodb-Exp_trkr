const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  paymentid: {
    type: String,
    //required: true
  },
  orderid: {
    type: String,
    required: true
  },

  status:{
    type: String,
    required: true

  },
  userid:{
    type:Schema.Types.ObjectId
  }
  
});

module.exports = mongoose.model('Order', orderSchema);

/*const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Order=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
   
    paymentid:{
        type:Sequelize.STRING
    },

    orderid:{
        type:Sequelize.STRING
        
    },
    status:{
        type:Sequelize.STRING
       
    }
})

module.exports=Order;*/
