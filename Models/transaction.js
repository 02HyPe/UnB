const mongoose = require(`mongoose`)
const schema = new mongoose.Schema({
    bookName : {type : String},
    userName : {type: String},
    issuedOn : {type : Date},
    returnedOn :{type : Date, required: false},
    ttlrent : {type: Number, required: false}
})

module.exports.schema = schema;