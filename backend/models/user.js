const mongoose=require('mongoose');
const cartproduct = require('./cartproduct');

const { Schema }=mongoose;

const userSchema=new Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    mobileno:{
        type:String,
        required: true,
    },
    shopping_cart: [
        {
          productId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref:cartproduct,
          },
          name: {
            type: String,
            required: true,
          },
          imgSrc: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
});

module.exports = mongoose.model('users',userSchema);