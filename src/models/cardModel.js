const mongoose = require("mongoose");
let validator = require("validator");

const CardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  job_title: {
    type: String,
    trim: true,
    default: "",
  },
  company_name: {
    type: String,
    trim: true,
    default: "",
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    required: false,
    default: "",
  },
  telegram: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
});
const CardModel = mongoose.model("Card", CardSchema);

module.exports = CardModel;
