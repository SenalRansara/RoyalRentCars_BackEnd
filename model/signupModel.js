const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signupSchema = new Schema({

    
    userName : {
        type : String,
        required : true,
        maxlength: 50,
    },

    

    password : {
        type : String,
        maxlength : 50,
        require : true
    },

    email:{
        type:String,
        maxlength : 50,
        required : true

    },

})

const signup = mongoose.model("signup",signupSchema);
module.exports = signup;