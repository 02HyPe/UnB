const mongoose = require(`mongoose`)
const schema = new mongoose.Schema({
    userName : {type: String}
})

module.exports.schema = schema;