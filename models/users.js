let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Member = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  secondName: {
    required: true,
    type: String,
  },
  middleName: {
    required: false,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  occupation: {
    required: true,
    type: String,
  },
  nextOfKin: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Member', Member);
