"use strict";

const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
  merk: {
    type: String,
    required: true
  },
  tahun_buat: {
    type: String,
    required: true
  },
  model_buat: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});
const Laptop = mongoose.model("Laptop", laptopSchema);
module.exports = Laptop;