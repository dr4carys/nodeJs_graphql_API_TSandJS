"use strict";

const models = require("../models");

const hello = () => "Hello world!";

const testbram = () => "test bram";

const books = async () => {
  return await models.Book.find();
};

const findLaptop = async (parent, args) => {
  const laptopData = await models.Laptop.find({
    merk: args.merk
  });
  console.log(laptopData.length);

  if (laptopData.length == 0) {
    throw new Error("data kosong");
  }

  console.log(laptopData);
  return laptopData;
};

module.exports = {
  hello,
  books,
  testbram,
  findLaptop
};