const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Request = require('../models/Requests')


const enterpriseSchema = new Schema({
  company: String,
  name: String,
  username: String,
  password: String,
  email: String,
  googleID: String,
  requests: [ { type : Schema.Types.ObjectId, ref: 'Requests' } ],
})

const Enterprise = mongoose.model('Enterprise', enterpriseSchema)


module.exports = Enterprise;
