const mongoose = require(`mongoose`);
const bookSchema = require(`../Models/book`).schema;
const userSchema = require(`../Models/user`).schema;
const transactionSchema = require(`../Models/transaction`).schema;
const UnB =  mongoose.createConnection(process.env.MONGO_URL + 'UnB');
const UnBTransaction =  mongoose.createConnection(process.env.MONGO_URL + 'UnBtransc');
const bookModel = UnB.model("Books", bookSchema, "Books");
const userModel = UnB.model("Users", userSchema, "Users");
const transactionModel = UnB.model("transaction", transactionSchema, "transaction");

module.exports = {
    bookModel: bookModel,
    userModel: userModel,
    transactionModel:transactionModel
}