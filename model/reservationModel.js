const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({

    reservationID : {
        type : String,
        required : true,
        unique: true
    },
    
    customerName : {
        type : String,
        required : true,
        maxlength: 100,
    },

    
    nic : {
        type : String,
        required : true
    },

    address : {
        type : String,
        maxlength : 200,
        require : true
    },

    email:{
        type:String,
        maxlength : 50,
        required : true

    },

    contactNumber : {
        type : Number,
        maxlength : 10 ,
        minlength : 10,
        require : true
    },

    eventType :{
        type : String,
        require : true
    },

    vehicleType : {
        type : String,
        required : true
    },

    
    
    // from : {
    //     type : String,
    //     required : true
    // },

    // to : {
    //     type : String,
    //     required : true
    // },

    from : {
        type : Date,
        required : true
    },

    to : {
        type : Date,
        required : true
    },

    numberOfVehivles : {
        type : Number,
        required : true
    },

    deposit : {
        type : Number,
        required : true
    },

    totalReservation : {
        type : Number,
        required : true
    },

    advancedPayment : {
        type : Number,
        required : true
    },

    remarks:{
        type:String,
    },


})

const reservation = mongoose.model("reservations",reservationSchema);
module.exports = reservation;