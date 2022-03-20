const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalSchema = new Schema({

    id: {
        type: String,
        required: true
    },

    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    vehicleType: {
        type: String,
        required: true,
        enum: ['Car', 'Van', 'Bus'],
        maxlength: 3,
        minlength: 3
    },

    vehicleModel: {
        type: String,
        required: true,
    },

    pickAddress: {
        type: String,
        maxlength: 200
    },

    paymentAmount: {
        type: Number,
        required: true,
    },

    paymentMethod: {
        type: String,
        required: true,
        enum: ['Cash payment', 'Card payment'],
        maxlength: 12,
        minlength: 12
    },

    customerName: {
        type: String,
        required: true,
        maxlength: 200
    },

    customerAddress: {
        type: String,
        maxlength: 200
    },

    customerNIC: {
        type: String,
        required: true,
    },

    contactNo: {
        type: Number,
        required: true,
        maxlength: 10,
        minlength: 10
    },

    NICcopy: {
        type: String,
    },

})

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;