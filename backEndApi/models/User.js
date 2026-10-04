const mongoose = require('mongoose')
//const timestamps = require('mongoose-timestamps')

const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  mobileNo: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  ProfilePhoto: { type: String },
  lastLogin: { type: Date },
  userType: { type: String, default: 'user', enum: ['user', 'admin'], },
  Status: { type: String, default: 'active', enum: ['active', 'inactive'] },

},{timeStamps:true});

module.exports = mongoose.model('User', userSchema)