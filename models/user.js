const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  NHIF_deductions: {
    type: String,
    required: true
  },
  house_allowance: {
    type: String,
    required: true
  },
  sum_totals: {
    type: Number,
    
  },
});

module.exports = User = mongoose.model('users', UserSchema);