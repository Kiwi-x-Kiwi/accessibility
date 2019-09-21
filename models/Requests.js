const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Enterprise = require('../models/Enterprise')
const User = require('../models/User')


const requestSchema = new Schema({
  enterpriseUser: { type : Schema.Types.ObjectId, ref: 'Enterprise' },
  user: { type : Schema.Types.ObjectId, ref: 'User' },
  qualifications: [{type: String, enum: ['Color Blind', 'Low Vision', 'Screen Reader', 'Hearing Impared', 'Dyslexia']}],
  webURL: String,
  payment: Number,
  isClosed: false,
})

const Request = mongoose.model('Request', requestSchema)


module.exports = Request;