"use strict";

const models = require("../models");

const addBook = async (parent, args) => {
  console.log(args.title);
  return await models.Book.create({
    title: args.title,
    author: args.author
  });
};

const addLaptop = async (parent, args) => {
  return await models.Laptop.create({
    merk: args.merk,
    tahun_buat: args.tahun_buat,
    model_buat: args.model_buat
  });
};

module.exports = {
  addBook,
  addLaptop
};