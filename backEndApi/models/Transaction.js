const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  transactionSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required: true},
    mobileNo: {type: String},
    addressLine1: {type: String},
    addressLine2: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    pinCode: {type: String},
    transactionId: {type: String},
    amount: {type: Number},
    status: {type: String, default: 'Pending', enum: ['Pending', 'Completed']},
    products: {type: JSON, default: []}

}, {timestamps: true})
module.exports = mongoose.model('Transaction', transactionSchema)   