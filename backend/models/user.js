const mongoose=require('mongoose');

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
    shopping_cart : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'cartProduct'
        }
    ],
});

module.exports = mongoose.model('users',userSchema);