const mongoose = require(`mongoose`)
const schema = new mongoose.Schema({
    bookName : {type: String},
    category : {type: [String]},
    rentPerDay : {type: Number}
})

module.exports.schema = schema;