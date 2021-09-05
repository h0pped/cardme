const mongoose = require("mongoose");
let validator = require("validator");

const CardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Unknown",
    trim: true,
  },
  job_title: {
    type: String,
    trim: true,
  },
  company_name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },
  phone: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
      message: "{VALUE} is not a valid phone number",
      isAsync: false,
    },
  },
  telegram: {
    type: String,
  },
});
const CardModel = mongoose.model("Card", CardSchema);

module.exports = CardModel;
